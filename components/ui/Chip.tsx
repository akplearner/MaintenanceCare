import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type StatusKind = 'complete' | 'scheduled' | 'needs-attention' | 'verified' | 'included';

const STATUS_LABEL: Record<StatusKind, string> = {
  complete: 'Complete',
  scheduled: 'Scheduled',
  'needs-attention': 'Needs attention',
  verified: 'Verified',
  included: 'Included',
};

/**
 * Colour is never the sole carrier of meaning — every chip has a text label.
 */
export function StatusChip({ kind, className }: { kind: StatusKind; className?: string }) {
  const tone =
    kind === 'needs-attention'
      ? 'border-flag text-flag'
      : kind === 'scheduled'
        ? 'border-steel text-steel'
        : 'border-verified text-verified';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[2px] border px-2 py-0.5 font-mono text-xs font-medium tracking-wide uppercase',
        tone,
        className,
      )}
    >
      <span aria-hidden className="inline-block h-1.5 w-1.5 bg-current" />
      {STATUS_LABEL[kind]}
    </span>
  );
}

/** Neutral tag. Audience labels, service-area tags, category markers. */
export function Chip({
  children,
  className,
  tone = 'neutral',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'neutral' | 'accent' | 'muted';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[2px] border px-2 py-0.5 text-xs font-medium',
        tone === 'accent' && 'border-hivis-ink/40 bg-hivis/15 text-hivis-ink',
        tone === 'neutral' && 'border-steel-light bg-paper-raised text-steel',
        tone === 'muted' && 'border-steel-light/60 text-steel-light',
        className,
      )}
    >
      {children}
    </span>
  );
}
