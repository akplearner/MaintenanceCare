import Image from 'next/image';
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
    <figure className={cn('border bg-paper-raised', className)}>
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
          <span className="shrink-0 font-mono text-xs text-steel-light">{photo.timestamp}</span>
        ) : null}
      </figcaption>
    </figure>
  );
}

/**
 * Neutral placeholder. Deliberately reads as "photo pending", not as a design
 * element — nobody should mistake it for finished work.
 */
function PlaceholderPlate({ label }: { label: string }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center bg-[repeating-linear-gradient(135deg,var(--paper),var(--paper)_10px,var(--paper-raised)_10px,var(--paper-raised)_20px)]"
    >
      <span className="max-w-[80%] border border-dashed border-steel-light bg-paper/80 px-3 py-2 text-center font-mono text-xs text-steel">
        PHOTO PENDING
        <span className="mt-1 block font-sans text-xs normal-case text-steel-light">{label}</span>
      </span>
    </div>
  );
}
