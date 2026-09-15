import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { StatusStamp } from '@/components/record/StatusStamp';
import { company } from '@/content/company';
import { pageMeta } from '@/lib/seo';
import { REFERENCE_PATTERN } from '@/lib/reference';

export const metadata = pageMeta({
  title: 'Request received',
  description: 'Your request has been received. We reply within one business day.',
  path: '/request/thanks',
  noIndex: true,
});

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ThanksPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const raw = Array.isArray(params.ref) ? params.ref[0] : params.ref;
  const reference = raw && REFERENCE_PATTERN.test(raw) ? raw : undefined;

  return (
    <Container className="py-14 lg:py-20">
      <div className="max-w-[40rem]">
        <StatusStamp kind="complete" />
        <h1 className="mt-5 text-3xl font-bold text-soil sm:text-4xl">Request received.</h1>

        {reference ? (
          <div className="mt-6 rounded-lg border bg-paper-raised px-5 py-4 shadow-sm">
            <p className="text-sm font-semibold text-soil">
              Your reference
            </p>
            <p className="mt-1 font-mono text-2xl font-medium text-soil">{reference}</p>
            <p className="mt-2 text-sm text-steel">
              Quote this if you call — it brings up everything you sent us.
            </p>
          </div>
        ) : null}

        <div className="mt-8">
          <h2 className="text-sm font-semibold text-soil">
            What happens now
          </h2>
          <ol className="mt-3 border-t">
            {[
              {
                when: 'Today',
                what: 'A person reads your request — not an autoresponder. If you marked it an emergency, we call you.',
              },
              {
                when: 'Within 1 business day',
                what: `We reply the way you asked us to. ${company.responseCommitment}`,
              },
              {
                when: 'Before any work',
                what: 'You get a written price. Nothing starts until you say yes to it.',
              },
              {
                when: 'If entry is needed',
                what: 'We arrange access by phone with your named contact. We will never ask you to email a gate or lockbox code.',
              },
            ].map((row) => (
              <li key={row.when} className="grid gap-1 border-b py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-4">
                <span className="text-sm text-steel">{row.when}</span>
                <span className="text-base text-soil-soft">{row.what}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 border-l-2 border-l-hivis bg-paper-raised px-4 py-3.5">
          <p className="text-sm text-soil-soft">
            Something urgent in the meantime? Call{' '}
            <a
              href={company.phoneHref}
              className="font-medium text-soil underline underline-offset-2"
            >
              {company.phone}
            </a>
            . Monday to Friday 07:30–18:00, Saturday 08:00–14:00.
          </p>
        </div>

        <p className="mt-8 text-sm text-steel">
          <Link
            href="/"
            className="text-soil underline decoration-hivis decoration-2 underline-offset-4"
          >
            Back to the home page
          </Link>
        </p>
      </div>
    </Container>
  );
}
