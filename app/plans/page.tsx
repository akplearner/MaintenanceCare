import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { RecordRail } from '@/components/layout/RecordRail';
import { JsonLd } from '@/components/layout/JsonLd';
import { PlanComparison } from '@/components/content/PlanComparison';
import { ChecklistDetail } from '@/components/record/Checklist';
import { FieldNote } from '@/components/record/FieldNote';
import { FAQ } from '@/components/content/FAQ';
import { CTABlock } from '@/components/content/CTABlock';
import { SectionHeading } from '@/components/content/SectionHeading';
import { SavingsPanel } from '@/components/content/SavingsPanel';

import { INSPECTION_AREAS } from '@/content/plans';
import { faqsFor } from '@/content/faqs';
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Property Care plans — $49, $89 and $149 a month',
  description:
    'Recurring property maintenance on a plan: quarterly or monthly inspections, filter service, detector testing and a photo report every visit. Month to month, no long-term contract. Elgin and Central Texas.',
  path: '/plans',
});

const planFaqs = faqsFor('plans');

export default function PlansPage() {
  return (
    <>
      <section className="border-b bg-paper-raised">
        <Container>
          <div className="pt-10 pb-10 lg:pt-16 lg:pb-14">
            <h1 className="max-w-[20ch] text-3xl font-bold text-soil sm:text-4xl">
              A maintenance budget you can actually predict.
            </h1>
            <p className="mt-4 max-w-[48ch] text-lg text-steel">
              A technician on a fixed schedule, the same checks every visit, and a dated photo
              report afterwards. Month to month, cancel with thirty days notice, and every price
              on this page carries the date it took effect.
            </p>
          </div>
        </Container>
      </section>

      <RecordRail reference="PLN-01" date="09.26" divider={false}>
        <PlanComparison />
      </RecordRail>

      <RecordRail reference="PLN-02">
        <SectionHeading lead="This is what a quarterly inspection actually covers. Specificity is the difference between a real product and a vague retainer — and it is the list your technician works from, not marketing copy.">
          The fifteen inspection areas
        </SectionHeading>
        <ChecklistDetail items={INSPECTION_AREAS} className="mt-6 max-w-[58rem]" />
        <FieldNote label="Observation vs. repair" className="mt-6 max-w-[52rem]">
          Areas marked &ldquo;observation only&rdquo; mean exactly that: we look, test what is safe
          to test, photograph what we find and write it down. We do not open a panel or a supply
          line. When something in those areas needs work, it is scoped and handed to a licensed
          partner contractor — and you get the photographs either way.
        </FieldNote>
      </RecordRail>

      <RecordRail reference="PLN-03">
        <SectionHeading lead="Four categories where a plan is defensibly worth more than it costs. No percentages, because nobody can honestly promise you one.">
          Where the money actually goes
        </SectionHeading>
        <SavingsPanel className="mt-6 max-w-[58rem] border" />
      </RecordRail>

      <RecordRail reference="PLN-04">
        <SectionHeading>Questions about plans</SectionHeading>
        <FAQ items={planFaqs} className="mt-6 max-w-[52rem]" />
        <p className="mt-6 text-sm text-steel">
          Not sure which tier fits?{' '}
          <Link
            href="/request"
            className="text-soil underline decoration-hivis decoration-2 underline-offset-4"
          >
            Describe the property
          </Link>{' '}
          and we will tell you which one we would put it on — including telling you when the
          cheapest one is the right answer.
        </p>
      </RecordRail>

      <section className="border-t">
        <Container className="py-12">
          <div className="grid gap-4 lg:grid-cols-2">
            <CTABlock variant="single" location="plans-footer" />
            <CTABlock variant="portfolio" location="plans-footer" />
          </div>
        </Container>
      </section>

      <JsonLd
        data={[
          faqJsonLd(planFaqs),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Plans', path: '/plans' },
          ]),
        ]}
      />
    </>
  );
}
