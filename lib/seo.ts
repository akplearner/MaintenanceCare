import type { Metadata } from 'next';
import { company } from '@/content/company';
import { DEFAULT_LOCALE, LOCALES, OG_LOCALE, localePath, type Locale } from '@/lib/i18n';
import { areas } from '@/content/areas';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maintenancecare.vercel.app')
  .replace(/\/$/, '');

export function absolute(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  /** Omit to fall back to the route's own opengraph-image. */
  ogImage?: string;
  noIndex?: boolean;
  locale?: Locale;
}

export function pageMeta({
  title,
  description,
  path,
  ogImage,
  noIndex,
  locale = DEFAULT_LOCALE,
}: PageMetaInput): Metadata {
  const url = absolute(localePath(locale, path));

  // Each page points at every language it exists in, and at itself as the
  // canonical for this one. x-default goes to the unprefixed English URL.
  const languages = Object.fromEntries([
    ...LOCALES.map((l) => [l, absolute(localePath(l, path))]),
    ['x-default', absolute(localePath(DEFAULT_LOCALE, path))],
  ]);

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: company.name,
      locale: OG_LOCALE[locale],
      ...(ogImage ? { images: [{ url: absolute(ogImage) }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

/* ── JSON-LD builders ───────────────────────────────────────────────────── */

type Json = Record<string, unknown>;

export function localBusinessJsonLd(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE_URL}/#business`,
    name: company.name,
    legalName: company.legalEntity,
    description:
      'Recurring property maintenance, documented field inspections and general repair for property managers, investors and homeowners in Elgin and Central Texas.',
    url: SITE_URL,
    telephone: company.phone,
    email: company.email,
    // Service-area business: no storefront, so `address` carries locality only.
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.address.locality,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: company.geo.lat,
      longitude: company.geo.lng,
    },
    areaServed: areas.map((a) => ({
      '@type': 'City',
      name: a.city,
      containedInPlace: { '@type': 'AdministrativeArea', name: `${a.county}, Texas` },
    })),
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: company.geo.lat,
        longitude: company.geo.lng,
      },
      geoRadius: String(Math.round(company.serviceRadiusMiles * 1609.34)),
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:30',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '14:00',
      },
    ],
    // No AggregateRating or Review: there are no reviews yet, and inventing
    // them is both a Google penalty and an FTC problem. BUILD.md 8.
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: absolute(input.path),
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: areas.map((a) => ({ '@type': 'City', name: a.city })),
    serviceType: input.name,
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: absolute(t.path),
    })),
  };
}
