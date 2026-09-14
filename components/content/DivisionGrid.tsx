import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Division } from '@/content/types';
import { audienceLabel } from '@/content/audiences';
import { Chip } from '@/components/ui/Chip';
import { cn } from '@/lib/cn';

export function DivisionCard({
  division,
  className,
}: {
  division: Division;
  className?: string;
}) {
  const muted = !division.fullyLaunched;

  return (
    <Link
      href={`/services/${division.slug}`}
      className={cn(
        'group flex flex-col border bg-paper-raised p-5 transition-colors hover:border-soil',
        muted && 'bg-transparent',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className={cn(
            'text-xl font-semibold text-soil',
            muted && 'text-steel',
          )}
        >
          {division.name}
        </h3>
        <ArrowUpRight
          aria-hidden
          size={18}
          strokeWidth={1.5}
          className="mt-1 shrink-0 text-steel-light transition-colors group-hover:text-soil"
        />
      </div>
      <p className={cn('mt-2 flex-1 text-sm', muted ? 'text-steel-light' : 'text-steel')}>
        {division.promise}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {muted ? (
          <Chip tone="muted">Phase {division.phase} — ask us</Chip>
        ) : (
          division.audiences
            .slice(0, 3)
            .map((a) => (
              <Chip key={a} tone="neutral">
                {audienceLabel(a)}
              </Chip>
            ))
        )}
      </div>
    </Link>
  );
}

export function DivisionGrid({
  divisions,
  className,
  columns = 4,
}: {
  divisions: Division[];
  className?: string;
  columns?: 2 | 3 | 4;
}) {
  return (
    <div
      className={cn(
        'grid gap-4',
        columns === 4 && 'sm:grid-cols-2 lg:grid-cols-4',
        columns === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
        columns === 2 && 'sm:grid-cols-2',
        className,
      )}
    >
      {divisions.map((d) => (
        <DivisionCard key={d.slug} division={d} />
      ))}
    </div>
  );
}
