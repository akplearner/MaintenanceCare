import { describe, expect, it } from 'vitest';
import { leadSchema } from '@/lib/schemas/lead';

function validLead(overrides: Record<string, unknown> = {}) {
  return {
    customerType: 'homeowner',
    propertyCount: 1,
    address: '412 Oak Grove Dr',
    city: 'Elgin',
    zip: '78621',
    yearBuilt: 1996,
    occupancy: 'occupied',
    divisions: ['property-care'],
    description: 'The hose bib on the north side has been dripping for a couple of weeks.',
    urgency: 'flexible',
    photoUrls: [],
    name: 'Dana Ruiz',
    email: 'dana@example.com',
    phone: '512-555-0147',
    contactPreference: 'phone',
    turnstileToken: 'token',
    ...overrides,
  };
}

/** A valid lead with one key removed, for "is this actually required?" tests. */
function without(key: string): Record<string, unknown> {
  const lead = validLead();
  delete lead[key as keyof typeof lead];
  return lead;
}

describe('leadSchema — the happy path', () => {
  it('accepts a complete homeowner submission', () => {
    const result = leadSchema.safeParse(validLead());
    expect(result.success).toBe(true);
  });

  it('coerces numeric strings from the form', () => {
    const result = leadSchema.safeParse(validLead({ yearBuilt: '1996', propertyCount: '4' }));
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.yearBuilt).toBe(1996);
      expect(result.data.propertyCount).toBe(4);
    }
  });

  it('defaults photoUrls to an empty array', () => {
    const result = leadSchema.safeParse(without('photoUrls'));
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.photoUrls).toEqual([]);
  });
});

describe('leadSchema — yearBuilt is mandatory (BUILD.md 9.3)', () => {
  it('rejects a missing yearBuilt', () => {
    expect(leadSchema.safeParse(without('yearBuilt')).success).toBe(false);
  });

  it('rejects an empty yearBuilt', () => {
    expect(leadSchema.safeParse(validLead({ yearBuilt: '' })).success).toBe(false);
  });

  it('rejects null as an "I do not know" escape', () => {
    expect(leadSchema.safeParse(validLead({ yearBuilt: null })).success).toBe(false);
  });

  it('rejects a year in the future', () => {
    expect(
      leadSchema.safeParse(validLead({ yearBuilt: new Date().getFullYear() + 1 })).success,
    ).toBe(false);
  });

  it('accepts a pre-1978 year — it is gated downstream, not rejected', () => {
    const result = leadSchema.safeParse(validLead({ yearBuilt: 1952 }));
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.yearBuilt).toBeLessThan(1978);
  });
});

describe('leadSchema — photos', () => {
  const url = (n: number) => `https://blob.example.com/photo-${n}.jpg`;

  it('accepts six photos', () => {
    const urls = Array.from({ length: 6 }, (_, i) => url(i));
    expect(leadSchema.safeParse(validLead({ photoUrls: urls })).success).toBe(true);
  });

  it('rejects more than six photos', () => {
    const urls = Array.from({ length: 7 }, (_, i) => url(i));
    expect(leadSchema.safeParse(validLead({ photoUrls: urls })).success).toBe(false);
  });

  it('rejects a non-URL photo entry', () => {
    expect(leadSchema.safeParse(validLead({ photoUrls: ['not-a-url'] })).success).toBe(false);
  });
});

describe('leadSchema — honeypot', () => {
  it('accepts an absent honeypot', () => {
    expect(leadSchema.safeParse(validLead()).success).toBe(true);
  });

  it('accepts an empty honeypot', () => {
    expect(leadSchema.safeParse(validLead({ website: '' })).success).toBe(true);
  });

  it('rejects a non-empty honeypot', () => {
    expect(leadSchema.safeParse(validLead({ website: 'http://spam.example' })).success).toBe(false);
  });
});

describe('leadSchema — the rest of the required surface', () => {
  it.each([
    ['divisions', []],
    ['description', 'too short'],
    ['zip', '7862'],
    ['zip', 'ABCDE'],
    ['email', 'not-an-email'],
    ['phone', '555'],
    ['name', 'A'],
    ['address', '12'],
    ['turnstileToken', ''],
    ['customerType', 'landlord'],
    ['occupancy', 'maybe'],
    ['urgency', 'whenever'],
    ['contactPreference', 'carrier-pigeon'],
    ['propertyCount', 0],
    ['propertyCount', 501],
  ])('rejects %s = %j', (field, value) => {
    expect(leadSchema.safeParse(validLead({ [field]: value })).success).toBe(false);
  });

  it('rejects an unknown division slug', () => {
    expect(leadSchema.safeParse(validLead({ divisions: ['roofing'] })).success).toBe(false);
  });

  it('rejects a description over 2000 characters', () => {
    expect(leadSchema.safeParse(validLead({ description: 'x'.repeat(2001) })).success).toBe(false);
  });
});

describe('leadSchema — no access-code field exists (BUILD.md 9.4)', () => {
  it('has no key matching code, lockbox, alarm or pin', () => {
    const offenders = Object.keys(leadSchema.shape).filter((k) => /code|lockbox|alarm|pin/i.test(k));
    expect(offenders).toEqual([]);
  });

  it('caps accessNotes at 500 characters', () => {
    expect(leadSchema.safeParse(validLead({ accessNotes: 'x'.repeat(501) })).success).toBe(false);
  });
});

describe('leadSchema — empty optional text becomes absent, not an empty string', () => {
  it('drops an untouched company field', () => {
    const result = leadSchema.safeParse(validLead({ company: '' }));
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.company).toBeUndefined();
  });

  it('drops a whitespace-only accessNotes', () => {
    const result = leadSchema.safeParse(validLead({ accessNotes: '   ' }));
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.accessNotes).toBeUndefined();
  });

  it('keeps a real company name', () => {
    const result = leadSchema.safeParse(validLead({ company: 'Ruiz Property Group' }));
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.company).toBe('Ruiz Property Group');
  });

  it('still rejects an over-long company name', () => {
    expect(leadSchema.safeParse(validLead({ company: 'x'.repeat(121) })).success).toBe(false);
  });
});
