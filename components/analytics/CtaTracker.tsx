'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

/**
 * One delegated click listener for the whole site.
 *
 * The alternative — an onClick on every CTA — makes each of those components
 * a client component, which drags React, the icons they use and the analytics
 * module into the bundle of every page that renders one. This way the CTAs
 * stay server components and declare their tracking in markup:
 *
 *     <a data-cta="request" data-cta-location="home-hero">
 */
export function CtaTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const el = target?.closest?.('[data-cta]');
      if (!el) return;

      const name = el.getAttribute('data-cta');
      if (!name) return;

      try {
        track(`cta:${name}`, { location: el.getAttribute('data-cta-location') ?? 'unknown' });
      } catch {
        // Analytics must never break a click.
      }
    }

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
