/**
 * The specimen inspection report.
 *
 * SETUP REQUIRED: this is a format specimen, not a real visit. It is marked
 * SPECIMEN everywhere it renders, in the page copy and on every page of the
 * PDF. Replace it with a genuinely anonymised report from a real inspection
 * as soon as one exists — a real one converts better, and the compliance
 * check lists this as an outstanding item until `isSpecimen` is false.
 */
export const SAMPLE_REPORT_IS_SPECIMEN = true;

export interface ReportFinding {
  area: string;
  result: 'pass' | 'attention' | 'note';
  observation: string;
  action?: string;
  photos?: number;
}

export const sampleReport = {
  workOrder: 'WO-1428',
  reference: 'MC-26257-K3QB',
  propertyLabel: 'Single-family residence — Elgin, TX 78621',
  anonymisedNote: 'Address, owner and tenant details removed.',
  planTier: 'Standard — quarterly full property inspection',
  yearBuilt: 1996,
  occupancy: 'Occupied',
  date: '14 September 2026',
  window: '14:22 – 15:05',
  technician: 'TECH-04',
  weather: 'Clear, 31 °C, dry for six days',

  summary:
    'Property is in good order overall and nothing found today is urgent. Two items need attention: a dripping hose bib on the north elevation, which needs a licensed plumber and has been scoped for one, and a gutter run over the garage holding debris. The water heater is now ten years old — worth budgeting for replacement within the next two to three years rather than waiting for it to decide.',

  findings: [
    {
      area: 'Roofline and drainage',
      result: 'attention',
      observation:
        'Gutter run above the garage holding leaf litter and shingle grit; water tracking over the front edge at the mid-span. Downspouts clear elsewhere.',
      action: 'Gutter clearing quoted at $125. Can ride the next scheduled visit.',
      photos: 2,
    },
    {
      area: 'Exterior envelope',
      result: 'pass',
      observation:
        'Siding, trim and soffit sound. Sealant at the south window run showing early shrinkage but not yet open.',
      action: 'Re-check next visit.',
      photos: 1,
    },
    {
      area: 'Foundation and grading',
      result: 'pass',
      observation:
        'No new cracking against the previous visit. Grade still falls away from the structure on all four elevations.',
      photos: 1,
    },
    {
      area: 'Windows and doors',
      result: 'note',
      observation:
        'Front door latching but requiring a lift to close — hinge screws have drawn slightly in the top hinge.',
      action: 'Adjusted on site at no extra call-out. Closing cleanly on departure.',
    },
    {
      area: 'HVAC filter and airflow',
      result: 'pass',
      observation: 'Filter replaced. Size 20 × 25 × 1 recorded on the property file.',
      action: 'Next replacement due at the following quarterly visit.',
      photos: 1,
    },
    {
      area: 'Water heater',
      result: 'note',
      observation:
        'Data plate legible. 40 gallon gas unit, manufactured 2016. Pan dry, no corrosion at the fittings, no visible weeping.',
      action:
        'Ten years old. Serviceable now — recommend budgeting replacement within two to three years.',
      photos: 1,
    },
    {
      area: 'Visible plumbing fixtures',
      result: 'attention',
      observation:
        'Hose bib at the north elevation dripping steadily with the valve fully closed. Interior fixtures all dry; no staining under any sink.',
      action:
        'Licensed partner plumber scoped and quoting. Observation only on our part — this is licensed work.',
      photos: 2,
    },
    {
      area: 'Electrical panel and outlets',
      result: 'pass',
      observation:
        'Panel labelled and legible, no visible scorching or corrosion. GFCI test button tripped and reset correctly at both bathrooms and the kitchen.',
    },
    {
      area: 'Smoke and CO detectors',
      result: 'pass',
      observation:
        'Four units tested, all sounded. Batteries replaced and dated. Manufacture dates 2021–2022, all well inside the ten-year life.',
      photos: 1,
    },
    {
      area: 'Ceilings, walls and floors',
      result: 'pass',
      observation: 'No new staining, cracking or soft spots against the previous visit record.',
    },
    {
      area: 'Kitchen and bath',
      result: 'note',
      observation:
        'Grout at the hall bath tub surround discoloured but intact. Under-sink cabinets dry throughout.',
      action: 'Cosmetic. Reseal quoted at $95–$165 if wanted.',
    },
    {
      area: 'Appliance operation',
      result: 'pass',
      observation: 'Range, dishwasher, disposal and both laundry appliances run and observed.',
    },
    {
      area: 'Attic and crawl access',
      result: 'pass',
      observation:
        'Attic accessed from the hall hatch. Insulation even, no daylight at the deck, no droppings or nesting material observed.',
      photos: 1,
    },
    {
      area: 'Garage and exterior structures',
      result: 'pass',
      observation:
        'Overhead door safety reverse tested and functioning. Rear fence and gate sound; gate latching.',
    },
    {
      area: 'Pest and wildlife evidence',
      result: 'pass',
      observation: 'No evidence of activity at accessible entry points or in the attic space.',
    },
  ] satisfies ReportFinding[],

  nextVisit: 'December 2026 — quarterly full property inspection',
} as const;

export const RESULT_LABEL: Record<ReportFinding['result'], string> = {
  pass: 'Pass',
  attention: 'Attention',
  note: 'Note',
};
