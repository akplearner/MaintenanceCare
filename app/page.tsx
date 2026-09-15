import Link from 'next/link';
import { ArrowRight, BadgeCheck, FileText } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { RecordRail } from '@/components/layout/RecordRail';
import { JsonLd } from '@/components/layout/JsonLd';
import { RecordCard, HERO_RECORD } from '@/components/record/RecordCard';
import { DivisionGrid } from '@/components/content/DivisionGrid';
import { PlanComparison } from '@/components/content/PlanComparison';
import { CTABlock } from '@/components/content/CTABlock';
import { FAQ } from '@/components/content/FAQ';
import { SectionHeading } from '@/components/content/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';

import { launchedDivisions, upcomingDivisions } from '@/content/divisions';
import { LICENSING_STANCE, NOT_PROVIDED_DIRECTLY, ROUTED_INSTEAD, company } from '@/content/company';
import { faqsFor } from '@/content/faqs';
import { faqJsonLd, pageMeta } from '@/lib/seo';
import { HomeHeroCta } from '@/components/content/HomeHeroCta';
import { TrustBar } from '@/components/content/TrustBar';

export const metadata = pageMeta({
  title: 'Property maintenance and field services — Elgin & Central Texas',
  description:
    'Recurring maintenance plans, documented property inspections and general repair for property managers, investors and homeowners in Elgin, Bastrop, Manor, Taylor and Pflugerville.',
  path: '/',
});

const homeFaqs = faqsFor('home');

