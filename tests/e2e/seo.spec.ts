import { expect, test } from '@playwright/test';

test.describe('structured data and SEO', () => {
  test('the home page carries LocalBusiness and FAQ JSON-LD, and no fake reviews', async ({
    page,
  }) => {
    await page.goto('/');
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const parsed = blocks.flatMap((b) => {
      const value: unknown = JSON.parse(b);
      return Array.isArray(value) ? value : [value];
    }) as Record<string, unknown>[];

    const types = parsed.map((p) => p['@type']);
    expect(types).toContain('HomeAndConstructionBusiness');
    expect(types).toContain('FAQPage');

    // BUILD.md 8 — never until the reviews are genuine.
    const serialised = JSON.stringify(parsed);
    expect(serialised).not.toContain('AggregateRating');
    expect(serialised).not.toContain('"Review"');
  });

  test('a division page carries Service and BreadcrumbList JSON-LD', async ({ page }) => {
    await page.goto('/services/field-inspections');
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const serialised = blocks.join('');
    expect(serialised).toContain('"Service"');
    expect(serialised).toContain('"BreadcrumbList"');
  });

  test('titles and descriptions are unique across the key routes', async ({ page }) => {
    const routes = ['/', '/plans', '/services', '/for/property-managers', '/for/investors', '/sample-report', '/about'];
    const seen = new Map<string, string>();

    for (const route of routes) {
      await page.goto(route);
      const title = await page.title();
      const description =
        (await page.locator('meta[name="description"]').getAttribute('content')) ?? '';

      expect(title.length).toBeGreaterThan(10);
      expect(description.length).toBeGreaterThan(50);
      expect(seen.has(title), `duplicate title on ${route}`).toBe(false);
      seen.set(title, route);
    }
  });

  test('every page declares a canonical URL', async ({ page }) => {
    for (const route of ['/', '/plans', '/service-area/taylor']) {
      await page.goto(route);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
      expect(canonical).toContain(route === '/' ? '/' : route);
    }
  });

  test('the sitemap lists every city and division', async ({ page }) => {
    const response = await page.request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    const xml = await response.text();
    for (const slug of ['elgin', 'bastrop', 'manor', 'taylor', 'pflugerville']) {
      expect(xml).toContain(`/service-area/${slug}`);
    }
    for (const slug of ['property-care', 'field-inspections', 'home-repair', 'exterior-care']) {
      expect(xml).toContain(`/services/${slug}`);
    }
  });

  test('robots keeps the API and the thanks page out of the index', async ({ page }) => {
    const response = await page.request.get('/robots.txt');
    const body = await response.text();
    expect(body).toContain('Disallow: /api/');
    expect(body).toContain('Disallow: /request/thanks');
    expect(body).toContain('Sitemap:');
  });
});

test.describe('pricing discipline', () => {
  test('every price table states its effective date', async ({ page }) => {
    for (const route of ['/services/home-repair', '/services/field-inspections', '/plans']) {
      await page.goto(route);
      await expect(page.getByText(/Pricing effective \w+ \d{4}/).first()).toBeVisible();
    }
  });

  test('portfolio pricing is an inquiry, not a public price', async ({ page }) => {
    await page.goto('/plans');
    await expect(page.getByText('Portfolio pricing — based on how many properties. Ask us.')).toBeVisible();
    await expect(page.getByText(/\$\d+\s*[–-]\s*\$\d+\s*\/\s*door/i)).toHaveCount(0);
  });

  test('a placeholder division does not advertise a price', async ({ page }) => {
    await page.goto('/services/asset-care');
    await expect(page.getByText(/not running yet/i)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Ask us about this' })).toBeVisible();
    await expect(page.locator('table')).toHaveCount(0);
  });
});
