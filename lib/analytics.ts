import { track } from '@vercel/analytics';

/**
 * Conversion events. The two CTAs are tracked declaratively through
 * `data-cta` / `data-cta-location` attributes and a single delegated listener
 * (see components/analytics/CtaTracker.tsx), which keeps the CTA components
 * on the server. This module is for the few events a client component must
 * fire itself.
 */
export type CtaName = 'request' | 'call' | 'sample-report' | 'audit';

/** Attributes that make an element a tracked CTA. Spread onto the link. */
export function ctaAttrs(name: CtaName, location: string) {
  return { 'data-cta': name, 'data-cta-location': location } as const;
}

export function trackLeadSubmitted(priority: 'priority' | 'standard'): void {
  try {
    track('lead:submitted', { priority });
  } catch {
    /* no-op */
  }
}
