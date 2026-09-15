import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

import { Container } from '@/components/layout/Container';
import { RecordRail } from '@/components/layout/RecordRail';
import { JsonLd } from '@/components/layout/JsonLd';
import { PhotoPlate } from '@/components/record/PhotoPlate';
import { Checklist } from '@/components/record/Checklist';
import { FieldNote } from '@/components/record/FieldNote';
import { PriceTable, FlatRateMenu } from '@/components/content/PriceTable';
import { CTABlock } from '@/components/content/CTABlock';
import { SectionHeading } from '@/components/content/SectionHeading';
import { Callout } from '@/components/ui/Callout';
import { Chip } from '@/components/ui/Chip';
import { ButtonLink } from '@/components/ui/Button';

import { divisions, getDivision } from '@/content/divisions';
import { getServices } from '@/content/services';
import { audienceLabel, PRIORITY_AUDIENCES } from '@/content/audiences';
import { breadcrumbJsonLd, pageMeta, serviceJsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return divisions.map((d) => ({ division: d.slug }));
}

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ division: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { division: slug } = await params;
  const division = getDivision(slug);
  if (!division) return {};

  return pageMeta({
    title: `${division.name} — ${division.promise.replace(/\.$/, '')}`,
    description: division.fullyLaunched
      ? `${division.summary} Serving Elgin, Bastrop, Manor, Taylor and Pflugerville.`
      : `${division.name} is a Phase ${division.phase} division and is not running yet. ${division.promise}`,
    path: `/services/${division.slug}`,
    noIndex: false,
  });
}

export default async function DivisionPage({ params }: PageProps) {
  const { division: slug } = await params;
  const division = getDivision(slug);
  if (!division) notFound();

  if (!division.fullyLaunched) return <PlaceholderDivision slug={slug} />;

  const allServices = getServices(division.services);
  const flatRate = allServices.filter((s) => s.flatRateMenu);
  const priced = allServices.filter((s) => !s.flatRateMenu);
  const hasLicensedTrade = allServices.some((s) => s.licensedTradeRequired);
  const hasLeadPaintGate = allServices.some((s) => s.leadPaintGated);
  const isPriorityAudience = division.audiences.some((a) => PRIORITY_AUDIENCES.includes(a));

  return (
    <>
      <section className="border-b bg-paper-raised">
        <Container>
          <div className="grid gap-8 pt-2 pb-10 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:pt-14 lg:pb-14">
            <div>
              <nav aria-label="Breadcrumb" className="mb-4 text-sm text-steel">
                <Link href="/services" className="underline underline-offset-4 hover:text-soil">
                  Services
                </Link>
                <span className="mx-2 text-ink-muted">/</span>
                <span className="text-soil">{division.name}</span>
              </nav>
              <h1 className="text-3xl font-bold text-soil sm:text-4xl">{division.name}</h1>
              <p className="mt-4 max-w-[44ch] text-lg text-soil">{division.promise}</p>
              <p className="mt-4 max-w-[46ch] text-base text-steel">{division.summary}</p>
              <div className="mt-6">
                <ButtonLink href={`/request?division=${division.slug}`} size="lg">
                  Request {division.name.toLowerCase()}
                </ButtonLink>
              </div>
            </div>
            <PhotoPlate photo={division.image} priority />
          </div>
        </Container>
      </section>

      <RecordRail reference="DIV-02" divider={false}>
        <SectionHeading lead="Every visit, the same list, so findings are comparable over time.">
          What&rsquo;s included
        </SectionHeading>
        <Checklist items={division.included} className="mt-6 max-w-[52rem] border-t" columns={2} />
      </RecordRail>

      <RecordRail reference="DIV-03">
        <SectionHeading lead="Published, dated, and reviewed quarterly. You will get a written price before anyone turns up.">
          Pricing
        </SectionHeading>

        {hasLicensedTrade ? (
          <Callout variant="caution" title="Licensed partner work" className="mt-5 max-w-[52rem]">
            Some items below are performed by a verified, insured, licensed partner contractor
            rather than by our own technicians. We scope the job, supply access, manage the
            contractor and verify close-out — their labour is quoted directly and never marked up
            silently.{' '}
            <Link href="/legal/licensed-partners">How the partner model works</Link>.
          </Callout>
        ) : null}

        {hasLeadPaintGate ? (
          <Callout title="Homes built before 1978" className="mt-4 max-w-[52rem]">
            Federal Renovation, Repair and Painting rules can require Lead-Safe Certified Firm
            status for qualifying paint and demolition work in pre-1978 housing. That is why the
            request form asks for the year built, and why we confirm certification before
            scheduling that work rather than after.
          </Callout>
        ) : null}

        {flatRate.length > 0 ? (
          <div className="mt-8 max-w-[52rem]">
            <h3 className="text-xl font-semibold text-soil">Flat-rate menu</h3>
            <p className="mt-2 max-w-[46ch] text-base text-steel">
              A named price for the jobs we do most. Most companies will only give you an hourly
              rate; a named price is the thing you actually wanted to know.
            </p>
            <FlatRateMenu services={flatRate} />
          </div>
        ) : null}

        {priced.length > 0 ? (
          <div className="mt-8 max-w-[52rem]">
            {flatRate.length > 0 ? (
              <h3 className="mb-4 text-xl font-semibold text-soil">Everything else</h3>
            ) : null}
            <PriceTable services={priced} />
          </div>
        ) : null}

        <FieldNote label="How we quote" className="mt-8 max-w-[52rem]">
          Ranges exist because properties differ, not because we are hedging. Send photographs
          with your request and we will usually quote at a point inside the range rather than
          quoting the range itself.
        </FieldNote>
      </RecordRail>

      <RecordRail reference="DIV-04">
        <SectionHeading>Who this is for</SectionHeading>
        <div className="mt-5 flex flex-wrap gap-2">
          {division.audiences.map((a) => (
            <Chip key={a} tone="neutral">
              {audienceLabel(a)}
            </Chip>
          ))}
        </div>
      </RecordRail>

      <section className="border-t">
        <Container className="py-12">
          <CTABlock
            variant={isPriorityAudience ? 'portfolio' : 'single'}
            location={`division-${division.slug}`}
          />
        </Container>
      </section>

      <JsonLd
        data={[
          serviceJsonLd({
            name: division.name,
            description: division.summary,
            path: `/services/${division.slug}`,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: division.name, path: `/services/${division.slug}` },
          ]),
        ]}
      />
    </>
  );
}

