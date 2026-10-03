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

import { getServices } from '@/content/services';
import { faqsFor } from '@/content/faqs';
import { breadcrumbJsonLd, faqJsonLd, pageMeta, serviceJsonLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'For short-term rentals — maintenance that works around your calendar',
  description:
    'Scheduled maintenance, repairs and exterior care for short-term rentals in Central Texas, booked around your calendar so the small things are caught before a guest photographs them.',
  path: '/for/short-term-rentals',
});

const strFaqs = faqsFor('str');
const strServices = getServices([
  'property-care-premium',
  'health-check-standard',
  'handyman-call-minimum',
  'cleaning-standard-house',
  'lawn-standard-lot',
  'pressure-wash-driveway',
  'smoke-co-check',
]);

export default function ShortTermRentalsPage() {
  return (
    <>
      <AudienceHero
        reference="STR-00"
        eyebrow="For short-term rental operators"
        title="The small things guests photograph, caught before they do."
        lead="Nobody leaves a four-star review because the caulk was clean. They leave a three-star review because it was not. Your maintenance problem is not big failures — it is the accumulation of small ones between bookings."
        chips={['Scheduled around bookings', 'Photo record every visit', 'Detector compliance', 'Same-week repairs']}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/request?type=str-operator" size="lg">
            Tell us about your property
            <ArrowRight aria-hidden size={17} strokeWidth={1.75} />
          </ButtonLink>
          <ButtonLink href="/plans" variant="secondary" size="lg">
            See Property Care plans
          </ButtonLink>
        </div>
      </AudienceHero>

      <RecordRail reference="STR-01" date="09.26" divider={false}>
        <SectionHeading lead="We schedule against your calendar, not ours.">
          Working around bookings
        </SectionHeading>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div className="max-w-[34rem] space-y-4 text-base text-steel">
            <p>
              Give us your blocked dates and we book into the gaps. Where a gap is tight we tell
              you before we commit rather than turning up to a property with a guest in it. If
              something needs doing and there is genuinely no window, we will say so and help you
              decide whether it is worth blocking a night.
            </p>
            <p>
              The Premium plan suits most short-term rentals: monthly exterior checks and a
              quarterly interior inspection catch the drift that guests notice — stained grout,
              a sticking door, a dead bulb in the good lamp, a gate that no longer latches.
            </p>
            <p>
              Detector compliance is part of every plan visit, tested and dated. It is the thing
              most operators forget and the one thing a platform will ask you about after an
              incident.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-soil">
              What a visit covers
            </p>
            <Checklist
              items={[
                'Exterior walk and kerb appeal check — what a guest sees on arrival',
                'Every smoke and CO detector tested and dated',
                'HVAC filter changed and size recorded',
                'Bath and kitchen seal, grout and caulk condition',
                'Door, gate, lock and latch operation throughout',
                'Lighting, including the bulbs nobody replaces',
                'Photo report the same day so you know before your guest does',
              ]}
              className="mt-2 border-t"
            />
          </div>
        </div>
      </RecordRail>

      <RecordRail reference="STR-02">
        <SectionHeading lead="The services short-term operators use most.">Pricing</SectionHeading>
        <div className="mt-6 max-w-[58rem]">
          <PriceTable services={strServices} />
        </div>
        <FieldNote label="Multiple listings" className="mt-6 max-w-[52rem]">
          Running more than a couple of listings puts you into portfolio pricing based on how many you run
          rather than a plan tier. It is usually cheaper, and the scheduling gets easier because
          we are routing one trip instead of three.
        </FieldNote>
      </RecordRail>

      <RecordRail reference="STR-03">
        <SectionHeading>What we are not doing yet</SectionHeading>
        <Callout variant="caution" className="mt-5 max-w-[52rem]">
          <strong className="font-semibold text-soil">
            Turnover cleaning between guests is not a service we run today.
          </strong>{' '}
          Full turnover and make-ready coordination is not running yet. We do one-off cleans
          and we do everything on the maintenance side, but we are not going to take your
          same-day turn and disappoint a guest to win the account. When it is real, we will say
          so on this page.
        </Callout>
      </RecordRail>

      <RecordRail reference="STR-04">
        <SectionHeading>Questions operators ask</SectionHeading>
        <FAQ items={strFaqs} className="mt-6 max-w-[52rem]" />
      </RecordRail>

      <section className="border-t">
        <Container className="py-12">
          <CTABlock variant="single" location="str-footer" alt />
        </Container>
      </section>

      <JsonLd
        data={[
          serviceJsonLd({
            name: 'Short-term rental maintenance program',
            description:
              'Scheduled maintenance, inspection and repair for short-term rental property, booked around the operator booking calendar.',
            path: '/for/short-term-rentals',
          }),
          faqJsonLd(strFaqs),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Short-term rentals', path: '/for/short-term-rentals' },
          ]),
        ]}
      />
    </>
  );
}
