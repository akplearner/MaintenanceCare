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

import { areas, getArea } from '@/content/areas';
import { getDivision } from '@/content/divisions';
import { company } from '@/content/company';
import { absolute, breadcrumbJsonLd, pageMeta, SITE_URL } from '@/lib/seo';

export function generateStaticParams() {
  return areas.map((a) => ({ city: a.slug }));
}

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const area = getArea(slug);
  if (!area) return {};

  return pageMeta({
    title: `Property maintenance in ${area.city}, TX`,
    description: `Recurring maintenance, documented inspections and general repair in ${area.city}, ${area.county}. ${
      area.driveTimeMinutes === 0
        ? 'Our home base — the fastest response times we offer.'
        : `About ${area.driveTimeMinutes} minutes from our Elgin base.`
    }`,
    path: `/service-area/${area.slug}`,
  });
}

export default async function CityPage({ params }: PageProps) {
  const { city: slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const divisions = area.divisions
    .map((d) => getDivision(d))
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
              <Link href="/service-area" className="underline underline-offset-4 hover:text-soil">
                Service area
              </Link>
              <span className="mx-2 text-ink-muted">/</span>
              <span className="text-soil">{area.city}</span>
            </nav>
            <h1 className="text-3xl font-bold text-soil sm:text-4xl">
              Property maintenance in {area.city}, Texas
            </h1>
            <p className="mt-4 max-w-[46ch] text-lg text-steel">
              {area.county} · {area.zips.join(', ')} ·{' '}
              {area.driveTimeMinutes === 0
                ? 'Our home base.'
                : `About ${area.driveTimeMinutes} minutes from our Elgin base.`}
            </p>
            <div className="mt-6">
              <ButtonLink href={`/request?city=${encodeURIComponent(area.city)}`} size="lg">
                Request service in {area.city}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <RecordRail reference="ARE-02" date="09.26" divider={false}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div>
            <SectionHeading as="h2">What {area.city} property actually needs</SectionHeading>
            <p className="mt-4 max-w-[34rem] text-base text-steel">{area.local}</p>
            {area.note ? (
              <Callout className="mt-5 max-w-[34rem]">
                <strong className="font-semibold text-soil">Scheduling in {area.city}:</strong>{' '}
                {area.note}
              </Callout>
            ) : null}
            <FieldNote label="Drive time" className="mt-5 max-w-[34rem]">
              {area.driveTimeMinutes === 0
                ? `${area.city} is where we are based, so there is no drive-time consideration on scheduling here and emergencies during business hours get the fastest response we offer.`
                : `${area.driveTimeMinutes} minutes each way is real cost, and we would rather state it than bury it. We route ${area.city} in blocks so one drive covers several properties, which is why scheduled work is cheaper here than a single same-day call-out.`}
            </FieldNote>
          </div>
          <ServiceAreaMap highlight={area.slug} />
        </div>
      </RecordRail>

      <RecordRail reference="ARE-03">
        <SectionHeading as="h2" lead={`Everything below runs in ${area.city} today.`}>
          Services in {area.city}
        </SectionHeading>
        <DivisionGrid divisions={divisions} className="mt-6" columns={2} />
        <p className="mt-5 max-w-[46rem] text-sm text-steel">
          Licensed trade work — handled by our verified partner contractors — is available
          throughout the service area.{' '}
          <Link
            href="/legal/licensed-partners"
            className="text-soil underline decoration-hivis decoration-2 underline-offset-4"
          >
            How that works
          </Link>
          .
        </p>
      </RecordRail>

      <RecordRail reference="ARE-04">
        <SectionHeading as="h2">Nearby</SectionHeading>
        <ul className="mt-4 flex flex-wrap gap-2">
          {areas
            .filter((a) => a.slug !== area.slug)
            .map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/service-area/${a.slug}`}
                  className="inline-flex items-center gap-2 rounded-md border bg-paper-raised px-3 py-2 text-sm text-soil transition-colors hover:border-soil"
                >
                  {a.city}
                  <span className="text-xs text-ink-muted">
                    {a.driveTimeMinutes === 0 ? 'BASE' : `${a.driveTimeMinutes}m`}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
        <p className="mt-5 text-sm text-steel">
          Working radius is roughly {company.serviceRadiusMiles} miles from Elgin.{' '}
          <Link
            href="/service-area"
            className="text-soil underline decoration-hivis decoration-2 underline-offset-4"
          >
            See the whole service area
          </Link>
          .
        </p>
      </RecordRail>

      <section className="border-t">
        <Container className="py-12">
          <div className="grid gap-4 lg:grid-cols-2">
            <CTABlock variant="single" location={`city-${area.slug}`} />
            <CTABlock variant="portfolio" location={`city-${area.slug}`} />
          </div>
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
