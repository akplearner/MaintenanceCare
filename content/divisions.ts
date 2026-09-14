import { alt, type Division } from './types';

const EFFECTIVE = '2026-09-01';
export const PRICING_EFFECTIVE = EFFECTIVE;

/**
 * The eight divisions. Four are live in Phase 1; the rest render a short,
 * honest placeholder page and stay out of the primary nav.
 *
 * Photos: every `placeholder: true` entry is waiting on a real job photograph.
 * Stock photography is not an acceptable substitute — see BUILD.md 5.1.
 */
export const divisions: Division[] = [
  {
    slug: 'property-care',
    name: 'Property Care',
    promise: 'Recurring preventive maintenance on a plan, documented every visit.',
    summary:
      'A scheduled technician visit on a fixed cadence, the same checks performed every time, and a dated photo record afterwards. This is the division that turns an unpredictable repair budget into a line item.',
    phase: 1,
    fullyLaunched: true,
    audiences: ['homeowner', 'property-manager', 'investor', 'str-operator', 'hoa'],
    services: [
      'property-care-essential',
      'property-care-standard',
      'property-care-premium',
      'hvac-filter-service',
      'smoke-co-check',
      'water-heater-flush-observation',
      'seasonal-checklist',
    ],
    image: {
      src: '/photos/property-care.jpg',
      alt: alt('Technician recording HVAC filter size on a maintenance sheet inside a utility closet'),
      timestamp: '09.11.26  09:41',
      placeholder: true,
      width: 1200,
      height: 800,
    },
    included: [
      'Scheduled visit on a fixed cadence — you know the date in advance',
      'The same inspection checklist every visit, so findings are comparable over time',
      'HVAC filter replacement labour with the correct size recorded',
      'Smoke and carbon monoxide detector testing with battery dates logged',
      'Exterior walk with photographs of anything changing',
      'Minor adjustments handled on the spot at no extra call-out',
      'Written photo report delivered by email within 24 hours',
      'Licensed partner dispatch when a finding needs a trade licence',
    ],
  },
  {
    slug: 'field-inspections',
    name: 'Field Inspections',
    promise: 'Someone physically standing at your property, with the photographs to prove it.',
    summary:
      'Occupied, vacant, and post-storm property checks with a timestamped record. Built for owners who are not in the county, lenders who need condition evidence, and managers who need to answer "when was anyone last there?" in one click.',
    phase: 1,
    fullyLaunched: true,
    audiences: ['investor', 'property-manager', 'realtor', 'commercial', 'homeowner'],
    services: [
      'health-check-basic',
      'health-check-standard',
      'health-check-detailed',
      'vacant-watch-biweekly',
      'vacant-watch-weekly',
      'storm-check',
      'move-in-condition-report',
    ],
    image: {
      src: '/photos/field-inspections.jpg',
      alt: alt('Exterior inspection photograph of a vacant single-family house with the date stamped in the corner'),
      timestamp: '09.09.26  15:02',
      placeholder: true,
      width: 1200,
      height: 800,
    },
    included: [
      'Interior and exterior walk against a written checklist',
      'Timestamped, geotagged photographs of every noted condition',
      'Water intrusion, pest evidence and vandalism checks on vacant properties',
      'Meter and utility observation where accessible',
      'Freeze-risk checks in season',
      'Written report the same day, with severity noted on every finding',
      'Escalation call within the hour on anything urgent',
    ],
  },
  {
    slug: 'turn-services',
    name: 'Turn Services',
    promise: 'Unit turnovers between tenants, on a documented schedule.',
    summary:
      'Make-ready coordination between tenants — cleaning, paint touch-up, punch list and the condition record that settles deposit disputes.',
    phase: 2,
    fullyLaunched: false,
    audiences: ['property-manager', 'investor', 'str-operator'],
    services: [],
    image: {
      src: '/photos/turn-services.jpg',
      alt: alt('Empty rental unit prepared for a new tenant'),
      placeholder: true,
      width: 1200,
      height: 800,
    },
    included: [],
  },
  {
    slug: 'home-repair',
    name: 'Home Repair',
    promise: 'Handyman work at a named price, not an open-ended hourly guess.',
    summary:
      'Drywall, paint, doors, fences, fixtures and punch lists. Most common jobs carry a flat rate published on this page, because a named price is the thing customers actually want and most competitors will not give.',
    phase: 1,
    fullyLaunched: true,
    audiences: ['homeowner', 'property-manager', 'investor', 'realtor', 'str-operator'],
    services: [
      'handyman-call-minimum',
      'handyman-hourly',
      'door-adjustment',
      'drywall-patch-small',
      'drywall-patch-large',
      'interior-door-install',
      'blind-install',
      'shelving-install',
      'tv-mount',
      'caulk-reseal-bath',
      'weatherstrip-door',
      'cabinet-hardware',
      'fence-picket-repair',
      'fence-gate-rehang',
      'trim-baseboard-repair',
      'screen-repair',
      'mailbox-post-reset',
      'paint-single-room',
      'punch-list-half-day',
      'fixture-coordination',
    ],
    image: {
      src: '/photos/home-repair.jpg',
      alt: alt('Patched and sanded drywall repair in a hallway, ready for paint'),
      timestamp: '09.05.26  11:18',
      placeholder: true,
      width: 1200,
      height: 800,
    },
    included: [
      'A named flat price for the jobs we do most — the full menu is on this page',
      'Hourly work quoted in advance with a not-to-exceed figure',
      'Materials itemised separately, never marked up silently',
      'Before and after photographs on every job',
      'Punch lists priced as a block, not per item',
      'Anything needing a trade licence identified and routed, not attempted',
    ],
  },
  {
    slug: 'exterior-care',
    name: 'Exterior Care',
    promise: 'Lawns, gutters, pressure washing and haul-offs, on a schedule you do not have to chase.',
    summary:
      'The visible half of property condition. Recurring lawn service, gutter clearing before the storm season, pressure washing, and junk removal — the work that decides what a drive-by tells a lender, a buyer, or a code officer.',
    phase: 1,
    fullyLaunched: true,
    audiences: ['homeowner', 'property-manager', 'investor', 'realtor', 'hoa', 'commercial'],
    services: [
      'lawn-standard-lot',
      'lawn-large-lot',
      'gutter-clean-single',
      'gutter-clean-two-story',
      'pressure-wash-driveway',
      'pressure-wash-house',
      'junk-removal-small',
      'junk-removal-large',
      'cleaning-standard-house',
      'lot-clearing-light',
    ],
    image: {
      src: '/photos/exterior-care.jpg',
      alt: alt('Cleared gutter run photographed from a ladder after debris removal'),
      timestamp: '08.28.26  08:05',
      placeholder: true,
      width: 1200,
      height: 800,
    },
    included: [
      'Recurring or one-time scheduling, your choice',
      'Debris hauled away, not bagged and left at the kerb',
      'Before and after photographs on every visit',
      'Gutter and downspout flow verified, not just cleared',
      'Surface test patch on pressure washing before the full run',
      'Disposal fees stated up front on haul-offs',
    ],
  },
  {
    slug: 'emergency-response',
    name: 'Emergency Response',
    promise: 'After-hours response when a property cannot wait until Monday.',
    summary:
      'On-call response for water intrusion, storm damage, break-ins and freeze events — stabilise, document, and get the right licensed trade moving.',
    phase: 3,
    fullyLaunched: false,
    audiences: ['property-manager', 'investor', 'str-operator', 'commercial'],
    services: [],
    image: {
      src: '/photos/emergency-response.jpg',
      alt: alt('Water damage documented on a laminate floor during an after-hours call'),
      placeholder: true,
      width: 1200,
      height: 800,
    },
    included: [],
  },
  {
    slug: 'asset-care',
    name: 'Asset Care',
    promise: 'Know the remaining life of every major system before it fails.',
    summary:
      'Age, condition and replacement forecasting for roofs, water heaters, HVAC systems and major appliances across a portfolio, so capital planning stops being a surprise.',
    phase: 4,
    fullyLaunched: false,
    audiences: ['investor', 'property-manager', 'hoa', 'commercial'],
    services: [],
    image: {
      src: '/photos/asset-care.jpg',
      alt: alt('Data plate on a water heater photographed to record model and install date'),
      placeholder: true,
      width: 1200,
      height: 800,
    },
    included: [],
  },
  {
    slug: 'trade-coordination',
    name: 'Trade Coordination',
    promise: 'One number to call, and we manage the licensed contractors behind it.',
    summary:
      'Scope, dispatch, access, verification and close-out for licensed trade work performed by our partner contractors. Available today inside our other divisions; a standalone programme is a later phase.',
    phase: 5,
    fullyLaunched: false,
    audiences: ['property-manager', 'investor', 'hoa', 'commercial'],
    services: [],
    image: {
      src: '/photos/trade-coordination.jpg',
      alt: alt('Work order sheet on a clipboard beside a contractor van'),
      placeholder: true,
      width: 1200,
      height: 800,
    },
    included: [],
  },
];

export const launchedDivisions = divisions.filter((d) => d.fullyLaunched);
export const upcomingDivisions = divisions.filter((d) => !d.fullyLaunched);

export function getDivision(slug: string): Division | undefined {
  return divisions.find((d) => d.slug === slug);
}
