import { NextResponse } from 'next/server';
import { z } from 'zod';

import { leadSchema } from '@/lib/schemas/lead';
import { classifyLead } from '@/lib/routing';
import { redactAccessNotes, REDACTED_PLACEHOLDER } from '@/lib/redact';
import { generateReference } from '@/lib/reference';
import { checkRateLimit, clientIp } from '@/lib/rate-limit';
import { verifyTurnstile } from '@/lib/turnstile';
import { getDb, isDatabaseConfigured, schema } from '@/lib/db';
import { sendLeadNotification } from '@/lib/email/send';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Shape returned to a bot so it learns nothing. */
function successShape(reference: string) {
  return NextResponse.json({ ok: true, reference }, { status: 200 });
}

export async function POST(request: Request) {
  const receivedAt = new Date();
  const ip = clientIp(request.headers);

  // 1. Rate limit by IP.
  const rate = await checkRateLimit(ip);
  if (!rate.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Too many requests from this network. Please call us instead.',
      },
      { status: 429, headers: { 'Retry-After': '3600' } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Malformed request.' }, { status: 400 });
  }

  // 2. Honeypot. Return a success shape and discard — never tell a bot it failed.
  if (
    typeof payload === 'object' &&
    payload !== null &&
    typeof (payload as { website?: unknown }).website === 'string' &&
    (payload as { website: string }).website.length > 0
  ) {
    return successShape(generateReference(receivedAt));
  }

  // 3. Verify Turnstile server-side, before any parsing work.
  const token =
    typeof payload === 'object' && payload !== null
      ? String((payload as { turnstileToken?: unknown }).turnstileToken ?? '')
      : '';
  const turnstile = await verifyTurnstile(token, ip);
  if (!turnstile.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Verification failed. Reload the page and try again, or call us.',
        fieldErrors: { turnstileToken: ['Verification failed'] },
      },
      { status: 400 },
    );
  }

  // 4. Parse.
  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error);
    return NextResponse.json(
      { ok: false, error: 'Some details need fixing.', fieldErrors: flat.fieldErrors },
      { status: 400 },
    );
  }
  const lead = parsed.data;

  // 5. Strip anything that looks like an access code. BUILD.md 9.4.
  const access = redactAccessNotes(lead.accessNotes);
  const storedAccessNotes = access.redacted ? REDACTED_PLACEHOLDER : access.value;
  lead.accessNotes = access.redacted ? undefined : access.value;

  const reference = generateReference(receivedAt);
  const priority = classifyLead(lead);

  // 6. Persist BEFORE the email. A lead that fails to email but is stored is
  //    recoverable; the reverse is not.
  let persisted = false;
  let persistError: string | undefined;

  if (isDatabaseConfigured()) {
    try {
      await getDb()
        .insert(schema.leads)
        .values({
          id: reference,
          createdAt: receivedAt,
          customerType: lead.customerType,
          propertyCount: lead.propertyCount,
          company: lead.company ?? null,
          address: lead.address,
          city: lead.city,
          zip: lead.zip,
          yearBuilt: lead.yearBuilt,
          pre1978: lead.yearBuilt < 1978,
          occupancy: lead.occupancy,
          divisions: lead.divisions,
          description: lead.description,
          urgency: lead.urgency,
          accessNotes: storedAccessNotes ?? null,
          accessNotesRedacted: access.redacted,
          photoUrls: lead.photoUrls,
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          contactPreference: lead.contactPreference,
          priority,
          source: request.headers.get('x-lead-source')?.slice(0, 120) ?? null,
          referrer: request.headers.get('referer')?.slice(0, 500) ?? null,
          userAgent: request.headers.get('user-agent')?.slice(0, 500) ?? null,
        });
      persisted = true;
    } catch (err) {
      persistError = err instanceof Error ? err.message : 'Unknown database error';
      console.error('[lead] persist failed', { reference, error: persistError });
    }
  } else {
    persistError = 'DATABASE_URL is not configured';
    console.error('[lead] persist skipped — DATABASE_URL is not configured', { reference });
  }

  // 7 & 8. Classify, then notify the matching queue.
  const send = await sendLeadNotification({
    lead,
    reference,
    priority,
    accessNotesRedacted: access.redacted,
    receivedAt,
  });

  if (!send.sent) {
    // 9. Log and keep going — the lead is already saved.
    console.error('[lead] notification failed', { reference, error: send.error });
  }

  if (persisted) {
    try {
      const { eq } = await import('drizzle-orm');
      await getDb()
        .update(schema.leads)
        .set(
          send.sent
            ? { notifiedAt: new Date(), notifyError: null }
            : { notifyError: send.error ?? 'unknown' },
        )
        .where(eq(schema.leads.id, reference));
    } catch (err) {
      console.error('[lead] notify-status update failed', {
        reference,
        error: err instanceof Error ? err.message : 'unknown',
      });
    }
  }

  // If neither store nor send worked, the lead is genuinely lost — say so
  // rather than showing a thank-you page for a request nobody will ever see.
  if (!persisted && !send.sent) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'We could not record your request. Please call us so it does not get lost — we would rather take it by phone than lose it.',
      },
      { status: 503 },
    );
  }

  // 10. Short human-readable reference for the thanks page.
  return NextResponse.json(
    { ok: true, reference, priority, accessNotesRedacted: access.redacted },
    { status: 200 },
  );
}
