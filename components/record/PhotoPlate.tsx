import Image from 'next/image';

import { PropertyScene } from '@/components/art/PropertyScene';
import type { Photo } from '@/content/types';
import { cn } from '@/lib/cn';

/**
 * An image with a mono timestamp caption bar.
 *
 * `photo.alt` is typed `NonEmptyString`, so a plate without real alternative
 * text does not compile. Where no real job photograph exists yet, the plate
 * renders a neutral block — never stock photography (BUILD.md 5.1).
 */
export function PhotoPlate({
  photo,
  className,
  priority = false,
  sizes = '(min-width: 1024px) 40rem, 100vw',
  aspect = 'aspect-[3/2]',
}: {
  photo: Photo;
  className?: string;
  priority?: boolean;
  sizes?: string;
  aspect?: string;
}) {
  return (
    <figure className={cn('overflow-hidden rounded-lg border bg-paper-raised', className)}>
      <div className={cn('relative w-full overflow-hidden', aspect)}>
        {photo.placeholder ? (
          <PlaceholderPlate label={photo.alt} />
        ) : (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        )}
      </div>
      <figcaption className="flex items-center justify-between gap-3 border-t px-3 py-2">
        <span className="truncate text-xs text-steel">{photo.alt}</span>
        {photo.timestamp ? (
          <span className="shrink-0 font-mono text-xs text-ink-muted">{photo.timestamp}</span>
        ) : null}
      </figcaption>
    </figure>
  );
}

/**
 * Drawn placeholder. Original line art rather than stock photography
 * (BUILD.md 5.1), with the caption still saying plainly that a real photograph
 * is pending, so nobody mistakes it for finished work.
 */
function PlaceholderPlate({ label }: { label: string }) {
  return (
    <div aria-hidden className="absolute inset-0">
      <PropertyScene className="h-full w-full object-cover" />
      <span className="absolute bottom-2 left-2 rounded-sm bg-paper-raised/85 px-2 py-1 text-[0.625rem] font-medium text-steel">
        Illustration &mdash; real job photograph pending
      </span>
      <span className="sr-only">{label}</span>
    </div>
  );
}
