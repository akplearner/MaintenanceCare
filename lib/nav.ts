/** Primary navigation. Fully-launched divisions only — see BUILD.md 4.2. */
export const PRIMARY_NAV = [
  { href: '/services', label: 'Services' },
  { href: '/plans', label: 'Plans' },
  { href: '/for/property-managers', label: 'Property managers' },
  { href: '/sample-report', label: 'Sample report' },
  { href: '/service-area', label: 'Service area' },
] as const;

export const FOOTER_AUDIENCES = [
  { href: '/for/property-managers', label: 'Property managers' },
  { href: '/for/investors', label: 'Investors & absentee owners' },
  { href: '/for/short-term-rentals', label: 'Short-term rentals' },
] as const;

export const FOOTER_LEGAL = [
  { href: '/legal/licensed-partners', label: 'Licensed partners' },
  { href: '/legal/terms', label: 'Terms' },
  { href: '/legal/privacy', label: 'Privacy' },
] as const;
