import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ctaAttrs } from '@/lib/analytics';

/**
 * The two hero CTAs, ordered by lead value. The portfolio path is first
 * because one property-manager relationship is worth many homeowner jobs —
 * BUILD.md 1.2.
 */
export function HomeHeroCta() {
  return (
    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
      <Link
        href="/request?type=property-manager&intent=audit"
        {...ctaAttrs('audit', 'home-hero')}
        className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 border border-soil bg-soil px-6 py-3 font-medium text-paper transition-colors hover:bg-soil-soft"
      >
        Portfolio inquiry
        <ArrowRight aria-hidden size={17} strokeWidth={1.75} />
      </Link>
      <Link
        href="/request"
        {...ctaAttrs('request', 'home-hero')}
        className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 border border-soil px-6 py-3 font-medium text-soil transition-colors hover:bg-soil hover:text-paper"
      >
        Request service
      </Link>
    </div>
  );
}
