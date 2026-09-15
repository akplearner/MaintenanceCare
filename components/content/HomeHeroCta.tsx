import Link from 'next/link';
import { ArrowRight, Building2, Home } from 'lucide-react';
import { ctaAttrs } from '@/lib/analytics';

/**
 * Two doors, because the two audiences describe themselves in different words
 * and neither should have to work out which half of the page is theirs.
 *
 * The portfolio door keeps `intent=audit` so `/request` still opens on the
 * three-property audit heading — BUILD.md 1.2 ranks that lead well above a
 * single homeowner job, so it stays first in the DOM and visually primary.
 */
export function HomeHeroCta() {
  return (
    <div className="mt-7 grid gap-3 sm:grid-cols-2">
      <Link
        href="/request?type=property-manager&intent=audit"
        {...ctaAttrs('audit', 'home-hero')}
        className="group flex items-center gap-3 rounded-lg border border-soil bg-soil px-5 py-4 text-paper shadow-sm transition-colors hover:bg-soil-soft"
      >
        <Building2 aria-hidden size={22} strokeWidth={1.5} className="shrink-0 text-accent-on-dark" />
        <span className="flex-1">
          <span className="block font-semibold">For properties I manage</span>
          <span className="block text-sm text-ink-on-dark">Portfolio pricing and response times</span>
        </span>
        <ArrowRight
          aria-hidden
          size={18}
          strokeWidth={1.75}
          className="shrink-0 transition-transform group-hover:translate-x-0.5"
        />
      </Link>

      <Link
        href="/request"
        {...ctaAttrs('request', 'home-hero')}
        className="group flex items-center gap-3 rounded-lg border border-soil bg-paper-raised px-5 py-4 text-soil shadow-sm transition-colors hover:bg-paper"
      >
        <Home aria-hidden size={22} strokeWidth={1.5} className="shrink-0 text-accent-ink" />
        <span className="flex-1">
          <span className="block font-semibold">For my home</span>
          <span className="block text-sm text-steel">Get a written price</span>
        </span>
        <ArrowRight
          aria-hidden
          size={18}
          strokeWidth={1.75}
          className="shrink-0 transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  );
}
