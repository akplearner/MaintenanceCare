# MaintenanceCare — Website Build Specification

**Target repo:** `akplearner/MaintenanceCare`
**Scope:** Phase 1 only — marketing site and lead capture
**Stack:** Next.js (App Router) + TypeScript + Tailwind, deployed on Vercel
**Version:** 1.0

---

## 0. How to use this document

This is a build spec for Claude Code. Read all of it before writing any files.

**The repo may already contain scaffolding.** Before creating anything:

1. `ls -la` and read any existing `package.json`, `next.config.*`, `tsconfig.json`, `app/`, `src/`.
2. If a Next.js app already exists, **extend it** — match its existing conventions (src dir or not, app router or pages, Tailwind version, package manager).
3. If the repo is empty or contains only a README, scaffold fresh per Section 2.
4. Report what you found before proceeding. Do not silently overwrite existing work.

**Ask before deviating** on: the data model in Section 4, the compliance rules in Section 9, or the Phase 1 scope boundary in Section 1.3.

---

## 1. Context

### 1.1 What the business is

A property maintenance and field services company in Elgin, Texas. It is explicitly **not** a handyman company. It sells recurring maintenance coverage and documented field records to property managers, real estate investors, absentee owners, short-term-rental operators, Realtors, HOAs, and homeowners.

The company does **not** perform licensed trade work — plumbing, electrical, HVAC repair, irrigation, and pest control are routed to licensed partner contractors. This constraint is legally load-bearing and shapes the site copy (Section 9).

### 1.2 What the site is for

Two jobs, unequal in value:

1. **Primary:** convert a property manager or investor into a booked conversation. These leads are worth roughly 10× a homeowner lead because one relationship brings many properties.
2. **Secondary:** make a homeowner comfortable enough to request a quote.

Everything else is decoration. When a design or content decision is ambiguous, resolve it in favor of job one.

### 1.3 Phase 1 scope boundary

**In scope:**

- Marketing site: home, services, plans, audience pages, about, service area, legal
- Lead capture form with photo upload
- Lead routing (high-value leads notify differently than homeowner leads)
- Durable storage of every submission
- Local SEO pages
- Sample report download (gated or ungated — see Section 6.6)

**Explicitly out of scope — do not build these:**

- Customer accounts, authentication, or a client portal
- Online booking or calendar availability
- Payments, invoicing, or subscription checkout
- A work order system (this is bought, not built — see the business plan)
- Live chat
- A blog or CMS integration
- Any storage or display of property access codes (Section 9.4)

If a task seems to require one of these, stop and flag it rather than building it.

---

## 2. Stack and project setup

| Concern | Choice | Notes |
|---|---|---|
| Framework | Next.js 15+, App Router | Static generation everywhere except form routes |
| Language | TypeScript, `strict: true` | No `any` in committed code |
| Styling | Tailwind CSS v4 | Design tokens as CSS custom properties, exposed to Tailwind via `@theme` |
| Fonts | `next/font/google` | Archivo (primary), IBM Plex Mono (identifiers only) |
| Forms | React Hook Form + Zod | Same Zod schema validates client and server |
| Validation | Zod | Schemas live in `lib/schemas/` and are the single source of truth |
| Email | Resend | Two templates: priority lead, standard lead |
| Database | Neon Postgres + Drizzle ORM | Every submission persisted before the email is sent |
| File upload | Vercel Blob | Photos only, 10 MB each, max 6 per submission |
| Spam | Cloudflare Turnstile + honeypot field | Turnstile verified server-side |
| Rate limit | Upstash Redis | 5 submissions per IP per hour |
| Analytics | Vercel Analytics | Conversion events on the two CTAs only |
| Icons | Lucide React | Use sparingly; see Section 5.9 |
| Testing | Vitest + Playwright | Coverage target in Section 11 |

### Environment variables

```
DATABASE_URL=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
LEAD_NOTIFY_PRIORITY=        # comma-separated, gets PM/investor leads
LEAD_NOTIFY_STANDARD=        # comma-separated, gets homeowner leads
BLOB_READ_WRITE_TOKEN=
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_SITE_URL=
```

Commit a `.env.example` with these keys and no values.

---

## 3. Repository structure

