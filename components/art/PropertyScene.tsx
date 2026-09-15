import { cn } from '@/lib/cn';

/**
 * Original line art of a maintained property.
 *
 * Drawn rather than photographed because no real job photographs exist yet, and
 * BUILD.md 5.1 rules out stock photography — a stock contractor with a clipboard
 * reads as false to the property managers this site is built for. Colors come
 * from CSS variables so the scene re-themes with the palette.
 *
 * The `viewBox` supplies the intrinsic aspect ratio, so the box is reserved
 * before paint and the scene costs nothing against the CLS budget.
 */
export function PropertyScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      role="presentation"
      aria-hidden
      className={cn('h-auto w-full', className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="320" height="200" fill="var(--paper)" />

      {/* Horizon and ground. */}
      <path d="M0 152h320" stroke="var(--rule)" strokeWidth="1.5" />
      <path d="M0 168h320" stroke="var(--rule)" strokeWidth="1" opacity="0.7" />

      {/* Sun, low and warm. */}
      <circle cx="262" cy="52" r="16" fill="var(--accent)" opacity="0.18" />
      <circle cx="262" cy="52" r="9" fill="var(--accent)" opacity="0.5" />

      <g
        fill="none"
        stroke="var(--soil)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* House. */}
        <path d="M62 152V88" />
        <path d="M182 152V88" />
        <path d="M52 92 122 44l70 48" />
        <path d="M62 152h120" />

        {/* Chimney. */}
        <path d="M158 66V52h14v25" />

        {/* Door. */}
        <path d="M104 152v-38h28v38" />
        <circle cx="126" cy="134" r="1.8" fill="var(--soil)" stroke="none" />

        {/* Windows. */}
        <rect x="74" y="104" width="22" height="22" rx="2" />
        <path d="M85 104v22M74 115h22" strokeWidth="1.2" />
        <rect x="148" y="104" width="22" height="22" rx="2" />
        <path d="M159 104v22M148 115h22" strokeWidth="1.2" />

        {/* Tree. */}
        <path d="M246 152v-34" />
        <path d="M246 118a20 20 0 1 1 0.1 0" />
        <path d="M246 130l-10-10M246 140l10-10" strokeWidth="1.2" />
      </g>

      {/* Gutter line — the kind of thing a visit actually checks. */}
      <path d="M52 92h140" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/**
 * A compact mark for the small photo slots on a work-order card, where the full
 * scene would be unreadable.
 */
export function PropertyGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" role="presentation" aria-hidden className={cn('h-auto w-full', className)}>
      <g
        fill="none"
        stroke="var(--steel)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      >
        <path d="M12 34V22" />
        <path d="M36 34V22" />
        <path d="M8 24 24 12l16 12" />
        <path d="M12 34h24" />
        <path d="M20 34v-9h8v9" />
      </g>
    </svg>
  );
}
