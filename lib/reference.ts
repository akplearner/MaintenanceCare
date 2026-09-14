/**
 * Short, human-readable reference shown on the thanks page and used as the
 * subject-line handle in the notification email. Crockford-style alphabet:
 * no I, L, O, U, so nobody misreads it over the phone.
 */
const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

export function generateReference(now: Date = new Date()): string {
  const yy = String(now.getUTCFullYear()).slice(-2);
  const doy = Math.floor(
    (Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) -
      Date.UTC(now.getUTCFullYear(), 0, 0)) /
      86_400_000,
  );

  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  const suffix = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('');

  return `MC-${yy}${String(doy).padStart(3, '0')}-${suffix}`;
}

export const REFERENCE_PATTERN = /^MC-\d{5}-[0-9A-HJKMNP-TV-Z]{4}$/;
