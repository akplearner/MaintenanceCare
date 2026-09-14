import type { Lead } from '@/lib/schemas/lead';

export type LeadPriority = 'priority' | 'standard';

const PRIORITY_CUSTOMER_TYPES = [
  'property-manager',
  'investor',
  'str-operator',
  'realtor',
  'hoa',
  'commercial',
] as const satisfies readonly Lead['customerType'][];

/**
 * A twenty-door property management inquiry must never sit in the same inbox
 * as a request to hang a TV. These two queues are separate by construction.
 */
export function classifyLead(lead: Pick<Lead, 'urgency' | 'propertyCount' | 'customerType'>): LeadPriority {
  if (lead.urgency === 'emergency') return 'priority';
  if (lead.propertyCount > 1) return 'priority';
  return (PRIORITY_CUSTOMER_TYPES as readonly string[]).includes(lead.customerType)
    ? 'priority'
    : 'standard';
}

/** Recipient list for a classified lead. */
export function recipientsFor(priority: LeadPriority): string[] {
  const raw =
    priority === 'priority'
      ? process.env.LEAD_NOTIFY_PRIORITY
      : process.env.LEAD_NOTIFY_STANDARD;

  return (raw ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function subjectFor(lead: Lead, priority: LeadPriority): string {
  const doors =
    lead.propertyCount > 1 ? `${lead.propertyCount} properties` : '1 property';
  if (priority === 'priority') {
    return `[PRIORITY] ${lead.customerType} — ${lead.city} — ${doors}`;
  }
  return `New request — ${lead.customerType} — ${lead.city}`;
}
