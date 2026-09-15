import { ArrowRight } from 'lucide-react';

import { RecordRail } from '@/components/layout/RecordRail';
import { Container } from '@/components/layout/Container';
import { JsonLd } from '@/components/layout/JsonLd';
import { AudienceHero } from '@/components/content/AudienceHero';
import { PriceTable } from '@/components/content/PriceTable';
import { CTABlock } from '@/components/content/CTABlock';
import { FAQ } from '@/components/content/FAQ';
import { SectionHeading } from '@/components/content/SectionHeading';
import { Checklist } from '@/components/record/Checklist';
import { FieldNote } from '@/components/record/FieldNote';
import { Callout } from '@/components/ui/Callout';
import { ButtonLink } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';

import { getServices } from '@/content/services';
import { faqsFor } from '@/content/faqs';
import { breadcrumbJsonLd, faqJsonLd, pageMeta, serviceJsonLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'For investors and absentee owners — Vacant Property Watch',
  description:
    'Documented weekly or biweekly checks on vacant and out-of-area property, with dated photographs, condition reporting and escalation within the hour. Elgin, Bastrop, Manor, Taylor and Pflugerville.',
  path: '/for/investors',
});

const investorFaqs = faqsFor('investors');
const watchServices = getServices([
  'vacant-watch-weekly',
  'vacant-watch-biweekly',
  'health-check-detailed',
  'health-check-standard',
  'storm-check',
  'move-in-condition-report',
]);

export default function InvestorsPage() {
  return (
    <>
      <AudienceHero
        reference="INV-00"
        eyebrow="For investors & absentee owners"
        title="You do not need a handyman. You need someone standing at the asset."
        lead="A repair company is reactive by definition — it turns up after something has already gone wrong. What an out-of-area owner actually needs is evidence, on a schedule, that the property is still what you think it is."
        chips={['Weekly or biweekly', 'Dated photographs', 'Escalation within the hour', 'Insurer-ready records']}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/request?type=investor&division=field-inspections" size="lg">
            Set up Vacant Property Watch
            <ArrowRight aria-hidden size={17} strokeWidth={1.75} />
          </ButtonLink>
          <ButtonLink href="/sample-report" variant="secondary" size="lg">
            See what a report looks like
          </ButtonLink>
        </div>
      </AudienceHero>

      <RecordRail reference="INV-01" date="09.26" divider={false}>
        <SectionHeading lead="A vacant property does not fail loudly. It fails slowly, and the first person to notice is usually the insurer.">
          Vacant Property Watch
        </SectionHeading>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div className="max-w-[34rem] space-y-4 text-base text-steel">
            <p>
              A supply line lets go in February and nobody is there to hear it. A back door gets
              forced and stays open for three weeks. Mail piles up until the property is visibly
              empty to anyone driving past. None of these are repair problems on the day they
              start — they are attendance problems.
            </p>
            <p>
              We attend on a fixed cadence, walk the property inside and out, photograph what we
              find, and send you the record the same day. If something is urgent you get a phone
              call within the hour, not an email you read on Monday.
            </p>
            <p>
              Most vacancy policies and lender agreements expect documented periodic inspection.
              A dated photo log is what turns &ldquo;we check on it&rdquo; into something you can
              actually put in a file.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-soil">
              Every visit
            </p>
            <Checklist
              items={[
                'Full exterior perimeter walk with photographs',
                'Interior walk — water intrusion, staining, pest evidence, odour',
                'Forced entry, vandalism and occupancy evidence check',
                'Freeze risk in season: hose bibs, exposed lines, thermostat setting',
                'Utility and meter observation where accessible',
                'Mail, flyers and notices cleared so the property does not read as empty',
                'Same-day photo report with severity on every finding',
                'Phone call within the hour on anything urgent',
              ]}
              className="mt-2 border-t"
            />
          </div>
        </div>
      </RecordRail>

      <RecordRail reference="INV-02">
        <SectionHeading lead="Published, dated and reviewed quarterly.">
          Watch and inspection pricing
        </SectionHeading>
        <div className="mt-6 max-w-[58rem]">
          <PriceTable services={watchServices} />
        </div>
        <FieldNote label="Multiple properties" className="mt-6 max-w-[52rem]">
          Four or more properties on a watch programme are priced by door count rather than per
          property — the drive is already being made. Tell us the addresses and we will quote the
          route rather than the list.
        </FieldNote>
      </RecordRail>

      <RecordRail reference="INV-03">
        <SectionHeading lead="What we record, beyond whether the building is still standing.">
          Condition reporting
        </SectionHeading>
        <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="max-w-[34rem] space-y-4 text-base text-steel">
            <p>
              Every finding carries a severity rating and a recommended action, so a report is
              something you can act on rather than a folder of photographs. Where a data plate is
              readable we record the age and model of the major systems, which is how you find out
              the water heater is fourteen years old before it tells you itself.
            </p>
            <p>
              Reports are comparable visit to visit because the checklist does not change. That is
              the point: the value is not in one report, it is in the third one showing you that a
              crack has moved.
            </p>
          </div>
          <div>
            <Callout title="Asset forecasting — Phase 4, not available today" className="mb-4">
              Forecasting remaining life across a portfolio — roofs, water heaters, HVAC, major
              appliances — is a planned Asset Care capability, not something we sell now. We
              capture the underlying data on every visit today, so when it launches your history
              is already there. We are telling you this because the opposite approach is how
              vendors lose investors.
            </Callout>
            <div className="flex flex-wrap gap-2">
              <Chip tone="neutral">Severity rating per finding</Chip>
              <Chip tone="neutral">Major system ages captured</Chip>
              <Chip tone="neutral">Comparable visit to visit</Chip>
              <Chip tone="muted">Forecasting — Phase 4</Chip>
            </div>
          </div>
        </div>
      </RecordRail>

      <RecordRail reference="INV-04">
        <SectionHeading>Questions owners ask</SectionHeading>
        <FAQ items={investorFaqs} className="mt-6 max-w-[52rem]" />
      </RecordRail>

      <section className="border-t">
        <Container className="py-12">
          <div className="grid gap-4 lg:grid-cols-2">
            <CTABlock variant="single" location="investors-footer" />
            <CTABlock variant="portfolio" location="investors-footer" />
          </div>
        </Container>
      </section>

      <JsonLd
        data={[
          serviceJsonLd({
            name: 'Vacant Property Watch',
            description:
              'Documented weekly or biweekly inspection of vacant and absentee-owned property with dated photographs, severity-rated condition reporting and same-hour escalation.',
            path: '/for/investors',
          }),
          faqJsonLd(investorFaqs),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Investors', path: '/for/investors' },
          ]),
        ]}
      />
    </>
  );
}