```
/
├── app/
│   ├── layout.tsx                      # Root: fonts, header, footer, skip link
│   ├── page.tsx                        # Home
│   ├── globals.css                     # Tokens + Tailwind @theme
│   ├── opengraph-image.tsx
│   │
│   ├── services/
│   │   ├── page.tsx                    # Division index
│   │   └── [division]/page.tsx         # generateStaticParams over 8 divisions
│   │
│   ├── plans/page.tsx                  # Property Care tiers — highest-value page
│   │
│   ├── for/
│   │   ├── property-managers/page.tsx
│   │   ├── investors/page.tsx
│   │   └── short-term-rentals/page.tsx
│   │
│   ├── sample-report/page.tsx
│   ├── service-area/
│   │   ├── page.tsx
│   │   └── [city]/page.tsx             # Local SEO
│   ├── about/page.tsx
│   │
│   ├── request/
│   │   ├── page.tsx                    # The form
│   │   └── thanks/page.tsx
│   │
│   ├── legal/
│   │   ├── terms/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── licensed-partners/page.tsx  # Required disclosure — see 9.2
│   │
│   ├── api/
│   │   ├── lead/route.ts               # POST — the only mutating endpoint
│   │   └── upload/route.ts             # POST — Vercel Blob client upload token
│   │
│   ├── sitemap.ts
│   └── robots.ts
│
├── components/
│   ├── layout/                         # SiteHeader, SiteFooter, RecordRail, Container
│   ├── record/                         # The design system's signature pieces
│   ├── content/                        # PriceTable, ServiceCard, PlanCard, ...
│   ├── form/                           # RequestForm and its field components
│   └── ui/                             # Button, Field, Chip, Callout — primitives
│
├── content/
│   ├── divisions.ts                    # The 8 service divisions
│   ├── services.ts                     # Individual services with pricing
│   ├── plans.ts                        # Property Care subscription tiers
│   ├── areas.ts                        # Service area cities
│   ├── faqs.ts
│   └── company.ts                      # NAP, hours, legal entity, licensing stance
│
├── lib/
│   ├── schemas/lead.ts                 # Zod — shared client/server
│   ├── db/{schema.ts,index.ts}         # Drizzle
│   ├── email/{templates.tsx,send.ts}
│   ├── routing.ts                      # Lead priority classification
│   └── seo.ts                          # Metadata + JSON-LD builders
│
├── public/
│   ├── sample-report.pdf
│   └── photos/                         # Real job photos, never stock
│
├── drizzle/                            # Migrations
├── BUILD.md                            # This file
└── .env.example
```

---

## 4. Content data model

**Rule: no price, service name, or service description is hardcoded in a page component.** All of it lives in `content/` as typed data. A price change must be a one-file edit, not a twelve-page find-and-replace.

Every priced item carries `effectiveDate`. The site renders "Pricing effective September 2026" beneath every price table, because the business reviews benchmarks quarterly.

### 4.1 Types

```ts
// content/types.ts

export type Phase = 1 | 2 | 3 | 4 | 5;

export type DivisionSlug =
  | 'property-care'
  | 'field-inspections'
  | 'turn-services'
  | 'home-repair'
  | 'exterior-care'
  | 'emergency-response'
  | 'asset-care'
  | 'trade-coordination';

export type AudienceSlug =
  | 'homeowner' | 'property-manager' | 'investor'
  | 'str-operator' | 'realtor' | 'hoa' | 'commercial';

export interface Division {
  slug: DivisionSlug;
  name: string;
  /** One sentence, in the customer's words, about what they are buying. */
  promise: string;
  phase: Phase;
  /** false => render a short placeholder page, exclude from primary nav */
  fullyLaunched: boolean;
  audiences: AudienceSlug[];
  services: ServiceId[];
  /** Required. Real photo from a real job. Never stock. */
  image: { src: string; alt: string };
}

export interface Service {
  id: ServiceId;
  division: DivisionSlug;
  name: string;
  description: string;
  phase: Phase;
  pricing: Pricing;
  /** Rendered as "What's included" bullets. */
  includes?: string[];
  /** Set when the work is routed to a licensed partner. Forces disclosure copy. */
  licensedTradeRequired?: boolean;
  /** Set when pre-1978 construction gates the work. See 9.3. */
  leadPaintGated?: boolean;
  taxable: boolean | 'verify';
}

export type Pricing =
  | { kind: 'range'; low: number; high: number; unit: PriceUnit; effectiveDate: string }
  | { kind: 'from'; low: number; unit: PriceUnit; effectiveDate: string }
  | { kind: 'quote'; note: string }
  | { kind: 'included'; inPlan: PlanSlug };

export type PriceUnit =
  | 'flat' | 'per-hour' | 'per-month' | 'per-visit'
  | 'per-property' | 'per-property-per-month';

export interface Plan {
  slug: 'essential' | 'standard' | 'premium';
  name: string;
  monthlyPrice: number;
  cadence: string;             // "Quarterly exterior check"
  includes: string[];
  bestFor: string;
  featured: boolean;           // exactly one true — 'standard'
  effectiveDate: string;
}
```

### 4.2 Phase 1 content to author

**Divisions — `fullyLaunched: true` for these four only:**

| Slug | Promise | Phase |
|---|---|---|
| `property-care` | Recurring preventive maintenance on a plan | 1 |
| `field-inspections` | Occupied, vacant, and storm property checks | 1 |
| `home-repair` | Handyman, drywall, paint, fence, punch lists | 1 |
| `exterior-care` | Lawn, gutters, pressure washing, junk removal | 1 |

**Divisions — `fullyLaunched: false`, short placeholder page, not in primary nav:**

`turn-services` (Phase 2), `emergency-response` (Phase 3), `asset-care` (Phase 4), `trade-coordination` (Phase 5).

Placeholder page pattern: name, promise, one paragraph, and a single CTA reading "Ask us about this." Do not write aspirational copy that implies the service is running today.

**Plans:**

| Slug | Price | Included |
|---|---|---|
| `essential` | $49/mo | Quarterly exterior check, priority scheduling, maintenance record, discounted service call rate |
| `standard` | $89/mo | Quarterly full property inspection, HVAC filter replacement labor, detector check, exterior inspection, minor adjustments, photo report |
| `premium` | $149/mo | Monthly exterior checks, quarterly interior inspection, filter service, detector testing, priority response, annual gutter or pressure-wash credit, full maintenance report |

