import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { RecordRail } from '@/components/layout/RecordRail';
import { JsonLd } from '@/components/layout/JsonLd';
import { ServiceAreaMap } from '@/components/content/ServiceAreaMap';
import { CTABlock } from '@/components/content/CTABlock';
import { FAQ } from '@/components/content/FAQ';
import { SectionHeading } from '@/components/content/SectionHeading';
import { FieldNote } from '@/components/record/FieldNote';

import { locale as rootLocale } from 'next/root-params';

import { areasFor, faqsForIn } from '@/content/localized';
import { company } from '@/content/company';
import { ui } from '@/content/i18n/ui';
import { DEFAULT_LOCALE, isLocale, localePath } from '@/lib/i18n';
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from '@/lib/seo';

export async function generateMetadata() {
  const raw = await rootLocale();
  const current = raw && isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = ui(current).areaPage;
  return pageMeta({
    title: t.metaTitle,
    description: t.metaDescription,
    path: '/service-area',
    locale: current,
  });
}

export default async function ServiceAreaPage() {
  const raw = await rootLocale();
  const current = raw && isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = ui(current).areaPage;
  const p = (path: string) => localePath(current, path);
  const areas = areasFor(current);
  const areaFaqs = faqsForIn('service-area', current);

  return (
    <>
      <section className="border-b bg-paper-raised">
        <Container>
          <div className="pt-10 pb-10 lg:pt-16 lg:pb-14">
            <h1 className="max-w-[20ch] text-3xl font-bold text-soil sm:text-4xl">
              {t.h1}
            </h1>
            <p className="mt-4 max-w-[48ch] text-lg text-steel">
              {t.lead}
            </p>
          </div>
        </Container>
      </section>

      <RecordRail reference="ARE-01" date="09.26" divider={false}>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <div>
            <SectionHeading>{t.whereWeWork}</SectionHeading>
            <ul className="mt-5 border-t">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={p(`/service-area/${a.slug}`)}
                    className="group flex items-start justify-between gap-4 border-b py-3.5"
                  >
                    <span>
                      <span className="block text-lg font-medium text-soil group-hover:underline group-hover:decoration-hivis group-hover:decoration-2 group-hover:underline-offset-4">
                        {a.city}, {a.state}
                      </span>
                      <span className="block text-sm text-steel">
                        {a.county} · {a.zips.join(', ')}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      <span className="text-sm text-steel">
                        {a.driveTimeMinutes === 0 ? t.base : `${a.driveTimeMinutes} ${t.minutes}`}
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        size={16}
                        strokeWidth={1.5}
                        className="text-ink-muted group-hover:text-soil"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <FieldNote label={t.outsideRadius} className="mt-6">
              {t.outsideRadiusBody}
            </FieldNote>
          </div>
          <ServiceAreaMap locale={current} />
        </div>
      </RecordRail>

      <RecordRail reference="ARE-02">
        <SectionHeading>{t.coverageQuestions}</SectionHeading>
        <FAQ items={areaFaqs} className="mt-6 max-w-[52rem]" />
        <p className="mt-6 max-w-[46rem] text-sm text-steel">
          {t.notSureRadius(company.serviceRadiusMiles)}
        </p>
      </RecordRail>

      <section className="border-t">
        <Container className="py-12">
          <CTABlock variant="single" location="service-area-index" />
        </Container>
      </section>

      <JsonLd
        data={[
          faqJsonLd(areaFaqs),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Service area', path: '/service-area' },
          ]),
        ]}
      />
    </>
  );
}
