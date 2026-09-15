/**
 * Content data model.
 *
 * Rule: no price, service name, or service description is hardcoded in a page
 * component. All of it lives here as typed data, so a price change is a
 * one-file edit rather than a twelve-page find-and-replace.
 */

export type Phase = 1 | 2 | 3 | 4 | 5;

export const DIVISION_SLUGS = [
  'property-care',
  'field-inspections',
  'turn-services',
  'home-repair',
  'exterior-care',
  'emergency-response',
  'asset-care',
  'trade-coordination',
] as const;

export type DivisionSlug = (typeof DIVISION_SLUGS)[number];

export const AUDIENCE_SLUGS = [
  'homeowner',
  'property-manager',
  'investor',
  'str-operator',
  'realtor',
  'hoa',
  'commercial',
] as const;

export type AudienceSlug = (typeof AUDIENCE_SLUGS)[number];

export type PlanSlug = 'essential' | 'standard' | 'premium';

/** Opaque-ish service identifier. Kept as a template literal for readability. */
export type ServiceId = string;

export type PriceUnit =
  | 'flat'
  | 'per-hour'
  | 'per-month'
  | 'per-visit'
  | 'per-property'
  | 'per-property-per-month';

export type Pricing =
  | { kind: 'range'; low: number; high: number; unit: PriceUnit; effectiveDate: string; note?: string }
  | { kind: 'from'; low: number; unit: PriceUnit; effectiveDate: string; note?: string }
  | { kind: 'quote'; note: string }
  | { kind: 'included'; inPlan: PlanSlug };

export interface Service {
  id: ServiceId;
  division: DivisionSlug;
  name: string;
  description: string;
  phase: Phase;
  pricing: Pricing;
  /** Rendered as "What's included" bullets. */
  includes?: string[];
  /** Set when the work is routed to a licensed partner. Forces disclosure copy. */
  licensedTradeRequired?: boolean;
  /** Set when pre-1978 construction gates the work. See BUILD.md 9.3. */
  leadPaintGated?: boolean;
  taxable: boolean | 'verify';
  /** Surfaces the item in the flat-rate menu on /services/home-repair. */
  flatRateMenu?: boolean;
}

/**
 * A photo reference. `alt` is required and the type forbids the empty string,
 * so a `PhotoPlate` without a real alternative text will not compile.
 */
export interface Photo {
  src: string;
  alt: NonEmptyString;
  /** Mono caption bar. Real capture date, never invented for decoration. */
  timestamp?: string;
  width?: number;
  height?: number;
  /** True when no real job photograph exists yet — renders a neutral plate. */
  placeholder?: boolean;
}

/** Compile-time guard: `'' as NonEmptyString` is a type error. */
export type NonEmptyString = string & { readonly __nonEmpty: unique symbol };

export function alt(value: string): NonEmptyString {
  if (value.trim().length === 0) {
    throw new Error('Photo alt text may not be empty.');
  }
  return value as NonEmptyString;
}

export interface Division {
  slug: DivisionSlug;
  name: string;
  /** One sentence, in the customer's words, about what they are buying. */
  promise: string;
  /** Two or three sentences for the division page lead. */
  summary: string;
  phase: Phase;
  /** false => render a short placeholder page, exclude from primary nav */
  fullyLaunched: boolean;
  audiences: AudienceSlug[];
  services: ServiceId[];
  /** Required. Real photo from a real job. Never stock. */
  image: Photo;
  /** Inspection-sheet bullets for the "what's included" checklist. */
  included: string[];
}

export interface Plan {
  slug: PlanSlug;
  name: string;
  monthlyPrice: number;
  cadence: string;
  includes: string[];
  bestFor: string;
  /** exactly one true — 'standard' */
  featured: boolean;
  effectiveDate: string;
}

export interface Audience {
  slug: AudienceSlug;
  label: string;
  /** Short plural noun used in tag chips. */
  short: string;
}

export interface ServiceArea {
  slug: string;
  city: string;
  county: string;
  state: 'TX';
  /** Honest drive time from the Elgin base. */
  driveTimeMinutes: number;
  zips: string[];
  /** At least one genuinely local paragraph. No thin duplicate pages. */
  local: string;
  /** Divisions actively served in this city. */
  divisions: DivisionSlug[];
  /** Surcharge/limits disclosure where honest to state one. */
  note?: string;
  lat: number;
  lng: number;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  /** Where the FAQ renders. A question can appear in more than one place. */
  contexts: FaqContext[];
}

export type FaqContext =
  | 'home'
  | 'plans'
  | 'property-managers'
  | 'investors'
  | 'str'
  | 'service-area'
  | 'request';

/**
 * A commitment we can actually substantiate if a customer asks us to.
 *
 * This is deliberately not a "badge" type. Nothing here is a certification we
 * award ourselves, and nothing here may be a rating or a review — Section 8
 * bans that structured data until there are genuine reviews. If a claim cannot
 * be evidenced on request, it does not belong in this array.
 */
export interface Credential {
  id: string;
  /** Short enough to read in a badge row. */
  label: string;
  /** One sentence saying what the claim actually means in practice. */
  detail: string;
  /** Lucide icon name, resolved by the rendering component. */
  icon: 'shield' | 'user-check' | 'file-text' | 'badge-check';
}
