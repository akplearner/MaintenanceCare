import type { ReactNode } from 'react';
import Link from 'next/link';
import { Container } from './Container';
import { Prose } from '@/components/ui/Prose';

/**
 * Shared shell for the legal routes. A last-updated date is mandatory: a
 * policy with no date is a policy nobody can rely on, and our own pricing
 * pages make the same promise.
 */
export function LegalPage({
  reference,
  title,
  lead,
  updated,
  children,
}: {
  reference: string;
  title: string;
  lead: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <Container className="py-10 lg:py-14">
      <div className="lg:grid lg:grid-cols-[8rem_1fr] lg:gap-6">
        <div>
          <span className="font-mono text-xs font-medium tracking-wide text-steel">
            {reference}
          </span>
          <span className="ml-3 font-mono text-xs text-steel-light lg:mt-2 lg:ml-0 lg:block">
            {updated}
          </span>
        </div>
        <div className="mt-4 lg:mt-0">
          <h1 className="max-w-[20ch] text-3xl font-bold text-soil sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-[46ch] text-lg text-steel">{lead}</p>
          <p className="mt-3 font-mono text-xs text-steel">Last updated {updated}.</p>
          <Prose className="mt-8">{children}</Prose>
          <p className="mt-10 border-t pt-5 text-sm text-steel">
            <Link
              href="/"
              className="text-soil underline decoration-hivis decoration-2 underline-offset-4"
            >
              Back to the home page
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
}
