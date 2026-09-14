# Setup — everything that must be real before you advertise

`pnpm compliance` prints the outstanding items on every run. This document
explains each one and what a good answer looks like.

Items marked **BLOCKING** will actively cost you leads or credibility if you
start paid advertising without them.

---

## 1. Placeholders in `content/company.ts` — BLOCKING

Everything on the site reads from this one file, so each of these is a one-line
edit.

| Field | Current | What it needs |
|---|---|---|
| `phone` / `phoneHref` | `(512) 555-0147` | The real business line. 555-01xx is the reserved fiction range, so the current number is safe but useless. |
| `email` | `office@maintenancecare.example` | A real inbox. `.example` is an IANA-reserved TLD and will never resolve — that is deliberate, so nobody's mail silently disappears. |
| `legalEntity` | `MaintenanceCare LLC` | The registered entity, exactly as filed. It appears in the footer and on both legal pages. |
| `name` | `MaintenanceCare` | Confirm this is the trading name and not just the repo name. |
| `foundedYear` | `2026` | First year of operation. |
| `hours` | Mon–Fri 07:30–18:00, Sat 08:00–14:00 | Confirm. These are published in JSON-LD and Google will show them. |
| `serviceRadiusMiles` | `35` | The honest radius. Drive time is the fastest way to destroy margin in this business — see the per-city figures in `content/areas.ts`. |

### Address

The site is configured as a **service-area business**: crews travel to the
property, so no street address is published and the `LocalBusiness` JSON-LD
uses `areaServed` rather than a `streetAddress`. That is accurate and it is
what Google expects for this business model. If you take a commercial address
and want it indexed, set `serviceAreaBusiness: false` and fill in
`address.streetAddress`.

## 2. `NEXT_PUBLIC_SITE_URL` — BLOCKING

Set it in Vercel to the canonical origin with no trailing slash, e.g.
`https://maintenancecare.com`. It drives canonical URLs, the sitemap, and
absolute OG image paths. Without it everything falls back to the Vercel
preview domain, which will get the wrong URLs indexed.

## 3. Real job photographs — BLOCKING for the property-manager funnel

All eight division photos are placeholders and render as an obvious
"PHOTO PENDING" plate. **Do not substitute stock photography.** A stock image
of a smiling contractor actively destroys trust with the exact audience this
site is built to convert; the neutral plate is the better of the two bad
options, which is why it is what ships.

What to shoot, in priority order:

1. `property-care` — a technician recording a filter size on a maintenance sheet
2. `field-inspections` — an exterior shot of a vacant property, date visible
3. `home-repair` — a finished drywall patch, sanded and ready for paint
4. `exterior-care` — a cleared gutter run, photographed from the ladder

Drop them in `public/photos/`, then in `content/divisions.ts` remove
`placeholder: true`, set a real `timestamp`, and write a truthful `alt`. The
`alt` type forbids an empty string, so a plate without alternative text will
not compile.

## 4. The sample report

`public/sample-report.pdf` is generated from `content/sample-report.ts` and is
labelled **SPECIMEN** on the page and on the PDF, because it shows the real
report format but is not a record of a real visit.

Replace it with a genuinely anonymised report from a real inspection — it
converts better than any amount of copy, and it is the single highest-value
asset on the site. Edit the data in `content/sample-report.ts`, set
`SAMPLE_REPORT_IS_SPECIMEN = false`, then:

```bash
pnpm run report:pdf
```

The page and the PDF are generated from the same source, so they cannot drift.

## 5. Reconcile pricing against the business plan

`content/services.ts` carries the Phase 1 catalogue with an
`effectiveDate: '2026-09-01'` on every item, and the site renders
"Pricing effective September 2026" beneath every table.

Two things to check before launch:

- **The flat-rate menu.** Seventeen items are authored. The business plan's own
  list should be reconciled against them — a named price is the real
  competitive advantage here and it needs to be a price you will honour.
