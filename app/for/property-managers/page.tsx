import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

import { RecordRail } from '@/components/layout/RecordRail';
import { JsonLd } from '@/components/layout/JsonLd';
import { AudienceHero } from '@/components/content/AudienceHero';
import { SLATable } from '@/components/content/SLATable';
import { ProofPanel } from '@/components/content/ProofPanel';
import { SavingsPanel, AVOIDED_LOSS_FRAMING } from '@/components/content/SavingsPanel';
import { CTABlock } from '@/components/content/CTABlock';
import { FAQ } from '@/components/content/FAQ';
import { SectionHeading } from '@/components/content/SectionHeading';
import { Checklist } from '@/components/record/Checklist';
import { FieldNote } from '@/components/record/FieldNote';
import { RecordCard, HERO_RECORD } from '@/components/record/RecordCard';
import { Callout } from '@/components/ui/Callout';
import { ButtonLink } from '@/components/ui/Button';

import { company, LICENSED_PARTNER_DISCLOSURE } from '@/content/company';
import { PORTFOLIO_PRICING } from '@/content/plans';
import { faqsFor } from '@/content/faqs';
import { breadcrumbJsonLd, faqJsonLd, pageMeta, serviceJsonLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'For property managers — one maintenance vendor, written response times',
  description:
    'Maintenance, inspections and repair across your portfolio with written response times, a documented report on every door and portfolio pricing by door count. Free three-property audit. Elgin and Central Texas.',
  path: '/for/property-managers',
});

const pmFaqs = faqsFor('property-managers');

