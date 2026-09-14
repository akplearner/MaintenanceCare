import { describe, expect, it } from 'vitest';
import { generateReference, REFERENCE_PATTERN } from '@/lib/reference';

describe('generateReference', () => {
  it('matches the documented pattern', () => {
    expect(generateReference(new Date('2026-09-14T12:00:00Z'))).toMatch(REFERENCE_PATTERN);
  });

  it('encodes the two-digit year and day of year', () => {
    expect(generateReference(new Date('2026-09-14T12:00:00Z'))).toMatch(/^MC-26257-/);
    expect(generateReference(new Date('2026-01-01T12:00:00Z'))).toMatch(/^MC-26001-/);
    expect(generateReference(new Date('2026-12-31T12:00:00Z'))).toMatch(/^MC-26365-/);
  });

  it('avoids characters that are misread over the phone', () => {
    for (let i = 0; i < 200; i += 1) {
      const suffix = generateReference().split('-')[2]!;
      expect(suffix).not.toMatch(/[ILOU]/);
    }
  });

  it('does not collide across a realistic day of submissions', () => {
    const seen = new Set(Array.from({ length: 2000 }, () => generateReference()));
    expect(seen.size).toBeGreaterThan(1990);
  });
});

describe('REFERENCE_PATTERN', () => {
  it('rejects anything that is not one of our references', () => {
    for (const bad of ['', 'MC-1-AB', 'XX-26257-K3QB', 'MC-26257-K3Q', '<script>', 'MC-26257-K3QI']) {
      expect(REFERENCE_PATTERN.test(bad)).toBe(false);
    }
  });
});
