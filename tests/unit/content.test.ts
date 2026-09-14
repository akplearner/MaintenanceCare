import { describe, expect, it } from 'vitest';
import '@/content/validate';
import { divisions, launchedDivisions } from '@/content/divisions';
import { services, flatRateMenu } from '@/content/services';
import { plans, INSPECTION_AREAS } from '@/content/plans';
import { areas } from '@/content/areas';
import { formatPricing, effectiveLabel, latestEffectiveDate } from '@/lib/price';

describe('content shape', () => {
  it('validates at import time', () => {
    // Importing content/validate throws on a malformed object; reaching here is the assertion.
    expect(divisions.length).toBe(8);
  });

  it('launches exactly the four Phase 1 divisions', () => {
    expect(launchedDivisions.map((d) => d.slug).sort()).toEqual([
      'exterior-care',
      'field-inspections',
      'home-repair',
      'property-care',
    ]);
  });

  it('publishes a flat-rate menu large enough to be useful', () => {
    expect(flatRateMenu.length).toBeGreaterThanOrEqual(16);
  });

  it('features exactly one plan', () => {
    expect(plans.filter((p) => p.featured)).toHaveLength(1);
  });

  it('documents fifteen inspection areas', () => {
    expect(INSPECTION_AREAS).toHaveLength(15);
  });

  it('covers the five named service-area cities', () => {
    expect(areas.map((a) => a.city)).toEqual(['Elgin', 'Bastrop', 'Manor', 'Taylor', 'Pflugerville']);
  });

  it('gives every priced service an effective date', () => {
    for (const s of services) {
      if (s.pricing.kind === 'range' || s.pricing.kind === 'from') {
        expect(s.pricing.effectiveDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
  });

  it('gates pre-1978 work on the services that need it', () => {
    const gated = services.filter((s) => s.leadPaintGated).map((s) => s.id);
    expect(gated).toContain('paint-single-room');
    expect(gated).toContain('drywall-patch-small');
  });

  it('marks fixture work as licensed-partner rather than flat-rate', () => {
    const fixture = services.find((s) => s.id === 'fixture-coordination');
    expect(fixture?.licensedTradeRequired).toBe(true);
    expect(fixture?.flatRateMenu).toBeUndefined();
  });
});

describe('price formatting', () => {
  it('formats every pricing variant', () => {
    expect(
      formatPricing({ kind: 'range', low: 79, high: 99, unit: 'flat', effectiveDate: '2026-09-01' }),
    ).toBe('$79 – $99');
    expect(
      formatPricing({ kind: 'range', low: 85, high: 105, unit: 'per-hour', effectiveDate: '2026-09-01' }),
    ).toBe('$85 – $105/hour');
    expect(formatPricing({ kind: 'from', low: 95, unit: 'flat', effectiveDate: '2026-09-01' })).toBe(
      'From $95',
    );
    expect(formatPricing({ kind: 'quote', note: 'After a site visit' })).toBe('Quoted');
    expect(formatPricing({ kind: 'included', inPlan: 'standard' })).toBe('Included in plan');
  });

  it('renders the effective date as a month and year', () => {
    expect(effectiveLabel('2026-09-01')).toBe('September 2026');
  });

  it('picks the latest effective date across a table', () => {
    expect(
      latestEffectiveDate([
        { kind: 'range', low: 1, high: 2, unit: 'flat', effectiveDate: '2026-01-01' },
        { kind: 'from', low: 3, unit: 'flat', effectiveDate: '2026-09-01' },
        { kind: 'quote', note: 'no date here' },
      ]),
    ).toBe('2026-09-01');
  });
});
