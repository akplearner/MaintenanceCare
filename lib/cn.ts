import clsx, { type ClassValue } from 'clsx';

/**
 * Class name joiner. No tailwind-merge: this design system has few enough
 * utilities per element that conflict resolution is not worth the bundle.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
