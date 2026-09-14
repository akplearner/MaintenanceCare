/**
 * Compliance enforcement — BUILD.md section 9.6.
 *
 * A failing check blocks the build. This is cheaper than remembering, and it
 * is the difference between a rule and an intention.
 *
 * Escape hatch, used sparingly and never silently: a line carrying
 *   // compliance-allow: <reason>
 * is exempt, as is any line between
 *   /* compliance-allow-start: <reason> *\/ and /* compliance-allow-end *\/
 * The reason is mandatory — an exemption you cannot explain is a violation.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SCAN_DIRS = ['content', 'app', 'components', 'lib'];
const SCAN_EXT = new Set(['.ts', '.tsx', '.md', '.mdx']);
const SKIP_DIRS = new Set(['node_modules', '.next', 'dist', '.git', 'drizzle']);

interface Violation {
  file: string;
  line: number;
  rule: string;
  detail: string;
}

const violations: Violation[] = [];
const warnings: string[] = [];

function fail(file: string, line: number, rule: string, detail: string): void {
  violations.push({ file, line, rule, detail });
}

/* ── 9.1 — never describe unlicensed trade work as a service we provide ─── */

const BANNED_TRADE = [
  'plumbing services',
  'plumbing repair',
  'electrical services',
  'electrical repair',
  'hvac repair',
  'ac repair',
  'air conditioning repair',
  'pest control',
  'extermination',
  'irrigation repair',
  'sprinkler repair',
];

/* ── 9.5 — no savings claims ─────────────────────────────────────────────── */

const BANNED_SAVINGS = [
  'save 30%',
  'guaranteed savings',
  "we'll cut your costs",
  'we will cut your costs',
  'cut your costs',
  'guaranteed',
];

/** Any percentage within a few words of a savings word. */
const SAVINGS_PERCENT =
  /(?:sav(?:e|ing|ings)|reduc(?:e|tion)|cut|cheaper|discount|less)\D{0,40}\d{1,3}\s?%|\d{1,3}\s?%\D{0,40}(?:sav(?:e|ing|ings)|reduc(?:e|tion)|cheaper|off your|lower)/i;

function walk(dir: string, out: string[] = []): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (SCAN_EXT.has(path.extname(full))) out.push(full);
  }
  return out;
}

function scanPhrases(): void {
  const files = SCAN_DIRS.flatMap((d) => walk(path.join(ROOT, d)));

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const lines = readFileSync(file, 'utf8').split('\n');
    let blockExempt = false;

    lines.forEach((raw, i) => {
      const lineNo = i + 1;

      if (raw.includes('compliance-allow-start:')) blockExempt = true;
      if (raw.includes('compliance-allow-end')) {
        blockExempt = false;
        return;
      }
      // The rule definitions themselves must not trip the rule.
      if (rel === path.relative(ROOT, __filename)) return;

      const lineExempt =
        raw.includes('compliance-allow:') || (lines[i - 1]?.includes('compliance-allow:') ?? false);
      if (blockExempt || lineExempt) return;

      const lower = raw.toLowerCase();

      for (const phrase of BANNED_TRADE) {
        if (lower.includes(phrase)) {
          fail(
            rel,
            lineNo,
            '9.1 unlicensed trade work',
            `Contains "${phrase}". Describe it as coordination, inspection or dispatch instead — see BUILD.md 9.1.`,
          );
        }
      }

      for (const phrase of BANNED_SAVINGS) {
        if (lower.includes(phrase)) {
          fail(rel, lineNo, '9.5 savings claim', `Contains "${phrase}".`);
        }
      }

      if (SAVINGS_PERCENT.test(raw)) {
        fail(
          rel,
          lineNo,
          '9.5 savings percentage',
          'A percentage is attached to a savings or reduction claim.',
        );
      }
    });

    if (blockExempt) {
      fail(rel, lines.length, 'compliance-allow', 'Unclosed compliance-allow-start block.');
    }
  }
}

/* ── 9.3 — yearBuilt is mandatory ────────────────────────────────────────── */

