'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { company } from '@/content/company';
import { ctaAttrs } from '@/lib/analytics';

/**
 * Persistent conversion bar on small screens. A property manager reading this
 * on a phone in a driveway should never be more than one thumb-reach from
 * either action. Hidden on the form and thanks pages, where it would compete
 * with the submit button.
 */
export function StickyCta() {
  const pathname = usePathname();
  if (pathname.startsWith('/request')) return null;

  return (
    <div className="no-print sticky bottom-0 z-30 border-t bg-paper-raised/97 backdrop-blur-[2px] lg:hidden">
      <div className="grid grid-cols-2">
        <a
          href={company.phoneHref}
          {...ctaAttrs('call', 'sticky-bar')}
          className="flex min-h-[3.25rem] items-center justify-center gap-2 border-r text-sm font-medium text-soil"
        >
          <Phone aria-hidden size={16} strokeWidth={1.5} />
          Call now
        </a>
        <Link
          href="/request"
          {...ctaAttrs('request', 'sticky-bar')}
          className="flex min-h-[3.25rem] items-center justify-center bg-soil text-sm font-medium text-paper"
        >
          Request service
        </Link>
      </div>
    </div>
  );
}
