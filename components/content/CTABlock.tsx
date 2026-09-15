import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { company } from '@/content/company';
import { ctaAttrs } from '@/lib/analytics';
import { cn } from '@/lib/cn';

type Variant = 'portfolio' | 'single';

const COPY: Record<Variant, { eyebrow: string; heading: string; body: string; primary: string }> = {
  portfolio: {
    eyebrow: 'For portfolios',
    heading: 'Start with three properties, free.',
    body: 'We will inspect three of your properties at no cost and send you the same documented reports your owners would get. No contract, no obligation — if the reports are not useful, you have lost nothing but an afternoon of our time.',
    primary: 'Book the free three-property audit',
  },
  single: {
    eyebrow: 'For your property',
    heading: 'Tell us about the property.',
    body: 'A short form, a real reply within one business day, and a written price before anyone turns up. Photographs help us quote accurately, but they are optional.',
    primary: 'Request service',
  },
};

/**
 * Server component. Tracking is declared through data attributes and handled
 * by the single delegated listener in CtaTracker — this block appears on most
 * pages, so making it a client component would cost bytes everywhere.
 */
export function CTABlock({
  variant = 'single',
  className,
  location,
  href,
}: {
  variant?: Variant;
  className?: string;
  /** Analytics label for which surface produced the click. */
  location: string;
  href?: string;
}) {
  const copy = COPY[variant];
  const target =
    href ?? (variant === 'portfolio' ? '/request?type=property-manager&intent=audit' : '/request');

  return (
    <div className={cn('border bg-soil px-5 py-8 text-paper sm:px-8 sm:py-10', className)}>
      <p className="text-sm font-semibold text-accent-on-dark">{copy.eyebrow}</p>
      <h2 className="mt-2 max-w-[24ch] text-2xl font-semibold text-paper sm:text-3xl">
        {copy.heading}
      </h2>
      <p className="mt-3 max-w-[46ch] text-base text-ink-on-dark">{copy.body}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={target}
          {...ctaAttrs(variant === 'portfolio' ? 'audit' : 'request', location)}
          className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 border border-accent-on-dark bg-accent-on-dark px-6 py-3 font-medium text-soil transition-colors hover:bg-transparent hover:text-accent-on-dark"
        >
          {copy.primary}
          <ArrowRight aria-hidden size={17} strokeWidth={1.75} />
        </Link>
        <a
          href={company.phoneHref}
          {...ctaAttrs('call', location)}
          className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 border border-ink-on-dark/60 px-6 py-3 font-medium text-paper transition-colors hover:border-paper"
        >
          <Phone aria-hidden size={16} strokeWidth={1.5} />
          {company.phone}
        </a>
      </div>
      <p className="mt-4 text-sm text-ink-on-dark">{company.responseCommitment}</p>
    </div>
  );
}
