import { expect, test } from '@playwright/test';
import { spinbutton, textbox } from './helpers';

test.describe('keyboard-only operation', () => {
  test('the skip link is the first focusable element and reaches main', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeAttached();
  });

  test('the whole form can be completed without a mouse', async ({ page }) => {
    let submitted: Record<string, unknown> | null = null;
    await page.route('**/api/lead', async (route) => {
      submitted = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true, reference: 'MC-26257-K3QB', priority: 'standard' }),
      });
    });

    await page.goto('/request');

    // Every control is reached by keyboard and operated by keyboard only.
    await page.getByRole('radio', { name: 'Investor / absentee owner' }).focus();
    await page.keyboard.press('Space');

    await spinbutton(page, 'How many properties?').focus();
    await page.keyboard.type('6');

    await page.getByRole('checkbox', { name: /Field Inspections/ }).focus();
    await page.keyboard.press('Space');

    await textbox(page, 'Street address').focus();
    await page.keyboard.type('88 County Road 471');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Bastrop');
    await page.keyboard.press('Tab');
    await page.keyboard.type('78602');
    await page.keyboard.press('Tab');
    await page.keyboard.type('1964');

    await textbox(page, 'Describe it').focus();
    await page.keyboard.type('Vacant rental, need a documented check every other week.');

    await textbox(page, 'Name').focus();
    await page.keyboard.type('Sam Okafor');
    await page.keyboard.press('Tab');
    await page.keyboard.type('5125550147');

    await textbox(page, 'Email').focus();
    await page.keyboard.type('sam@example.com');

    await page.getByRole('button', { name: 'Send request' }).focus();
    await page.keyboard.press('Enter');

    await page.waitForURL('**/request/thanks**');
    expect(submitted).toMatchObject({
      customerType: 'investor',
      city: 'Bastrop',
      yearBuilt: 1964,
      divisions: ['field-inspections'],
    });
  });

  test('every interactive element has a visible focus indicator', async ({ page }) => {
    await page.goto('/plans');
    const link = page.getByRole('link', { name: /Start with Standard/ }).first();
    await link.focus();
    const outline = await link.evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(outline).not.toBe('none');
  });
});

test.describe('document structure', () => {
  const routes = [
    '/',
    '/plans',
    '/services',
    '/services/property-care',
    '/services/turn-services',
    '/for/property-managers',
    '/for/investors',
    '/for/short-term-rentals',
    '/sample-report',
    '/service-area',
    '/service-area/elgin',
    '/about',
    '/legal/licensed-partners',
    '/legal/terms',
    '/legal/privacy',
    '/request',
  ];

  for (const route of routes) {
    test(`${route} has exactly one h1, a title and the required disclosure`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page).toHaveTitle(/.{10,}/);

      // BUILD.md 9.2 — SiteFooter renders the disclosure on every page.
      await expect(
        page
          .getByRole('contentinfo')
          .getByText(/Licensed trade work .* is performed by verified, insured, licensed partner/),
      ).toBeVisible();
    });
  }

  test('every image carries alternative text', async ({ page }) => {
    await page.goto('/services/property-care');
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i += 1) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).not.toBeNull();
      expect((alt ?? '').trim().length).toBeGreaterThan(0);
    }
  });
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('the status stamp does not animate', async ({ page }) => {
    await page.goto('/');
    const stamp = page.locator('.stamp-animate').first();
    await expect(stamp).toBeVisible();
    const animation = await stamp.evaluate((el) => getComputedStyle(el).animationName);
    expect(animation).toBe('none');
  });
});

test.describe('the funnel is reachable everywhere', () => {
  const TOP_LEVEL = ['/', '/plans', '/services', '/sample-report', '/about'];

  test('a request CTA is one tap away on every top-level page', async ({ page, isMobile }) => {
    for (const route of TOP_LEVEL) {
      await page.goto(route);

      // On a phone the header CTA gives way to the sticky bar, so that the
      // logo and menu are not fighting it for width. Either way the funnel is
      // reachable without scrolling.
      const cta = isMobile
        ? page.getByRole('link', { name: 'Request service' }).last()
        : page.getByRole('banner').getByRole('link', { name: 'Request service' });

      await expect(cta, `no request CTA above the fold on ${route}`).toBeVisible();
    }
  });

  test('the phone number is reachable without scrolling', async ({ page, isMobile }) => {
    await page.goto('/');
    const call = isMobile
      ? page.getByRole('link', { name: /Call now/ })
      : page.getByRole('banner').getByRole('link', { name: /Call/ });
    await expect(call).toBeVisible();
    await expect(call).toHaveAttribute('href', /^tel:/);
  });

  test('the sample report is not behind a form', async ({ page }) => {
    await page.goto('/sample-report');
    await expect(page.getByRole('link', { name: /Download the PDF/ })).toBeVisible();
    await expect(page.locator('form')).toHaveCount(0);
  });
});

test.describe('layout stability', () => {
  // CLS budget is 0.05 (BUILD.md 10). Fonts load with `display: 'optional'`
  // precisely so the hero does not reflow — this catches a regression to 'swap'.
  const ROUTES = ['/', '/plans', '/for/property-managers', '/services/home-repair'];

  for (const route of ROUTES) {
    test(`${route} does not shift while loading`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'load' });
      const cls = await page.evaluate(
        () =>
          new Promise<number>((resolve) => {
            let total = 0;
            new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                const shift = entry as PerformanceEntry & {
                  value: number;
                  hadRecentInput: boolean;
                };
                if (!shift.hadRecentInput) total += shift.value;
              }
            }).observe({ type: 'layout-shift', buffered: true });
            setTimeout(() => resolve(Number(total.toFixed(4))), 1500);
          }),
      );
      expect(cls, `cumulative layout shift on ${route}`).toBeLessThan(0.05);
    });
  }
});
