import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { company } from '@/content/company';
import { ctaAttrs } from '@/lib/analytics';

type Variant = 'portfolio' | 'single';

const COPY: Record<Variant, { eyebrow: string; heading: string; body: string; primary: string }> = {
  portfolio: {
    eyebrow: 'For portfolios',
    heading: 'Start with three properties, free.',
    body: 'We inspect three of your properties at no cost and send you the same reports your owners would get. No contract. If they are not useful, you have lost nothing.',
    primary: 'Book the free audit',
  },
  single: {
    eyebrow: 'For your property',
    heading: 'Tell us what needs doing.',
    body: 'A short form, a reply within one business day, and a written price before anyone turns up.',
    primary: 'Request service',
  },
};

/** The other audience's path, as one quiet line rather than a competing block. */
const ALT: Record<Variant, { question: string; label: string; href: string }> = {
  portfolio: {
    question: 'Managing more than one property?',
    label: 'Book a free three-property audit',
    href: '/request?type=property-manager&intent=audit',
  },
  single: {
    question: 'Just the one property?',
    label: 'Request service',
    href: '/request',
  },
};

/**
 * Server component. Tracking is declared through data attributes and handled
 * by the single delegated listener in CtaTracker — this block appears on most
 * pages, so making it a client component would cost bytes everywhere.
 *
 * One block per page. Two side by side asked the reader to choose between two
 * equally loud things, which is a good way to have them choose neither; the
 * second audience gets `alt`, a single line under the block.
 */
export function CTABlock({
  variant = 'single',
  className,
  location,
  href,
  alt,
}: {
  variant?: Variant;
  className?: string;
  /** Analytics label for which surface produced the click. */
  location: string;
  href?: string;
  /** Render the other audience's path as a quiet line beneath. */
  alt?: boolean;
}) {
  const copy = COPY[variant];
  const target =
    href ?? (variant === 'portfolio' ? '/request?type=property-manager&intent=audit' : '/request');
  const other = ALT[variant === 'portfolio' ? 'single' : 'portfolio'];

  return (
    <div className={className}>
      <div className="rounded-lg border bg-soil px-5 py-8 text-paper shadow-md sm:px-8 sm:py-10">
        <p className="text-sm font-semibold text-accent-on-dark">{copy.eyebrow}</p>
        <h2 className="mt-2 max-w-[24ch] text-2xl font-semibold text-paper sm:text-3xl">
          {copy.heading}
        </h2>
        <p className="mt-3 max-w-[52ch] text-base text-ink-on-dark">{copy.body}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={target}
            {...ctaAttrs(variant === 'portfolio' ? 'audit' : 'request', location)}
            className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-md border border-accent-on-dark bg-accent-on-dark px-6 py-3 font-medium text-soil transition-colors hover:bg-transparent hover:text-accent-on-dark"
          >
            {copy.primary}
            <ArrowRight aria-hidden size={17} strokeWidth={1.75} />
          </Link>
          <a
            href={company.phoneHref}
            {...ctaAttrs('call', location)}
            className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-md border border-ink-on-dark/60 px-6 py-3 font-medium text-paper transition-colors hover:border-paper"
          >
            <Phone aria-hidden size={16} strokeWidth={1.5} />
            {company.phone}
          </a>
        </div>
        <p className="mt-4 text-sm text-ink-on-dark">{company.responseCommitment}</p>
      </div>

      {alt ? (
        <p className="mt-4 text-sm text-steel">
          {other.question}{' '}
          <Link
            href={other.href}
            {...ctaAttrs(variant === 'portfolio' ? 'request' : 'audit', `${location}-alt`)}
            className="font-medium text-soil underline decoration-hivis decoration-2 underline-offset-4"
          >
            {other.label}
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}
