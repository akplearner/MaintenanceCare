/**
 * Locales.
 *
 * English is served from the root (`/plans`), Spanish from a prefix
 * (`/es/plans`). Keeping English unprefixed preserves every URL the site has
 * already published — the alternative, moving everything to `/en/*`, would
 * have broken existing links and the SEO built on them for no reader benefit.
 * `proxy.ts` rewrites the unprefixed paths onto the `[locale]` tree.
 */
export const LOCALES = ['en', 'es'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** `es_ES`-style tag for OpenGraph and `hreflang`. */
export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_US',
};

export const LOCALE_LABEL: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};

/**
 * Prefix an internal path for a locale. The default locale is unprefixed, so
 * this is the identity function for English — which is why English pages did
 * not need rewriting when Spanish was added.
 */
export function localePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  if (path === '/') return `/${locale}`;
  return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Strip a locale prefix back to the canonical, unprefixed path. */
export function stripLocale(pathname: string): string {
  for (const l of LOCALES) {
    if (l === DEFAULT_LOCALE) continue;
    if (pathname === `/${l}`) return '/';
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}
