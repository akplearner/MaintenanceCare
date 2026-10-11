import type { Pricing, PriceUnit } from '@/content/types';

type Lang = 'en' | 'es';

const UNIT_LABEL: Record<Lang, Record<PriceUnit, string>> = {
  en: {
    flat: '',
    'per-hour': '/hour',
    'per-month': '/month',
    'per-visit': '/visit',
    'per-property': '/property',
    'per-property-per-month': '/property/month',
  },
  es: {
    flat: '',
    'per-hour': '/hora',
    'per-month': '/mes',
    'per-visit': '/visita',
    'per-property': '/propiedad',
    'per-property-per-month': '/propiedad/mes',
  },
};

const WORD: Record<Lang, { from: string; quoted: string; included: string; includedIn: (p: string) => string }> = {
  en: {
    from: 'From',
    quoted: 'Quoted',
    included: 'Included in plan',
    includedIn: (p) => `Included in the ${p} plan`,
  },
  es: {
    from: 'Desde',
    quoted: 'Se cotiza',
    included: 'Incluido en el plan',
    includedIn: (p) => `Incluido en el plan ${p}`,
  },
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
export function formatPricing(pricing: Pricing, locale: Lang = 'en'): string {
  const unit = UNIT_LABEL[locale];
  const w = WORD[locale];
  switch (pricing.kind) {
    case 'range':
      return `${formatMoney(pricing.low)} – ${formatMoney(pricing.high)}${unit[pricing.unit]}`;
    case 'from':
      return `${w.from} ${formatMoney(pricing.low)}${unit[pricing.unit]}`;
    case 'quote':
      return w.quoted;
    case 'included':
      return w.included;
  }
}

export function pricingNote(pricing: Pricing, locale: Lang = 'en'): string | undefined {
  if (pricing.kind === 'quote') return pricing.note;
  if (pricing.kind === 'included') return WORD[locale].includedIn(pricing.inPlan);
  return pricing.note;
}

/** "Pricing effective September 2026" — rendered beneath every price table. */
export function effectiveLabel(isoDate: string, locale: 'en' | 'es' = 'en'): string {
  const [y, m] = isoDate.split('-').map(Number);
  if (!y || !m) return isoDate;
  const month = new Date(Date.UTC(y, m - 1, 1)).toLocaleString(
    locale === 'es' ? 'es-MX' : 'en-US',
    { month: 'long', timeZone: 'UTC' },
  );
  return locale === 'es' ? `${month} de ${y}` : `${month} ${y}`;
}

/** The most recent effective date across a set of priced items. */
export function latestEffectiveDate(pricings: Pricing[]): string | undefined {
  const dates = pricings
    .map((p) => (p.kind === 'range' || p.kind === 'from' ? p.effectiveDate : undefined))
    .filter((d): d is string => Boolean(d))
    .sort();
  return dates.at(-1);
}
