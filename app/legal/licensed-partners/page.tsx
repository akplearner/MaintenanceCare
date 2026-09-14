import Link from 'next/link';
import { LegalPage } from '@/components/layout/LegalPage';
import { Checklist } from '@/components/record/Checklist';
import { Callout } from '@/components/ui/Callout';
import { company, LICENSED_PARTNER_DISCLOSURE, ROUTED_INSTEAD } from '@/content/company';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Licensed partner contractors — how the model works',
  description:
    'Plumbing, electrical, HVAC, irrigation and pest work is performed by verified, insured, licensed partner contractors. How we vet them, what we do ourselves, and where the boundary sits.',
  path: '/legal/licensed-partners',
});

export default function LicensedPartnersPage() {
  return (
    <LegalPage
      reference="LEG-01"
      title="Licensed partner contractors"
      lead="What we perform ourselves, what we route to a licensed contractor, and how we choose them."
      updated="September 2026"
    >
      <Callout variant="caution" title="The disclosure, in full">
        {LICENSED_PARTNER_DISCLOSURE}
      </Callout>

      <h2>Why this page exists</h2>
      {/* compliance-allow-start: negative-context — naming the trades we do NOT perform */}
      <p>
        Texas licenses plumbing, electrical, HVAC, irrigation and pest control work. A company
        that performs those without the right licence exposes itself, and everyone who hired it,
        to real consequences — unpermitted work, voided insurance, and liability that lands on
        the property owner or the managing broker.
      </p>
      {/* compliance-allow-end */}
      <p>
        {company.name} does not hold those licences and does not perform that work. We say so on
        the home page, in the footer of every page, on every price table that touches it, and
        here. Property managers tell us this is the first thing they check, and they are right
        to.
      </p>

      <h2>What we do ourselves</h2>
      <p>
        Maintenance, inspection, documentation and general repair that does not require a state
        trade licence. In practice that is the majority of what a property needs: filters,
        detectors, drywall, paint, doors, fences, gutters, lawns, pressure washing, punch lists,
        vacant property checks, condition reporting, and the written record of all of it.
      </p>

      <h2>What we route, and what we still do around it</h2>
      <p>
        Routing does not mean handing you a phone number and walking away. On a licensed job we
        stay in it — we scope the work, photograph it, arrange access, meet the contractor, and
        verify close-out with photographs before it is marked done.
      </p>
      <ul>
        {ROUTED_INSTEAD.map((r) => (
          <li key={r.trade}>
            <strong>{r.trade}.</strong> {r.we}
          </li>
        ))}
      </ul>

      <h2>How we vet a partner contractor</h2>
      <p>Before a contractor works on a property through us, and annually afterwards:</p>
      <Checklist
        items={[
          'Active state licence verified directly with the issuing board, not taken on a business card',
          'General liability insurance certificate obtained and checked for current dates',
          'Workers compensation coverage confirmed where the contractor carries employees',
          'Licence class confirmed to cover the scope we are sending them — a licence is not a blanket',
          'Written pricing agreed in advance so their labour reaches you unmarked-up and itemised',
          'Work verified and photographed by us at close-out, not signed off on their word',
          'Re-verification annually, and immediately if a licence status changes',
        ]}
        className="mt-4 border-t"
      />

      <h2>What you are billed</h2>
      <p>
        Partner contractor labour is quoted by the contractor and passed through. We do not
        silently mark it up. Where we charge for our own work on a licensed job — scoping,
        access, supervision, verification, documentation — it is stated as our line, separately,
        so you can see exactly what you are paying whom for.
      </p>

      <h2>If something goes wrong</h2>
      <p>
        The licensed contractor carries their own licence, insurance and liability for the work
        they perform. We carry ours for the work we perform. Tell us either way — we hold the
        relationship with the contractor and we would rather resolve it than have you chase two
        companies.
      </p>

      <h2>Questions</h2>
      <p>
        Call{' '}
        <a href={company.phoneHref} className="font-mono">
          {company.phone}
        </a>{' '}
        or email{' '}
        <a href={`mailto:${company.email}`}>{company.email}</a>. A certificate of insurance — ours
        or a partner&rsquo;s — is available on request and we will send it without you asking
        twice.
      </p>
      <p>
        See also our{' '}
        <Link href="/legal/terms">terms of service</Link> and{' '}
        <Link href="/legal/privacy">privacy notice</Link>.
      </p>
    </LegalPage>
  );
}
