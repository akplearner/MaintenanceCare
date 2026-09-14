import { describe, expect, it } from 'vitest';
import { esc, renderLeadHtml, renderLeadText } from '@/lib/email/templates';
import type { Lead } from '@/lib/schemas/lead';

const receivedAt = new Date('2026-09-14T19:22:00Z');

function lead(overrides: Partial<Lead> = {}): Lead {
  return {
    customerType: 'homeowner',
    propertyCount: 1,
    address: '412 Oak Grove Dr',
    city: 'Elgin',
    zip: '78621',
    yearBuilt: 1996,
    occupancy: 'occupied',
    divisions: ['property-care'],
    description: 'Hose bib dripping on the north side.',
    urgency: 'flexible',
    photoUrls: [],
    name: 'Dana Ruiz',
    email: 'dana@example.com',
    phone: '512-555-0147',
    contactPreference: 'phone',
    turnstileToken: 'token',
    ...overrides,
  } as Lead;
}

const props = {
  reference: 'MC-26257-K3QB',
  priority: 'standard' as const,
  accessNotesRedacted: false,
  receivedAt,
};

describe('the pre-1978 RRP flag (BUILD.md 9.3)', () => {
  it('shows the warning in HTML when the property predates 1978', () => {
    const html = renderLeadHtml({ ...props, lead: lead({ yearBuilt: 1952 }) });
    expect(html).toContain('PRE-1978');
    expect(html).toContain('RRP rule may apply');
    expect(html).toContain('Confirm certification before scoping paint or demolition');
  });

  it('shows it in the plain-text alternative too', () => {
    const text = renderLeadText({ ...props, lead: lead({ yearBuilt: 1977 }) });
    expect(text).toContain('PRE-1978');
    expect(text).toContain('RRP rule may apply');
  });

  it('omits the warning for 1978 and later', () => {
    const html = renderLeadHtml({ ...props, lead: lead({ yearBuilt: 1978 }) });
    expect(html).not.toContain('RRP rule may apply');
  });
});

describe('redacted access notes', () => {
  it('shows the placeholder rather than the note', () => {
    const html = renderLeadHtml({
      ...props,
      lead: lead({ accessNotes: 'gate code 4471' }),
      accessNotesRedacted: true,
    });
    expect(html).toContain('removed automatically');
    expect(html).not.toContain('4471');
  });

  it('shows the note when it was kept', () => {
    const html = renderLeadHtml({
      ...props,
      lead: lead({ accessNotes: 'Call Maria on arrival' }),
    });
    expect(html).toContain('Call Maria on arrival');
  });

  it('says so plainly when no note was given', () => {
    expect(renderLeadText({ ...props, lead: lead() })).toContain('Not provided.');
  });
});

describe('priority marking', () => {
  it('marks a priority lead in the header', () => {
    const html = renderLeadHtml({ ...props, priority: 'priority', lead: lead() });
    expect(html).toContain('PRIORITY LEAD');
    expect(html).toContain('do not let it sit behind homeowner requests');
  });

  it('does not mark a standard lead', () => {
    const html = renderLeadHtml({ ...props, lead: lead() });
    expect(html).toContain('NEW REQUEST');
    expect(html).not.toContain('PRIORITY LEAD');
  });

  it('flags an emergency regardless of customer type', () => {
    const html = renderLeadHtml({ ...props, lead: lead({ urgency: 'emergency' }) });
    expect(html).toContain('Marked EMERGENCY by the customer');
  });
});

describe('escaping', () => {
  it('escapes HTML metacharacters', () => {
    expect(esc('<script>alert("x")</script>')).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;',
    );
  });

  it('does not let a description break out of the document', () => {
    const html = renderLeadHtml({
      ...props,
      lead: lead({ description: '</td></tr></table><script>alert(1)</script>' }),
    });
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('escapes a name containing an ampersand', () => {
    const html = renderLeadHtml({ ...props, lead: lead({ name: 'Ruiz & Sons' }) });
    expect(html).toContain('Ruiz &amp; Sons');
  });
});

describe('content completeness', () => {
  it('carries every contact detail an operator needs to respond', () => {
    const html = renderLeadHtml({
      ...props,
      lead: lead({ company: 'Ruiz Property Group', propertyCount: 20 }),
    });
    for (const expected of [
      'Dana Ruiz',
      'Ruiz Property Group',
      '512-555-0147',
      'dana@example.com',
      '412 Oak Grove Dr, Elgin 78621',
      'Property Care',
      'MC-26257-K3QB',
    ]) {
      expect(html).toContain(expected);
    }
  });

  it('lists attached photos', () => {
    const html = renderLeadHtml({
      ...props,
      lead: lead({ photoUrls: ['https://blob.example.com/a.jpg', 'https://blob.example.com/b.jpg'] }),
    });
    expect(html).toContain('https://blob.example.com/a.jpg');
    expect(html).toContain('Photo 2');
  });
});
