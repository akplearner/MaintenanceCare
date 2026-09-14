import { expect, test } from '@playwright/test';
import {
  errorSummary,
  fillContact,
  fillProperty,
  interceptLead,
  spinbutton,
  textbox,
  type CapturedLead,
} from './helpers';

test.describe('lead submission', () => {
  test('a homeowner request submits as a single standard lead', async ({ page }) => {
    const captured: CapturedLead[] = [];
    await interceptLead(page, captured);

    await page.goto('/request');
    await expect(page.getByRole('heading', { name: 'Request service', level: 1 })).toBeVisible();

    await page.getByRole('radio', { name: 'Homeowner' }).check();
    await page.getByRole('checkbox', { name: /Home Repair/ }).check();
    await fillProperty(page);
    await fillContact(page);
    await page.getByRole('button', { name: 'Send request' }).click();

    await page.waitForURL('**/request/thanks**');
    expect(captured).toHaveLength(1);
    expect(captured[0]!.body).toMatchObject({
      customerType: 'homeowner',
      propertyCount: 1,
      divisions: ['home-repair'],
      yearBuilt: 1996,
    });
  });

  test('a property manager request carries the fields that make it priority', async ({ page }) => {
    const captured: CapturedLead[] = [];
    await interceptLead(page, captured, {
      ok: true,
      reference: 'MC-26257-K3QB',
      priority: 'priority',
    });

    await page.goto('/request');
    await page.getByRole('radio', { name: 'Property manager' }).check();

    // Progressive disclosure: the portfolio fields appear only for this type.
    const propertyCount = spinbutton(page, 'How many properties?');
    await expect(propertyCount).toBeVisible();
    await propertyCount.fill('24');
    await textbox(page, 'Company').fill('Ruiz Property Group');

    await page.getByRole('checkbox', { name: /Property Care/ }).check();
    await fillProperty(page);
    await fillContact(page);
    await page.getByRole('button', { name: 'Send request' }).click();

    await page.waitForURL('**/request/thanks**');
    expect(captured[0]!.body).toMatchObject({
      customerType: 'property-manager',
      propertyCount: 24,
      company: 'Ruiz Property Group',
      divisions: ['property-care'],
    });
  });

  test('a homeowner marking an emergency still sends the emergency flag', async ({ page }) => {
    const captured: CapturedLead[] = [];
    await interceptLead(page, captured);

    await page.goto('/request');
    await page.getByRole('radio', { name: 'Homeowner' }).check();
    await page.getByRole('checkbox', { name: /Property Care/ }).check();
    await page.getByRole('radio', { name: 'Emergency' }).check();
    await fillProperty(page);
    await fillContact(page);
    await page.getByRole('button', { name: 'Send request' }).click();

    await page.waitForURL('**/request/thanks**');
    expect(captured[0]!.body).toMatchObject({ customerType: 'homeowner', urgency: 'emergency' });
  });

  test('the portfolio CTA prefills the form as a property manager', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Portfolio inquiry/ }).first().click();
    await page.waitForURL('**/request**');

    await expect(page.getByRole('radio', { name: 'Property manager' })).toBeChecked();
    await expect(spinbutton(page, 'How many properties?')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('three-property audit');
  });

  test('a plan CTA prefills the plan into the description', async ({ page }) => {
    await page.goto('/plans');
    await page.getByRole('link', { name: 'Start with Standard' }).first().click();
    await page.waitForURL('**/request**');
    await expect(textbox(page, 'Describe it')).toHaveValue(/Standard plan at \$89\/month/);
  });
});

test.describe('the thanks page', () => {
  test('shows the reference and does not upsell', async ({ page }) => {
    await page.goto('/request/thanks?ref=MC-26257-K3QB');
    await expect(page.getByRole('heading', { name: 'Request received.' })).toBeVisible();
    await expect(page.getByText('MC-26257-K3QB')).toBeVisible();

    // No CTA inside the page body — the header nav is not an upsell.
    await expect(page.locator('#main').getByRole('link', { name: /Request service/ })).toHaveCount(0);
    await expect(page.locator('#main').getByRole('link', { name: /audit/i })).toHaveCount(0);
  });

  test('does not reflect a malformed reference onto the page', async ({ page }) => {
    await page.goto('/request/thanks?ref=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E');
    await expect(page.getByText('Your reference')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Request received.' })).toBeVisible();
  });
});

test.describe('validation', () => {
  test('a submission with no year built is blocked and announced', async ({ page }) => {
    const captured: CapturedLead[] = [];
    await interceptLead(page, captured);

    await page.goto('/request');
    await page.getByRole('checkbox', { name: /Home Repair/ }).check();
    await fillProperty(page, { yearBuilt: null });
    await fillContact(page);

    await page.getByRole('button', { name: 'Send request' }).click();

    await expect(errorSummary(page)).toBeVisible();
    await expect(errorSummary(page)).toContainText('Enter a year from 1800 onwards');
    await expect(spinbutton(page, 'Year built')).toHaveAttribute('aria-invalid', 'true');
    expect(captured).toHaveLength(0);
  });

  test('a submission with no division chosen is blocked', async ({ page }) => {
    const captured: CapturedLead[] = [];
    await interceptLead(page, captured);

    await page.goto('/request');
    await fillProperty(page);
    await fillContact(page);
    await page.getByRole('button', { name: 'Send request' }).click();

    await expect(errorSummary(page)).toBeVisible();
    await expect(errorSummary(page)).toContainText('Choose at least one');
    expect(captured).toHaveLength(0);
  });
});

test.describe('access codes are never collected (BUILD.md 9.4)', () => {
  test('no form control is named after an access credential', async ({ page }) => {
    await page.goto('/request');
    const inputs = page.locator('#main input, #main textarea, #main select');
    const count = await inputs.count();
    expect(count).toBeGreaterThan(10);
    for (let i = 0; i < count; i += 1) {
      const name = (await inputs.nth(i).getAttribute('name')) ?? '';
      const id = (await inputs.nth(i).getAttribute('id')) ?? '';
      expect(`${name} ${id}`).not.toMatch(/code|lockbox|alarm|pin/i);
    }
  });

  test('the access field warns against sending codes', async ({ page }) => {
    await page.goto('/request');
    await expect(page.getByText(/send gate or lockbox codes here/i)).toBeVisible();
    await expect(
      page.getByRole('textbox', { name: /Who do we contact to arrange entry\?/ }),
    ).toBeVisible();
  });
});