export default function HomePage() {
  return (
    <>
      {/* The hero answers "is this for me?" before it answers anything else. */}
      <section className="border-b bg-paper-raised">
        <Container>
          <div className="grid gap-10 pt-10 pb-12 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-12 lg:pt-14 lg:pb-16">
            <div>
              <h1 className="max-w-[18ch] text-4xl font-bold tracking-tight text-soil sm:text-5xl">
                Someone looking after the property when you can&rsquo;t.
              </h1>
              <p className="mt-5 max-w-[46ch] text-lg text-steel">
                Maintenance on a schedule, and a dated photo record after every visit. For
                homeowners and for the people who manage doors across Elgin and Central Texas.
              </p>

              <HomeHeroCta />

              <TrustBar className="mt-8 border-t pt-6" />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-soil">
                What you receive after every visit
              </p>
              <RecordCard data={HERO_RECORD} animateStamp />
              <p className="mt-3 text-sm text-steel">
                This is an example record.{' '}
                <Link
                  href="/sample-report"
                  className="text-soil underline decoration-hivis decoration-2 underline-offset-4"
                >
                  Download a real one
                </Link>{' '}
                — no email address required.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What we do */}
      <RecordRail reference="REF-01" date="09.26" divider={false}>
        <SectionHeading lead="Four services are running today. We say plainly which ones are not.">
          What we do
        </SectionHeading>
        <DivisionGrid divisions={launchedDivisions} className="mt-6" />
        <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-steel">
          <span>Coming later:</span>
          {upcomingDivisions.map((d, i) => (
            <span key={d.slug}>
              <Link
                href={`/services/${d.slug}`}
                className="text-soil underline decoration-steel-light underline-offset-4 hover:decoration-soil"
              >
                {d.name}
              </Link>
              {i < upcomingDivisions.length - 1 ? ',' : ''}
            </span>
          ))}
          <Link
            href="/services"
            className="inline-flex items-center gap-1 font-medium text-soil underline decoration-hivis decoration-2 underline-offset-4"
          >
            See all services
            <ArrowRight aria-hidden size={14} strokeWidth={1.75} />
          </Link>
        </div>
      </RecordRail>

      {/* Who we work for */}
      <RecordRail reference="REF-02">
        <SectionHeading lead="Whether it is one home or a portfolio of them.">
          Who we work for
        </SectionHeading>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {AUDIENCE_CARDS.map((a) => (
            <Link
              key={a.href}
              href={a.href}
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
          Also working with Realtors, HOAs, and commercial property.{' '}
          <Link
            href="/request"
            className="text-soil underline decoration-hivis decoration-2 underline-offset-4"
          >
            Tell us what you manage
          </Link>
          .
        </p>
      </RecordRail>

      {/* Plans */}
      <RecordRail reference="REF-03">
        <SectionHeading lead="A fixed monthly amount instead of a repair bill you cannot predict. Cancel with thirty days notice.">
          Property Care plans
        </SectionHeading>
        <PlanComparison className="mt-6" compact />
        <div className="mt-5">
          <ButtonLink href="/plans" variant="secondary">
            See exactly what a quarterly inspection covers
          </ButtonLink>
        </div>
      </RecordRail>

      {/* The licensing boundary, as a trust asset. BUILD.md 6.1: do not bury it. */}
      <RecordRail reference="REF-04" status="verified">
        <SectionHeading>{LICENSING_STANCE.heading}</SectionHeading>
        <p className="mt-3 max-w-[46ch] text-lg text-soil">{LICENSING_STANCE.lead}</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border bg-paper-raised p-5 shadow-sm">
            <p className="text-sm font-semibold text-soil">We do not perform</p>
            <ul className="mt-3 space-y-2">
              {NOT_PROVIDED_DIRECTLY.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-steel">
                  <span aria-hidden className="mt-[0.6em] inline-block h-[2px] w-2.5 shrink-0 bg-flag" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border bg-paper-raised p-5 shadow-sm">
            <p className="text-sm font-semibold text-soil">What we do instead</p>
            <ul className="mt-3 space-y-2.5">
              {ROUTED_INSTEAD.map((item) => (
                <li key={item.trade} className="flex items-start gap-2.5 text-sm">
                  <BadgeCheck
                    aria-hidden
                    size={16}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0 text-verified"
                  />
                  <span className="text-steel">
                    <span className="font-medium text-soil">{item.trade}</span> — we identify it,
                    photograph it, and hand it to a licensed partner whose licence and insurance we
                    have checked.
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/legal/licensed-partners"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-soil underline decoration-hivis decoration-2 underline-offset-4"
            >
              How we vet a partner contractor
              <ArrowRight aria-hidden size={14} strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </RecordRail>

      {/* The sample report, ungated */}
      <RecordRail reference="REF-05">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <SectionHeading lead="An anonymised report from a real visit. No form, no email address — read it and decide for yourself whether it is worth paying for.">
              See a real report
            </SectionHeading>
            <div className="mt-4 flex flex-wrap gap-2">
              <Chip tone="neutral">Fifteen inspection areas</Chip>
              <Chip tone="neutral">Dated photographs</Chip>
              <Chip tone="neutral">Severity on every finding</Chip>
            </div>
          </div>
          <ButtonLink href="/sample-report" size="lg" className="w-fit">
            <FileText aria-hidden size={18} strokeWidth={1.5} />
            View the sample report
          </ButtonLink>
        </div>
      </RecordRail>

      {/* Questions */}
      <RecordRail reference="REF-06">
        <SectionHeading>Questions people actually ask</SectionHeading>
        <FAQ items={homeFaqs} className="mt-6 max-w-[52rem]" />
      </RecordRail>

      <section className="border-t">
        <Container className="py-12">
          <div className="grid gap-4 lg:grid-cols-2">
            <CTABlock variant="portfolio" location="home-footer" />
            <CTABlock variant="single" location="home-footer" />
          </div>
          <p className="mt-6 text-sm text-steel">
            Prefer to talk first?{' '}
            <a
              href={company.phoneHref}
              className="text-soil underline decoration-hivis decoration-2 underline-offset-4"
            >
              {company.phone}
            </a>
            . Monday to Friday 07:30–18:00, Saturday 08:00–14:00.
          </p>
        </Container>
      </section>

      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}

const AUDIENCE_CARDS = [
  {
    href: '/for/property-managers',
    title: 'Property managers',
    body: 'One vendor for maintenance, inspections and turnovers, with written response times and a report on every door. Start with three properties free.',
    cta: 'See response times and portfolio pricing',
  },
  {
    href: '/for/investors',
    title: 'Investors & absentee owners',
    body: 'You do not need a handyman. You need someone physically standing at the asset on a schedule, with photographs to prove they were there.',
    cta: 'See Vacant Property Watch',
  },
  {
    href: '/for/short-term-rentals',
    title: 'Short-term rentals',
    body: 'Maintenance scheduled around your booking calendar, and the small things caught before a guest photographs them into a review.',
    cta: 'See how we work around bookings',
  },
] as const;