- **Licensed-trade scoping.** Fixture work (faucets, toilets, disposals,
  ceiling fans, light fixtures) is scoped as `licensedTradeRequired` and priced
  as coordination rather than as a flat rate. This is the conservative reading
  of Texas licensing. If your counsel reads it differently, change
  `fixture-coordination` in `content/services.ts` — but that is a legal
  decision, not a content one.

## 6. Environment variables

Set these in Vercel → Project Settings → Environment Variables. The marketing
site builds and deploys without any of them; only the request form needs them.

| Variable | Where it comes from | If it is missing |
|---|---|---|
| `DATABASE_URL` | Neon → pooled connection string | Leads are **not stored**. The route logs an error and still tries to email. |
| `RESEND_API_KEY` | Resend → API keys | No notification email is sent. |
| `RESEND_FROM_EMAIL` | A verified sending domain in Resend | No notification email is sent. |
| `LEAD_NOTIFY_PRIORITY` | Comma-separated internal addresses | Priority leads have nowhere to go. |
| `LEAD_NOTIFY_STANDARD` | Comma-separated internal addresses | Homeowner leads have nowhere to go. |
| `BLOB_READ_WRITE_TOKEN` | Vercel → Storage → Blob | Photo upload returns 503; the rest of the form still works. |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile | Verification fails **open** — deliberate, so previews work. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile | No widget renders. |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN` | Upstash | Rate limiting fails **open**. |
| `NEXT_PUBLIC_SITE_URL` | Your domain | Canonicals fall back to the Vercel domain. |

**`LEAD_NOTIFY_PRIORITY` and `LEAD_NOTIFY_STANDARD` must not share an address.**
That separation is the whole point of the routing logic: a twenty-door property
management inquiry sitting in the same inbox as a request to hang a TV is how
this business loses its most valuable lead. There is a unit test asserting they
stay distinct in the configuration you ship.

## 7. Database

```bash
pnpm db:generate     # only after changing lib/db/schema.ts
pnpm db:migrate      # apply to the DATABASE_URL in your environment
```

The initial migration is committed in `drizzle/`. Run `db:migrate` once against
production before the form goes live.

## 8. Deployment

Import the repo into Vercel. `vercel.json` already sets the framework, the
install command, and a build command that **runs the compliance check first**,
so a violation fails the deployment rather than shipping.

After the first deploy:

- Point the domain and set `NEXT_PUBLIC_SITE_URL` to match.
- Submit `https://yourdomain/sitemap.xml` in Google Search Console.
- Create the Google Business Profile. The NAP in `content/company.ts` and the
  `LocalBusiness` JSON-LD must match it **exactly** — same phone format, same
  business name, same locality.

## 9. Reviews

There is no `AggregateRating` or `Review` structured data on this site, and the
compliance check fails the build if any is added. There are no reviews yet, and
fabricated ones are both a Google penalty and an FTC problem.

Once you have genuine reviews, add them properly — real, attributable, and with
the customer's permission. Until then the site converts on published pricing,
the licensing disclosure and the sample report, which is a stronger position
with property managers anyway.

---

## Answers to the open questions in BUILD.md §12

These were resolved in order to ship a complete site. Each is a one-file change
if the answer turns out to be different.

| # | Question | What was assumed, and where to change it |
|---|---|---|
| 1 | Repo state | Empty — no commits on the remote. Scaffolded fresh per §2 with Next 16 / React 19 / Tailwind 4. |
| 2 | Business name and entity | Trading name taken as "MaintenanceCare", entity as "MaintenanceCare LLC". `content/company.ts`. |
| 3 | Real photography | None available. Neutral placeholder plates ship; stock was not used. §3 above. |
| 4 | Phone and NAP | Placeholder phone in the reserved fiction range; modelled as a service-area business with no street address. `content/company.ts`. |
| 5 | Sample report | None existed. A clearly-labelled SPECIMEN is generated from real report structure, ungated as §6.6 requires. §4 above. |
| 6 | Service radius | 35 miles from Elgin, with honest per-city drive times (0–30 min) stated on every city page. `content/areas.ts`. |
| 7 | Domain | Driven by `NEXT_PUBLIC_SITE_URL`, defaulting to the Vercel domain. §2 above. |
