import { RecordRail } from '@/components/layout/RecordRail';
import { Container } from '@/components/layout/Container';
import { DivisionGrid } from '@/components/content/DivisionGrid';
import { CTABlock } from '@/components/content/CTABlock';
import { SectionHeading } from '@/components/content/SectionHeading';
import { JsonLd } from '@/components/layout/JsonLd';
import { locale as rootLocale } from 'next/root-params';

import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';
import { launchedDivisionsFor, upcomingDivisionsFor } from '@/content/localized';
import { ui } from '@/content/i18n/ui';
import { DEFAULT_LOCALE, isLocale, localePath } from '@/lib/i18n';

export async function generateMetadata() {
  const raw = await rootLocale();
  const current = raw && isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = ui(current).servicesPage;
  return pageMeta({
    title: t.metaTitle,
    description: t.metaDescription,
    path: '/services',
    locale: current,
  });
}

export default async function ServicesIndexPage() {
  const raw = await rootLocale();
  const current = raw && isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = ui(current).servicesPage;
  const home = ui(current).plansPage.breadcrumbHome;

  return (
    <>
      <section className="border-b bg-paper-raised">
        <Container>
          <div className="pt-10 pb-10 lg:pt-16 lg:pb-14">
            <h1 className="max-w-[18ch] text-3xl font-bold text-soil sm:text-4xl">
              {t.h1}
            </h1>
            <p className="mt-4 max-w-[48ch] text-lg text-steel">
              {t.lead}
            </p>
          </div>
        </Container>
      </section>

      <RecordRail reference="DIV-01" date="09.26" divider={false}>
        <SectionHeading lead={t.runningNowLead}>{t.runningNow}</SectionHeading>
        <DivisionGrid divisions={launchedDivisionsFor(current)} className="mt-6" columns={2} locale={current} />
      </RecordRail>

      <RecordRail reference="DIV-02">
        <SectionHeading lead={t.laterPhasesLead}>{t.laterPhases}</SectionHeading>
        <DivisionGrid divisions={upcomingDivisionsFor(current)} className="mt-6" columns={4} locale={current} />
      </RecordRail>

      <section className="border-t">
        <Container className="py-12">
          <CTABlock variant="single" location="services-index" />
        </Container>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: home, path: localePath(current, '/') },
          { name: t.breadcrumbServices, path: localePath(current, '/services') },
        ])}
      />
    </>
  );
}
