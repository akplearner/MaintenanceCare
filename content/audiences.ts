import type { Audience, AudienceSlug } from './types';

export const audiences: Audience[] = [
  { slug: 'homeowner', label: 'Homeowners', short: 'Homeowners' },
  { slug: 'property-manager', label: 'Property managers', short: 'Property managers' },
  { slug: 'investor', label: 'Investors and absentee owners', short: 'Investors' },
  { slug: 'str-operator', label: 'Short-term rental operators', short: 'Short-term rentals' },
  { slug: 'realtor', label: 'Realtors', short: 'Realtors' },
  { slug: 'hoa', label: 'HOAs', short: 'HOAs' },
  { slug: 'commercial', label: 'Commercial property', short: 'Commercial' },
];

const bySlug = new Map(audiences.map((a) => [a.slug, a]));

export function audienceLabel(slug: AudienceSlug): string {
  return bySlug.get(slug)?.short ?? slug;
}

/** High-value audiences. One relationship brings many properties. */
export const PRIORITY_AUDIENCES: AudienceSlug[] = [
  'property-manager',
  'investor',
  'str-operator',
  'realtor',
  'hoa',
  'commercial',
];
