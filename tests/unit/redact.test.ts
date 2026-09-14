import { describe, expect, it } from 'vitest';
import { redactAccessNotes, REDACTED_PLACEHOLDER } from '@/lib/redact';

describe('redactAccessNotes — strips anything code-like (BUILD.md 9.4)', () => {
  it.each([
    'gate code 4471',
    'Gate Code: 4471',
    'The lockbox is 0810',
    'lockbox 1234, back door',
    'alarm code is 55231 — disarm within 30s',
    'use the keypad, code 9021',
    'PIN 9921 at the gate',
    'combination 24-18-06',
    'Door code 8890 then turn left',
    'access code below: 1029',
    // "lockbox" is a trigger word in its own right — BUILD.md 9.4 lists it.
    // Stripping a harmless mention costs one line; missing a real code costs a door.
    'Use the agent lockbox process — our office will arrange it',
  ])('redacts %j', (input) => {
    const result = redactAccessNotes(input);
    expect(result.redacted).toBe(true);
    expect(result.value).toBeUndefined();
  });

  it('redacts a bare four-digit run even with no code word', () => {
    const result = redactAccessNotes('Just punch 4471 at the box');
    expect(result.redacted).toBe(true);
    expect(result.reason).toBe('digit-run');
  });

  it('reports the code-word reason when there are no digits', () => {
    const result = redactAccessNotes('The gate code is written on the fridge');
    expect(result.redacted).toBe(true);
    expect(result.reason).toBe('code-word');
  });
});

describe('redactAccessNotes — keeps ordinary notes', () => {
  it.each([
    'Call Maria on arrival, she is on site weekdays',
    'Tenant is home after 4pm most days',
    'Knock at the side door, the bell is broken',
    'Contact the on-site manager, ext 214',
    'Property is vacant; the neighbour at 414 has a key',
  ])('keeps %j', (input) => {
    const result = redactAccessNotes(input);
    expect(result.redacted).toBe(false);
    expect(result.value).toBe(input);
  });

  it('treats absent, empty and whitespace-only input as no note', () => {
    for (const input of [undefined, null, '', '   ']) {
      const result = redactAccessNotes(input);
      expect(result.redacted).toBe(false);
      expect(result.value).toBeUndefined();
    }
  });

  it('trims a kept note', () => {
    expect(redactAccessNotes('  Call Maria  ').value).toBe('Call Maria');
  });
});

describe('the redaction placeholder', () => {
  it('explains what happened without repeating the code', () => {
    expect(REDACTED_PLACEHOLDER).toMatch(/removed automatically/i);
    expect(REDACTED_PLACEHOLDER).not.toMatch(/\d{4}/);
  });
});
