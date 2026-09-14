import type { Lead } from '@/lib/schemas/lead';
import type { LeadPriority } from '@/lib/routing';
import {
  CONTACT_PREFERENCE_LABELS,
  CUSTOMER_TYPE_LABELS,
  OCCUPANCY_LABELS,
  URGENCY_LABELS,
} from '@/lib/schemas/lead';
import { getDivision } from '@/content/divisions';
import { REDACTED_PLACEHOLDER } from '@/lib/redact';

/**
 * Notification emails as plain strings.
 *
 * No JSX and no email-component library: every dependency here is a
 * dependency the lead pipeline can fail on, and email HTML is inline-styled
 * table markup that JSX makes no easier to read. It also means these render
 * in a unit test with no DOM.
 */

const INK = '#24262A';
const STEEL = '#5B6670';
const RULE = '#B4BAC0';
const PAPER = '#F2F1ED';
const RAISED = '#FBFAF8';
const FLAG = '#A62F1F';
const HIVIS = '#E5B62B';

export interface LeadEmailProps {
  lead: Lead;
  reference: string;
  priority: LeadPriority;
  accessNotesRedacted: boolean;
  receivedAt: Date;
}

/** Escapes text for HTML. Every interpolation below goes through it. */
export function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label: string, value: string, flag = false): string {
  return `<tr>
  <td style="padding:8px 12px 8px 0;border-bottom:1px solid ${RULE};color:${STEEL};font-size:13px;vertical-align:top;width:170px;white-space:nowrap">${esc(label)}</td>
  <td style="padding:8px 0;border-bottom:1px solid ${RULE};color:${flag ? FLAG : INK};font-size:14px;font-weight:${flag ? 700 : 400}">${esc(value)}</td>
</tr>`;
}

function banner(text: string): string {
  return `<tr><td style="background:${RAISED};border-left:4px solid ${FLAG};padding:12px 16px;color:${FLAG};font-size:14px;font-weight:700">${esc(text)}</td></tr>`;
}

function sectionLabel(text: string): string {
  return `<p style="margin:20px 0 8px;font-size:11px;letter-spacing:0.1em;color:${STEEL}">${esc(text)}</p>`;
}

function block(text: string, accent: string, color = INK): string {
  return `<p style="margin:0;padding:10px 12px;background:${PAPER};border-left:2px solid ${accent};font-size:14px;color:${color};white-space:pre-wrap">${esc(text)}</p>`;
}

function formatStamp(date: Date): string {
  return `${date.toISOString().replace('T', ' ').slice(0, 16)} UTC`;
}

export function renderLeadHtml({
  lead,
  reference,
  priority,
  accessNotesRedacted,
  receivedAt,
}: LeadEmailProps): string {
  const pre1978 = lead.yearBuilt < 1978;
  const divisionNames = lead.divisions.map((d) => getDivision(d)?.name ?? d).join(', ');

  const banners = [
    pre1978
      ? '⚠ PRE-1978 — RRP rule may apply. Confirm certification before scoping paint or demolition.'
      : null,
    lead.urgency === 'emergency'
      ? '⚠ Marked EMERGENCY by the customer. Call before anything else in this inbox.'
      : null,
  ]
    .filter((b): b is string => b !== null)
    .map(banner)
    .join('');

  const photos =
    lead.photoUrls.length > 0
      ? `${sectionLabel('PHOTOS')}<ol style="margin:0;padding-left:20px;font-size:13px">${lead.photoUrls
          .map(
            (url, i) =>
              `<li style="margin-bottom:4px"><a href="${esc(url)}" style="color:${INK}">Photo ${i + 1}</a></li>`,
          )
          .join('')}</ol>`
      : '';

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(reference)}</title></head>
<body style="margin:0;padding:24px;background:${PAPER};font-family:Archivo,Helvetica,Arial,sans-serif;color:${INK}">
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;margin:0 auto;border-collapse:collapse">
<tbody>
<tr><td style="background:${INK};color:${PAPER};padding:16px 20px">
  <p style="margin:0;font-size:12px;letter-spacing:0.1em;color:${HIVIS}">${priority === 'priority' ? 'PRIORITY LEAD' : 'NEW REQUEST'}</p>
  <p style="margin:4px 0 0;font-size:20px;font-weight:700">${esc(CUSTOMER_TYPE_LABELS[lead.customerType])} — ${esc(lead.city)}</p>
  <p style="margin:4px 0 0;font-family:monospace;font-size:13px;color:${RULE}">${esc(reference)} · ${formatStamp(receivedAt)}</p>