Portfolio pricing ($30–$75/door/month) is **not** shown as a public price. It renders as "Portfolio pricing — by door count. Ask us." linking to `/for/property-managers`.

**Key Phase 1 services and pricing** (full catalog is in the business plan; author these first):

| Service | Pricing |
|---|---|
| Property Health Check — Basic | $79–$99 flat |
| Property Health Check — Standard | $119–$149 flat |
| Property Health Check — Detailed report | $179–$249 flat |
| Vacant Property Watch — biweekly | $99–$159 per-month |
| Vacant Property Watch — weekly | $149–$249 per-month |
| HVAC filter service | $25–$39 per-visit, plus filter |
| Smoke / CO safety check | $35–$75 per-property, plus devices |
| Lawn — standard lot | $55–$75 per-visit |
| Cleaning — standard house | $150–$225 flat |
| Handyman service call minimum | $95 flat |
| Handyman hourly | $85–$105 per-hour |
| Gutter cleaning — single story | $125–$175 flat |
| Pressure washing — driveway | $125–$225 flat |
| Junk removal — small pickup load | $125–$200 flat |

Flat-rate handyman menu (door adjustment $75–$150, drywall patch $100–$200, etc.) — author all sixteen items from the business plan into `services.ts`. They render as a scannable menu on `/services/home-repair`, which is a real competitive advantage: customers strongly prefer a named price to an hourly rate.

---

## 5. Design system

### 5.1 Concept — "Documented, and easy to trust"

The company's product is a documented, dated, photographed record of a property. That is still the thing the hero shows. What changed in the redesign is who the surface is *addressed* to.

The first version of this system was called "The Field Record" and was built to look like an inspection sheet rather than a landing page: square corners, hairlines instead of shadows, a 128px margin rail stamping `REF-03` beside every section, monospace labels throughout, and no photography at all. It was internally consistent and it was wrong for the audience. A homeowner reading `REF-04` next to a heading does not think "rigorous"; they think "form". The margin codes were company-internal filing references published to customers.

The system now keeps the discipline and drops the costume:

- **Evidence over adjectives.** The hero is still a real work order, not a stock photograph. Claims are things we can produce on request — an insurance certificate, a written price, a partner's licence — and they live in `content/company.ts` as `CREDENTIALS`, typed and validated.
- **Two doors, not one funnel.** A homeowner and a property manager describe themselves differently. The home hero asks which one you are before it explains anything.
- **Soft corners, quiet depth.** `--radius-md` on cards and controls, `--shadow-sm` on raised surfaces. Hairlines still do most of the structural work; shadow is a whisper, not a lift.
- **Monospace means identifier.** Work-order numbers, inspection timestamps, price-table figures, the lead reference on the thanks page. Nothing else. Usage went from 96 occurrences to 29 in the redesign, and that was the single biggest comprehension win.
- **No margin rail.** Sections are separated by space and a hairline. `RecordRail` still accepts `reference`/`date`/`status` so call sites compile, but renders none of them.
- **Drawn, not stocked.** Where no real job photograph exists, `PhotoPlate` renders original line art from `components/art/PropertyScene.tsx` with a caption saying a real photograph is pending. Stock photography of a smiling contractor is still banned — it reads as false to the property managers this site is built for.

### 5.2 Color

Deep navy carries authority, warm sand keeps it from feeling clinical, green is reserved for things we can evidence, and one warm amber is the only decorative accent.

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F6F4F0` | Warm sand page ground |
| `--paper-raised` | `#FFFFFF` | Cards, panels, form fields |
| `--soil` | `#14263F` | Deep navy — body ink, header, footer, dark panels |
| `--soil-soft` | `#1F3A5F` | Secondary dark surface |
| `--steel` | `#4F5E74` | Secondary text |
| `--rule` | `#D3DAE3` | Hairlines and dividers — **never text** |
| `--ink-muted` | `#4F5E74` | Muted text on light surfaces |
| `--ink-on-dark` | `#C3CEDC` | Text on navy surfaces |
| `--accent` | `#C2761B` | Warm amber — fills, rules, underlines |
| `--accent-ink` | `#8A5310` | Accent **carrying text** on light |
| `--accent-on-dark` | `#F0B75E` | Accent on navy |
| `--verified` | `#1E7A52` | Status, and the credential badges |
| `--verified-soft` | `#E8F3ED` | Tint behind a credential badge |
| `--flag` | `#B3261E` | Needs attention, required |
| `--focus` | `#A9701E` | The global focus ring |

`--steel-light` survives as an alias of `--rule` so existing `border-steel-light` classes keep working. It means "hairline". Do not use it for text.

**The three rules that keep this accessible.** Every pairing below was computed, not eyeballed.

1. **`--accent` never carries text on a light ground.** It is 3.2:1 on sand — fine for a fill, a rule or an underline, and it fails AA as text. `--accent-ink` (5.8:1) is the token for accent text. This is the same discipline the old `--hivis`/`--hivis-ink` split enforced.
2. **Muted text is two tokens, not one.** `--ink-muted` on light (6.0:1), `--ink-on-dark` on navy (9.6:1). These were a single `--steel-light` before the redesign, and the light-surface case sat at **1.88:1** — the worst pairing on the site, and a real WCAG failure rather than a stylistic one.
3. **`--focus` clears 3:1 on both grounds** — 3.81:1 on sand, 3.64:1 on navy. The focus ring is declared once, globally, and lands on light pages and inside the navy footer alike. The previous ring was 2.90:1 on navy, below SC 1.4.11, and nothing caught it because the accessibility test only checks a light page.

