import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { RecordRail } from '@/components/layout/RecordRail';
import { JsonLd } from '@/components/layout/JsonLd';
import { SectionHeading } from '@/components/content/SectionHeading';
import { CTABlock } from '@/components/content/CTABlock';
import { Checklist } from '@/components/record/Checklist';
import { FieldNote } from '@/components/record/FieldNote';
import { Prose } from '@/components/ui/Prose';

import { locale as rootLocale } from 'next/root-params';

import { company, LICENSING_STANCE, LICENSING_STANCE_ES } from '@/content/company';
import { areasFor } from '@/content/localized';
import { ui } from '@/content/i18n/ui';
import { DEFAULT_LOCALE, isLocale, localePath } from '@/lib/i18n';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';

export async function generateMetadata() {
  const raw = await rootLocale();
  const current = raw && isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = ui(current).aboutPage;
  return pageMeta({ title: t.metaTitle, description: t.metaDescription, path: '/about', locale: current });
}

export default async function AboutPage() {
  const raw = await rootLocale();
  const current = raw && isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = ui(current).aboutPage;
  const p = (path: string) => localePath(current, path);
  const areas = areasFor(current);
  const stance = current === 'es' ? LICENSING_STANCE_ES : LICENSING_STANCE;

  return (
    <>
      <section className="border-b bg-paper-raised">
        <Container>
          <div className="pt-10 pb-10 lg:pt-16 lg:pb-14">
            <h1 className="max-w-[22ch] text-3xl font-bold text-soil sm:text-4xl">
              {t.h1}
            </h1>
            <p className="mt-4 max-w-[48ch] text-lg text-steel">
              {t.lead}
            </p>
          </div>
        </Container>
      </section>

      <RecordRail reference="ABT-01" date="09.26" divider={false}>
        <SectionHeading>{t.whatItIs}</SectionHeading>
        <Prose className="mt-5">
          {t.whatItIsBody.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </Prose>
      </RecordRail>

      <RecordRail reference="ABT-02">
        <SectionHeading>{t.howWeWork}</SectionHeading>
        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <Checklist
            items={t.howWeWorkList}
            className="border-t"
          />
          <div>
            <FieldNote label={t.sayNo}>
              {t.sayNoBody}
            </FieldNote>
            <FieldNote label={t.whyDates} className="mt-4">
              {t.whyDatesBody}
            </FieldNote>
          </div>
        </div>
      </RecordRail>

      <RecordRail reference="ABT-03" status="verified">
        <SectionHeading>{stance.heading}</SectionHeading>
        <Prose className="mt-4">
          <p>{stance.lead}</p>
          {stance.body.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </Prose>
        <p className="mt-4">
          <Link
            href={p('/legal/licensed-partners')}
            className="font-medium text-soil underline decoration-hivis decoration-2 underline-offset-4"
          >
            {t.readVetting}
          </Link>
        </p>
      </RecordRail>

      <RecordRail reference="ABT-04">
        <SectionHeading>{t.whereWeWork}</SectionHeading>
        <p className="mt-4 max-w-[46ch] text-base text-steel">
          {areas.map((a) => a.city).join(', ')} {t.roughly(company.serviceRadiusMiles)}{' '}
          <Link
            href={p('/service-area')}
            className="text-soil underline decoration-hivis decoration-2 underline-offset-4"
          >
            {t.driveTimesLink}
          </Link>
          .
        </p>
        <dl className="mt-6 grid max-w-[46rem] gap-px border bg-steel-light sm:grid-cols-2">
          <div className="bg-paper-raised p-4">
            <dt className="text-sm font-semibold text-soil">{t.callUs}</dt>
            <dd className="mt-1">
              <a
                href={company.phoneHref}
                className="text-lg font-medium text-soil hover:text-hivis-ink"
              >
                {company.phone}
              </a>
            </dd>
          </div>
          <div className="bg-paper-raised p-4">
            <dt className="text-sm font-semibold text-soil">{t.email}</dt>
            <dd className="mt-1">
              <a href={`mailto:${company.email}`} className="text-soil hover:text-hivis-ink">
                {company.email}
              </a>
            </dd>
          </div>
          <div className="bg-paper-raised p-4">
            <dt className="text-sm font-semibold text-soil">{t.basedIn}</dt>
            <dd className="mt-1 text-soil">
              {company.address.locality}, {company.address.region} {company.address.postalCode}
            </dd>
          </div>
          <div className="bg-paper-raised p-4">
            <dt className="text-sm font-semibold text-soil">{t.hours}</dt>
            <dd className="mt-1 space-y-0.5 text-sm text-soil">
              {company.hours.map((h) => (
                <p key={h.days}>
                  {h.days}: <span>{h.open ? `${h.open}–${h.close}` : ui(current).closed}</span>
                </p>
              ))}
            </dd>
          </div>
        </dl>
      </RecordRail>

      <section className="border-t">
        <Container className="py-12">
          <CTABlock variant="single" location="about-footer" />
        </Container>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui(current).plansPage.breadcrumbHome, path: p('/') },
          { name: t.breadcrumbAbout, path: p('/about') },
        ])}
      />
    </>
  );
}
