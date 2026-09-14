import type { Faq } from '@/content/types';
import { cn } from '@/lib/cn';

/**
 * `<details>`-based so it works with JavaScript disabled and costs no bundle.
 */
export function FAQ({ items, className }: { items: Faq[]; className?: string }) {
  if (items.length === 0) return null;

  return (
    <div className={cn('border-t', className)}>
      {items.map((f) => (
        <details key={f.id} className="group border-b">
          <summary className="flex items-start justify-between gap-4 py-4 text-base font-medium text-soil">
            {f.question}
            <span
              aria-hidden
              className="relative mt-2 inline-block h-3 w-3 shrink-0 border-steel-light"
            >
              <span className="absolute top-1/2 left-0 h-[1.5px] w-3 -translate-y-1/2 bg-soil" />
              <span className="absolute top-0 left-1/2 h-3 w-[1.5px] -translate-x-1/2 bg-soil transition-transform group-open:scale-y-0" />
            </span>
          </summary>
          <div className="max-w-[40rem] pb-4 text-sm text-steel">{f.answer}</div>
        </details>
      ))}
    </div>
  );
}
