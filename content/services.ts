import type { Service, ServiceId } from './types';
import { PRICING_EFFECTIVE as E } from './divisions';

/**
 * The priced catalogue. Every item carries an effective date because the
 * business reviews benchmarks quarterly, and the site renders that date
 * beneath every price table.
 *
 * Scoping note: fixture work that touches supply or branch circuits is marked
 * `licensedTradeRequired` and priced as a coordinated job rather than a flat
 * rate. That is the conservative reading of Texas licensing, and it is also the
 * reason a property manager can hand us a portfolio without a compliance review.
 */
export const services: Service[] = [
  // ── Property Care ────────────────────────────────────────────────────────
  {
    id: 'property-care-essential',
    division: 'property-care',
    name: 'Property Care — Essential',
    description:
      'Quarterly exterior check with a photo record, priority scheduling, and a discounted service call rate.',
    phase: 1,
    pricing: { kind: 'included', inPlan: 'essential' },
    taxable: 'verify',
  },
  {
    id: 'property-care-standard',
    division: 'property-care',
    name: 'Property Care — Standard',
    description:
      'Quarterly full property inspection with filter service, detector testing, minor adjustments and a photo report.',
    phase: 1,
    pricing: { kind: 'included', inPlan: 'standard' },
    taxable: 'verify',
  },
  {
    id: 'property-care-premium',
    division: 'property-care',
    name: 'Property Care — Premium',
    description:
      'Monthly exterior checks, quarterly interior inspection, priority response and an annual gutter or pressure-wash credit.',
    phase: 1,
    pricing: { kind: 'included', inPlan: 'premium' },
    taxable: 'verify',
  },
  {
    id: 'hvac-filter-service',
    division: 'property-care',
    name: 'HVAC filter service',
    description:
      'Filter replacement labour with the size recorded on the property file, plus a return-air and thermostat observation. Part of our HVAC filter programme; system repair is handled by a licensed contractor.',
    phase: 1,
    pricing: { kind: 'range', low: 25, high: 39, unit: 'per-visit', effectiveDate: E, note: 'Plus filter cost' },
    includes: [
      'Correct filter size recorded on the property file',
      'Return air and vent observation',
      'Thermostat setting and battery check',
      'Photograph of the installed filter with date',
    ],
    taxable: 'verify',
  },
  {
    id: 'smoke-co-check',
    division: 'property-care',
    name: 'Smoke and CO safety check',
    description:
      'Every detector tested, batteries dated, missing or expired units reported. Texas requires working smoke detectors in rental property; this is the record that shows you met it.',
    phase: 1,
    pricing: { kind: 'range', low: 35, high: 75, unit: 'per-property', effectiveDate: E, note: 'Plus devices' },
    includes: [
      'Test button and, where fitted, smoke-entry verification on every unit',
      'Battery replacement with install date written on the unit',
      'Manufacture-date check — detectors expire at ten years',
      'Written list of missing or expired units by room',
    ],
    taxable: 'verify',
  },
  {
    id: 'water-heater-flush-observation',
    division: 'property-care',
    name: 'Water heater observation and data capture',
    description:
      'Age, model, capacity and visible condition recorded with a photograph of the data plate, plus a corrosion and pan check. Any repair is scoped for a licensed plumber.',
    phase: 1,
    pricing: { kind: 'range', low: 45, high: 85, unit: 'per-visit', effectiveDate: E },
    licensedTradeRequired: true,
    taxable: 'verify',
  },
  {
    id: 'seasonal-checklist',
    division: 'property-care',
    name: 'Seasonal readiness visit',
    description:
      'Freeze preparation in autumn, cooling-season readiness in spring. Hose bibs, exposed lines, attic access, weather seals and drainage.',
    phase: 1,
    pricing: { kind: 'range', low: 95, high: 165, unit: 'per-visit', effectiveDate: E },
    taxable: 'verify',
  },

  // ── Field Inspections ────────────────────────────────────────────────────
  {
    id: 'health-check-basic',
    division: 'field-inspections',
    name: 'Property Health Check — Basic',
    description:
      'Exterior walk and key interior observation with a photo summary. The fastest way to answer "what condition is it in right now?"',
    phase: 1,
    pricing: { kind: 'range', low: 79, high: 99, unit: 'flat', effectiveDate: E },
    includes: [
      'Full exterior perimeter walk',
      'Roofline and drainage observation from ground level',
      'Entry, window and lock integrity check',
      '10–15 dated photographs',
      'One-page summary emailed same day',
    ],
    taxable: 'verify',
  },
  {
    id: 'health-check-standard',
    division: 'field-inspections',
    name: 'Property Health Check — Standard',
    description:
      'Interior and exterior inspection against our fifteen-area checklist, with photographs on every finding.',
    phase: 1,
    pricing: { kind: 'range', low: 119, high: 149, unit: 'flat', effectiveDate: E },
    includes: [
      'Everything in the Basic check',
      'Room-by-room interior walk',
      'Visible leak, stain and moisture observation',
      'Detector and safety device verification',
      'Appliance operation observation',
      '25–40 dated photographs',
    ],
    taxable: 'verify',
  },
  {
    id: 'health-check-detailed',
    division: 'field-inspections',
    name: 'Property Health Check — Detailed report',
    description:
      'The full inspection plus a written condition report with severity ratings, recommended actions and an asset inventory. Built to be forwarded to an owner, lender or insurer.',
    phase: 1,
    pricing: { kind: 'range', low: 179, high: 249, unit: 'flat', effectiveDate: E },
    includes: [
      'Everything in the Standard check',
      'Severity rating on every finding',
      'Major system inventory with ages where the data plate is readable',
      'Recommended action and rough cost band per finding',
      'Formatted PDF suitable for forwarding to an owner or lender',
    ],
    taxable: 'verify',
  },
  {
    id: 'vacant-watch-biweekly',
    division: 'field-inspections',
    name: 'Vacant Property Watch — biweekly',
    description:
      'A documented visit every two weeks. Water intrusion, pest evidence, forced entry, landscaping and mail accumulation.',
    phase: 1,
    pricing: { kind: 'range', low: 99, high: 159, unit: 'per-month', effectiveDate: E },
    includes: [
      'Two documented visits per month',
      'Interior and exterior walk each visit',
      'Water intrusion and freeze-risk checks',
      'Forced entry, vandalism and squatter evidence check',
      'Mail, flyer and notice accumulation cleared',
      'Same-day photo report after every visit',
      'Escalation call within the hour on anything urgent',
    ],
    taxable: 'verify',
  },
  {
    id: 'vacant-watch-weekly',
    division: 'field-inspections',
    name: 'Vacant Property Watch — weekly',
    description:
      'A documented visit every week. The cadence most insurers and lenders want to see on an unoccupied asset.',
    phase: 1,
    pricing: { kind: 'range', low: 149, high: 249, unit: 'per-month', effectiveDate: E },
    includes: [
      'Four documented visits per month',
      'Everything in the biweekly programme',
      'Weekly photo log suitable for an insurance file',
      'Priority scheduling on any follow-up work',
    ],
    taxable: 'verify',
  },
  {
    id: 'storm-check',
    division: 'field-inspections',
    name: 'Post-storm property check',
    description:
      'Dispatched after a named weather event. Exterior damage documentation, water intrusion check and a dated photo set for the claim file.',
    phase: 1,
    pricing: { kind: 'range', low: 95, high: 175, unit: 'flat', effectiveDate: E },
    taxable: 'verify',
  },
  {
    id: 'move-in-condition-report',
    division: 'field-inspections',
    name: 'Move-in / move-out condition report',
    description:
      'Room-by-room photographic condition record at handover. The document that settles a deposit dispute before it becomes one.',
    phase: 1,
    pricing: { kind: 'range', low: 145, high: 235, unit: 'flat', effectiveDate: E },
    taxable: 'verify',
  },

  // ── Home Repair — hourly and call minimum ────────────────────────────────
  {
    id: 'handyman-call-minimum',
    division: 'home-repair',
    name: 'Service call minimum',
    description:
      'Covers the trip and the first block of work. Applied once per visit, not per task — stack several small jobs into one call.',
    phase: 1,
    pricing: { kind: 'from', low: 95, unit: 'flat', effectiveDate: E },
    taxable: 'verify',
  },
  {
    id: 'handyman-hourly',
    division: 'home-repair',
    name: 'Hourly rate, after the minimum',
    description:
      'For work that has no flat rate. Quoted in advance with a not-to-exceed figure, so an hourly rate never turns into an open cheque.',
    phase: 1,
    pricing: { kind: 'range', low: 85, high: 105, unit: 'per-hour', effectiveDate: E },
    taxable: 'verify',
  },

  // ── Home Repair — the flat-rate menu (16 items) ──────────────────────────
  {
    id: 'door-adjustment',
    division: 'home-repair',
    name: 'Door adjustment or realignment',
    description: 'Sticking, dragging or misaligned door rehung and adjusted, strike plate reset.',
    phase: 1,
    pricing: { kind: 'range', low: 75, high: 150, unit: 'flat', effectiveDate: E },
    flatRateMenu: true,
    taxable: 'verify',
  },
  {
    id: 'drywall-patch-small',
    division: 'home-repair',
    name: 'Drywall patch — small (to 1 sq ft)',
    description: 'Cut, patch, tape, float and sand ready for paint. Texture matched where possible.',
    phase: 1,
    pricing: { kind: 'range', low: 100, high: 200, unit: 'flat', effectiveDate: E },
    flatRateMenu: true,
    leadPaintGated: true,
    taxable: 'verify',
  },
  {
    id: 'drywall-patch-large',
    division: 'home-repair',
    name: 'Drywall patch — large (to 4 sq ft)',
    description: 'Larger opening patched with backing, taped, floated and sanded.',
    phase: 1,
    pricing: { kind: 'range', low: 175, high: 325, unit: 'flat', effectiveDate: E },
    flatRateMenu: true,
    leadPaintGated: true,
    taxable: 'verify',
  },
  {
    id: 'interior-door-install',
    division: 'home-repair',
    name: 'Interior door install — pre-hung',
    description: 'Old unit removed, pre-hung door set, shimmed, hung and hardware fitted.',
    phase: 1,
    pricing: { kind: 'range', low: 185, high: 285, unit: 'flat', effectiveDate: E, note: 'Door supplied by you or quoted separately' },
    flatRateMenu: true,
    taxable: 'verify',
  },
  {
    id: 'blind-install',
    division: 'home-repair',
    name: 'Blind or shade install — per window',
    description: 'Brackets set level, unit hung and operation tested.',
    phase: 1,
    pricing: { kind: 'range', low: 45, high: 85, unit: 'flat', effectiveDate: E },
    flatRateMenu: true,
    taxable: 'verify',
  },
  {
    id: 'shelving-install',
    division: 'home-repair',
    name: 'Shelving install — per run',
    description: 'Wall-mounted or closet shelving set into studs or rated anchors, levelled.',
    phase: 1,
    pricing: { kind: 'range', low: 95, high: 185, unit: 'flat', effectiveDate: E },
    flatRateMenu: true,
    taxable: 'verify',
  },
  {
    id: 'tv-mount',
    division: 'home-repair',
    name: 'TV mount — up to 65 inch',
    description: 'Bracket set into studs, unit hung, cables dressed. Cable concealment quoted separately.',
    phase: 1,
    pricing: { kind: 'range', low: 125, high: 195, unit: 'flat', effectiveDate: E },
    flatRateMenu: true,
    taxable: 'verify',
  },
  {
    id: 'caulk-reseal-bath',
    division: 'home-repair',
    name: 'Bath or shower caulk and reseal',
    description: 'Old sealant cut out, surfaces cleaned and dried, new mildew-resistant sealant run.',
    phase: 1,
    pricing: { kind: 'range', low: 95, high: 165, unit: 'flat', effectiveDate: E },
    flatRateMenu: true,
    taxable: 'verify',
  },
  {
    id: 'weatherstrip-door',
    division: 'home-repair',
    name: 'Exterior door weatherstrip and sweep',
    description: 'Perimeter seal and threshold sweep replaced. A cheap fix that shows up on the next utility bill.',
    phase: 1,
    pricing: { kind: 'range', low: 75, high: 135, unit: 'flat', effectiveDate: E },
    flatRateMenu: true,
    taxable: 'verify',
  },
  {
    id: 'cabinet-hardware',
    division: 'home-repair',
    name: 'Cabinet hardware — per 10 pieces',
    description: 'Knobs or pulls fitted on a jig so the run is consistent.',
    phase: 1,
    pricing: { kind: 'range', low: 85, high: 145, unit: 'flat', effectiveDate: E },
    flatRateMenu: true,
    taxable: 'verify',
  },
  {
    id: 'fence-picket-repair',
    division: 'home-repair',
    name: 'Fence picket repair — to 10 pickets',
    description: 'Damaged pickets replaced and rails re-secured. Materials itemised.',
    phase: 1,
    pricing: { kind: 'range', low: 125, high: 225, unit: 'flat', effectiveDate: E },
    flatRateMenu: true,
    taxable: 'verify',
  },
  {
    id: 'fence-gate-rehang',
    division: 'home-repair',
    name: 'Fence gate rehang or adjust',
    description: 'Sagging gate squared, hinges and latch reset, post checked.',
    phase: 1,
    pricing: { kind: 'range', low: 95, high: 185, unit: 'flat', effectiveDate: E },
    flatRateMenu: true,
    taxable: 'verify',
  },
  {
    id: 'trim-baseboard-repair',
    division: 'home-repair',
    name: 'Trim or baseboard repair — per 10 ft',
    description: 'Damaged trim removed and replaced, mitred, filled and caulked ready for paint.',
    phase: 1,
    pricing: { kind: 'range', low: 95, high: 175, unit: 'flat', effectiveDate: E },
    flatRateMenu: true,
    leadPaintGated: true,
    taxable: 'verify',
  },
  {
    id: 'screen-repair',
    division: 'home-repair',
    name: 'Window screen repair — per screen',
    description: 'Screen re-meshed or frame replaced and refitted.',
    phase: 1,
    pricing: { kind: 'range', low: 45, high: 95, unit: 'flat', effectiveDate: E },
    flatRateMenu: true,
    taxable: 'verify',
  },
  {
    id: 'mailbox-post-reset',
    division: 'home-repair',
    name: 'Mailbox or post reset',
    description: 'Leaning or damaged post reset plumb and secured, box refitted.',
    phase: 1,
    pricing: { kind: 'range', low: 95, high: 185, unit: 'flat', effectiveDate: E },
    flatRateMenu: true,
    taxable: 'verify',
  },
  {
    id: 'paint-single-room',
    division: 'home-repair',
    name: 'Paint single room — walls, standard 12 × 12',
    description: 'Walls prepped, cut in and rolled, two coats. Ceiling and trim quoted separately.',
    phase: 1,
    pricing: { kind: 'range', low: 275, high: 475, unit: 'flat', effectiveDate: E, note: 'Paint supplied by you or itemised' },
    flatRateMenu: true,
    leadPaintGated: true,
    taxable: 'verify',
  },
  {
    id: 'punch-list-half-day',
    division: 'home-repair',
    name: 'Punch list — half day (to 4 hours)',
    description:
      'A block of small jobs handled in one visit. Cheaper than pricing each item, and the way most turnovers should be bought.',
    phase: 1,
    pricing: { kind: 'range', low: 325, high: 425, unit: 'flat', effectiveDate: E },
    flatRateMenu: true,
    taxable: 'verify',
  },

  // ── Home Repair — coordinated licensed work ──────────────────────────────
  {
    id: 'fixture-coordination',
    division: 'home-repair',
    name: 'Fixture replacement coordination',
    description:
      'Faucets, toilets, disposals, ceiling fans and light fixtures. We scope the job, photograph it, supply access and manage a licensed partner contractor through to close-out.',
    phase: 1,
    pricing: { kind: 'quote', note: 'Quoted with the licensed partner — we do not mark up their labour silently' },
    licensedTradeRequired: true,
    taxable: 'verify',
  },

  // ── Exterior Care ────────────────────────────────────────────────────────
  {
    id: 'lawn-standard-lot',
    division: 'exterior-care',
    name: 'Lawn service — standard lot',
    description: 'Mow, edge, line trim and blow down. Clippings removed on request.',
    phase: 1,
    pricing: { kind: 'range', low: 55, high: 75, unit: 'per-visit', effectiveDate: E },
    taxable: 'verify',
  },
  {
    id: 'lawn-large-lot',
    division: 'exterior-care',
    name: 'Lawn service — large lot (over ¼ acre)',
    description: 'Mow, edge, line trim and blow down on a larger lot, quoted by area.',
    phase: 1,
    pricing: { kind: 'range', low: 85, high: 145, unit: 'per-visit', effectiveDate: E },
    taxable: 'verify',
  },
  {
    id: 'gutter-clean-single',
    division: 'exterior-care',
    name: 'Gutter cleaning — single story',
    description: 'Runs cleared by hand, downspouts flushed and flow verified, debris hauled away.',
    phase: 1,
    pricing: { kind: 'range', low: 125, high: 175, unit: 'flat', effectiveDate: E },
    includes: [
      'Runs cleared by hand, not blown onto the roof',
      'Downspouts flushed and flow verified at the outlet',
      'Debris bagged and hauled away',
      'Photographs of every run before and after',
      'Loose hangers and separated seams reported',
    ],
    taxable: 'verify',
  },
  {
    id: 'gutter-clean-two-story',
    division: 'exterior-care',
    name: 'Gutter cleaning — two story',
    description: 'As single story, with the access and time a second storey takes.',
    phase: 1,
    pricing: { kind: 'range', low: 195, high: 295, unit: 'flat', effectiveDate: E },
    taxable: 'verify',
  },
  {
    id: 'pressure-wash-driveway',
    division: 'exterior-care',
    name: 'Pressure washing — driveway',
    description: 'Surface cleaned at the correct pressure for the substrate, after a test patch.',
    phase: 1,
    pricing: { kind: 'range', low: 125, high: 225, unit: 'flat', effectiveDate: E },
    taxable: 'verify',
  },
  {
    id: 'pressure-wash-house',
    division: 'exterior-care',
    name: 'Pressure washing — house exterior',
    description: 'Soft-wash on siding and trim, quoted by elevation count and surface.',
    phase: 1,
    pricing: { kind: 'range', low: 275, high: 525, unit: 'flat', effectiveDate: E },
    taxable: 'verify',
  },
  {
    id: 'junk-removal-small',
    division: 'exterior-care',
    name: 'Junk removal — small pickup load',
    description: 'Loaded, hauled and disposed of. Disposal fees stated up front.',
    phase: 1,
    pricing: { kind: 'range', low: 125, high: 200, unit: 'flat', effectiveDate: E },
    taxable: 'verify',
  },
  {
    id: 'junk-removal-large',
    division: 'exterior-care',
    name: 'Junk removal — full trailer load',
    description: 'Larger clear-out, typically a turnover or an estate property.',
    phase: 1,
    pricing: { kind: 'range', low: 275, high: 525, unit: 'flat', effectiveDate: E },
    taxable: 'verify',
  },
  {
    id: 'cleaning-standard-house',
    division: 'exterior-care',
    name: 'Cleaning — standard house',
    description: 'Full clean for a turnover, a listing, or a return from vacancy.',
    phase: 1,
    pricing: { kind: 'range', low: 150, high: 225, unit: 'flat', effectiveDate: E },
    taxable: 'verify',
  },
  {
    id: 'lot-clearing-light',
    division: 'exterior-care',
    name: 'Light lot clearing and brush cut',
    description: 'Overgrowth cut back and hauled on a vacant or neglected lot. Quoted after a look.',
    phase: 1,
    pricing: { kind: 'quote', note: 'Quoted after a site visit — lot condition drives the price' },
    taxable: 'verify',
  },
];

const byId = new Map(services.map((s) => [s.id, s]));

export function getService(id: ServiceId): Service | undefined {
  return byId.get(id);
}

export function getServices(ids: readonly ServiceId[]): Service[] {
  return ids.map((id) => byId.get(id)).filter((s): s is Service => Boolean(s));
}

export function servicesForDivision(slug: string): Service[] {
  return services.filter((s) => s.division === slug);
}

export const flatRateMenu = services.filter((s) => s.flatRateMenu);