Body ink on sand is 13.9:1; `--verified` is 5.3:1 on white and 4.7:1 on its own tint.

### 5.3 Typography

- **Archivo** — everything. 400 body, 500 UI, 600 subheads, 700 display. Display sizes get `letter-spacing: -0.02em`.
- **IBM Plex Mono** — 500 weight, identifiers only. See 5.1: if it is not a work-order number, a timestamp, a price cell or a reference code, it is not monospace.

Scale (major third, 1.25, base 16px): `text-xs` 12 · `text-sm` 14 · `text-base` 16 · `text-lg` 20 · `text-xl` 25 · `text-2xl` 31 · `text-3xl` 39 · `text-4xl` 49 · `text-5xl` 61 (home hero only).

Body line-height 1.6, prose capped at 68 characters (`max-w-[34rem]`). Headings 1.15.

**Do not** use all-caps tracked-out monospace eyebrow labels. Small section labels are sentence-case `text-sm font-semibold text-soil`.

**Do not** change `next/font`'s `display: 'optional'` in `app/layout.tsx`. `'swap'` measured CLS 0.118 on `/for/property-managers` and fails the layout-stability test.

### 5.4 Spacing and layout

4px base. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.

Grid: 12 columns, 24px gutters, `max-width: 1200px`. Sections run the full container width with `py-12 lg:py-16`. There is no margin rail — `--rail-width` was deleted along with it.

Corners: `--radius-sm` 4px (chips, inputs), `--radius-md` 8px (cards, buttons, panels), `--radius-lg` 14px (feature cards, hero panels).

Depth: `--shadow-sm` on raised cards, `--shadow-md` on hover and on the hero record card. Separation is still primarily a 1px hairline; shadow only distinguishes a card from the surface it sits on.

### 5.5 Motion

**One orchestrated moment on the whole site:** the home hero's status stamp animates in once — a 400ms scale-and-settle, as if stamped. Nothing else animates on load.

Everything else is response-to-action only: focus rings, accordion open/close, form validation, upload progress, and a card's shadow deepening on hover.

The stamp animates `opacity` and `transform` only. Animating a layout property here would feed straight into the CLS budget, which is tested on four routes at under 0.05.

`prefers-reduced-motion: reduce` disables the stamp and all transitions. Non-negotiable, and asserted by `accessibility.spec.ts` against the `.stamp-animate` class name.

### 5.6 Component inventory

**Layout**

| Component | Notes |
|---|---|
| `SiteHeader` | Logo, 5 nav items, phone number, "Request service" button. The label is asserted by the e2e funnel test — do not rename it. |
| `SiteFooter` | NAP, services, audiences, legal links, **licensed-partner disclosure** (required, Section 9.2). Navy ground; links use `--accent-on-dark`. |
| `Container` | Max width + responsive padding. |
| `RecordRail` | A page section: container, `py-12 lg:py-16`, optional hairline above. Retains `reference`/`date`/`status` props that no longer render. |
| `SkipLink` | First focusable element in the DOM. |

**Record (signature components)**

| Component | Notes |
|---|---|
| `RecordCard` | The hero object — a real work order: WO number, property line, findings, photo slots, status stamp. Also on `/sample-report`. |
| `StatusStamp` | `complete` / `scheduled` / `needs-attention`. The only animated element on the site. |
| `PhotoPlate` | Image with a caption bar. Falls back to `PropertyScene` line art plus a "real job photograph pending" caption. `alt` is required and must not be empty. |
| `FieldNote` | Inset annotation with a left accent rule. |
| `Checklist` | Inspection-sheet list with square checkboxes. |

**Trust**

| Component | Notes |
|---|---|
| `TrustBar` | The four `CREDENTIALS` as a compact badge row, under the hero. **Server component** — it sits above the fold on a CLS-tested route. |
| `CredentialGrid` | The same four with their explanatory sentence. |
| `ProofPanel` | Vendor-qualification rows on `/for/property-managers`. |

Nothing in this group may render a rating, a star, a review count or a self-issued badge. Section 8 bans review structured data until there are genuine reviews.

**Content**

`DivisionGrid` / `DivisionCard`, `PriceTable` (**always renders the effective-date line**), `PlanComparison` (three tiers, one featured, flag top-right so it never covers the heading), `AudienceHero`, `SLATable`, `SavingsPanel` (**must not render a percentage** — see 9.5), `FAQ` (`<details>`-based, no JS), `ServiceAreaMap` (static SVG), `CTABlock` (`portfolio` / `single`).

**Art**

`components/art/PropertyScene.tsx` exports `PropertyScene` and `PropertyGlyph`. Original line art, CSS-variable fills so it re-themes, `viewBox` supplying the intrinsic ratio so it costs nothing against CLS. Any new artwork follows the same three rules: a `viewBox`, no fixed `height`, and never client-gated.

**UI primitives**

