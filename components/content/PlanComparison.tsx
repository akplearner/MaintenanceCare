import Link from 'next/link';
import { plans, PORTFOLIO_PRICING } from '@/content/plans';
import { effectiveLabel } from '@/lib/price';
import { Checklist } from '@/components/record/Checklist';
import { cn } from '@/lib/cn';

export function PlanComparison({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={className}>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.slug}
            className={cn(
              'relative flex flex-col overflow-hidden rounded-lg border bg-paper-raised p-5 shadow-sm',
              plan.featured && 'border-2 border-soil',
            )}
          >
            {/* Absolute so the three tier headings stay on the same line, and
                top-right so it never sits on top of the left-aligned heading. */}
            {plan.featured ? (
              <p className="absolute top-0 right-0 rounded-bl-md bg-accent-ink px-2.5 py-1 text-xs font-semibold tracking-wide text-paper">
                Most chosen
              </p>
            ) : null}
            <h3 className="text-xl font-semibold text-soil">{plan.name}</h3>
            <p className="mt-3 flex items-baseline gap-1.5">
              <span className="text-4xl font-bold tracking-tight text-soil">
                ${plan.monthlyPrice}
              </span>
              <span className="text-sm text-steel">/month</span>
            </p>
            <p className="mt-1 text-sm text-steel">{plan.cadence}</p>
            <p className="mt-4 border-t pt-4 text-sm text-soil-soft">{plan.bestFor}</p>

            <Checklist
              items={compact ? plan.includes.slice(0, 4) : plan.includes}
              className="mt-4 flex-1 border-t"
            />

            <Link
              href={`/request?plan=${plan.slug}`}
              className={cn(
                'mt-5 inline-flex min-h-[2.75rem] items-center justify-center border px-5 py-2.5 font-medium transition-colors',
                plan.featured
                  ? 'border-soil bg-soil text-paper hover:bg-soil-soft'
                  : 'border-soil text-soil hover:bg-soil hover:text-paper',
              )}
            >
              Start with {plan.name}
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-steel">
        Pricing effective {effectiveLabel(plans[0]!.effectiveDate)}. Month to month, cancel with
        thirty days notice. Reviewed quarterly.
      </p>

      <div className="mt-6 border border-l-4 border-l-hivis bg-paper-raised px-5 py-4">
        <h3 className="text-lg font-semibold text-soil">{PORTFOLIO_PRICING.heading}</h3>
        <p className="mt-1.5 max-w-[46rem] text-sm text-steel">{PORTFOLIO_PRICING.body}</p>
        <Link
          href={PORTFOLIO_PRICING.href}
          className="mt-3 inline-flex items-center font-medium text-soil underline decoration-hivis decoration-2 underline-offset-4 hover:decoration-soil"
        >
          {PORTFOLIO_PRICING.cta}
        </Link>
      </div>
    </div>
  );
}
