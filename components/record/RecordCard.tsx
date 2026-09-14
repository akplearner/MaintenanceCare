import { cn } from '@/lib/cn';
import { StatusStamp, type StampKind } from './StatusStamp';

export interface RecordFinding {
  label: string;
  result: string;
  /** Renders the finding in the attention tone. */
  flagged?: boolean;
}

export interface RecordCardData {
  workOrder: string;
  property: string;
  technician?: string;
  findings: RecordFinding[];
  photoSlots: { caption: string; timestamp?: string }[];
  date: string;
  window: string;
  status: StampKind;
  /** Plain-language note the owner actually reads first. */
  summary?: string;
}

/**
 * The hero object: a mock work order showing what a client receives after a
 * visit. The product is the record, so the record is the hero — not a stock
 * photo with a gradient over it.
 */
export function RecordCard({
  data,
  animateStamp = false,
  className,
}: {
  data: RecordCardData;
  animateStamp?: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn('border bg-paper-raised', className)}
      aria-label={`Example work order ${data.workOrder}`}
    >
      <header className="flex items-start justify-between gap-4 border-b px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <p className="font-mono text-sm font-medium text-soil">{data.workOrder}</p>
          <p className="mt-0.5 truncate text-sm text-steel">{data.property}</p>
        </div>
        <StatusStamp kind={data.status} animate={animateStamp} className="shrink-0" />
      </header>

      <div className="px-4 py-3 sm:px-5">
        <p className="mb-2 font-mono text-xs tracking-wide text-steel-light uppercase">Findings</p>
        <ul>
          {data.findings.map((f) => (
            <li
              key={f.label}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-b py-2 last:border-b-0"
            >
              <span className="flex items-start gap-2 text-sm text-soil">
                <span
                  aria-hidden
                  className={cn(
                    'mt-[0.5em] inline-block h-1.5 w-1.5 shrink-0',
                    f.flagged ? 'bg-flag' : 'bg-verified',
                  )}
                />
                {f.label}
              </span>
              <span
                className={cn(
                  'font-mono text-xs',
                  f.flagged ? 'font-medium text-flag' : 'text-steel',
                )}
              >
                {f.result}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {data.photoSlots.length > 0 ? (
        <div className="border-t px-4 py-3 sm:px-5">
          <p className="mb-2 font-mono text-xs tracking-wide text-steel-light uppercase">
            Attached photographs
          </p>
          <div className="grid grid-cols-3 gap-2">
            {data.photoSlots.map((p) => (
              <div key={p.caption} className="border bg-paper">
                <div
                  aria-hidden
                  className="flex aspect-[4/3] items-center justify-center bg-[repeating-linear-gradient(135deg,var(--paper),var(--paper)_8px,var(--paper-raised)_8px,var(--paper-raised)_16px)]"
                >
                  <span className="font-mono text-[0.625rem] text-steel-light">IMG</span>
                </div>
                <p className="truncate border-t px-1.5 py-1 text-[0.625rem] text-steel">
                  {p.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {data.summary ? (
        <div className="border-t border-l-2 border-l-hivis px-4 py-3 sm:px-5">
          <p className="max-w-[34rem] text-sm text-soil-soft">{data.summary}</p>
        </div>
      ) : null}

      <footer className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t px-4 py-2.5 font-mono text-xs text-steel sm:px-5">
        <span>
          {data.date}
          <span className="mx-2 text-steel-light">·</span>
          {data.window}
        </span>
        {data.technician ? <span className="text-steel-light">{data.technician}</span> : null}
      </footer>
    </article>
  );
}

/** The home hero record. Reused, trimmed, on /sample-report. */
export const HERO_RECORD: RecordCardData = {
  workOrder: 'WO-1428',
  property: '412 Oak Grove Dr, Elgin TX 78621',
  technician: 'TECH-04',
  status: 'complete',
  date: '09.14.26',
  window: '14:22 – 15:05',
  findings: [
    { label: 'HVAC filter replaced — 20 × 25 × 1', result: 'Done' },
    { label: 'Smoke and CO detectors tested (4 units)', result: 'Pass' },
    { label: 'Water heater — data plate recorded, 2016', result: 'Logged' },
    { label: 'Hose bib dripping at north elevation', result: 'Attention', flagged: true },
    { label: 'Gutter run over garage holding debris', result: 'Attention', flagged: true },
    { label: 'Exterior walk — no new movement or staining', result: 'Pass' },
  ],
  photoSlots: [
    { caption: 'Filter installed' },
    { caption: 'Hose bib drip' },
    { caption: 'Gutter, NE run' },
  ],
  summary:
    'Nothing urgent. The hose bib needs a licensed plumber — we have a partner quote coming and will forward it. Gutter clearing quoted at $125 and can ride the next visit.',
};
