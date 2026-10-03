import Link from 'next/link';
import { ArrowRight, BadgeCheck, FileText } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { RecordRail } from '@/components/layout/RecordRail';
import { JsonLd } from '@/components/layout/JsonLd';
import { RecordCard, HERO_RECORD, HERO_RECORD_ES } from '@/components/record/RecordCard';
import { DivisionGrid } from '@/components/content/DivisionGrid';
import { PlanComparison } from '@/components/content/PlanComparison';
import { CTABlock } from '@/components/content/CTABlock';
import { FAQ } from '@/components/content/FAQ';
import { SectionHeading } from '@/components/content/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';

import { locale as rootLocale } from 'next/root-params';

import { launchedDivisionsFor, upcomingDivisionsFor } from '@/content/localized';
import {
  LICENSING_STANCE,
  LICENSING_STANCE_ES,
  NOT_PROVIDED_DIRECTLY,
  NOT_PROVIDED_DIRECTLY_ES,
  ROUTED_INSTEAD,
  ROUTED_INSTEAD_ES,
} from '@/content/company';
import { faqsForIn } from '@/content/localized';
import { ui } from '@/content/i18n/ui';
import { DEFAULT_LOCALE, isLocale, localePath } from '@/lib/i18n';
import { faqJsonLd, pageMeta } from '@/lib/seo';
import { HomeHeroCta } from '@/components/content/HomeHeroCta';
import { TrustBar } from '@/components/content/TrustBar';

export async function generateMetadata() {
  const raw = await rootLocale();
  const current = raw && isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = ui(current).home;
  return pageMeta({ title: t.metaTitle, description: t.metaDescription, path: '/', locale: current });
}

