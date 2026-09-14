import { Download } from 'lucide-react';
import { ctaAttrs } from '@/lib/analytics';

export function SampleReportDownload() {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <a
        href="/sample-report.pdf"
        download
        {...ctaAttrs('sample-report', 'sample-report-hero')}
        className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 border border-soil bg-soil px-6 py-3 font-medium text-paper transition-colors hover:bg-soil-soft"
      >
        <Download aria-hidden size={17} strokeWidth={1.5} />
        Download the PDF
      </a>
      <p className="text-sm text-steel">No form. No email address. Read it and decide.</p>
    </div>
  );
}
