import type { Metadata, Viewport } from 'next';
import { locale } from 'next/root-params';
import { notFound } from 'next/navigation';
import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import '../globals.css';

import { SkipLink } from '@/components/layout/SkipLink';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { StickyCta } from '@/components/layout/StickyCta';
import { JsonLd } from '@/components/layout/JsonLd';
import { CtaTracker } from '@/components/analytics/CtaTracker';
import { localBusinessJsonLd, SITE_URL } from '@/lib/seo';
import { company } from '@/content/company';
import { isLocale, LOCALES } from '@/lib/i18n';

// Fails the build on malformed content. See content/validate.ts.
import '@/content/validate';

/**
 * `display: 'optional'` rather than 'swap', deliberately.
 *
 * With 'swap' the hero reflows when Archivo arrives and CLS measured 0.118 on
 * /for/property-managers under 4G with 4x CPU throttling — more than double
 * the 0.05 budget, and worst on exactly the slow rural connections this site
 * has to work on. 'optional' takes it to 0 on every route with no change to
 * LCP. The cost is that a first-time visitor on a slow link may see the
 * metric-adjusted fallback for that one page view; the font is cached from
 * then on. A stable page is worth more here than the first paint being
 * perfectly on-brand.
 */
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-archivo',
  display: 'optional',
  preload: true,
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-plex-mono',
  display: 'optional',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.name} — Property maintenance and field services, Elgin TX`,
    template: `%s — ${company.name}`,
  },
  description:
    'Recurring property maintenance, documented inspections and general repair for property managers, investors and homeowners across Elgin and Central Texas.',
  applicationName: company.name,
  authors: [{ name: company.legalEntity }],
  formatDetection: { telephone: true, address: false, email: false },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#14263f',
  width: 'device-width',
  initialScale: 1,
};

/** Both locales are generated at build time. */
export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }));
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // `[locale]` sits above the root layout, so every Server Component below can
  // read it from next/root-params without prop drilling. Client components
  // cannot, which is why the header and sticky bar take it as a prop.
  const current = await locale();
  if (!current || !isLocale(current)) notFound();

  return (
    <html
      lang={current}
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <SkipLink />
        <SiteHeader locale={current} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <StickyCta locale={current} />
        <JsonLd data={localBusinessJsonLd()} />
        <CtaTracker />
        <Analytics />
      </body>
    </html>
  );
}
