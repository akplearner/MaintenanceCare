import { z } from 'zod';
import { AUDIENCE_SLUGS, DIVISION_SLUGS } from './types';
import { divisions } from './divisions';
import { services } from './services';
import { plans } from './plans';
import { areas } from './areas';
import { faqs } from './faqs';
import { CREDENTIALS } from './company';

/**
 * Content is validated at module load, which means `next build` fails on a
 * malformed content object rather than shipping a broken page.
 */

const effectiveDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'effectiveDate must be ISO yyyy-mm-dd');

const priceUnit = z.enum([
  'flat',
  'per-hour',
  'per-month',
  'per-visit',
  'per-property',
  'per-property-per-month',
]);

const pricingSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('range'),
    low: z.number().positive(),
    high: z.number().positive(),
    unit: priceUnit,
    effectiveDate,
    note: z.string().optional(),
  }),
  z.object({
    kind: z.literal('from'),
    low: z.number().positive(),
    unit: priceUnit,
    effectiveDate,
    note: z.string().optional(),
  }),
  z.object({ kind: z.literal('quote'), note: z.string().min(5) }),
  z.object({ kind: z.literal('included'), inPlan: z.enum(['essential', 'standard', 'premium']) }),
]);

const photoSchema = z.object({
  src: z.string().startsWith('/'),
  alt: z.string().min(8, 'alt text must describe the photograph'),
  timestamp: z.string().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  placeholder: z.boolean().optional(),
});

const serviceSchema = z
  .object({
    id: z.string().min(2),
    division: z.enum(DIVISION_SLUGS),
    name: z.string().min(3),
    description: z.string().min(20),
    phase: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
    pricing: pricingSchema,
    includes: z.array(z.string().min(5)).optional(),
    licensedTradeRequired: z.boolean().optional(),
    leadPaintGated: z.boolean().optional(),
    taxable: z.union([z.boolean(), z.literal('verify')]),
    flatRateMenu: z.boolean().optional(),
  })
  .refine((s) => s.pricing.kind !== 'range' || s.pricing.high > s.pricing.low, {
    message: 'range pricing must have high greater than low',
  });

const divisionSchema = z.object({
  slug: z.enum(DIVISION_SLUGS),
  name: z.string().min(3),
  promise: z.string().min(20),
  summary: z.string().min(40),
  phase: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  fullyLaunched: z.boolean(),
  audiences: z.array(z.enum(AUDIENCE_SLUGS)),
  services: z.array(z.string()),
  image: photoSchema,
  included: z.array(z.string().min(5)),
});

const planSchema = z.object({
  slug: z.enum(['essential', 'standard', 'premium']),
  name: z.string().min(3),
  monthlyPrice: z.number().int().positive(),
  cadence: z.string().min(5),
  includes: z.array(z.string().min(5)).min(3),
  bestFor: z.string().min(10),
  featured: z.boolean(),
  effectiveDate,
});

const areaSchema = z.object({
  slug: z.string().regex(/^[a-z-]+$/),
  city: z.string().min(2),
  county: z.string().min(4),
  state: z.literal('TX'),
  driveTimeMinutes: z.number().int().min(0).max(120),
  zips: z.array(z.string().regex(/^\d{5}$/)).min(1),
  divisions: z.array(z.enum(DIVISION_SLUGS)).min(1),
  // "Do not generate thin duplicate pages" — enforced with a real floor.
  local: z.string().min(400, 'each city page needs a genuinely local paragraph'),
  note: z.string().optional(),
  lat: z.number(),
  lng: z.number(),
});

const faqSchema = z.object({
  id: z.string().min(2),
  question: z.string().min(10).endsWith('?'),
  answer: z.string().min(40),
  contexts: z
    .array(z.enum(['home', 'plans', 'property-managers', 'investors', 'str', 'service-area', 'request']))
    .min(1),
});

const credentialSchema = z.object({
  id: z.string().min(2),
  label: z.string().min(3).max(40),
  // Long enough to say something concrete, short enough to stay a badge.
  detail: z.string().min(20).max(160),
  icon: z.enum(['shield', 'user-check', 'file-text', 'badge-check']),
});

function assertValid(): void {
  z.array(divisionSchema).parse(divisions);
  z.array(serviceSchema).parse(services);
  z.array(planSchema).parse(plans);
  z.array(areaSchema).parse(areas);
  z.array(faqSchema).parse(faqs);
  z.array(credentialSchema).parse(CREDENTIALS);

  // Referential integrity: no dangling service ids on a division.
  const serviceIds = new Set(services.map((s) => s.id));
  for (const d of divisions) {
    for (const id of d.services) {
      if (!serviceIds.has(id)) {
        throw new Error(`Division "${d.slug}" references unknown service id "${id}".`);
      }
    }
  }

  // Every service belongs to a division that lists it.
  for (const s of services) {
    const d = divisions.find((x) => x.slug === s.division);
    if (!d) throw new Error(`Service "${s.id}" has unknown division "${s.division}".`);
    if (!d.services.includes(s.id)) {
      throw new Error(`Service "${s.id}" is not listed on division "${d.slug}".`);
    }
  }

  // A launched division must have content behind it.
  for (const d of divisions.filter((x) => x.fullyLaunched)) {
    if (d.services.length === 0) throw new Error(`Launched division "${d.slug}" has no services.`);
    if (d.included.length < 4) throw new Error(`Launched division "${d.slug}" needs an included list.`);
  }

  // A placeholder division must not pretend to be running.
  for (const d of divisions.filter((x) => !x.fullyLaunched)) {
    if (d.services.length > 0) {
      throw new Error(`Division "${d.slug}" is not launched but lists priced services.`);
    }
  }

  // Exactly one featured plan.
  const featured = plans.filter((p) => p.featured);
  if (featured.length !== 1 || featured[0]?.slug !== 'standard') {
    throw new Error('Exactly one plan must be featured, and it must be "standard".');
  }

  // Unique ids.
  const dupService = findDuplicate(services.map((s) => s.id));
  if (dupService) throw new Error(`Duplicate service id: ${dupService}`);
  const dupFaq = findDuplicate(faqs.map((f) => f.id));
  if (dupFaq) throw new Error(`Duplicate faq id: ${dupFaq}`);
  const dupArea = findDuplicate(areas.map((a) => a.slug));
  if (dupArea) throw new Error(`Duplicate service area slug: ${dupArea}`);
}

function findDuplicate(values: string[]): string | undefined {
  const seen = new Set<string>();
  for (const v of values) {
    if (seen.has(v)) return v;
    seen.add(v);
  }
  return undefined;
}

assertValid();

export const contentIsValid = true;