async function checkLeadSchema(): Promise<void> {
  const { leadSchema } = await import('../lib/schemas/lead');
  const shape = leadSchema.shape;
  const rel = 'lib/schemas/lead.ts';

  const yearBuilt = shape.yearBuilt as unknown as {
    safeParse: (v: unknown) => { success: boolean };
  };

  if (yearBuilt.safeParse(undefined).success) {
    fail(rel, 0, '9.3 yearBuilt', 'yearBuilt accepts undefined — it must be required.');
  }
  if (yearBuilt.safeParse(null).success) {
    fail(rel, 0, '9.3 yearBuilt', 'yearBuilt accepts null — it must be required.');
  }
  // A default would silently satisfy the parse without the customer answering.
  const src = readFileSync(path.join(ROOT, rel), 'utf8');
  const yearBuiltBlock = src.slice(src.indexOf('yearBuilt:'), src.indexOf('occupancy:'));
  if (/\.default\(/.test(yearBuiltBlock)) {
    fail(rel, 0, '9.3 yearBuilt', 'yearBuilt declares a default. It must have none.');
  }
  if (/\.optional\(/.test(yearBuiltBlock)) {
    fail(rel, 0, '9.3 yearBuilt', 'yearBuilt is optional. It must be required.');
  }

  /* ── 9.4 — no access-code field may exist on the schema ───────────────── */
  const forbidden = /code|lockbox|alarm|pin/i;
  for (const key of Object.keys(shape)) {
    if (forbidden.test(key)) {
      fail(
        rel,
        0,
        '9.4 access codes',
        `Lead schema key "${key}" matches /code|lockbox|alarm|pin/i. The site must never collect access credentials.`,
      );
    }
  }

  /* Redaction must actually strip a code-like string. */
  const { redactAccessNotes } = await import('../lib/redact');
  for (const probe of [
    'gate code 4471',
    'Lockbox is 0810',
    'the keypad code is one two three four',
    'alarm code on arrival',
    'Use PIN 9921 at the gate',
  ]) {
    const result = redactAccessNotes(probe);
    if (!result.redacted || result.value !== undefined) {
      fail('lib/redact.ts', 0, '9.4 access codes', `Failed to redact: "${probe}"`);
    }
  }
  // And must not eat an ordinary note.
  const benign = redactAccessNotes('Call Maria on arrival, she is on site weekdays');
  if (benign.redacted) {
    fail('lib/redact.ts', 0, '9.4 access codes', 'Redaction is stripping ordinary access notes.');
  }
}

/* ── 9.2 — SiteFooter renders the licensed-partner disclosure ────────────── */

async function checkFooterDisclosure(): Promise<void> {
  const { LICENSED_PARTNER_DISCLOSURE } = await import('../content/company');
  const rel = 'components/layout/SiteFooter.tsx';
  const src = readFileSync(path.join(ROOT, rel), 'utf8');

  if (!src.includes('LICENSED_PARTNER_DISCLOSURE')) {
    fail(rel, 0, '9.2 disclosure', 'SiteFooter does not render LICENSED_PARTNER_DISCLOSURE.');
  }
  for (const trade of ['plumbing', 'electrical', 'HVAC', 'irrigation', 'pest control']) {
    if (!LICENSED_PARTNER_DISCLOSURE.includes(trade)) {
      fail(
        'content/company.ts',
        0,
        '9.2 disclosure',
        `The disclosure string no longer names "${trade}".`,
      );
    }
  }
  // The footer must be in the root layout, i.e. on every page.
  const layout = readFileSync(path.join(ROOT, 'app/layout.tsx'), 'utf8');
  if (!layout.includes('<SiteFooter />')) {
    fail('app/layout.tsx', 0, '9.2 disclosure', 'SiteFooter is not rendered in the root layout.');
  }
}

/* ── 9.1 / 6.3 — licensed-trade items force a caution callout ────────────── */

async function checkCautionCallouts(): Promise<void> {
  const { services } = await import('../content/services');
  const { divisions } = await import('../content/divisions');

  const divisionsNeedingCaution = new Set(
    services.filter((s) => s.licensedTradeRequired).map((s) => s.division),
  );

  if (divisionsNeedingCaution.size === 0) return;

  const rel = 'app/services/[division]/page.tsx';
  const src = readFileSync(path.join(ROOT, rel), 'utf8');

  if (!src.includes('hasLicensedTrade')) {
    fail(rel, 0, '6.3 caution callout', 'Division page does not compute hasLicensedTrade.');
  }
  if (!/hasLicensedTrade[\s\S]{0,400}variant="caution"/.test(src)) {
    fail(
      rel,
      0,
      '6.3 caution callout',
      'Division page does not render a caution Callout when a service is licensed-trade.',
    );
  }

  for (const slug of divisionsNeedingCaution) {
    if (!divisions.some((d) => d.slug === slug)) {
      fail('content/services.ts', 0, '6.3 caution callout', `Unknown division "${slug}".`);
    }
  }
}

/* ── 8 — no fabricated review or rating structured data ──────────────────── */

function checkNoFakeReviews(): void {
  const files = SCAN_DIRS.flatMap((d) => walk(path.join(ROOT, d)));
  for (const file of files) {
    const rel = path.relative(ROOT, file);
    if (rel === path.relative(ROOT, __filename)) continue;
    const lines = readFileSync(file, 'utf8').split('\n');
    lines.forEach((raw, i) => {
      if (raw.includes('compliance-allow:')) return;
      if (/['"]@type['"]\s*:\s*['"](AggregateRating|Review)['"]/.test(raw)) {
        fail(
          rel,
          i + 1,
          '8 structured data',
          'AggregateRating / Review structured data is banned until there are genuine reviews.',
        );
      }
    });
  }
}

/* ── Setup warnings — placeholders that must go before advertising ───────── */

async function checkPlaceholders(): Promise<void> {
  const { company } = await import('../content/company');
  const { SAMPLE_REPORT_IS_SPECIMEN } = await import('../content/sample-report');
  const { divisions } = await import('../content/divisions');

  if (company.phone.includes('555-01')) {
    warnings.push(
      `content/company.ts — phone is still the reserved fiction number ${company.phone}.`,
    );
  }
  if (company.email.endsWith('.example')) {
    warnings.push(`content/company.ts — email ${company.email} will never resolve.`);
  }
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    warnings.push('NEXT_PUBLIC_SITE_URL is unset — canonical URLs fall back to the Vercel domain.');
  }
  if (SAMPLE_REPORT_IS_SPECIMEN) {
    warnings.push(
      'content/sample-report.ts — still a format specimen. Replace with a real anonymised report.',
    );
  }
  const pendingPhotos = divisions.filter((d) => d.image.placeholder);
  if (pendingPhotos.length > 0) {
    warnings.push(
      `${pendingPhotos.length} division photo(s) are placeholders: ${pendingPhotos
        .map((d) => d.slug)
        .join(', ')}. Real job photos only — never stock.`,
    );
  }
}

/* ── Runner ──────────────────────────────────────────────────────────────── */

async function main(): Promise<void> {
  scanPhrases();
  checkNoFakeReviews();
  await checkLeadSchema();
  await checkFooterDisclosure();
  await checkCautionCallouts();
  await checkPlaceholders();

  if (warnings.length > 0) {
    console.log('\n  Setup items outstanding (warnings, not failures):');
    for (const w of warnings) console.log(`    · ${w}`);
  }

  if (violations.length === 0) {
    console.log(`\n  ✓ Compliance check passed — ${violations.length} violations.\n`);
    return;
  }

  console.error(`\n  ✗ Compliance check failed — ${violations.length} violation(s):\n`);
  for (const v of violations) {
    const where = v.line > 0 ? `${v.file}:${v.line}` : v.file;
    console.error(`    ${where}`);
    console.error(`      [${v.rule}] ${v.detail}\n`);
  }
  console.error('  See BUILD.md section 9. Fix these; do not add an exemption without a reason.\n');
  process.exit(1);
}

void main();
