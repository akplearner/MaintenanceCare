import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';

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
      {/* REF-00 — the hero is the product, not a headline over a photo. */}
      <section className="border-b">
        <Container>
          <div className="lg:grid lg:grid-cols-[8rem_1fr] lg:gap-6">
            <div className="pt-8 lg:pt-14">
              <span className="font-mono text-xs font-medium tracking-wide text-steel">REF-00</span>
              <span className="ml-3 font-mono text-xs text-steel-light lg:mt-2 lg:ml-0 lg:block">
                09.26
              </span>
            </div>
            <div className="grid gap-10 pt-4 pb-12 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-12 lg:pt-14 lg:pb-16">
              <div>
                <h1 className="max-w-[16ch] text-4xl font-bold tracking-tight text-soil sm:text-5xl">
                  We maintain property for people who aren&rsquo;t standing in front of it.
                </h1>
                <p className="mt-5 max-w-[44ch] text-lg text-steel">
                  Recurring maintenance, documented inspections, and one number to call. Every
                  visit ends with a dated, photographed record of exactly what we found and what we
                  did. Elgin and Central Texas.
                </p>

                <HomeHeroCta />

                <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t pt-5 text-sm text-steel">
                  <li className="flex items-center gap-2">
                    <span aria-hidden className="inline-block h-1.5 w-1.5 bg-verified" />
                    Reply within one business day
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden className="inline-block h-1.5 w-1.5 bg-verified" />
                    Written price before work starts
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden className="inline-block h-1.5 w-1.5 bg-verified" />
                    Certificate of insurance on request
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden className="inline-block h-1.5 w-1.5 bg-verified" />
                    No long-term contract
                  </li>
                </ul>
              </div>

              <div>
                <p className="mb-2 font-mono text-xs tracking-wide text-steel-light uppercase">
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
          </div>
        </Container>
      </section>

      {/* REF-01 — what we do */}
      <RecordRail reference="REF-01" date="09.26" divider={false}>
        <SectionHeading lead="Four divisions are running today. We will tell you plainly which ones are not.">
          What we do
        </SectionHeading>
        <DivisionGrid divisions={launchedDivisions} className="mt-6" />
        <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-steel">
          <span>Also on the roadmap:</span>
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
            All divisions
            <ArrowRight aria-hidden size={14} strokeWidth={1.75} />
          </Link>
        </div>
      </RecordRail>

      {/* REF-02 — who we work for */}
      <RecordRail reference="REF-02">
        <SectionHeading lead="One relationship, many properties. If you manage doors rather than live in one, start here.">
          Who we work for
        </SectionHeading>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {AUDIENCE_CARDS.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group flex flex-col border bg-paper-raised p-5 transition-colors hover:border-soil"
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

      {/* REF-03 — plans */}
      <RecordRail reference="REF-03">
        <SectionHeading lead="A fixed monthly amount instead of a repair budget you cannot predict. Month to month, cancel with thirty days notice.">
          Property Care plans
        </SectionHeading>
        <PlanComparison className="mt-6" compact />
        <div className="mt-5">
          <ButtonLink href="/plans" variant="secondary">
            See exactly what a quarterly inspection covers
          </ButtonLink>
        </div>
      </RecordRail>

      {/* REF-04 — the licensing boundary, as a trust asset */}
      <RecordRail reference="REF-04" status="verified">
        <SectionHeading>{LICENSING_STANCE.heading}</SectionHeading>
        <p className="mt-3 max-w-[46ch] text-lg text-soil">{LICENSING_STANCE.lead}</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="max-w-[34rem] space-y-4 text-base text-steel">
            {LICENSING_STANCE.body.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
            <p className="border-l-2 border-l-hivis pl-4 text-soil-soft">
              {LICENSING_STANCE.reassurance}
            </p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-wide text-steel-light uppercase">
              We do not perform
            </p>
            <ul className="mt-2 border-t">
              {NOT_PROVIDED_DIRECTLY.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b py-2.5 text-sm text-steel"
                >
                  <span aria-hidden className="mt-[0.55em] inline-block h-[1.5px] w-2.5 bg-flag" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 font-mono text-xs tracking-wide text-steel-light uppercase">
              What we do instead
            </p>
            <ul className="mt-2 border-t">
              {ROUTED_INSTEAD.map((item) => (
                <li key={item.trade} className="border-b py-2.5 text-sm">
                  <span className="font-medium text-soil">{item.trade}</span>
                  <span className="mt-0.5 block text-steel">{item.we}</span>
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

      {/* REF-05 — the sample report, ungated */}
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

      {/* REF-06 — questions */}
      <RecordRail reference="REF-06">
        <SectionHeading>Questions people actually ask</SectionHeading>
        <FAQ items={homeFaqs} className="mt-6 max-w-[52rem]" />
      </RecordRail>

      <section className="border-t">
        <Container className="py-12 lg:pl-[calc(8rem+1.5rem)]">
          <div className="grid gap-4 lg:grid-cols-2">
            <CTABlock variant="portfolio" location="home-footer" />
            <CTABlock variant="single" location="home-footer" />
          </div>
          <p className="mt-6 text-sm text-steel">
            Prefer to talk first?{' '}
            <a
              href={company.phoneHref}
              className="font-mono text-soil underline decoration-hivis decoration-2 underline-offset-4"
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