`Button` (primary / secondary / quiet), `Field`, `Chip`, `Callout` (note / caution), `Prose`.

### 5.7 Iconography

Lucide, `stroke-width: 1.5` for decorative-scale glyphs and `2` for small badge marks, sized to the type.

Icons are allowed where they carry meaning: the credential badges, the two hero doors, status, file type, phone. They are still not decoration — do not put an arbitrary icon at the top of every card.

---

## 6. Page specifications

### 6.1 Home — `/`

The hero is **not** a headline over a photo with a gradient. The hero is two things at once: a plain sentence that tells a visitor which of them this is for, and the product itself — a `RecordCard` showing what a client actually receives after a visit.

```
┌──────────────────────────────────────────────────────────────┐
│ SiteHeader                                       (512) ... ▸ │
├──────────────────────────────────────────────────────────────┤
│  Someone looking after the       What you receive after      │
│  property when you can't.        every visit                 │
│                                  ┌────────────────────────┐  │
│  Maintenance on a schedule,      │ WO-1428    ⟨COMPLETE⟩  │  │
│  and a dated photo record        │ 412 Oak Grove, Elgin   │  │
│  after every visit.              │ ─────────────────────  │  │
│                                  │ ▪ Filter replaced      │  │
│  ┌──────────────┬─────────────┐  │ ▪ Detector tested      │  │
│  │ For          │ For my home │  │ ▪ Hose bib drip        │  │
│  │ properties I │ Get a       │  │ [img] [img] [img]      │  │
│  │ manage       │ written     │  │ 09.14.26 14:22–15:05   │  │
│  └──────────────┴─────────────┘  └────────────────────────┘  │
│                                                              │
│  ✓ Insured        ✓ Background-checked technicians           │
│  ✓ Written price  ✓ Verified partner licences                │
├──────────────────────────────────────────────────────────────┤
│  What we do                        [4 launched services]     │
│  ┌────────┬────────┬────────┬────────┐                       │
│  │Property│ Field  │ Home   │Exterior│                       │
│  │ Care   │Inspect.│ Repair │ Care   │                       │
│  └────────┴────────┴────────┴────────┘                       │
│  Coming later: Turn Services, Emergency Response, …          │
├──────────────────────────────────────────────────────────────┤
│  Who we work for                                             │
│  [Property managers] [Investors] [Short-term rentals]        │
├──────────────────────────────────────────────────────────────┤
│  Property Care plans                                         │
│  $49 / $89 featured / $149          [ See what's included ]  │
├──────────────────────────────────────────────────────────────┤
│  What we do not do                                           │
│  ┌─────────────────────┬─────────────────────┐               │
│  │ We do not perform   │ What we do instead  │               │
│  └─────────────────────┴─────────────────────┘               │
├──────────────────────────────────────────────────────────────┤
│  See a real report          [ View the sample report ]       │
├──────────────────────────────────────────────────────────────┤
│  Questions people actually ask      [ 5 FAQs, not 10 ]       │
├──────────────────────────────────────────────────────────────┤
│ SiteFooter — NAP, licensed-partner disclosure, legal         │
└──────────────────────────────────────────────────────────────┘
```

**The two doors.** A homeowner and a property manager do not describe themselves the same way, and the page should not make either of them work out which half is theirs. "For properties I manage" carries `?type=property-manager&intent=audit`, so `/request` opens on the three-property audit heading; "For my home" goes to the plain form. The portfolio door stays first in the DOM and visually primary, because Section 1.2 ranks that lead roughly 10× the homeowner one — serving both audiences is not the same as weighting them equally.

The previous headline — *"We maintain property for people who aren't standing in front of it"* — was well written and actively excluded half the audience. A homeowner standing in their own kitchen reads it and leaves. Do not reintroduce a headline that defines the customer by absence.

**The credential row.** `TrustBar` renders the four `CREDENTIALS` directly under the doors. Everything in it must be something the business can produce on request. No ratings, no stars, no testimonials — Section 8.

**The licensing boundary is unusual and deliberate.** Stating it plainly reads as professional to a property manager, because the vendors who get them sued are the ones who quietly did a little electrical work on the side. It renders as two cards — what we do not perform, and what we do instead — with the longer argument on `/legal/licensed-partners`. Keep it a real section on the home page. Do not bury it in the footer.

**Five FAQs, not ten.** `faqsFor('home')` is deliberately the shortest context. The rest still render on `/plans`, `/for/*` and `/request`, where the reader has already self-selected.

### 6.2 Plans — `/plans`

The highest-value page on the site. Three tiers, monthly price shown large and unambiguous, `standard` featured. Below the tiers: a `Checklist` detailing exactly what a quarterly inspection covers — the fifteen inspection areas from the business plan, because specificity is what makes $89/month feel like a real product rather than a vague retainer.

Portfolio pricing gets a panel, not a price: "Managing more than five properties? Pricing is by door count." → `/for/property-managers`.

### 6.3 Division pages — `/services/[division]`

