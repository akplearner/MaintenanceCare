import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import { Chip } from '@/components/ui/Chip';

export function AudienceHero({
  reference,
  eyebrow,
  title,
  lead,
  chips,
  children,
  aside,
}: {
  reference: string;
  eyebrow: string;
  title: string;
  lead: string;
  chips?: string[];
  children?: ReactNode;
  /** Proof beside the pitch. Without it the fold is half empty on desktop. */
  aside?: ReactNode;
}) {
  return (
    <section className="border-b bg-paper-raised">
      <Container>
        <div className="lg:grid lg:grid-cols-[8rem_1fr] lg:gap-6">
          <div className="pt-8 lg:pt-14">
            <span className="font-mono text-xs font-medium tracking-wide text-steel">
              {reference}
            </span>
          </div>
          <div
            className={
              aside
                ? 'grid gap-10 pt-2 pb-10 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-12 lg:pt-14 lg:pb-14'
                : 'pt-2 pb-10 lg:pt-14 lg:pb-14'
            }
          >
            <div>
              <p className="font-mono text-xs tracking-wide text-hivis-ink uppercase">{eyebrow}</p>
              <h1 className="mt-3 max-w-[18ch] text-3xl font-bold text-soil sm:text-4xl">
                {title}
              </h1>
              <p className="mt-4 max-w-[46ch] text-lg text-steel">{lead}</p>
              {chips && chips.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {chips.map((c) => (
                    <Chip key={c} tone="neutral">
                      {c}
                    </Chip>
                  ))}
                </div>
              ) : null}
              {children ? <div className="mt-6">{children}</div> : null}
            </div>
            {aside ? <div>{aside}</div> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
