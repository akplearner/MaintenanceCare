import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';
import type { StatusKind } from '@/components/ui/Chip';

interface SectionProps {
  /**
   * Retired. This used to print a mono "REF-03" marker into a 128px margin
   * rail. It read as a filing code to anyone who was not already a facilities
   * manager, so it no longer renders. The prop stays so call sites keep
   * compiling; they can be cleaned up in a separate pass.
   */
  reference?: string;
  /** Retired alongside `reference`. */
  date?: string;
  /** Retired alongside `reference`. */
  status?: StatusKind;
  children: ReactNode;
  className?: string;
  /** Hairline above the section. */
  divider?: boolean;
  id?: string;
}

/**
 * A page section: full-width container, generous vertical rhythm, an optional
 * hairline above. Sections are separated by space and rule, not by a margin
 * annotation.
 */
export function RecordRail({ children, className, divider = true, id }: SectionProps) {
  return (
    <section id={id} className={cn(divider && 'border-t', className)}>
      <Container>
        <div className="py-12 lg:py-16">{children}</div>
      </Container>
    </section>
  );
}
