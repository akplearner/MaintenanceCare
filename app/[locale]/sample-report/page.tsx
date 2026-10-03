import Link from 'next/link';
import { Download } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { RecordRail } from '@/components/layout/RecordRail';
import { JsonLd } from '@/components/layout/JsonLd';
import { ReportSheet } from '@/components/content/ReportSheet';
import { CTABlock } from '@/components/content/CTABlock';
import { SectionHeading } from '@/components/content/SectionHeading';
import { Callout } from '@/components/ui/Callout';
import { SampleReportDownload } from '@/components/content/SampleReportDownload';

import { SAMPLE_REPORT_IS_SPECIMEN } from '@/content/sample-report';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Sample inspection report — read it before you call',
  description:
    'A full property inspection report exactly as we send it: fifteen areas, severity on every finding, recommended actions and dated photographs. No form, no email address required.',
  path: '/sample-report',
});

export default function SampleReportPage() {
  return (
    <>
      <section className="border-b bg-paper-raised">
        <Container>
          <div className="pt-10 pb-10 lg:pt-16 lg:pb-14">
            <h1 className="max-w-[20ch] text-3xl font-bold text-soil sm:text-4xl">
              This is what you are actually buying.
            </h1>
            <p className="mt-4 max-w-[48ch] text-lg text-steel">
              Not a visit. A dated, photographed, severity-rated record of your property that
              you can forward to an owner, a lender or an insurer. Read the whole thing below —
              there is no form in front of it.
            </p>
            <SampleReportDownload />
          </div>
        </Container>
      </section>

      <RecordRail reference="RPT-01" date="09.26" divider={false}>
        {SAMPLE_REPORT_IS_SPECIMEN ? (
          <Callout variant="caution" className="mb-6 max-w-[52rem]">
            <strong className="font-semibold text-soil">This is a format specimen.</strong> It
            shows the exact structure, checklist and wording of a real report, but it is not a
            record of a real visit to a real property. We would rather label it plainly than
            present an invented inspection as a genuine one.
          </Callout>
        ) : null}

        <ReportSheet className="max-w-[58rem]" />

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href="/sample-report.pdf"
            download
            className="inline-flex min-h-[2.75rem] items-center gap-2 border border-soil bg-soil px-6 py-3 font-medium text-paper transition-colors hover:bg-soil-soft"
          >
            <Download aria-hidden size={17} strokeWidth={1.5} />
            Download as PDF
          </a>
          <p className="text-sm text-steel">
            Printable, and formatted to forward. No email address required.
          </p>
        </div>
      </RecordRail>

      <RecordRail reference="RPT-02">
        <SectionHeading lead="Three things most maintenance reports leave out, and why we do not.">
          Why the report looks like this
        </SectionHeading>
        <div className="mt-6 grid gap-px overflow-hidden rounded-lg border bg-rule sm:grid-cols-3">
          {[
            {
              n: '01',
              t: 'A severity on every line',
              b: 'A list of observations is not actionable. A list where each item says whether it is fine, worth budgeting for, or needs doing now is something you can make a decision from in under a minute.',
            },
            {
              n: '02',
              t: 'The same fifteen areas, every visit',
              b: 'The value is not in one report. It is in the third one telling you a crack has moved, or that the water heater you were warned about two visits ago is now overdue.',
            },
            {
              n: '03',
              t: 'Observation stated as observation',
              b: 'Where the finding is in a licensed trade we say we looked, not that we diagnosed. That distinction is what keeps you out of a dispute about who scoped the work.',
            },
          ].map((c) => (
            <div key={c.n} className="bg-paper-raised p-5">
              <p className="text-xs font-semibold text-accent-ink">{c.n}</p>
              <h3 className="mt-1 text-lg font-semibold text-soil">{c.t}</h3>
              <p className="mt-2 text-sm text-steel">{c.b}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-[46rem] text-base text-steel">
          The checklist behind it is published too —{' '}
          <Link
            href="/plans"
            className="text-soil underline decoration-hivis decoration-2 underline-offset-4"
          >
            all fifteen inspection areas
          </Link>{' '}
          with what each one covers.
        </p>
      </RecordRail>

      <section className="border-t">
        <Container className="py-12">
          <CTABlock variant="portfolio" location="sample-report-footer" alt />
        </Container>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Sample report', path: '/sample-report' },
        ])}
      />
    </>
  );
}
