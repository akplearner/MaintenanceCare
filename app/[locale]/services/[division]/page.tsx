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

import { locale as rootLocale } from 'next/root-params';

import { divisions } from '@/content/divisions';
import { divisionsFor, getDivisionFor, servicesFor } from '@/content/localized';
import { audienceLabel, PRIORITY_AUDIENCES } from '@/content/audiences';
import { ui } from '@/content/i18n/ui';
import { DEFAULT_LOCALE, isLocale, localePath, type Locale } from '@/lib/i18n';
import { breadcrumbJsonLd, pageMeta, serviceJsonLd } from '@/lib/seo';

/** The active locale, narrowed, for any server component on this route. */
async function current(): Promise<Locale> {
  const raw = await rootLocale();
  return raw && isLocale(raw) ? raw : DEFAULT_LOCALE;
}

export function generateStaticParams() {
  return divisions.map((d) => ({ division: d.slug }));
}

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ division: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { division: slug } = await params;
  const locale = await current();
  const division = getDivisionFor(slug, locale);
  if (!division) return {};
  const t = ui(locale).divisionPage;

  return pageMeta({
    title: `${division.name} — ${division.promise.replace(/\.$/, '')}`,
    description: division.fullyLaunched
      ? `${division.summary}`
      : `${division.name}: ${t.notRunning}. ${division.promise}`,
    path: `/services/${division.slug}`,
    locale,
    noIndex: false,
  });
}

export default async function DivisionPage({ params }: PageProps) {
  const { division: slug } = await params;
  const locale = await current();
  const division = getDivisionFor(slug, locale);
  if (!division) notFound();

  if (!division.fullyLaunched) return <PlaceholderDivision slug={slug} locale={locale} />;

  const t = ui(locale).divisionPage;
  const p = (path: string) => localePath(locale, path);
  const byId = new Map(servicesFor(locale).map((x) => [x.id, x]));
  const allServices = division.services.map((id) => byId.get(id)!).filter(Boolean);
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
                <Link href={p('/services')} className="underline underline-offset-4 hover:text-soil">
                  {t.breadcrumbServices}
                </Link>
                <span className="mx-2 text-ink-muted">/</span>
                <span className="text-soil">{division.name}</span>
              </nav>
              <h1 className="text-3xl font-bold text-soil sm:text-4xl">{division.name}</h1>
              <p className="mt-4 max-w-[44ch] text-lg text-soil">{division.promise}</p>
              <p className="mt-4 max-w-[46ch] text-base text-steel">{division.summary}</p>
              <div className="mt-6">
                <ButtonLink href={p(`/request?division=${division.slug}`)} size="lg">
                  {t.requestPrefix} {division.name.toLowerCase()}
                </ButtonLink>
              </div>
            </div>
            <PhotoPlate photo={division.image} priority />
          </div>
        </Container>
      </section>

      <RecordRail reference="DIV-02" divider={false}>
        <SectionHeading lead={t.includedLead}>{t.included}</SectionHeading>
        <Checklist items={division.included} className="mt-6 max-w-[52rem] border-t" columns={2} />
      </RecordRail>

      <RecordRail reference="DIV-03">
        <SectionHeading lead={t.pricingLead}>{t.pricing}</SectionHeading>

        {hasLicensedTrade ? (
          <Callout variant="caution" title={t.licensedPartnerWork} className="mt-5 max-w-[52rem]">
            {t.licensedPartnerBody}{' '}
            <Link href={p('/legal/licensed-partners')}>{t.partnerModelLink}</Link>.
          </Callout>
        ) : null}

        {hasLeadPaintGate ? (
          <Callout title={t.pre1978} className="mt-4 max-w-[52rem]">
            {t.pre1978Body}
          </Callout>
        ) : null}

        {flatRate.length > 0 ? (
          <div className="mt-8 max-w-[52rem]">
            <h3 className="text-xl font-semibold text-soil">{t.flatRateMenu}</h3>
            <p className="mt-2 max-w-[46ch] text-base text-steel">
              {t.flatRateLead}
            </p>
            <FlatRateMenu services={flatRate} locale={locale} />
          </div>
        ) : null}

        {priced.length > 0 ? (
          <div className="mt-8 max-w-[52rem]">
            {flatRate.length > 0 ? (
              <h3 className="mb-4 text-xl font-semibold text-soil">{t.everythingElse}</h3>
            ) : null}
            <PriceTable services={priced} locale={locale} />
          </div>
        ) : null}

        <FieldNote label={t.howWeQuote} className="mt-8 max-w-[52rem]">
          {t.howWeQuoteBody}
        </FieldNote>
      </RecordRail>

      <RecordRail reference="DIV-04">
        <SectionHeading>{t.whoThisIsFor}</SectionHeading>
        <div className="mt-5 flex flex-wrap gap-2">
          {division.audiences.map((a) => (
            <Chip key={a} tone="neutral">
              {audienceLabel(a, locale)}
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
function PlaceholderDivision({ slug, locale }: { slug: string; locale: Locale }) {
  const t = ui(locale).divisionPage;
  const p = (path: string) => localePath(locale, path);
  const division = getDivisionFor(slug, locale);
  if (!division) notFound();

  return (
    <>
      <Container>
        <div className="max-w-[46rem] pt-2 pb-14 lg:pt-14">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-steel">
            <Link href={p('/services')} className="underline underline-offset-4 hover:text-soil">
              {t.breadcrumbServices}
            </Link>
            <span className="mx-2 text-ink-muted">/</span>
            <span className="text-soil">{division.name}</span>
          </nav>
          <div className="mb-4">
            <Chip tone="muted">{t.notRunning}</Chip>
          </div>
          <h1 className="text-3xl font-bold text-soil sm:text-4xl">{division.name}</h1>
          <p className="mt-4 text-lg text-soil">{division.promise}</p>
          <p className="mt-4 max-w-[46ch] text-base text-steel">{division.summary}</p>
          <p className="mt-4 max-w-[46ch] text-base text-steel">
            {t.notRunningBody}
          </p>
          <div className="mt-7">
            <ButtonLink href={p(`/request?division=${division.slug}`)} size="lg">
              {t.askUs}
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-steel">
            {t.runningToday}{' '}
            {divisionsFor(locale)
              .filter((d) => d.fullyLaunched)
              .map((d, i, arr) => (
                <span key={d.slug}>
                  <Link
                    href={p(`/services/${d.slug}`)}
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
