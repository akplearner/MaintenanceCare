import { cn } from '@/lib/cn';

export type StampKind = 'complete' | 'scheduled' | 'needs-attention';

const LABEL: Record<StampKind, string> = {
  complete: 'Complete',
  scheduled: 'Scheduled',
  'needs-attention': 'Needs attention',
};

/**
 * The only animated element on the site, and only on the home hero.
 * `animate` is opt-in; `prefers-reduced-motion: reduce` disables it in CSS.
 */
export function StatusStamp({
  kind,
  animate = false,
  className,
}: {
  kind: StampKind;
  animate?: boolean;
  className?: string;
}) {
  const tone =
    kind === 'needs-attention'
      ? 'border-flag text-flag'
      : kind === 'scheduled'
        ? 'border-steel text-steel'
        : 'border-verified text-verified';

  return (
    <span
      className={cn(
        'inline-flex -rotate-3 items-center gap-2 rounded-sm border-2 px-2.5 py-1',
        'font-mono text-xs font-medium tracking-[0.12em] uppercase',
        tone,
        animate && 'stamp-animate',
        className,
      )}
    >
      <span aria-hidden className="inline-block h-1.5 w-1.5 bg-current" />
      {LABEL[kind]}
    </span>
  );
}
