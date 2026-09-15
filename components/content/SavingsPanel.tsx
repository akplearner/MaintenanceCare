import { cn } from '@/lib/cn';

/**
 * Four defensible categories. No percentages, no promises of a saving, no
 * invented statistics — BUILD.md 9.5. Every figure here is drawn from our own
 * published price list, which is the only source we can actually stand behind.
 */
const CATEGORIES = [
  {
    ref: '01',
    title: 'Prevention',
    body: 'A gutter clearing is $125–$175 and it is on the price list. Water that has been running behind fascia for two seasons is not on anyone\'s price list. The value of a scheduled visit is that the first number is the one you pay.',
    example: 'Known cost, on a known date, against an unknown one.',
  },
  {
    ref: '02',
    title: 'Vacancy',
    body: 'Every day a unit sits unrented is a day of rent you can calculate exactly. A turnover that stalls waiting on three vendors to call back costs those days. We hold the schedule and the access, so the calendar is the constraint rather than the phone.',
    example: 'You already know your daily rent figure. Multiply it by the days you lost last turn.',
  },
  {
    ref: '03',
    title: 'Dispatch',
    body: 'One call instead of four. We scope the job before a licensed contractor is dispatched, meet them for access, and verify the work was done — so you are not paying a trip charge because nobody could get in, and not chasing a close-out photograph three weeks later.',
    example: 'Fewer trip charges, no second visit for access, one invoice to check.',
  },
  {
    ref: '04',
    title: 'Portfolio pricing',
    body: 'Priced by door count rather than per plan. A portfolio has a mix — occupied, vacant, turning — and pricing every door at the same tier overcharges you on the easy ones. We price against the actual mix and revisit it as the mix changes.',
    example: 'Coverage sized to the portfolio, not to a tier.',
  },
] as const;

export function SavingsPanel({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-px overflow-hidden rounded-lg border bg-rule sm:grid-cols-2', className)}>
      {CATEGORIES.map((c) => (
        <div key={c.ref} className="bg-paper-raised p-5">
          <p className="font-mono text-xs text-ink-muted">{c.ref}</p>
          <h3 className="mt-1 text-lg font-semibold text-soil">{c.title}</h3>
          <p className="mt-2 text-sm text-steel">{c.body}</p>
          <p className="mt-3 border-l-2 border-l-hivis pl-3 text-sm text-soil-soft">{c.example}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * The honest framing for any avoided-loss figure. Exported so no page invents
 * its own wording, and so the compliance check has one string to look for.
 */
export const AVOIDED_LOSS_FRAMING =
  'Figures describe potential avoided-loss exposure based on our own published pricing. They are not a savings guarantee, and your property will have its own numbers.';
