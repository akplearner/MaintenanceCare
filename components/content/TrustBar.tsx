import { BadgeCheck, FileText, ShieldCheck, UserCheck } from 'lucide-react';

import { cn } from '@/lib/cn';
import { CREDENTIALS } from '@/content/company';
import type { Credential } from '@/content/types';

const ICON = {
  shield: ShieldCheck,
  'user-check': UserCheck,
  'file-text': FileText,
  'badge-check': BadgeCheck,
} as const satisfies Record<Credential['icon'], unknown>;

/**
 * The four things a customer is buying beyond the labour, directly under the
 * fold. A server component on purpose: it sits above the fold on two routes
 * with a CLS budget, so every item must be in the first paint.
 */
export function TrustBar({ className }: { className?: string }) {
  return (
    <ul className={cn('grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2', className)}>
      {CREDENTIALS.map((c) => {
        const Icon = ICON[c.icon];
        return (
          <li key={c.id} className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-verified-soft"
            >
              <Icon size={16} strokeWidth={2} className="text-verified" />
            </span>
            <span className="text-sm font-medium text-soil">{c.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * The same four commitments with the sentence that explains each one. For
 * pages where a reader has already decided to take us seriously.
 */
export function CredentialGrid({ className }: { className?: string }) {
  return (
    <ul className={cn('grid gap-4 sm:grid-cols-2', className)}>
      {CREDENTIALS.map((c) => {
        const Icon = ICON[c.icon];
        return (
          <li key={c.id} className="rounded-lg border bg-paper-raised p-5 shadow-sm">
            <span
              aria-hidden
              className="flex h-10 w-10 items-center justify-center rounded-full bg-verified-soft"
            >
              <Icon size={20} strokeWidth={2} className="text-verified" />
            </span>
            <h3 className="mt-3 text-base font-semibold text-soil">{c.label}</h3>
            <p className="mt-1.5 text-sm text-steel">{c.detail}</p>
          </li>
        );
      })}
    </ul>
  );
}
