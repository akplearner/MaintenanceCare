const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export interface TurnstileResult {
  ok: boolean;
  reason?: string;
}

/**
 * Server-side Turnstile verification. Fails closed when a secret is
 * configured, and open only when Turnstile is deliberately not configured —
 * so a preview deployment without secrets still accepts a test submission.
 */
export async function verifyTurnstile(
  token: string,
  remoteIp?: string,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return { ok: true, reason: 'turnstile-not-configured' };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set('remoteip', remoteIp);

  try {
    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      body,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return { ok: false, reason: `verify-http-${res.status}` };

    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] };
    if (data.success) return { ok: true };
    return { ok: false, reason: (data['error-codes'] ?? ['unknown']).join(',') };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : 'verify-failed' };
  }
}

export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
}
