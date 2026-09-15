import { Suspense } from 'react';
import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { RequestForm, divisionFromSlug, type RequestFormDefaults } from '@/components/form/RequestForm';
import { Callout } from '@/components/ui/Callout';
import { FAQ } from '@/components/content/FAQ';
import { company } from '@/content/company';
import { plans } from '@/content/plans';
import { faqsFor } from '@/content/faqs';
import { AUDIENCE_SLUGS } from '@/content/types';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Request service',
  description:
    'Tell us about the property and we will reply within one business day with a written price. Elgin, Bastrop, Manor, Taylor and Pflugerville.',
  path: '/request',
});

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Prefill from whichever CTA sent the visitor here. A property manager who
 * clicked "For properties I manage" should not have to say so again — every
 * avoidable field is an avoidable drop-off.
 */
function defaultsFrom(params: Record<string, string | string[] | undefined>): RequestFormDefaults {
  const type = first(params.type);
  const division = first(params.division);
  const plan = first(params.plan);
  const intent = first(params.intent);

  const customerType = (AUDIENCE_SLUGS as readonly string[]).includes(type ?? '')
    ? (type as RequestFormDefaults['customerType'])
    : undefined;

  const planMatch = plans.find((p) => p.slug === plan);

  let descriptionSeed: string | undefined;
  if (intent === 'audit') {
    descriptionSeed =
      'I would like the free three-property audit. The properties are: \n\n1. \n2. \n3. ';
  } else if (planMatch) {
    descriptionSeed = `I am interested in the ${planMatch.name} plan at $${planMatch.monthlyPrice}/month. `;
  }

  return {
    customerType: customerType ?? (intent === 'audit' ? 'property-manager' : undefined),
    divisions: division
      ? divisionFromSlug(division)
      : planMatch
        ? (['property-care'] as RequestFormDefaults['divisions'])
        : undefined,
    descriptionSeed,
  };
}

export default async function RequestPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const defaults = defaultsFrom(params);
  const isAudit = first(params.intent) === 'audit';

  return (
    <Container className="py-10 lg:py-14">
      <div className="lg:grid lg:grid-cols-[1fr_20rem] lg:gap-12">
        <div>
          <h1 className="mt-2 max-w-[18ch] text-3xl font-bold text-soil sm:text-4xl">
            {isAudit ? 'Book the free three-property audit' : 'Request service'}
          </h1>
          <p className="mt-4 max-w-[46ch] text-lg text-steel">
            {isAudit
              ? 'Give us three properties and we will inspect them at no cost, then send you the same documented reports your owners would get. No contract, no obligation.'
              : 'Tell us about the property. We reply within one business day with a written price — and we will tell you honestly if it is not work we should be doing.'}
          </p>

          <Callout className="mt-6 max-w-[46rem]">
            <strong className="font-semibold text-soil">Never send access codes.</strong> This form
            asks who to contact for entry, not how to get in. Anything that looks like a gate,
            lockbox or alarm code is stripped automatically before your request is stored — see
            our{' '}
            <Link href="/legal/privacy">privacy notice</Link>.
          </Callout>

          <Suspense fallback={<FormSkeleton />}>
            <RequestForm defaults={defaults} />
          </Suspense>
        </div>

        <aside className="mt-12 lg:mt-14">
          <div className="rounded-lg border bg-paper-raised p-5 shadow-sm">
            <p className="text-sm font-semibold text-soil">
              Rather just call?
            </p>
            <a
              href={company.phoneHref}
              className="mt-1.5 block text-xl font-medium text-soil hover:text-hivis-ink"
            >
              {company.phone}
            </a>
            <dl className="mt-4 space-y-1 border-t pt-4 text-sm text-steel">
              {company.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-3">
                  <dt>{h.days}</dt>
                  <dd>{h.open ? `${h.open}–${h.close}` : 'Closed'}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-4 border p-5">
            <p className="text-sm font-semibold text-soil">
              What happens next
            </p>
            <ol className="mt-3 space-y-3 text-sm text-steel">
              {[
                'We read it — a person, usually within a couple of hours.',
                'We reply within one business day, by whichever method you chose.',
                'You get a written price before anyone comes out.',
                'If it needs a licensed trade, we tell you that instead of guessing.',
              ].map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="font-mono text-xs text-ink-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-semibold text-soil">Before you ask</h2>
            <FAQ items={faqsFor('request')} className="mt-3" />
          </div>
        </aside>
      </div>
    </Container>
  );
}

function FormSkeleton() {
  return (
    <div className="mt-8 max-w-[46rem] space-y-4" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-24 rounded-lg border bg-paper-raised" />
      ))}
    </div>
  );
}
