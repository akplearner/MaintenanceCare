import type { Service } from '@/content/types';
import { effectiveLabel, formatPricing, latestEffectiveDate, pricingNote } from '@/lib/price';
import { ui } from '@/content/i18n/ui';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import { Chip } from '@/components/ui/Chip';
import { cn } from '@/lib/cn';

/**
 * Renders any `Service[]`. Always renders the effective-date line — the
 * business reviews benchmarks quarterly and a price without a date is a price
 * nobody can rely on.
 */
export function PriceTable({
  services,
  className,
  caption,
  locale = DEFAULT_LOCALE,
}: {
  services: Service[];
  className?: string;
  caption?: string;
  locale?: Locale;
}) {
  const t = ui(locale).priceTable;
  const effective = latestEffectiveDate(services.map((s) => s.pricing));

  return (
    <div className={className}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          {caption ? (
            <caption className="mb-3 text-left text-sm text-steel">{caption}</caption>
          ) : null}
          <thead>
            <tr className="border-y">
              <th scope="col" className="py-2.5 pr-4 text-sm font-semibold text-soil">
                {t.service}
              </th>
              <th scope="col" className="py-2.5 pr-4 text-right text-sm font-semibold text-soil">
                {t.price}
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => {
              const note = pricingNote(s.pricing, locale);
              return (
                <tr key={s.id} className="border-b align-top">
                  <th scope="row" className="py-3 pr-4 font-normal">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-medium text-soil">{s.name}</span>
                      {s.licensedTradeRequired ? (
                        <Chip tone="accent">{t.licensedPartnerChip}</Chip>
                      ) : null}
                      {s.leadPaintGated ? <Chip tone="neutral">{t.pre1978Chip}</Chip> : null}
                    </span>
                    <span className="mt-1 block max-w-[38rem] text-sm text-steel">
                      {s.description}
                    </span>
                  </th>
                  <td className="py-3 text-right">
                    <span
                      className={cn(
                        'font-mono text-base whitespace-nowrap text-soil',
                        s.pricing.kind === 'quote' && 'text-steel',
                      )}
                    >
                      {formatPricing(s.pricing, locale)}
                    </span>
                    {note ? (
                      <span className="mt-0.5 block text-xs text-ink-muted">{note}</span>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-steel">
        {t.effectivePrefix} {effective ? effectiveLabel(effective, locale) : t.onQuote}
        {t.tableSuffix}
      </p>
    </div>
  );
}

/** The scannable flat-rate menu. A named price is the competitive advantage. */
export function FlatRateMenu({
  services,
  locale = DEFAULT_LOCALE,
}: {
  services: Service[];
  locale?: Locale;
}) {
  const t = ui(locale).priceTable;
  const effective = latestEffectiveDate(services.map((s) => s.pricing));

  return (
    <div>
      <ul className="grid gap-x-10 border-t sm:grid-cols-2">
        {services.map((s) => (
          <li
            key={s.id}
            className="flex items-baseline justify-between gap-4 border-b py-3"
          >
            <span className="text-sm text-soil">
              {s.name}
              {s.leadPaintGated ? (
                <span className="ml-1.5 align-middle font-mono text-[0.625rem] text-ink-muted">
                  {t.pre1978Chip}
                </span>
              ) : null}
            </span>
            <span className="shrink-0 font-mono text-sm font-medium whitespace-nowrap text-soil">
              {formatPricing(s.pricing, locale)}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-steel">
        {t.effectivePrefix} {effective ? effectiveLabel(effective, locale) : t.onQuote}
        {t.menuSuffix}
      </p>
    </div>
  );
}
