import Link from 'next/link';
import { LegalPage } from '@/components/layout/LegalPage';
import { Callout } from '@/components/ui/Callout';
import { company } from '@/content/company';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Terms of service',
  description:
    'The terms that apply to using this website and to work performed by MaintenanceCare, including pricing, scheduling, access, licensed partner work and cancellation.',
  path: '/legal/terms',
});

export default function TermsPage() {
  return (
    <LegalPage
      reference="LEG-03"
      title="Terms of service"
      lead="What applies when you use this website, and what applies when we do work for you."
      updated="September 2026"
    >
      <Callout title="These are website and general service terms">
        A specific job or a recurring plan is governed by the written estimate or service
        agreement you sign for it. Where that document and this page disagree, that document
        wins.
      </Callout>

      <h2>1. Who we are</h2>
      <p>
        {company.legalEntity}, operating as {company.name}, based in {company.address.locality},{' '}
        {company.address.region}. &ldquo;We&rdquo; and &ldquo;us&rdquo; mean that company;
        &ldquo;you&rdquo; means the person or organisation using this site or engaging us.
      </p>

      <h2>2. What this website is</h2>
      <p>
        Information about our services and a form to request them. Submitting the form is a
        request, not a booking, and does not create a contract. Nothing on this site is an offer
        capable of acceptance.
      </p>

      <h2>3. Pricing on this site</h2>
      <p>
        Every price shown carries the date it took effect, and we review pricing quarterly.
        Prices are estimates for typical work in our service area and are not a quotation for
        your property. The price that binds either of us is the written estimate we send you
        after we understand the job. We will not start chargeable work before you have that in
        writing and have accepted it.
      </p>
      <p>
        Materials are itemised separately from labour. Where a range is shown, photographs
        usually let us quote a point inside it rather than the range.
      </p>

      <h2>4. Licensed trade work</h2>
      <p>
        We do not perform work requiring a state trade licence. Where your property needs it, we
        scope the work and coordinate a verified, insured, licensed partner contractor, who
        contracts with you for their portion and carries their own licence, insurance and
        liability for it. Full detail is on our{' '}
        <Link href="/legal/licensed-partners">licensed partners page</Link>.
      </p>

      <h2>5. Pre-1978 property</h2>
      <p>
        Federal Renovation, Repair and Painting rules can require Lead-Safe Certified Firm status
        for qualifying paint and demolition work in housing built before 1978. We ask for the
        year built on every request and will not schedule affected work until certification is
        confirmed. If that means we cannot do a job, we will tell you rather than proceed.
      </p>

      <h2>6. Scheduling and access</h2>
      <p>
        Scheduled work is booked to a named date. If weather, an emergency at another property,
        or a supply problem forces a change, we will tell you as early as we can and rebook.
      </p>
      <p>
        You are responsible for arranging safe, lawful access on the agreed date, including any
        tenant notice your lease or state law requires. If we cannot get in, we may charge the
        service call minimum for the trip. We arrange entry through a named contact; we do not
        accept gate, lockbox or alarm codes by web form or email.
      </p>

      <h2>7. Plans</h2>
      <p>
        Property Care plans are billed monthly in advance, run month to month, and may be
        cancelled by either of us with thirty days written notice. Plan visits are scheduled on
        the cadence of the tier. Unused visits do not roll over. Portfolio agreements are
        negotiated separately and their own terms apply.
      </p>

      <h2>8. Cancellation and rescheduling by you</h2>
      <p>
        Cancel or move scheduled work at least twenty-four hours ahead at no charge. Inside
        twenty-four hours, or where we have already travelled, the service call minimum may
        apply.
      </p>

      <h2>9. Payment</h2>
      <p>
        Invoices are due on receipt unless the written estimate or your agreement says otherwise.
        Plan payments are collected monthly in advance. We are not able to take payment through
        this website.
      </p>

      <h2>10. Photographs and records</h2>
      <p>
        We photograph our work and keep those photographs as part of the property maintenance
        record. Reports and photographs we produce for you are yours to use. We may use
        anonymised images of our own work as examples, with the property unidentifiable, unless
        you tell us not to.
      </p>

      <h2>11. What we do not warrant</h2>
      <p>
        Inspection is a visual and functional observation of what is reasonably accessible on the
        day. It is not a code inspection, an engineering assessment, or a guarantee that nothing
        hidden exists or will fail. We report what we find and we photograph it; we do not
        promise to find what cannot be seen.
      </p>
      <p>
        Repair work is warranted against defects in our workmanship for ninety days. Materials
        carry their manufacturer&rsquo;s warranty and nothing more. Work performed by a licensed
        partner contractor is warranted by that contractor.
      </p>

      <h2>12. Liability</h2>
      <p>
        Nothing here limits liability that cannot lawfully be limited, including for death or
        personal injury caused by negligence, or for fraud. Subject to that, our total liability
        arising from any job is limited to the amount you paid us for that job, and we are not
        liable for indirect or consequential loss such as lost rent or lost profit.
      </p>

      <h2>13. Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Texas, and the courts of Bastrop
        County, Texas have exclusive jurisdiction.
      </p>

      <h2>14. Changes</h2>
      <p>
        We may update these terms; the date at the top of the page changes when we do. The
        version in force when you engage us is the one that applies to that engagement.
      </p>

      <h2>15. Contact</h2>
      <p>
        <a href={company.phoneHref} className="font-mono">
          {company.phone}
        </a>{' '}
        · <a href={`mailto:${company.email}`}>{company.email}</a> ·{' '}
        {company.address.locality}, {company.address.region} {company.address.postalCode}. See
        also our <Link href="/legal/privacy">privacy notice</Link>.
      </p>
    </LegalPage>
  );
}
