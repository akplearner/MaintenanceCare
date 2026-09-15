# MaintenanceCare

Marketing site and lead capture for a property maintenance and field services
company in Elgin, Texas. Next.js App Router, TypeScript, Tailwind v4, deployed
on Vercel.

Built to the specification in [`BUILD.md`](./BUILD.md). **Phase 1 only** —
marketing site and lead capture. Accounts, booking, payments, a work-order
system, live chat and a CMS are deliberately out of scope.

---

## Quick start

```bash
pnpm install
cp .env.example .env.local     # see SETUP.md — the site builds without any of it
pnpm dev
```

The marketing pages are statically generated and need no environment at all.
Only the request form needs secrets, and it degrades honestly without them.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Development server |
| `pnpm build` | Production build. Fails on malformed content. |
| `pnpm verify` | Compliance + typecheck + lint + unit tests. Run before pushing. |
| `pnpm compliance` | The section 9 rules, enforced. Fails the build on a violation. |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | Compliance check, then ESLint |
| `pnpm test` | Vitest unit tests |
| `pnpm test:e2e` | Playwright, desktop and mobile |
| `pnpm report:pdf` | Regenerates `public/sample-report.pdf` from content |
| `pnpm db:generate` | New Drizzle migration from the schema |
| `pnpm db:migrate` | Apply migrations |

## Architecture

```
app/          Routes. Static everywhere except /request and the API routes.
components/
  layout/     SiteHeader, SiteFooter, Container, RecordRail, SkipLink
  record/     RecordCard, StatusStamp, PhotoPlate, FieldNote, Checklist
  content/    PriceTable, PlanComparison, SLATable, SavingsPanel, CTABlock, …
  form/       RequestForm and its field components
  ui/         Button, Field, Chip, Callout, Prose
content/      All copy, pricing and structured data. Typed and validated.
lib/          Schemas, database, email, routing, SEO, redaction
scripts/      compliance-check.ts, generate-sample-report.ts
tests/        unit (Vitest) and e2e (Playwright)
```

### Two rules worth knowing before you edit anything

**No price, service name or description lives in a page component.** It all
lives in `content/`. A price change is a one-file edit. `content/validate.ts`
runs at import time, so `pnpm build` fails on a malformed content object, a
dangling service id, or a division that claims to be launched with nothing
behind it.

**The compliance check is not advisory.** `scripts/compliance-check.ts` runs in
`pnpm lint`, in CI, and in the Vercel build command. It enforces the licensing
language rules, the mandatory `yearBuilt` field, the absence of any
access-code field, the footer disclosure, and the ban on fabricated review
schema. If you genuinely need a banned phrase — the required disclosure names
the licensed trades, for instance — mark it:

```ts
/* compliance-allow-start: negative-context — states what we do NOT perform */
…
/* compliance-allow-end */
```

The reason is mandatory. An exemption you cannot explain is a violation.

## The design system — "Documented, and easy to trust"

The product is a documented, dated, photographed record of a property, and the
hero still shows exactly that — a real work order, not a stock photograph. The
surface around it is built to be read by a homeowner and a property manager
without either having to decode it.

Deep navy ink on warm sand, white cards with 8px corners and a whisper of
shadow, one warm amber accent, and green reserved for the four things the
business can actually evidence on request. Monospace means identifier — a
work-order number, a timestamp, a price cell — and nothing else.

Tokens live in `app/globals.css` and reach Tailwind through `@theme`. Three of
them are load-bearing for accessibility and are documented in `BUILD.md` 5.2:
`--accent` never carries text on a light ground, muted text splits into
`--ink-muted` and `--ink-on-dark` because no single value clears contrast on
both, and `--focus` clears 3:1 on sand *and* on navy because the focus ring is
global.

This replaced an earlier system called "The Field Record" — square corners,
hairlines instead of shadows, a 128px margin rail stamping `REF-03` beside every
section, and no photography at all. It was internally consistent and wrong for
the audience: the margin codes were company-internal filing references published
to customers, and `REF-04` beside a heading reads as "form", not "rigorous". The
discipline survived; the costume did not.

## Lead pipeline

`POST /api/lead`, in this order and for these reasons:

1. Rate limit by IP — 5/hour (Upstash; fails open).
2. Honeypot — a filled `website` field returns a success shape and is discarded.
3. Turnstile verified server-side.
4. Zod parse against the same schema the client used.
5. **Access-code redaction** — anything code-like in `accessNotes` is stripped.
6. **Persist to Postgres, before the email.** A lead that fails to email but is
   stored is recoverable; the reverse is not.
7. Classify priority.
8. Notify the matching queue — priority and standard never share an inbox.
9. Email failure is logged, not surfaced; the lead is already saved.
10. Return a short human-readable reference.

If both the store and the send fail, the API returns 503 and tells the customer
to call, rather than showing a thank-you page for a request nobody will see.

## Before you advertise

`pnpm compliance` lists every remaining placeholder on each run. See
[`SETUP.md`](./SETUP.md) for the full checklist — phone number, email, real job
photographs, and a genuinely anonymised sample report.

## Measured performance

Throttled to 4G (1.6 Mbps, 70ms RTT) with 4× CPU throttling, against the
production build:

| Route | LCP | CLS |
|---|---|---|
| `/` | 632 ms | 0 |
| `/plans` | 608 ms | 0 |
| `/for/property-managers` | 616 ms | 0 |
| `/services/home-repair` | 580 ms | 0 |

LCP is comfortably inside the 2.0s target and CLS is zero — there is an e2e
test asserting the CLS budget on four routes so a regression is caught.

**One target is not met.** `BUILD.md` §10 asks for under 90 KB of JS gzipped on
a static page; the site ships **178 KB**. About 150 KB of that is the Next 16 +
React 19 App Router client runtime, which is a floor rather than something the
application code can trim — the whole application's own JavaScript is roughly
28 KB. The 90 KB figure is not reachable on this stack; it would need a
different rendering approach (an islands framework, or Pages Router with
per-page opt-out of hydration). Raised here rather than quietly ignored.

What *was* done to keep the controllable share small:

- CTA components are server components. Click tracking is declared with
  `data-cta` attributes and handled by one delegated listener, so a CTA never
  pulls React or its icons into a page's bundle.
- Only three client components exist sitewide: the header (mobile menu), the
  sticky mobile CTA bar, and the request form.
- The FAQ accordion is `<details>`-based and ships no JavaScript.
- The service-area map is static SVG projected from real coordinates, not a
  map library.
- No animation library. The one animated element is 20 lines of CSS.
