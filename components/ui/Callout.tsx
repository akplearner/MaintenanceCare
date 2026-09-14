import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type CalloutVariant = 'note' | 'caution';

/**
 * A caution callout is the required disclosure treatment above a price table
 * containing licensed-trade coordination. See BUILD.md 9.1 / 6.3.
 */
export function Callout({
  variant = 'note',
  title,
  children,
  className,
}: {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-callout={variant}
      className={cn(
        'border border-l-4 bg-paper-raised px-4 py-3.5 text-sm',
        variant === 'caution' ? 'border-l-flag' : 'border-l-hivis',
        className,
      )}
    >
      {title ? <p className="mb-1 font-semibold text-soil">{title}</p> : null}
      <div className="text-steel [&_a]:text-soil [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </div>
  );
}
