import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Removes the horizontal padding for full-bleed children. */
  bleed?: boolean;
}

export function Container({ children, className, as: As = 'div', bleed = false }: ContainerProps) {
  return (
    <As className={cn('mx-auto w-full max-w-[75rem]', !bleed && 'px-5 sm:px-8', className)}>
      {children}
    </As>
  );
}
