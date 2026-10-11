import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

import { Container } from '@/components/layout/Container';
import { RecordRail } from '@/components/layout/RecordRail';
import { JsonLd } from '@/components/layout/JsonLd';
import { ServiceAreaMap } from '@/components/content/ServiceAreaMap';
import { DivisionGrid } from '@/components/content/DivisionGrid';
import { CTABlock } from '@/components/content/CTABlock';
import { SectionHeading } from '@/components/content/SectionHeading';
import { FieldNote } from '@/components/record/FieldNote';
import { Callout } from '@/components/ui/Callout';
import { ButtonLink } from '@/components/ui/Button';

import { locale as rootLocale } from 'next/root-params';

import { areas } from '@/content/areas';
import { areasFor, getAreaFor, getDivisionFor } from '@/content/localized';
import { company } from '@/content/company';
import { ui } from '@/content/i18n/ui';
import { DEFAULT_LOCALE, isLocale, localePath, type Locale } from '@/lib/i18n';
import { absolute, breadcrumbJsonLd, pageMeta, SITE_URL } from '@/lib/seo';

async function current(): Promise<Locale> {
  const raw = await rootLocale();
  return raw && isLocale(raw) ? raw : DEFAULT_LOCALE;
}

export function generateStaticParams() {
  return areas.map((a) => ({ city: a.slug }));
}

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const locale = await current();
  const area = getAreaFor(slug, locale);
  if (!area) return {};
  const t = ui(locale).cityPage;

  return pageMeta({
    title: t.metaTitle(area.city),
    description: t.metaDescription(
      area.city,
      area.county,
      area.driveTimeMinutes === 0 ? t.homeBase : t.aboutMinutes(area.driveTimeMinutes),
    ),
    path: `/service-area/${area.slug}`,
    locale,
  });
}

export default async function CityPage({ params }: PageProps) {
  const { city: slug } = await params;
  const locale = await current();
  const t = ui(locale).cityPage;
  const p = (path: string) => localePath(locale, path);
  const area = getAreaFor(slug, locale);
  if (!area) notFound();

  const divisions = area.divisions
    .map((d) => getDivisionFor(d, locale))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  const localJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Property maintenance and inspection in ${area.city}, Texas`,
    description: area.local.slice(0, 300),
    url: absolute(`/service-area/${area.slug}`),
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: {
      '@type': 'City',
      name: area.city,
      address: {
        '@type': 'PostalAddress',
        addressLocality: area.city,
        addressRegion: area.state,
        addressCountry: 'US',
      },
      geo: { '@type': 'GeoCoordinates', latitude: area.lat, longitude: area.lng },
      containedInPlace: { '@type': 'AdministrativeArea', name: `${area.county}, Texas` },
    },
  };

  return (
    <>
      <section className="border-b bg-paper-raised">
        <Container>
          <div className="pt-10 pb-10 lg:pt-16 lg:pb-14">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-steel">
              <Link href={p('/service-area')} className="underline underline-offset-4 hover:text-soil">
                {ui(locale).areaPage.breadcrumbArea}
              </Link>
              <span className="mx-2 text-ink-muted">/</span>
              <span className="text-soil">{area.city}</span>
            </nav>
            <h1 className="text-3xl font-bold text-soil sm:text-4xl">
              {t.h1(area.city)}
            </h1>
            <p className="mt-4 max-w-[46ch] text-lg text-steel">
              {area.county} · {area.zips.join(', ')} ·{' '}
              {area.driveTimeMinutes === 0 ? t.homeBase : t.aboutMinutes(area.driveTimeMinutes)}
            </p>
            <div className="mt-6">
              <ButtonLink href={p(`/request?city=${encodeURIComponent(area.city)}`)} size="lg">
                {t.requestIn(area.city)}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <RecordRail reference="ARE-02" date="09.26" divider={false}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div>
            <SectionHeading as="h2">{t.whatNeeds(area.city)}</SectionHeading>
            <p className="mt-4 max-w-[34rem] text-base text-steel">{area.local}</p>
            {area.note ? (
              <Callout className="mt-5 max-w-[34rem]">
                <strong className="font-semibold text-soil">{t.schedulingIn(area.city)}</strong>{' '}
                {area.note}
              </Callout>
            ) : null}
            <FieldNote label={t.driveTime} className="mt-5 max-w-[34rem]">
              {area.driveTimeMinutes === 0
                ? t.driveBase(area.city)
                : t.driveAway(area.driveTimeMinutes, area.city)}
            </FieldNote>
          </div>
          <ServiceAreaMap highlight={area.slug} locale={locale} />
        </div>
      </RecordRail>

      <RecordRail reference="ARE-03">
        <SectionHeading as="h2" lead={t.servicesLead(area.city)}>
          {t.servicesIn(area.city)}
        </SectionHeading>
        <DivisionGrid divisions={divisions} className="mt-6" columns={2} locale={locale} />
        <p className="mt-5 max-w-[46rem] text-sm text-steel">
          {t.licensedNote}{' '}
          <Link
            href={p('/legal/licensed-partners')}
            className="text-soil underline decoration-hivis decoration-2 underline-offset-4"
          >
            {t.howThatWorks}
          </Link>
          .
        </p>
      </RecordRail>

      <RecordRail reference="ARE-04">
        <SectionHeading as="h2">{t.nearby}</SectionHeading>
        <ul className="mt-4 flex flex-wrap gap-2">
          {areasFor(locale)
            .filter((a) => a.slug !== area.slug)
            .map((a) => (
              <li key={a.slug}>
                <Link
                  href={p(`/service-area/${a.slug}`)}
                  className="inline-flex items-center gap-2 rounded-md border bg-paper-raised px-3 py-2 text-sm text-soil transition-colors hover:border-soil"
                >
                  {a.city}
                  <span className="text-xs text-ink-muted">
                    {a.driveTimeMinutes === 0 ? ui(locale).areaPage.base : `${a.driveTimeMinutes}m`}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
        <p className="mt-5 text-sm text-steel">
          {t.radiusNote(company.serviceRadiusMiles)}{' '}
          <Link
            href={p('/service-area')}
            className="text-soil underline decoration-hivis decoration-2 underline-offset-4"
          >
            {t.seeWholeArea}
          </Link>
          .
        </p>
      </RecordRail>

      <section className="border-t">
        <Container className="py-12">
          <CTABlock variant="single" location={`city-${area.slug}`} alt />
        </Container>
      </section>

      <JsonLd
        data={[
          localJsonLd,
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Service area', path: '/service-area' },
            { name: area.city, path: `/service-area/${area.slug}` },
          ]),
        ]}
      />
    </>
  );
}
