/**
 * Access-code redaction.
 *
 * This business accumulates a list of vacant properties and how to enter them.
 * That belongs in an access-controlled field service platform — not in a
 * website's form store, an email inbox, or a spreadsheet. BUILD.md 9.4.
 *
 * The scan is deliberately blunt: a false positive costs us one line of a
 * customer's note, and a false negative costs us a stored door code.
 */

const CODE_WORDS =
  /\b(?:gate\s*code|lock\s*box|lockbox|door\s*code|alarm\s*code|access\s*code|key\s*pad|keypad|passcode|pass\s*code|pin\s*(?:code|number|#)?|combo|combination|code)\b/i;

/** Four or more consecutive digits — a code, not a house number. */
const DIGIT_RUN = /\d{4,}/;

export interface RedactionResult {
  value: string | undefined;
  redacted: boolean;
  reason?: 'code-word' | 'digit-run';
}

export function redactAccessNotes(input: string | undefined | null): RedactionResult {
  if (!input) return { value: undefined, redacted: false };

  const trimmed = input.trim();
  if (trimmed.length === 0) return { value: undefined, redacted: false };

  if (DIGIT_RUN.test(trimmed)) {
    return { value: undefined, redacted: true, reason: 'digit-run' };
  }
  if (CODE_WORDS.test(trimmed)) {
    return { value: undefined, redacted: true, reason: 'code-word' };
  }

  return { value: trimmed, redacted: false };
}

/** Human-readable stand-in stored in place of a redacted note. */
export const REDACTED_PLACEHOLDER =
  'Access note removed automatically — it looked like it contained an access code. Collect access details by phone through the secure process.';
