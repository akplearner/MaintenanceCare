import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { RecordRail } from '@/components/layout/RecordRail';
import { JsonLd } from '@/components/layout/JsonLd';
import { SectionHeading } from '@/components/content/SectionHeading';
import { CTABlock } from '@/components/content/CTABlock';
import { Checklist } from '@/components/record/Checklist';
import { FieldNote } from '@/components/record/FieldNote';
import { Prose } from '@/components/ui/Prose';

import { company, LICENSING_STANCE } from '@/content/company';
import { areas } from '@/content/areas';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'About — a maintenance company, not a handyman service',
  description:
    'MaintenanceCare sells recurring maintenance coverage and documented field records across Elgin and Central Texas. What we do, what we deliberately do not, and how we work.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <section className="border-b bg-paper-raised">
        <Container>
          <div className="lg:grid lg:grid-cols-[8rem_1fr] lg:gap-6">
            <div className="pt-8 lg:pt-14">
              <span className="font-mono text-xs font-medium tracking-wide text-steel">ABT-00</span>
            </div>
            <div className="pt-2 pb-10 lg:pt-14 lg:pb-14">
              <h1 className="max-w-[22ch] text-3xl font-bold text-soil sm:text-4xl">
                We are a maintenance company. We are not a handyman service.
              </h1>
              <p className="mt-4 max-w-[48ch] text-lg text-steel">
                The difference matters. A handyman sells hours. We sell a property that has been
                looked after on a schedule, and a written record proving it — which is the thing
                an owner, a lender or an insurer actually asks for.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <RecordRail reference="ABT-01" date="09.26" divider={false}>
        <SectionHeading>What the business actually is</SectionHeading>
        <Prose className="mt-5">
          <p>
            MaintenanceCare is based in Elgin, Texas, and works across Bastrop, Travis and
            Williamson counties. We sell two things: recurring maintenance coverage, and
            documented field records.
          </p>
          <p>
            Most of our customers are not standing in front of the property. They are property
            managers with a portfolio, investors two states away, absentee owners, short-term
            rental operators, Realtors between listings, and homeowners who would simply rather
            someone competent handled it. What all of them need is the same: somebody reliable who
            turns up on the date, does the same checks every time, and writes down what they
            found.
          </p>
          <p>
            The product is the record. A visit with no documentation is a visit you have to take
            on trust, and trust does not survive a deposit dispute, an insurance claim, or an
            owner asking why a repair was not caught six months earlier.
          </p>
        </Prose>
      </RecordRail>

      <RecordRail reference="ABT-02">
        <SectionHeading>How we work</SectionHeading>
        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <Checklist
            items={[
              'Published pricing, dated, and reviewed quarterly against local benchmarks',
              'A written price before any work starts — never an open hourly meter',
              'The same inspection checklist every visit, so findings are comparable over time',
              'Dated photographs on every finding, not just the ones that need selling',
              'A named date for scheduled work, not a four-hour window',
              'Licensed trade work routed to verified partner contractors, never attempted',
              'Access arranged with a named contact, never by collecting codes over the internet',
              'Honest drive times, including telling you when we are the wrong choice',
            ]}
            className="border-t"
          />
          <div>
            <FieldNote label="What we will tell you no about">
              Work outside our radius where the drive makes the price bad value. Licensed trade
              work we are not permitted to do. Same-day turnover cleaning, because that division
              is not running yet. A cheaper plan tier when the cheaper one is the right answer. We
              would rather lose a job than take one we will do badly.
            </FieldNote>
            <FieldNote label="Why every price carries a date" className="mt-4">
              Because we review pricing quarterly, and a price with no date is a price you cannot
              rely on. If a figure on this site is stale, the date tells you before you call.
            </FieldNote>
          </div>
        </div>
      </RecordRail>

      <RecordRail reference="ABT-03" status="verified">
        <SectionHeading>{LICENSING_STANCE.heading}</SectionHeading>
        <Prose className="mt-4">
          <p>{LICENSING_STANCE.lead}</p>
          {LICENSING_STANCE.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Prose>
        <p className="mt-4">
          <Link
            href="/legal/licensed-partners"
            className="font-medium text-soil underline decoration-hivis decoration-2 underline-offset-4"
          >
            Read how we vet a licensed partner contractor
          </Link>
        </p>
      </RecordRail>

      <RecordRail reference="ABT-04">
        <SectionHeading>Where we work</SectionHeading>
        <p className="mt-4 max-w-[46ch] text-base text-steel">
          {areas.map((a) => a.city).join(', ')} — roughly {company.serviceRadiusMiles} miles from
          Elgin.{' '}
          <Link
            href="/service-area"
            className="text-soil underline decoration-hivis decoration-2 underline-offset-4"
          >
            Drive times and local detail for each town
          </Link>
          .
        </p>
        <dl className="mt-6 grid max-w-[46rem] gap-px border bg-steel-light sm:grid-cols-2">
          <div className="bg-paper-raised p-4">
            <dt className="font-mono text-xs tracking-wide text-steel-light uppercase">Call us</dt>
            <dd className="mt-1">
              <a
                href={company.phoneHref}
                className="font-mono text-lg font-medium text-soil hover:text-hivis-ink"
              >
                {company.phone}
              </a>
            </dd>
          </div>
          <div className="bg-paper-raised p-4">
            <dt className="font-mono text-xs tracking-wide text-steel-light uppercase">Email</dt>
            <dd className="mt-1">
              <a href={`mailto:${company.email}`} className="text-soil hover:text-hivis-ink">
                {company.email}
              </a>
            </dd>
          </div>
          <div className="bg-paper-raised p-4">
            <dt className="font-mono text-xs tracking-wide text-steel-light uppercase">Based in</dt>
            <dd className="mt-1 text-soil">
              {company.address.locality}, {company.address.region} {company.address.postalCode}
            </dd>
          </div>
          <div className="bg-paper-raised p-4">
            <dt className="font-mono text-xs tracking-wide text-steel-light uppercase">Hours</dt>
            <dd className="mt-1 space-y-0.5 text-sm text-soil">
              {company.hours.map((h) => (
                <p key={h.days}>
                  {h.days}: <span className="font-mono">{h.open ? `${h.open}–${h.close}` : 'Closed'}</span>
                </p>
              ))}
            </dd>
          </div>
        </dl>
      </RecordRail>

      <section className="border-t">
        <Container className="py-12 lg:pl-[calc(8rem+1.5rem)]">
          <CTABlock variant="single" location="about-footer" />
        </Container>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
    </>
  );
}
