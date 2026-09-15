import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Inset annotation with a left accent rule. Used for the plain-language
 * explanation of what a technician actually does — the thing that turns a
 * line item into something a customer can picture.
 */
export function FieldNote({
  label,
  children,
  className,
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside className={cn('rounded-r-md border-l-2 border-l-hivis bg-paper-raised py-3 pr-4 pl-4', className)}>
      {label ? (
        <p className="mb-1 text-sm font-semibold text-soil">{label}</p>
      ) : null}
      <div className="max-w-[34rem] text-sm text-soil-soft">{children}</div>
    </aside>
  );
}