```
┌────────┬─────────────────────────────────────────┐
│ DIV-01 │  Property Care                          │
│        │  [promise sentence, text-lg]            │
│        │  [PhotoPlate — real job photo, dated]   │
├────────┼─────────────────────────────────────────┤
│        │  What's included        [Checklist]     │
├────────┼─────────────────────────────────────────┤
│        │  Pricing                [PriceTable]    │
│        │  Pricing effective September 2026       │
├────────┼─────────────────────────────────────────┤
│        │  Who this is for        [audience tags] │
├────────┼─────────────────────────────────────────┤
│        │  [CTABlock — variant by audience]       │
└────────┴─────────────────────────────────────────┘
```

Pages where any service has `licensedTradeRequired: true` render a `Callout variant="caution"` above the price table stating the work is performed by a licensed partner contractor.

### 6.4 `/for/property-managers`

The B2B conversion page. Must contain, in this order: the vacancy-cost argument, the SLA table, a sample report link, an explicit "certificate of insurance available on request" line, the portfolio pricing inquiry form entry, and the free three-property audit offer. That last one is the actual opening offer the business leads with — give it a prominent block.

### 6.5 `/for/investors`

Leads with Vacant Property Watch. The argument: you do not need a handyman, you need someone physically standing at the asset. Include condition reporting and, as a forward-looking note, asset forecasting — clearly marked as a Phase 4 capability, not sold as available today.

### 6.6 `/sample-report`

An anonymized real inspection report as a downloadable PDF. This converts better than any amount of copy.

**Do not gate it behind a form.** The friction costs more leads than the email addresses are worth at this stage. Place a `CTABlock` immediately beneath the download instead.

### 6.7 `/service-area` and `/service-area/[city]`

Cities: Elgin, Bastrop, Manor, Taylor, Pflugerville. Each city page: which services are offered there, honest drive-time note, local JSON-LD. Do not generate thin duplicate pages — each needs at least one genuinely local paragraph.

---

## 7. The request form — `/request`

The single most important interactive component. Its field list determines the quality of every lead.

### 7.1 Schema

```ts
// lib/schemas/lead.ts
import { z } from 'zod';

export const leadSchema = z.object({
  customerType: z.enum([
    'homeowner','property-manager','investor',
    'str-operator','realtor','hoa','commercial',
  ]),
  propertyCount: z.coerce.number().int().min(1).max(500).default(1),

  address:  z.string().min(5).max(200),
  city:     z.string().min(2).max(80),
  zip:      z.string().regex(/^\d{5}$/),

  /** REQUIRED. Gates lead-paint (RRP) work downstream. See 9.3. */
  yearBuilt: z.coerce.number().int().min(1800).max(new Date().getFullYear()),

  occupancy: z.enum(['occupied','vacant','between-tenants','unknown']),
  divisions: z.array(divisionSlugSchema).min(1),
  description: z.string().min(10).max(2000),
  urgency: z.enum(['emergency','this-week','flexible']),

  /**
   * How we arrange entry — NOT the code itself.
   * Placeholder: "Who do we contact to arrange entry?"
   * See 9.4. Server rejects anything matching a code-like pattern.
   */
  accessNotes: z.string().max(500).optional(),

  photoUrls: z.array(z.string().url()).max(6).default([]),

  name:  z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  contactPreference: z.enum(['phone','text','email']),

  company: z.string().max(120).optional(),

  /** Honeypot — must be empty. */
  website: z.string().max(0).optional(),
  turnstileToken: z.string().min(1),
});
```

### 7.2 Layout

Single page, progressive disclosure. Not a multi-step wizard — wizards lose people on mobile, and every field here is short.

```
┌───────────────────────────────────────────────────┐
│  Request service                                  │
│  Tell us about the property. We reply within one  │
│  business day.                                    │
├───────────────────────────────────────────────────┤
│  1 │ Who are you?                                 │
│    │ ( ) Homeowner        ( ) Property manager    │
│    │ ( ) Investor         ( ) Short-term rental   │
│    │ ( ) Realtor          ( ) HOA                 │
│    │ ( ) Commercial                               │
│    │                                              │
│    │ ▸ if not homeowner: [Company]                │
│    │ ▸ if PM/investor:   [How many properties?]   │
├───────────────────────────────────────────────────┤
│  2 │ The property                                 │
│    │ [Address                    ]                │
│    │ [City        ] [ZIP    ]                     │
│    │ [Year built  ] ← required, help text below   │
│    │   "Helps us apply the right safety rules      │
│    │    for older homes."                          │
│    │ Occupancy: ( ) Occupied ( ) Vacant           │
│    │            ( ) Between tenants ( ) Not sure  │
├───────────────────────────────────────────────────┤
│  3 │ What do you need?                            │
│    │ [ ] Property Care   [ ] Field Inspections    │
│    │ [ ] Home Repair     [ ] Exterior Care        │
│    │ [ ] Something else                           │
│    │ [Describe it                            ]    │
│    │ Urgency: ( ) Emergency ( ) This week         │
│    │          ( ) Flexible                        │
│    │ Photos (optional, up to 6)  [ Add photos ]   │
│    │   "Photos make our quote much more accurate." │
├───────────────────────────────────────────────────┤
│  4 │ How we reach you                             │
│    │ [Name] [Email] [Phone]                       │
│    │ Prefer: ( ) Phone ( ) Text ( ) Email         │
│    │ [Who do we contact to arrange entry?     ]   │
│    │   "Don't send gate or lockbox codes here —   │
│    │    we'll collect those securely later."       │
├───────────────────────────────────────────────────┤
│  [Turnstile]          [ Send request ]            │
└───────────────────────────────────────────────────┘
```