</td></tr>
${banners}
<tr><td style="background:${RAISED};padding:16px 20px">
  <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.1em;color:${STEEL}">CONTACT</p>
  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%"><tbody>
    ${row('Name', lead.name)}
    ${lead.company ? row('Company', lead.company) : ''}
    ${row('Phone', lead.phone)}
    ${row('Email', lead.email)}
    ${row('Prefers', CONTACT_PREFERENCE_LABELS[lead.contactPreference])}
    ${row('Properties managed', String(lead.propertyCount))}
  </tbody></table>

  ${sectionLabel('PROPERTY')}
  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%"><tbody>
    ${row('Address', `${lead.address}, ${lead.city} ${lead.zip}`)}
    ${row('Year built', pre1978 ? `${lead.yearBuilt} — PRE-1978` : String(lead.yearBuilt), pre1978)}
    ${row('Occupancy', OCCUPANCY_LABELS[lead.occupancy])}
  </tbody></table>

  ${sectionLabel('REQUEST')}
  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%"><tbody>
    ${row('Divisions', divisionNames)}
    ${row('Urgency', URGENCY_LABELS[lead.urgency], lead.urgency === 'emergency')}
    ${row('Photos attached', String(lead.photoUrls.length))}
  </tbody></table>

  ${sectionLabel('DESCRIPTION')}
  ${block(lead.description, HIVIS)}

  ${sectionLabel('ACCESS ARRANGEMENT')}
  ${block(
    accessNotesRedacted ? REDACTED_PLACEHOLDER : (lead.accessNotes ?? 'Not provided.'),
    accessNotesRedacted ? FLAG : RULE,
    accessNotesRedacted ? FLAG : INK,
  )}
  ${photos}
</td></tr>
<tr><td style="padding:14px 20px;border-top:1px solid ${RULE};font-size:12px;color:${STEEL}">
  Reply within one business day. Stored under reference <strong style="font-family:monospace;color:${INK}">${esc(reference)}</strong>.${
    priority === 'priority'
      ? ' Routed to the priority queue — do not let it sit behind homeowner requests.'
      : ''
  }
</td></tr>
</tbody></table>
</body></html>`;
}

/** Plain-text alternative. Some property managers really do read mail in mutt. */
export function renderLeadText({
  lead,
  reference,
  priority,
  accessNotesRedacted,
  receivedAt,
}: LeadEmailProps): string {
  const pre1978 = lead.yearBuilt < 1978;
  const lines: string[] = [
    `${priority === 'priority' ? 'PRIORITY LEAD' : 'NEW REQUEST'} — ${reference}`,
    `Received ${formatStamp(receivedAt)}`,
    '',
  ];

  if (pre1978) {
    lines.push(
      '!! PRE-1978 — RRP rule may apply. Confirm certification before scoping paint or demolition.',
      '',
    );
  }
  if (lead.urgency === 'emergency') {
    lines.push('!! Marked EMERGENCY by the customer. Call before anything else.', '');
  }

  lines.push(
    'CONTACT',
    `  Name:        ${lead.name}`,
    ...(lead.company ? [`  Company:     ${lead.company}`] : []),
    `  Phone:       ${lead.phone}`,
    `  Email:       ${lead.email}`,
    `  Prefers:     ${CONTACT_PREFERENCE_LABELS[lead.contactPreference]}`,
    `  Properties:  ${lead.propertyCount}`,
    '',
    'PROPERTY',
    `  Address:     ${lead.address}, ${lead.city} ${lead.zip}`,
    `  Year built:  ${lead.yearBuilt}${pre1978 ? '  (PRE-1978)' : ''}`,
    `  Occupancy:   ${OCCUPANCY_LABELS[lead.occupancy]}`,
    '',
    'REQUEST',
    `  Type:        ${CUSTOMER_TYPE_LABELS[lead.customerType]}`,
    `  Divisions:   ${lead.divisions.map((d) => getDivision(d)?.name ?? d).join(', ')}`,
    `  Urgency:     ${URGENCY_LABELS[lead.urgency]}`,
    '',
    '  Description:',
    ...lead.description.split('\n').map((l) => `    ${l}`),
    '',
    '  Access arrangement:',
    `    ${accessNotesRedacted ? REDACTED_PLACEHOLDER : (lead.accessNotes ?? 'Not provided.')}`,
  );

  if (lead.photoUrls.length > 0) {
    lines.push('', '  Photos:', ...lead.photoUrls.map((u, i) => `    ${i + 1}. ${u}`));
  }

  return lines.join('\n');
}

export function renderLeadEmail(props: LeadEmailProps): { html: string; text: string } {
  return { html: renderLeadHtml(props), text: renderLeadText(props) };
}
