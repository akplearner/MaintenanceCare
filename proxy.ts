import { NextResponse, type NextRequest } from 'next/server';

import { DEFAULT_LOCALE, LOCALES } from '@/lib/i18n';

const PREFIXED = LOCALES.filter((l) => l !== DEFAULT_LOCALE);

/**
 * Locale routing.
 *
 * Every route lives under `app/[locale]`, but English is published without a
 * prefix so that `/plans` keeps working. Two rules:
 *
 *   1. `/plans`     -> rewrite to `/en/plans`. The URL the visitor sees, and
 *      the one search engines index, stays unprefixed.
 *   2. `/en/plans`  -> redirect to `/plans`, permanently. Without this the
 *      same page would be reachable at two URLs, which is duplicate content.
 *
 * Spanish (`/es/...`) passes straight through.
 *
 * Renamed from `middleware` in Next 16 — see the proxy file convention.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || '/';
    return NextResponse.redirect(url, 308);
  }

  if (PREFIXED.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except Next internals, the API, and files served from /public.
  matcher: ['/((?!_next|api|.*\\.[a-zA-Z0-9]+$).*)'],
};
