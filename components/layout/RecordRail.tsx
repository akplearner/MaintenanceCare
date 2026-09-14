import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';
import { StatusChip, type StatusKind } from '@/components/ui/Chip';

interface RecordRailProps {
  /** Mono identifier, e.g. "REF-03". Content, not decoration. */
  reference: string;
  /** Short date stamp, e.g. "09.26". */
  date?: string;
  status?: StatusKind;
  children: ReactNode;
  className?: string;
  /** Hairline above the section. */
  divider?: boolean;
  id?: string;
}

/**
 * The layout's signature primitive.
 *
 * At lg and above the reference sits in a 128px left rail, the way an
 * annotation sits in a log book's margin. Below lg the rail collapses and the
 * reference renders inline above the heading at text-xs.
 */
export function RecordRail({
  reference,
  date,
  status,
  children,
  className,
  divider = true,
  id,
}: RecordRailProps) {
  return (
    <section id={id} className={cn(divider && 'border-t', className)}>
      <Container>
        <div className="lg:grid lg:grid-cols-[8rem_1fr] lg:gap-6">
          <div className="pt-8 lg:pt-12">
            <div className="flex items-baseline gap-3 lg:block">
              <span className="font-mono text-xs font-medium tracking-wide text-steel">
                {reference}
              </span>
              {date ? (
                <span className="font-mono text-xs text-steel-light lg:mt-2 lg:block">{date}</span>
              ) : null}
              {status ? (
                <span className="lg:mt-3 lg:block">
                  <StatusChip kind={status} />
                </span>
              ) : null}
            </div>
          </div>
          <div className="pt-2 pb-12 lg:pt-12 lg:pb-16">{children}</div>
        </div>
      </Container>
    </section>
  );
}
