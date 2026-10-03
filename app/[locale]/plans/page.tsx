import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { RecordRail } from '@/components/layout/RecordRail';
import { JsonLd } from '@/components/layout/JsonLd';
import { PlanComparison } from '@/components/content/PlanComparison';
import { ChecklistDetail } from '@/components/record/Checklist';
import { FieldNote } from '@/components/record/FieldNote';
import { FAQ } from '@/components/content/FAQ';
import { CTABlock } from '@/components/content/CTABlock';
import { SectionHeading } from '@/components/content/SectionHeading';
import { SavingsPanel } from '@/components/content/SavingsPanel';

import { locale as rootLocale } from 'next/root-params';

import { faqsForIn, inspectionAreasFor } from '@/content/localized';
import { ui } from '@/content/i18n/ui';
import { DEFAULT_LOCALE, isLocale, localePath } from '@/lib/i18n';
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from '@/lib/seo';

export async function generateMetadata() {
  const raw = await rootLocale();
  const current = raw && isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = ui(current).plansPage;
  return pageMeta({
    title: t.metaTitle,
    description: t.metaDescription,
    path: '/plans',
    locale: current,
  });
}

export default async function PlansPage() {
  const raw = await rootLocale();
  const current = raw && isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = ui(current).plansPage;
  const planFaqs = faqsForIn('plans', current);

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

      <RecordRail reference="PLN-01" date="09.26" divider={false}>
        <PlanComparison locale={current} />
      </RecordRail>

      <RecordRail reference="PLN-02">
        <SectionHeading lead={t.fifteenAreasLead}>{t.fifteenAreas}</SectionHeading>
        <ChecklistDetail items={inspectionAreasFor(current)} className="mt-6 max-w-[58rem]" />
        <FieldNote label={t.observationLabel} className="mt-6 max-w-[52rem]">
          {t.observationBody}
        </FieldNote>
      </RecordRail>

      <RecordRail reference="PLN-03">
        <SectionHeading lead={t.whereMoneyGoesLead}>{t.whereMoneyGoes}</SectionHeading>
        <SavingsPanel className="mt-6 max-w-[58rem] border" locale={current} />
      </RecordRail>

      <RecordRail reference="PLN-04">
        <SectionHeading>{t.questions}</SectionHeading>
        <FAQ items={planFaqs} className="mt-6 max-w-[52rem]" />
        <p className="mt-6 text-sm text-steel">
          {t.notSure}{' '}
          <Link
            href={localePath(current, '/request')}
            className="text-soil underline decoration-hivis decoration-2 underline-offset-4"
          >
            {t.describeProperty}
          </Link>{' '}
          {t.notSureTail}
        </p>
      </RecordRail>

      <section className="border-t">
        <Container className="py-12">
          <CTABlock variant="single" location="plans-footer" alt />
        </Container>
      </section>

      <JsonLd
        data={[
          faqJsonLd(planFaqs),
          breadcrumbJsonLd([
            { name: t.breadcrumbHome, path: localePath(current, '/') },
            { name: t.breadcrumbPlans, path: localePath(current, '/plans') },
          ]),
        ]}
      />
    </>
  );
}