export default async function HomePage() {
  const raw = await rootLocale();
  const current = raw && isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = ui(current);
  const h = t.home;
  const p = (path: string) => localePath(current, path);

  const launchedDivisions = launchedDivisionsFor(current);
  const upcomingDivisions = upcomingDivisionsFor(current);
  const homeFaqs = faqsForIn('home', current);
  const stance = current === 'es' ? LICENSING_STANCE_ES : LICENSING_STANCE;
  const notProvided = current === 'es' ? NOT_PROVIDED_DIRECTLY_ES : NOT_PROVIDED_DIRECTLY;
  const routed = current === 'es' ? ROUTED_INSTEAD_ES : ROUTED_INSTEAD;

  return (
    <>
      {/* The hero answers "is this for me?" before it answers anything else. */}
      <section className="border-b bg-paper-raised">
        <Container>
          <div className="grid gap-10 pt-10 pb-12 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-12 lg:pt-14 lg:pb-16">
            <div>
              <h1 className="max-w-[18ch] text-4xl font-bold tracking-tight text-soil sm:text-5xl">
                {h.h1}
              </h1>
              <p className="mt-5 max-w-[46ch] text-lg text-steel">
                {h.lead}
              </p>

              <HomeHeroCta locale={current} />

              <TrustBar className="mt-8 border-t pt-6" locale={current} />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-soil">
                {h.recordLabel}
              </p>
              <RecordCard data={current === 'es' ? HERO_RECORD_ES : HERO_RECORD} animateStamp />
              <p className="mt-3 text-sm text-steel">
                {h.exampleRecord}{' '}
                <Link
                  href={p('/sample-report')}
                  className="text-soil underline decoration-hivis decoration-2 underline-offset-4"
                >
                  {h.downloadReal}
                </Link>{' '}
                {h.noEmailNeeded}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What we do */}
      <RecordRail reference="REF-01" date="09.26" divider={false}>
        <SectionHeading lead={h.whatWeDoLead}>{h.whatWeDo}</SectionHeading>
        <DivisionGrid divisions={launchedDivisions} className="mt-6" locale={current} />
        <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-steel">
          <span>{h.comingLater}</span>
          {upcomingDivisions.map((d, i) => (
            <span key={d.slug}>
              <Link
                href={p(`/services/${d.slug}`)}
                className="text-soil underline decoration-steel-light underline-offset-4 hover:decoration-soil"
              >
                {d.name}
              </Link>
              {i < upcomingDivisions.length - 1 ? ',' : ''}
            </span>
          ))}
          <Link
            href={p('/services')}
            className="inline-flex items-center gap-1 font-medium text-soil underline decoration-hivis decoration-2 underline-offset-4"
          >
            {h.seeAllServices}
            <ArrowRight aria-hidden size={14} strokeWidth={1.75} />
          </Link>
        </div>
      </RecordRail>

      {/* Who we work for */}
      <RecordRail reference="REF-02">
        <SectionHeading lead={h.whoWeWorkForLead}>{h.whoWeWorkFor}</SectionHeading>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {h.audiences.map((a) => (
            <Link
              key={a.href}
              href={p(a.href)}
              className="group flex flex-col rounded-lg border bg-paper-raised p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-soil">{a.title}</h3>
              <p className="mt-2 flex-1 text-sm text-steel">{a.body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-soil">
                {a.cta}
                <ArrowRight
                  aria-hidden
                  size={15}
                  strokeWidth={1.75}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-5 text-sm text-steel">
          {h.alsoWorking}{' '}
          <Link
            href={p('/request')}
            className="text-soil underline decoration-hivis decoration-2 underline-offset-4"
          >
            {h.tellUsWhatYouManage}
          </Link>
          .
        </p>
      </RecordRail>

      {/* Plans */}
      <RecordRail reference="REF-03">
        <SectionHeading lead={h.plansLead}>{h.plans}</SectionHeading>
        <PlanComparison className="mt-6" compact locale={current} />
        <div className="mt-5">
          <ButtonLink href={p('/plans')} variant="secondary">
            {h.seeWhatsIncluded}
          </ButtonLink>
        </div>
      </RecordRail>

      {/* The licensing boundary, as a trust asset. BUILD.md 6.1: do not bury it. */}
      <RecordRail reference="REF-04" status="verified">
        <SectionHeading>{stance.heading}</SectionHeading>
        <p className="mt-3 max-w-[46ch] text-lg text-soil">{stance.lead}</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border bg-paper-raised p-5 shadow-sm">
            <p className="text-sm font-semibold text-soil">{h.weDoNotPerform}</p>
            <ul className="mt-3 space-y-2">
              {notProvided.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-steel">
                  <span aria-hidden className="mt-[0.6em] inline-block h-[2px] w-2.5 shrink-0 bg-flag" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border bg-paper-raised p-5 shadow-sm">
            <p className="text-sm font-semibold text-soil">{h.whatWeDoInstead}</p>
            <ul className="mt-3 space-y-2.5">
              {routed.map((item) => (
                <li key={item.trade} className="flex items-start gap-2.5 text-sm">
                  <BadgeCheck
                    aria-hidden
                    size={16}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0 text-verified"
                  />
                  <span className="text-steel">
                    <span className="font-medium text-soil">{item.trade}</span> {h.routedSuffix}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href={p('/legal/licensed-partners')}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-soil underline decoration-hivis decoration-2 underline-offset-4"
            >
              {h.howWeVet}
              <ArrowRight aria-hidden size={14} strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </RecordRail>

      {/* The sample report, ungated */}
      <RecordRail reference="REF-05">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <SectionHeading lead={h.sampleReportLead}>{h.sampleReport}</SectionHeading>
            <div className="mt-4 flex flex-wrap gap-2">
              {h.sampleChips.map((c) => (
                <Chip key={c} tone="neutral">
                  {c}
                </Chip>
              ))}
            </div>
          </div>
          <ButtonLink href={p('/sample-report')} size="lg" className="w-fit">
            <FileText aria-hidden size={18} strokeWidth={1.5} />
            {h.viewSample}
          </ButtonLink>
        </div>
      </RecordRail>

      {/* Questions */}
      <RecordRail reference="REF-06">
        <SectionHeading>{h.questions}</SectionHeading>
        <FAQ items={homeFaqs} className="mt-6 max-w-[52rem]" />
      </RecordRail>

      <section className="border-t">
        <Container className="py-12">
          <CTABlock variant="portfolio" location="home-footer" alt />
        </Container>
      </section>

      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}
