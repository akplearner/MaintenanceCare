import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'quiet';
type Size = 'md' | 'lg';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-none border font-medium transition-colors ' +
  'min-h-[2.75rem] disabled:cursor-not-allowed disabled:opacity-60';

const VARIANT: Record<Variant, string> = {
  primary: 'border-soil bg-soil text-paper hover:bg-soil-soft',
  secondary: 'border-soil bg-transparent text-soil hover:bg-soil hover:text-paper',
  quiet: 'border-transparent bg-transparent text-soil underline underline-offset-4 decoration-hivis decoration-2 hover:decoration-soil',
};

const SIZE: Record<Size, string> = {
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={cn(BASE, VARIANT[variant], SIZE[size], className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link href={href} className={cn(BASE, VARIANT[variant], SIZE[size], className)} {...rest}>
      {children}
    </Link>
  );
}
