import { z } from 'zod';
import { AUDIENCE_SLUGS, DIVISION_SLUGS } from '@/content/types';

export const divisionSlugSchema = z.enum(DIVISION_SLUGS);
export const customerTypeSchema = z.enum(AUDIENCE_SLUGS);

const CURRENT_YEAR = new Date().getFullYear();

/**
 * An untouched optional text input posts `''`, which would otherwise land in
 * the database as an empty string rather than NULL. Normalise it away here so
 * the column means what it says.
 */
function optionalText(schema: z.ZodString) {
  return z.preprocess(
    (v) => (typeof v === 'string' && v.trim() === '' ? undefined : v),
    schema.optional(),
  );
}

/**
 * The single source of truth for lead validation. Used unchanged on the
 * client through the React Hook Form resolver and on the server in the API
 * route, so the two can never drift.
 *
 * There is deliberately no field for a gate, lockbox or alarm code, and there
 * never will be. See BUILD.md 9.4.
 */
export const leadSchema = z.object({
  customerType: customerTypeSchema,
  propertyCount: z.coerce.number<number>().int().min(1).max(500).default(1),

  address: z.string().trim().min(5, 'Enter the property address').max(200),
  city: z.string().trim().min(2, 'Enter the city').max(80),
  zip: z.string().trim().regex(/^\d{5}$/, 'Enter a 5-digit ZIP code'),

  /**
   * REQUIRED — no default, no "I don't know" escape. The EPA Renovation,
   * Repair and Painting rule can require Lead-Safe Certified Firm status for
   * qualifying work in pre-1978 housing, and scheduling is gated on it.
   * See BUILD.md 9.3.
   */
  yearBuilt: z.coerce
    .number<number>()
    .int()
    .min(1800, 'Enter a year from 1800 onwards')
    .max(CURRENT_YEAR, `Enter a year no later than ${CURRENT_YEAR}`),

  occupancy: z.enum(['occupied', 'vacant', 'between-tenants', 'unknown']),
  divisions: z.array(divisionSlugSchema).min(1, 'Choose at least one'),
  description: z
    .string()
    .trim()
    .min(10, 'A sentence or two is enough')
    .max(2000, 'Keep it under 2000 characters'),
  urgency: z.enum(['emergency', 'this-week', 'flexible']),

  /**
   * How we arrange entry — NOT the code itself. The server strips anything
   * matching a code-like pattern before storage. See BUILD.md 9.4.
   */
  accessNotes: optionalText(z.string().trim().max(500)),

  photoUrls: z.array(z.url()).max(6, 'Up to six photos').default([]),

  name: z.string().trim().min(2, 'Enter your name').max(120),
  email: z.email('Enter a valid email address'),
  phone: z
    .string()
    .trim()
    .min(10, 'Enter a phone number we can reach you on')
    .max(20)
    .refine((v) => (v.match(/\d/g) ?? []).length >= 10, 'Enter at least 10 digits'),
  contactPreference: z.enum(['phone', 'text', 'email']),

  company: optionalText(z.string().trim().max(120)),

  /** Honeypot — must be empty. */
  website: z.string().max(0).optional(),
  turnstileToken: z.string().min(1, 'Please complete the verification check'),
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;

/** Client-side shape: identical, minus the server-only token requirement. */
export const leadFormSchema = leadSchema.omit({ turnstileToken: true });
export type LeadFormValues = z.input<typeof leadFormSchema>;

export const CUSTOMER_TYPE_LABELS: Record<Lead['customerType'], string> = {
  homeowner: 'Homeowner',
  'property-manager': 'Property manager',
  investor: 'Investor / absentee owner',
  'str-operator': 'Short-term rental operator',
  realtor: 'Realtor',
  hoa: 'HOA',
  commercial: 'Commercial property',
};

export const OCCUPANCY_LABELS: Record<Lead['occupancy'], string> = {
  occupied: 'Occupied',
  vacant: 'Vacant',
  'between-tenants': 'Between tenants',
  unknown: 'Not sure',
};

export const URGENCY_LABELS: Record<Lead['urgency'], string> = {
  emergency: 'Emergency',
  'this-week': 'This week',
  flexible: 'Flexible',
};

export const CONTACT_PREFERENCE_LABELS: Record<Lead['contactPreference'], string> = {
  phone: 'Phone',
  text: 'Text',
  email: 'Email',
};

/** Customer types that should reveal the company field. */
export const TYPES_WITH_COMPANY: Lead['customerType'][] = [
  'property-manager',
  'investor',
  'str-operator',
  'realtor',
  'hoa',
  'commercial',
];

/** Customer types that should reveal the property-count field. */
export const TYPES_WITH_PROPERTY_COUNT: Lead['customerType'][] = [
  'property-manager',
  'investor',
  'str-operator',
  'hoa',
  'commercial',
];
