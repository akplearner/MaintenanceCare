import type { Pricing, PriceUnit } from '@/content/types';

const UNIT_LABEL: Record<PriceUnit, string> = {
  flat: '',
  'per-hour': '/hour',
  'per-month': '/month',
  'per-visit': '/visit',
  'per-property': '/property',
  'per-property-per-month': '/property/month',
};

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function formatMoney(value: number): string {
  return usd.format(value);
}

/** The display string for any pricing variant. */
export function formatPricing(pricing: Pricing): string {
  switch (pricing.kind) {
    case 'range':
      return `${formatMoney(pricing.low)} – ${formatMoney(pricing.high)}${UNIT_LABEL[pricing.unit]}`;
    case 'from':
      return `From ${formatMoney(pricing.low)}${UNIT_LABEL[pricing.unit]}`;
    case 'quote':
      return 'Quoted';
    case 'included':
      return 'Included in plan';
  }
}

export function pricingNote(pricing: Pricing): string | undefined {
  if (pricing.kind === 'quote') return pricing.note;
  if (pricing.kind === 'included') return `Included in the ${pricing.inPlan} plan`;
  return pricing.note;
}

/** "Pricing effective September 2026" — rendered beneath every price table. */
export function effectiveLabel(isoDate: string): string {
  const [y, m] = isoDate.split('-').map(Number);
  if (!y || !m) return isoDate;
  const month = new Date(Date.UTC(y, m - 1, 1)).toLocaleString('en-US', {
    month: 'long',
    timeZone: 'UTC',
  });
  return `${month} ${y}`;
}

/** The most recent effective date across a set of priced items. */
export function latestEffectiveDate(pricings: Pricing[]): string | undefined {
  const dates = pricings
    .map((p) => (p.kind === 'range' || p.kind === 'from' ? p.effectiveDate : undefined))
    .filter((d): d is string => Boolean(d))
    .sort();
  return dates.at(-1);
}
