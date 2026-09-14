import Link from 'next/link';
import { LegalPage } from '@/components/layout/LegalPage';
import { Callout } from '@/components/ui/Callout';
import { company } from '@/content/company';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Privacy notice',
  description:
    'What we collect through this website, why, how long we keep it, and why we deliberately refuse to store property access codes.',
  path: '/legal/privacy',
});

export default function PrivacyPage() {
  return (
    <LegalPage
      reference="LEG-02"
      title="Privacy notice"
      lead="What this website collects, why, and what we deliberately refuse to collect."
      updated="September 2026"
    >
      <Callout variant="caution" title="We do not store property access codes">
        There is no field on this site for a gate code, lockbox code, alarm code or PIN, and there
        never will be. Anything submitted in the access notes that looks like a code — four or
        more consecutive digits, or words like &ldquo;code&rdquo;, &ldquo;lockbox&rdquo; or
        &ldquo;keypad&rdquo; — is stripped automatically before your request is stored, and the
        original is never written to our database or sent in an email. Access details are
        arranged by phone with a named contact.
      </Callout>

      <h2>Who we are</h2>
      <p>
        {company.legalEntity}, operating as {company.name}, {company.address.locality},{' '}
        {company.address.region} {company.address.postalCode}. Contact{' '}
        <a href={`mailto:${company.email}`}>{company.email}</a> or{' '}
        <a href={company.phoneHref} className="font-mono">
          {company.phone}
        </a>{' '}
        about anything on this page.
      </p>

      <h2>What we collect</h2>
      <p>When you submit the request form we collect, because we need it to quote the work:</p>
      <ul>
        <li>Your name, email address, phone number and preferred contact method</li>
        <li>Your company name, where you give one, and how many properties you manage</li>
        <li>The property address, city, ZIP, year built and occupancy status</li>
        <li>What you need done, how urgent it is, and any photographs you attach</li>
        <li>Who to contact to arrange entry — not how to enter</li>
      </ul>
      <p>
        We also record the page that referred you, your browser user agent, and your IP address
        for rate limiting and spam prevention. Cloudflare Turnstile runs on the form to block
        automated submissions; it is operated by Cloudflare under their own privacy terms.
      </p>

      <h2>Why we ask for the year built</h2>
      <p>
        It is a required field. Federal Renovation, Repair and Painting rules can require
        Lead-Safe Certified Firm status for qualifying paint and demolition work in housing built
        before 1978, and we gate scheduling of that work on it. We would rather ask a question
        than send a technician to a job we are not permitted to start.
      </p>

      <h2>What we do with it</h2>
      <p>
        We use it to reply to you, quote the work, schedule it, and keep the maintenance record
        for the property. Requests from property managers, investors and other commercial
        enquiries are routed to a different internal queue from homeowner requests, because they
        need a different response — that routing is the only automated decision we make about
        your submission.
      </p>
      <p>
        We do not sell your information. We do not share it with advertisers. We do not add you
        to a marketing list because you asked for a quote. Where a job requires a licensed
        partner contractor, we share only what that contractor needs to perform the work.
      </p>

      <h2>Processors we use</h2>
      <ul>
        <li>
          <strong>Vercel</strong> — website hosting and privacy-preserving analytics. Analytics
          records which pages and calls to action are used; it does not use cookies to build a
          profile of you.
        </li>
        <li>
          <strong>Neon</strong> — the database where submitted requests are stored.
        </li>
        <li>
          <strong>Vercel Blob</strong> — storage for photographs you attach.
        </li>
        <li>
          <strong>Resend</strong> — delivery of the internal notification email.
        </li>
        <li>
          <strong>Cloudflare</strong> — Turnstile spam verification.
        </li>
        <li>
          <strong>Upstash</strong> — rate limiting, keyed on your IP address.
        </li>
      </ul>

      <h2>How long we keep it</h2>
      <p>
        Request records are kept while you are a customer and for seven years afterwards, which
        matches how long we need maintenance history and tax records. Requests that never become
        a job are deleted after twenty-four months. Photographs attached to a request are kept
        with the record. Rate-limiting data expires within an hour.
      </p>

      <h2>Your choices</h2>
      <p>
        Ask us for a copy of what we hold about you, ask us to correct it, or ask us to delete
        it, and we will — subject to records we are required to keep. Texas residents have rights
        under the Texas Data Privacy and Security Act, including the right to know, to correct,
        to delete, and to opt out of sale or targeted advertising. We do not sell personal
        information or use it for targeted advertising, so the latter two are already the case.
        Email{' '}
        <a href={`mailto:${company.email}`}>{company.email}</a> and we will respond within
        forty-five days.
      </p>

      <h2>Cookies</h2>
      <p>
        This site sets no advertising or tracking cookies. Vercel Analytics and Speed Insights
        collect aggregated, anonymised page and performance data without profiling individual
        visitors. Cloudflare Turnstile may set a short-lived token on the request page to
        complete its verification.
      </p>

      <h2>Children</h2>
      <p>
        This site is not directed at children and we do not knowingly collect information from
        anyone under thirteen.
      </p>

      <h2>Changes</h2>
      <p>
        If this notice changes, the date at the top of the page changes with it. See also our{' '}
        <Link href="/legal/terms">terms of service</Link>.
      </p>
    </LegalPage>
  );
}
