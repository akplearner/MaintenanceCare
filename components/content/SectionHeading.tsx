import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function SectionHeading({
  children,
  lead,
  className,
  as: As = 'h2',
}: {
  children: ReactNode;
  lead?: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <div className={cn('max-w-[46rem]', className)}>
      <As className="text-2xl font-semibold text-soil sm:text-3xl">{children}</As>
      {lead ? <p className="mt-3 max-w-[46ch] text-lg text-steel">{lead}</p> : null}
    </div>
  );
}