export default function PropertyManagersPage() {
  return (
    <>
      <AudienceHero
        reference="PM-00"
        eyebrow="For property managers"
        title="One vendor, written response times, a report on every door."
        lead="You do not need another handyman in the rotation. You need a vendor who answers, shows up on the date, documents the visit, and does not create a licensing problem for your brokerage."
        chips={['Portfolio pricing by door', 'COI on request', 'Written SLA', 'Free 3-property audit']}
        aside={
          <ProofPanel
            heading="Vendor qualification"
            items={[
              { label: 'Certificate of insurance', value: 'On request' },
              { label: 'Additional insured endorsement', value: 'Arranged' },
              { label: 'W-9 and onboarding paperwork', value: '1 business day' },
              { label: 'Licensed trade work', value: 'Verified partners' },
              { label: 'Response times', value: 'In the agreement' },
              { label: 'Report after every visit', value: 'Within 24 hours' },
              { label: 'Portfolio pricing', value: 'By door count' },
              { label: 'Minimum contract term', value: 'None' },
            ]}
            footnote="Everything above is answered in full further down this page. Nothing here is aspirational — if it is not running yet, we say so."
          />
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/request?type=property-manager&intent=audit" size="lg">
            Book the free three-property audit
            <ArrowRight aria-hidden size={17} strokeWidth={1.75} />
          </ButtonLink>
          <ButtonLink href="/sample-report" variant="secondary" size="lg">
            See a sample report
          </ButtonLink>
        </div>
      </AudienceHero>

      {/* PM-01 — the vacancy-cost argument comes first. */}
      <RecordRail reference="PM-01" date="09.26" divider={false}>
        <SectionHeading lead="The expensive part of maintenance is rarely the invoice.">
          What a slow vendor actually costs you
        </SectionHeading>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div className="max-w-[34rem] space-y-4 text-base text-steel">
            <p>
              A unit that is ready on Thursday and listed on Thursday earns rent. A unit that is
              ready on Thursday, but where nobody confirmed it was ready until the following
              Tuesday, does not. You already know your daily rent figure — the cost of a slow
              turnover is that number multiplied by the days you lost waiting on a callback.
            </p>
            <p>
              The same arithmetic runs on tenant-reported repairs. A dripping hose bib is a
              fifteen-minute job and a small licensed-plumber invoice. The same hose bib, unlogged
              for two seasons, is a soaked wall cavity, a habitability complaint, and a tenant who
              does not renew.
            </p>
            <p>
              We are not going to tell you a percentage. Nobody can honestly promise one. What we
              can tell you is that every visit produces a dated record, so the question
              &ldquo;when was anyone last at that property?&rdquo; has a one-click answer instead
              of a phone call.
            </p>
            <p className="text-sm text-ink-muted">{AVOIDED_LOSS_FRAMING}</p>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-soil">
              What lands in your inbox after every visit
            </p>
            <RecordCard data={HERO_RECORD} />
          </div>
        </div>
      </RecordRail>

      {/* PM-02 — the SLA table. */}
      <RecordRail reference="PM-02">
        <SectionHeading lead="These go into the portfolio agreement, not just onto this page. We would rather commit to something we beat every week than to something we miss once.">
          Response time commitments
        </SectionHeading>
        <div className="mt-6 max-w-[58rem]">
          <SLATable />
        </div>
      </RecordRail>

      {/* PM-03 — compliance and insurance. */}
      <RecordRail reference="PM-03" status="verified">
        <SectionHeading lead="The vendor questions your compliance team asks, answered before they ask them.">
          Insurance, licensing and paperwork
        </SectionHeading>
        <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div>
            <Callout title="Certificate of insurance available on request" className="mb-5">
              Send us your compliance address and we will have the COI over before the first
              visit — without you having to ask twice. If your management agreement requires your
              brokerage to be named as an additional insured, tell us and we will arrange it.
            </Callout>
            <Checklist
              items={[
                'General liability certificate provided before the first visit',
                'Additional insured endorsement arranged on request',
                'W-9 and vendor onboarding paperwork returned within one business day',
                'Every technician working under our own insurance, not a subcontractor chain',
                'Licensed partner contractors carry and evidence their own license and insurance',
                'Photo documentation retained and retrievable by property and date',
              ]}
              className="border-t"
            />
          </div>
          <div>
            <div className="border-l-2 border-l-verified bg-paper-raised px-4 py-4">
              <p className="flex items-center gap-2 font-medium text-soil">
                <ShieldCheck aria-hidden size={18} strokeWidth={1.5} className="text-verified" />
                Why this protects your brokerage
              </p>
              <p className="mt-2 max-w-[42ch] text-sm text-steel">
                {LICENSED_PARTNER_DISCLOSURE} We will not quietly perform licensed work to save a
                dispatch, because the vendor who does that is the one who eventually creates a
                claim against the manager who hired them.
              </p>
              <Link
                href="/legal/licensed-partners"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-soil underline decoration-hivis decoration-2 underline-offset-4"
              >
                How we vet a partner contractor
                <ArrowRight aria-hidden size={14} strokeWidth={1.75} />
              </Link>
            </div>

            <FieldNote label="Access" className="mt-5">
              We arrange entry with your named contact or your existing lockbox process. We do not
              collect gate, lockbox or alarm codes through this website, and we will not accept
              them by email. Access credentials belong in an access-controlled system.
            </FieldNote>
          </div>
        </div>
      </RecordRail>

      {/* PM-04 — where a portfolio relationship pays. */}
      <RecordRail reference="PM-04">
        <SectionHeading lead="Four categories we can defend with our own published pricing. No percentages — see the note above.">
          Where a single vendor relationship pays
        </SectionHeading>
        <SavingsPanel className="mt-6 max-w-[58rem] border" />
      </RecordRail>

      {/* PM-05 — portfolio pricing inquiry. */}
      <RecordRail reference="PM-05">
        <SectionHeading lead="Not a tier. A portfolio has a mix — occupied, vacant, turning — and pricing every door the same overcharges you on the easy ones.">
          Portfolio pricing
        </SectionHeading>
        <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          <div className="max-w-[34rem] space-y-4 text-base text-steel">
            <p>{PORTFOLIO_PRICING.body}</p>
            <p>
              We price by door count against your actual mix, revisit it as the mix changes, and
              write the response-time commitments above into the agreement. Coverage is quoted
              after the audit, from what we actually found, rather than from a number you had to
              guess at over the phone.
            </p>
            <ul className="space-y-2 border-t pt-4 text-sm">
              {[
                'Pricing set by door count, banded by how each door is used',
                'Response times written into the agreement, not implied',
                'One monthly invoice with every visit itemised and photographed',
                'Named point of contact who knows your portfolio',
                'Quarterly review of the door mix and the price against it',
              ].map((item) => (
                <li key={item} className="flex gap-2.5 text-steel">
                  <span aria-hidden className="mt-[0.55em] inline-block h-1.5 w-1.5 shrink-0 bg-accent-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <CTABlock variant="portfolio" location="pm-portfolio" />
        </div>
      </RecordRail>

      {/* PM-06 — the free audit, the actual opening offer. */}
      <RecordRail reference="PM-06" status="scheduled">
        <div className="max-w-[58rem] overflow-hidden rounded-lg border border-soil bg-paper-raised shadow-md">
          <div className="border-b bg-soil px-5 py-3 sm:px-7">
            <p className="text-sm font-semibold text-accent-on-dark">
              The opening offer
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-paper sm:text-3xl">
              Three properties. Inspected free. No contract.
            </h2>
          </div>
          <div className="grid gap-6 px-5 py-6 sm:px-7 lg:grid-cols-[1.1fr_1fr]">
            <div className="space-y-4 text-base text-steel">
              <p>
                Pick three properties — ideally your three most annoying ones. We inspect each
                against the full fifteen-area checklist and send you the same documented reports
                your owners would receive.
              </p>
              <p>
                You keep the reports whether or not you hire us. If they are not useful, you have
                lost an afternoon of our time and nothing of yours. That is the whole offer; there
                is no second step where a salesperson calls.
              </p>
              <p className="text-sm text-ink-muted">
                Three properties within our service area. One audit per management company.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-soil">
                What you get back
              </p>
              <Checklist
                items={[
                  'Three full inspection reports, one per property',
                  'Dated photographs on every finding',
                  'Severity rating and recommended action per item',
                  'A written price for anything we found',
                  'A portfolio quote by door count, if you want one',
                ]}
                className="mt-2 border-t"
              />
              <ButtonLink
                href="/request?type=property-manager&intent=audit"
                size="lg"
                className="mt-5 w-full"
              >
                Book the audit
                <ArrowRight aria-hidden size={17} strokeWidth={1.75} />
              </ButtonLink>
              <p className="mt-3 text-center text-sm text-steel">
                or call{' '}
                <a href={company.phoneHref} className="text-soil underline underline-offset-2">
                  {company.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </RecordRail>

      <RecordRail reference="PM-07">
        <SectionHeading>Questions managers ask us</SectionHeading>
        <FAQ items={pmFaqs} className="mt-6 max-w-[52rem]" />
      </RecordRail>

      <JsonLd
        data={[
          serviceJsonLd({
            name: 'Property management maintenance and inspection program',
            description:
              'Recurring maintenance, documented inspections and coordinated licensed trade work across a managed property portfolio, priced by door count.',
            path: '/for/property-managers',
          }),
          faqJsonLd(pmFaqs),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Property managers', path: '/for/property-managers' },
          ]),
        ]}
      />
    </>
  );
}
