import { cn } from '@/lib/cn';

/** Inspection-sheet styled list with square check marks. */
export function Checklist({
  items,
  className,
  columns = 1,
}: {
  items: readonly string[];
  className?: string;
  columns?: 1 | 2;
}) {
  return (
    <ul
      className={cn(
        // content-start: inside a flex-1 card the rows would otherwise
        // stretch to fill, spacing a short list out like a menu.
        'grid content-start gap-x-8 gap-y-0',
        columns === 2 && 'sm:grid-cols-2',
        className,
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 border-b py-2.5 text-sm text-soil-soft">
          <span
            aria-hidden
            className="mt-[0.2em] inline-flex h-4 w-4 shrink-0 items-center justify-center border border-steel-light bg-paper-raised"
          >
            <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-verified" aria-hidden>
              <path
                d="M1 5.2 3.6 7.8 9 2.4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="square"
              />
            </svg>
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Two-column detail variant used for the fifteen inspection areas. */
export function ChecklistDetail({
  items,
  className,
}: {
  items: readonly { area: string; detail: string }[];
  className?: string;
}) {
  return (
    <ol className={cn('border-t', className)}>
      {items.map((item, i) => (
        <li key={item.area} className="grid gap-1 border-b py-3 sm:grid-cols-[2.5rem_1fr_1.6fr] sm:gap-4">
          <span className="font-mono text-xs text-steel-light">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-sm font-medium text-soil">{item.area}</span>
          <span className="text-sm text-steel">{item.detail}</span>
        </li>
      ))}
    </ol>
  );
}