/**
 * Placeholder pattern: name, promise, one paragraph, one CTA reading
 * "Ask us about this." No aspirational copy implying the service runs today.
 */
function PlaceholderDivision({ slug }: { slug: string }) {
  const division = getDivision(slug);
  if (!division) notFound();

  return (
    <>
      <Container>
        <div className="max-w-[46rem] pt-2 pb-14 lg:pt-14">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-steel">
            <Link href="/services" className="underline underline-offset-4 hover:text-soil">
              Services
            </Link>
            <span className="mx-2 text-ink-muted">/</span>
            <span className="text-soil">{division.name}</span>
          </nav>
          <div className="mb-4">
            <Chip tone="muted">Phase {division.phase} — not running yet</Chip>
          </div>
          <h1 className="text-3xl font-bold text-soil sm:text-4xl">{division.name}</h1>
          <p className="mt-4 text-lg text-soil">{division.promise}</p>
          <p className="mt-4 max-w-[46ch] text-base text-steel">{division.summary}</p>
          <p className="mt-4 max-w-[46ch] text-base text-steel">
            This division is not running today and we are not taking bookings for it. If you need
            it, tell us — knowing there is real demand is what moves a phase forward, and we may
            be able to cover part of it through a division that is already live.
          </p>
          <div className="mt-7">
            <ButtonLink href={`/request?division=${division.slug}`} size="lg">
              Ask us about this
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-steel">
            Running today:{' '}
            {divisions
              .filter((d) => d.fullyLaunched)
              .map((d, i, arr) => (
                <span key={d.slug}>
                  <Link
                    href={`/services/${d.slug}`}
                    className="text-soil underline decoration-hivis decoration-2 underline-offset-4"
                  >
                    {d.name}
                  </Link>
                  {i < arr.length - 1 ? ', ' : '.'}
                </span>
              ))}
          </p>
        </div>
      </Container>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: division.name, path: `/services/${division.slug}` },
        ])}
      />
    </>
  );
}
