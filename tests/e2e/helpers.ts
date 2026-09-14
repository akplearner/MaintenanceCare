import type { Page, Route } from '@playwright/test';

/**
 * Locate form controls by their computed accessible name rather than by label
 * text — the required-field asterisk is aria-hidden, so the accessible name is
 * the clean one, and asserting against it tests what a screen reader gets.
 */
function anchored(name: string): RegExp {
  // Some labels append "(optional)", which is part of the accessible name and
  // usefully so. Anchor at the start so "Name" never matches "Company".
  return new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\s*\\(optional\\))?$`);
}

export function textbox(page: Page, name: string) {
  return page.getByRole('textbox', { name: anchored(name) });
}

export function spinbutton(page: Page, name: string) {
  return page.getByRole('spinbutton', { name: anchored(name) });
}

export interface CapturedLead {
  body: Record<string, unknown>;
}

/**
 * Intercepts the lead endpoint so the tests assert what the form SENDS, which
 * is what decides routing — without needing a database, a mail provider or a
 * Turnstile secret in CI. Classification itself is unit-tested exhaustively.
 */
export async function interceptLead(
  page: Page,
  captured: CapturedLead[],
  response: Record<string, unknown> = { ok: true, reference: 'MC-26257-K3QB', priority: 'standard' },
): Promise<void> {
  await page.route('**/api/lead', async (route: Route) => {
    captured.push({ body: route.request().postDataJSON() as Record<string, unknown> });
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(response),
    });
  });
}

export async function fillProperty(
  page: Page,
  opts: { yearBuilt?: string | null; city?: string; address?: string; zip?: string } = {},
): Promise<void> {
  await textbox(page, 'Street address').fill(opts.address ?? '412 Oak Grove Dr');
  await textbox(page, 'City').fill(opts.city ?? 'Elgin');
  await textbox(page, 'ZIP').fill(opts.zip ?? '78621');
  if (opts.yearBuilt !== null) {
    await spinbutton(page, 'Year built').fill(opts.yearBuilt ?? '1996');
  }
}

export async function fillContact(page: Page): Promise<void> {
  await textbox(page, 'Describe it').fill('Hose bib on the north side has been dripping.');
  await textbox(page, 'Name').fill('Dana Ruiz');
  await textbox(page, 'Phone').fill('5125550147');
  await textbox(page, 'Email').fill('dana@example.com');
}

/**
 * The form's own error summary. Scoped to the form because Next's development
 * overlay also renders an element with role="alert".
 */
export function errorSummary(page: Page) {
  return page.locator('form').getByRole('alert');
}
