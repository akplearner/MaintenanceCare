import { Resend } from 'resend';
import type { Lead } from '@/lib/schemas/lead';
import { recipientsFor, subjectFor, type LeadPriority } from '@/lib/routing';
import { renderLeadEmail } from './templates';

let client: Resend | null = null;

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  client ??= new Resend(key);
  return client;
}

export interface SendResult {
  sent: boolean;
  error?: string;
}

/**
 * Notification send. Never throws: the lead is already persisted by the time
 * this runs, and a mail provider outage must not turn a saved lead into a
 * 500 for the customer. BUILD.md 7.3 steps 8–9.
 */
export async function sendLeadNotification(args: {
  lead: Lead;
  reference: string;
  priority: LeadPriority;
  accessNotesRedacted: boolean;
  receivedAt: Date;
}): Promise<SendResult> {
  const { lead, reference, priority } = args;

  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL;
  const to = recipientsFor(priority);

  if (!resend) return { sent: false, error: 'RESEND_API_KEY is not configured' };
  if (!from) return { sent: false, error: 'RESEND_FROM_EMAIL is not configured' };
  if (to.length === 0) {
    return {
      sent: false,
      error: `No recipients configured for the ${priority} queue (LEAD_NOTIFY_${priority.toUpperCase()})`,
    };
  }

  try {
    const { html, text } = renderLeadEmail(args);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: lead.email,
      subject: `${subjectFor(lead, priority)} — ${reference}`,
      html,
      text,
      headers: { 'X-Lead-Reference': reference, 'X-Lead-Priority': priority },
    });

    if (error) return { sent: false, error: error.message };
    return { sent: true };
  } catch (err) {
    return { sent: false, error: err instanceof Error ? err.message : 'Unknown send failure' };
  }
}
