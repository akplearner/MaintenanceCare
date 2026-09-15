import { RESULT_LABEL, sampleReport, type ReportFinding } from '@/content/sample-report';
import { cn } from '@/lib/cn';

const TONE: Record<ReportFinding['result'], string> = {
  pass: 'border-verified text-verified',
  attention: 'border-flag text-flag',
  note: 'border-steel text-steel',
};

/**
 * The report itself, rendered as a document rather than described in copy.
 * This is the highest-converting thing on the site, so it is not gated and
 * not a screenshot — it is readable, printable, and indexable.
 */
export function ReportSheet({ className }: { className?: string }) {
  const r = sampleReport;

  return (
    <article className={cn('overflow-hidden rounded-lg border bg-paper-raised shadow-sm', className)}>
      <header className="border-b bg-soil px-5 py-4 text-paper sm:px-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs tracking-wide text-accent-on-dark uppercase">
              Property inspection record
            </p>
            <p className="mt-1 font-mono text-xl font-medium">{r.workOrder}</p>
            <p className="mt-0.5 text-sm text-ink-on-dark">{r.propertyLabel}</p>
          </div>
          <span className="rounded-sm border-2 border-accent-on-dark px-2.5 py-1 font-mono text-xs font-medium tracking-[0.12em] text-accent-on-dark uppercase">
            Specimen
          </span>
        </div>
      </header>

      <dl className="grid grid-cols-2 gap-px border-b bg-steel-light sm:grid-cols-4">
        {[
          { k: 'Date', v: r.date },
          { k: 'On site', v: r.window },
          { k: 'Technician', v: r.technician },
          { k: 'Coverage', v: r.planTier },
          { k: 'Year built', v: String(r.yearBuilt) },
          { k: 'Occupancy', v: r.occupancy },
          { k: 'Conditions', v: r.weather },
          { k: 'Next visit', v: r.nextVisit },
        ].map((row) => (
          <div key={row.k} className="bg-paper-raised px-4 py-2.5">
            <dt className="font-mono text-[0.625rem] tracking-wide text-ink-muted uppercase">
              {row.k}
            </dt>
            <dd className="mt-0.5 text-sm text-soil">{row.v}</dd>
          </div>
        ))}
      </dl>

      <div className="border-b border-l-2 border-l-hivis px-5 py-4 sm:px-7">
        <p className="font-mono text-xs tracking-wide text-ink-muted uppercase">
          Summary for the owner
        </p>
        <p className="mt-1.5 max-w-[46rem] text-base text-soil-soft">{r.summary}</p>
      </div>

      <div className="px-5 py-4 sm:px-7">
        <p className="mb-2 font-mono text-xs tracking-wide text-ink-muted uppercase">
          Findings — {r.findings.length} areas inspected
        </p>
        <ol className="border-t">
          {r.findings.map((f, i) => (
            <li key={f.area} className="grid gap-2 border-b py-3.5 sm:grid-cols-[2rem_1fr] sm:gap-4">
              <span className="font-mono text-xs text-ink-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-medium text-soil">{f.area}</h3>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[0.625rem] font-medium tracking-wide uppercase',
                      TONE[f.result],
                    )}
                  >
                    <span aria-hidden className="inline-block h-1 w-1 bg-current" />
                    {RESULT_LABEL[f.result]}
                  </span>
                  {f.photos ? (
                    <span className="font-mono text-[0.625rem] text-ink-muted">
                      {f.photos} PHOTO{f.photos > 1 ? 'S' : ''}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 max-w-[46rem] text-sm text-steel">{f.observation}</p>
                {f.action ? (
                  <p className="mt-1.5 max-w-[46rem] border-l-2 border-l-steel-light pl-3 text-sm text-soil-soft">
                    <span className="font-medium">Action:</span> {f.action}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <footer className="border-t px-5 py-3.5 font-mono text-xs text-steel sm:px-7">
        {r.reference} · {r.anonymisedNote} · Licensed trade findings are observation only and are
        routed to a licensed partner contractor.
      </footer>
    </article>
  );
}
