import { Check } from 'lucide-react';

export interface ProofItem {
  label: string;
  value: string;
}

/**
 * The vendor-qualification answers a property manager checks before they will
 * even take a call. Stated as facts, in a table, because that is how their
 * compliance checklist is shaped.
 */
export function ProofPanel({
  heading,
  items,
  footnote,
}: {
  heading: string;
  items: ProofItem[];
  footnote?: string;
}) {
  return (
    <div className="border bg-paper">
      <p className="border-b bg-soil px-4 py-2.5 text-sm font-semibold text-accent-on-dark">
        {heading}
      </p>
      <dl>
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-start justify-between gap-4 border-b px-4 py-2.5 last:border-b-0"
          >
            <dt className="text-sm text-steel">{item.label}</dt>
            <dd className="flex shrink-0 items-center gap-1.5 text-right text-sm font-medium text-soil">
              <Check aria-hidden size={14} strokeWidth={2} className="text-verified" />
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
      {footnote ? (
        <p className="border-t px-4 py-2.5 text-xs text-steel">{footnote}</p>
      ) : null}
    </div>
  );
}
