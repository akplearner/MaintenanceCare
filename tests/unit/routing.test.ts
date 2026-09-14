import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { classifyLead, recipientsFor, subjectFor } from '@/lib/routing';
import type { Lead } from '@/lib/schemas/lead';

const base: Pick<Lead, 'urgency' | 'propertyCount' | 'customerType'> = {
  urgency: 'flexible',
  propertyCount: 1,
  customerType: 'homeowner',
};

describe('classifyLead — all seven customer types', () => {
  it('routes a single flexible homeowner to the standard queue', () => {
    expect(classifyLead(base)).toBe('standard');
  });

  it.each([
    ['property-manager'],
    ['investor'],
    ['str-operator'],
    ['realtor'],
    ['hoa'],
    ['commercial'],
  ] as const)('routes %s to the priority queue even with one property', (customerType) => {
    expect(classifyLead({ ...base, customerType })).toBe('priority');
  });
});

describe('classifyLead — overrides', () => {
  it('escalates a homeowner emergency to priority', () => {
    expect(classifyLead({ ...base, urgency: 'emergency' })).toBe('priority');
  });

  it('escalates a homeowner with more than one property to priority', () => {
    expect(classifyLead({ ...base, propertyCount: 2 })).toBe('priority');
  });

  it('does not escalate a homeowner with exactly one property', () => {
    expect(classifyLead({ ...base, propertyCount: 1, urgency: 'this-week' })).toBe('standard');
  });

  it('keeps a priority type priority regardless of urgency', () => {
    expect(
      classifyLead({ customerType: 'hoa', propertyCount: 1, urgency: 'flexible' }),
    ).toBe('priority');
  });
});

describe('recipientsFor — the two queues never share an inbox', () => {
  const saved = { ...process.env };

  beforeEach(() => {
    process.env.LEAD_NOTIFY_PRIORITY = 'owner@example.com, sales@example.com';
    process.env.LEAD_NOTIFY_STANDARD = 'office@example.com';
  });

  afterEach(() => {
    process.env = { ...saved };
  });

  it('splits and trims the priority list', () => {
    expect(recipientsFor('priority')).toEqual(['owner@example.com', 'sales@example.com']);
  });

  it('returns the standard list separately', () => {
    expect(recipientsFor('standard')).toEqual(['office@example.com']);
  });

  it('shares no recipient between the queues in this configuration', () => {
    const overlap = recipientsFor('priority').filter((r) => recipientsFor('standard').includes(r));
    expect(overlap).toEqual([]);
  });

  it('returns an empty list rather than throwing when unset', () => {
    delete process.env.LEAD_NOTIFY_PRIORITY;
    expect(recipientsFor('priority')).toEqual([]);
  });
});

describe('subjectFor', () => {
  const lead = {
    ...base,
    customerType: 'property-manager',
    propertyCount: 20,
    city: 'Manor',
  } as Lead;

  it('marks a priority subject and names the door count', () => {
    expect(subjectFor(lead, 'priority')).toBe('[PRIORITY] property-manager — Manor — 20 properties');
  });

  it('leaves a standard subject unmarked', () => {
    expect(subjectFor({ ...lead, customerType: 'homeowner' } as Lead, 'standard')).toBe(
      'New request — homeowner — Manor',
    );
  });
});
