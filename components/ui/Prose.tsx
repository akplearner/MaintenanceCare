import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Body copy at a capped measure — 68 characters. */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'max-w-[34rem] text-base text-steel',
        '[&>p+p]:mt-4',
        '[&>h2]:mt-10 [&>h2]:mb-3 [&>h2]:text-2xl [&>h2]:text-soil',
        '[&>h3]:mt-8 [&>h3]:mb-2 [&>h3]:text-xl [&>h3]:text-soil',
        '[&>ul]:mt-4 [&>ul]:space-y-2 [&>ul]:pl-5 [&>ul]:list-disc [&>ul]:marker:text-steel-light',
        '[&>ol]:mt-4 [&>ol]:space-y-2 [&>ol]:pl-5 [&>ol]:list-decimal [&>ol]:marker:text-steel-light',
        '[&_a]:text-soil [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-hivis',
        '[&_strong]:text-soil [&_strong]:font-semibold',
        className,
      )}
    >
      {children}
    </div>
  );
}