### 7.3 Server handling — `app/api/lead/route.ts`

Order of operations, and it matters:

1. Rate limit by IP. 429 on exceed.
2. Honeypot check — if `website` is non-empty, return 200 with a success shape and discard. Do not tell a bot it failed.
3. Verify Turnstile server-side.
4. Parse with `leadSchema`. 400 with field errors on failure.
5. **Scan `accessNotes` for code-like patterns** (4+ consecutive digits, or the words `code`, `lockbox`, `gate code`, `alarm`). If matched, strip the field, persist a `accessNotesRedacted: true` flag, and return success. Never store the code.
6. Persist to Postgres. **This happens before the email.** A lead that fails to email but is stored is recoverable; the reverse is not.
7. Classify priority via `lib/routing.ts`.
8. Send the notification email to the matching recipient list.
9. If email fails, log it and still return success — the lead is already saved.
10. Return `{ ok: true, reference }` where `reference` is a short human-readable ID shown on the thanks page.

### 7.4 Lead routing

```ts
// lib/routing.ts
export function classifyLead(lead: Lead): 'priority' | 'standard' {
  if (lead.urgency === 'emergency') return 'priority';
  if (lead.propertyCount > 1) return 'priority';
  return (['property-manager','investor','str-operator','realtor','hoa','commercial'] as const)
    .includes(lead.customerType as never) ? 'priority' : 'standard';
}
```

Priority leads go to `LEAD_NOTIFY_PRIORITY` with subject `[PRIORITY] {customerType} — {city} — {propertyCount} properties`. Standard leads go to `LEAD_NOTIFY_STANDARD`.

These two must never share a queue. A twenty-door property management inquiry sitting in the same inbox as a request to hang a TV is how the business loses its most valuable lead.

### 7.5 Thanks page — `/request/thanks`

Confirm what happens next and when, show the reference number in mono, and restate the response commitment. Do not upsell here.

---

## 8. SEO and structured data

- `LocalBusiness` JSON-LD sitewide with NAP from `content/company.ts`
- `Service` JSON-LD on each fully-launched division page
- `FAQPage` JSON-LD where FAQs render
- `BreadcrumbList` on nested routes
- Unique `title` and `description` per route — no templated duplicates
- `app/sitemap.ts` generated from the content data, not hand-maintained
- OG images via `opengraph-image.tsx`

**Do not** add `AggregateRating` or `Review` structured data. There are no reviews yet, and fabricated ones are both a Google penalty and an FTC problem.

---

## 9. Compliance rules — non-negotiable

These exist because the business operates inside real Texas licensing law and federal EPA rules. Treat each as a build requirement, not a content preference. Implement Section 9.6 so violations fail CI rather than relying on review.

### 9.1 Never describe unlicensed trade work as a service we provide

Banned as descriptions of our own services, anywhere in the codebase or content:

> "plumbing services", "plumbing repair", "electrical services", "electrical repair", "HVAC repair", "AC repair", "air conditioning repair", "pest control", "extermination", "irrigation repair", "sprinkler repair"

Required phrasing instead:

| Never | Always |
|---|---|
| Plumbing services | Plumbing coordination |
| Electrical repair | Electrical inspection and licensed vendor dispatch |
| HVAC repair | HVAC filter program and contractor management |
| Pest control | Pest inspection and vendor coordination |
| Irrigation repair | Irrigation observation and licensed irrigator referral |

### 9.2 Licensed-partner disclosure

`SiteFooter` renders on every page:

> Licensed trade work — plumbing, electrical, HVAC, irrigation, and pest control — is performed by verified, insured, licensed partner contractors.

Plus a full `/legal/licensed-partners` page explaining the model and the vetting standard.

### 9.3 Year built is mandatory

`yearBuilt` is required in the lead schema, with no default and no "I don't know" escape. The EPA Renovation, Repair and Painting rule can require Lead-Safe Certified Firm status for qualifying work in pre-1978 housing, and the business gates paint and demolition scheduling on it.

The notification email must display a visible flag when `yearBuilt < 1978`:

> ⚠ PRE-1978 — RRP rule may apply. Confirm certification before scoping paint or demolition.

### 9.4 Never collect or store access codes

The form has no field for gate codes, lockbox codes, or alarm codes. `accessNotes` asks who to contact, and its help text says so explicitly. The server strips code-like patterns (Section 7.3, step 5).

Rationale worth understanding: this business accumulates a list of vacant properties and how to enter them. That belongs in an access-controlled field service platform, not in a website's form store, an email inbox, or a spreadsheet.

### 9.5 No savings claims

Banned anywhere: "save 30%", "guaranteed savings", "we'll cut your costs", "guaranteed", and any percentage attached to savings.

`SavingsPanel` renders the four defensible categories — prevention, vacancy, dispatch, portfolio pricing — with specific examples and no percentages. Where avoided-loss figures appear, they are phrased as *potential avoided-loss exposure* and attributed to the market source.

### 9.6 Enforcement

Write `scripts/compliance-check.ts`, run it in `pnpm lint` and in CI:

1. Grep all `content/**` and `app/**` for banned phrases from 9.1 and 9.5 → fail with file and line.
2. Assert `leadSchema.shape.yearBuilt` is not optional and has no default.
3. Assert the lead schema has no key matching `/code|lockbox|alarm|pin/i`.
4. Assert `SiteFooter` contains the 9.2 disclosure string.
5. Assert every `Division` and `Service` with `licensedTradeRequired: true` renders a caution callout.

A failing check blocks the build. This is cheaper than remembering.

---

## 10. Accessibility and performance

- WCAG 2.1 AA. A meaningful share of homeowner customers are older; this is a business requirement, not a checkbox.
- All interactive elements keyboard reachable with a visible focus ring — `2px solid var(--hivis-ink)` with `2px` offset. Never `outline: none` without a replacement.
- Every `PhotoPlate` requires non-empty `alt`. Enforce with a TS type, not a convention.
- Form errors: `aria-describedby`, `aria-invalid`, focus moves to the first invalid field on submit, errors announced via a live region.
- Touch targets ≥ 44px.
- `prefers-reduced-motion: reduce` disables the stamp animation and all transitions.
- Colour is never the sole carrier of meaning — status chips have text labels, not just fills.

**Performance targets.** This site gets loaded on a phone in a driveway on rural Bastrop County signal.

| Metric | Target |
|---|---|
| LCP | < 2.0s on 4G |
| CLS | < 0.05 |
| INP | < 200ms |
| JS on a static page | < 90KB gzipped |
| Lighthouse (all four) | ≥ 95 |

Static generation everywhere except `/request` and the API routes. `next/image` with explicit dimensions on every photo.

---

## 11. Build order

Work in these increments. Each is independently reviewable — stop and report after each.

**Increment 1 — Foundation**
Reconcile with existing repo. Scaffold or extend. Tokens in `globals.css`, Tailwind `@theme`, fonts, `Container`, `RecordRail`, `SiteHeader`, `SiteFooter`, UI primitives.
*Done when:* an empty page renders with correct tokens, header, footer, and a passing accessibility audit.

**Increment 2 — Content layer**
`content/types.ts` plus all six content files, fully authored for Phase 1. Zod schemas validating the content at build time.
*Done when:* `pnpm build` fails if any content object is malformed, and no price string exists in any component.

**Increment 3 — Record components**
`RecordCard`, `StatusStamp`, `PhotoPlate`, `FieldNote`, `Checklist`.
*Done when:* the stamp animates once, respects reduced motion, and `PhotoPlate` will not compile without `alt`.

**Increment 4 — Core pages**
Home, `/services`, `/services/[division]`, `/plans`.
*Done when:* all four launched divisions render from content data, placeholder divisions render correctly, and every price table shows its effective date.

**Increment 5 — The form**
Schema, UI, upload, API route, storage, routing, email templates, thanks page.
*Done when:* a priority lead and a standard lead each arrive at the correct address, a pre-1978 submission carries the RRP flag, and a submission containing a code-like string in `accessNotes` is stored redacted.

**Increment 6 — Remaining pages and SEO**
`/for/*`, `/sample-report`, `/service-area/*`, `/about`, `/legal/*`, JSON-LD, sitemap, OG images.

**Increment 7 — Compliance, tests, polish**
`scripts/compliance-check.ts` wired into CI. Playwright covering the happy path and both routing branches. Lighthouse verification. Reduced-motion and keyboard passes.

### Test coverage required

- `classifyLead` — all seven customer types, emergency override, multi-property override
- `leadSchema` — rejects missing `yearBuilt`, rejects >6 photos, rejects non-empty honeypot
- Access-code redaction — a string containing `gate code 4471` is stored redacted
- Playwright — submit as homeowner, submit as property manager, verify different routing
- Playwright — keyboard-only completion of the form

---

## 12. Open questions — ask before assuming

1. **Repo state.** What exists today? Report before scaffolding.
2. **Business name and entity.** "MaintenanceCare" is the repo name. Is it the trading name? It affects logo, metadata, and legal pages.
3. **Real photography.** Are job photos available? If not, the build uses neutral placeholder blocks — stock photography is not an acceptable substitute here.
4. **Phone number and NAP.** Needed for `content/company.ts` and `LocalBusiness` JSON-LD.
5. **Sample report.** Does an anonymized inspection report PDF exist, or does the build ship `/sample-report` behind a "coming soon" state?
6. **Service radius.** The business plan flags drive time as the fastest way to destroy margin. What is the honest radius?
7. **Domain.** Needed for canonical URLs, sitemap, and OG image absolute paths.

---

## 13. Deliberately deferred

Recorded so they are not rediscovered as gaps:

| Deferred | Phase | Note |
|---|---|---|
| Client portal | 3+ | Report delivery is email until volume justifies otherwise |
| Online booking | 2 | Requires the field service platform's calendar first |
| Payments | 2 | Invoicing lives in the accounting system, not the site |
| Asset lifecycle UI | 4 | The one custom build genuinely worth doing later |
| Turn Services full page | 2 | Placeholder until the first turnovers are delivered |
| Emergency dispatch UI | 3 | Placeholder until on-call rotation is defined |
| Live map | 2 | Static SVG is enough and much faster |
| Reviews / testimonials | When real | Never fabricate; no `Review` schema until genuine |
