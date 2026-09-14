'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface FieldProps {
  id: string;
  label: string;
  /** Help text. Wired to the control through aria-describedby. */
  hint?: ReactNode;
  error?: string;
  required?: boolean;
  optionalLabel?: boolean;
  children: (ids: { id: string; describedBy: string | undefined; invalid: boolean }) => ReactNode;
  className?: string;
}

/**
 * Field owns the accessibility wiring so no individual input has to remember
 * it: label association, aria-describedby for both hint and error, and
 * aria-invalid. Errors are rendered inside a live region by the form.
 */
export function Field({
  id,
  label,
  hint,
  error,
  required,
  optionalLabel,
  children,
  className,
}: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium text-soil">
        {label}
        {required ? (
          <span className="ml-1 text-flag" aria-hidden>
            *
          </span>
        ) : null}
        {optionalLabel ? <span className="ml-1.5 font-normal text-steel">(optional)</span> : null}
      </label>
      {hint ? (
        <p id={hintId} className="text-sm text-steel">
          {hint}
        </p>
      ) : null}
      {children({ id, describedBy, invalid: Boolean(error) })}
      {error ? (
        <p id={errorId} className="flex items-start gap-1.5 text-sm font-medium text-flag">
          <span aria-hidden className="mt-[0.45em] inline-block h-1.5 w-1.5 shrink-0 bg-flag" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const inputClass =
  'w-full min-h-[2.75rem] rounded-none border bg-paper-raised px-3 py-2.5 text-base text-soil ' +
  'placeholder:text-steel-light transition-colors ' +
  'aria-[invalid=true]:border-flag aria-[invalid=true]:border-2 ' +
  'hover:border-steel focus:border-soil';

/** Square checkbox / radio, inspection-sheet styled, 44px touch target. */
export function ChoiceTile({
  children,
  className,
  checked,
}: {
  children: ReactNode;
  className?: string;
  checked?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex min-h-[2.75rem] cursor-pointer items-center gap-2.5 border bg-paper-raised px-3 py-2.5 text-sm transition-colors',
        checked ? 'border-soil border-2 bg-paper' : 'hover:border-steel',
        className,
      )}
    >
      {children}
    </div>
  );
}
