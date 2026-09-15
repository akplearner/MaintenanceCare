import type { Plan } from './types';
import { PRICING_EFFECTIVE as E } from './divisions';

/** Exactly one plan is featured — 'standard'. Asserted in content validation. */
export const plans: Plan[] = [
  {
    slug: 'essential',
    name: 'Essential',
    monthlyPrice: 49,
    cadence: 'Quarterly exterior check',
    bestFor: 'A second home or a single rental you rarely see in person.',
    featured: false,
    effectiveDate: E,
    includes: [
      'Quarterly exterior property check',
      'Dated photo record of every visit',
      'Priority scheduling ahead of non-plan customers',
      'Discounted service call rate on any repair work',
      'Maintenance record kept on file for the property',
    ],
  },
  {
    slug: 'standard',
    name: 'Standard',
    monthlyPrice: 89,
    cadence: 'Quarterly full property inspection',
    bestFor: 'The plan most owners and single-property landlords should be on.',
    featured: true,
    effectiveDate: E,
    includes: [
      'Quarterly full property inspection — interior and exterior',
      'HVAC filter replacement labor every visit',
      'Smoke and carbon monoxide detector testing with battery dates logged',
      'Exterior inspection with photographs of anything changing',
      'Minor adjustments handled on the spot at no extra call-out',
      'Written photo report emailed within 24 hours',
      'Priority scheduling and a discounted service call rate',
      'Licensed partner dispatch and coordination when a trade is needed',
    ],
  },
  {
    slug: 'premium',
    name: 'Premium',
    monthlyPrice: 149,
    cadence: 'Monthly exterior, quarterly interior',
    bestFor: 'Absentee owners, short-term rentals, and anything you cannot check yourself.',
    featured: false,
    effectiveDate: E,
    includes: [
      'Monthly exterior checks — twelve documented visits a year',
      'Quarterly full interior inspection',
      'HVAC filter service every visit',
      'Detector testing and battery replacement',
      'Priority response ahead of all other scheduling',
      'Annual gutter cleaning or pressure-washing credit',
      'Full maintenance report with year-over-year condition history',
      'Named point of contact for the property',
    ],
  },
];

export const featuredPlan = plans.find((p) => p.featured);

/**
 * Portfolio pricing is never shown as a public price. BUILD.md 4.2.
 * It renders as an inquiry panel pointing at /for/property-managers.
 */
export const PORTFOLIO_PRICING = {
  heading: 'Managing more than five properties?',
  body: 'Portfolio pricing is based on how many properties you manage, not on a plan tier. Coverage, visit schedule and response times are set against your actual portfolio rather than a tier.',
  cta: 'Portfolio pricing — based on how many properties. Ask us.',
  href: '/for/property-managers',
} as const;

/**
 * The fifteen inspection areas. Specificity is what makes a monthly price feel
 * like a real product rather than a vague retainer.
 */
export const INSPECTION_AREAS: { area: string; detail: string }[] = [
  { area: 'Roofline and drainage', detail: 'Visible damage, sagging gutters, blocked downspouts, standing water at the foundation.' },
  { area: 'Exterior envelope', detail: 'Siding, trim, soffit, fascia and seals — anything letting weather or pests in.' },
  { area: 'Foundation and grading', detail: 'Visible cracking, separation, and whether the ground still slopes away from the house.' },
  { area: 'Windows and doors', detail: 'Operation, locks, weather seals, glazing and screen condition.' },
  { area: 'HVAC filter and airflow', detail: 'Filter changed and size recorded, return air observed, thermostat settings and batteries.' },
  { area: 'Water heater', detail: 'Age and model from the data plate, corrosion, pan and visible connections.' },
  { area: 'Visible plumbing fixtures', detail: 'Observation only — drips, stains and running fixtures logged and passed to a licensed plumber.' },
  { area: 'Electrical panel and outlets', detail: 'Observation only — panel labelling, visible damage, GFCI test at wet locations.' },
  { area: 'Smoke and CO detectors', detail: 'Every unit tested, batteries dated, expired units flagged by room.' },
  { area: 'Ceilings, walls and floors', detail: 'New staining, cracking, soft spots and anything that moved since last visit.' },
  { area: 'Kitchen and bath', detail: 'Cabinet and counter condition, caulk and grout, under-sink inspection for moisture.' },
  { area: 'Appliance operation', detail: 'Each installed appliance run briefly and observed.' },
  { area: 'Attic and crawl access', detail: 'Where safely accessible — insulation, moisture, daylight and pest evidence.' },
  { area: 'Garage and exterior structures', detail: 'Door operation and safety reverse, sheds, fences and gates.' },
  { area: 'Pest and wildlife evidence', detail: 'Observation and documentation, then coordination with a licensed operator.' },
];
