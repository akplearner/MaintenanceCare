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

import { areas } from '@/content/areas';
import { company } from '@/content/company';
import { faqsFor } from '@/content/faqs';
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Service area — Elgin, Bastrop, Manor, Taylor and Pflugerville',
  description:
    'Property maintenance and inspection across Elgin, Bastrop, Manor, Taylor and Pflugerville, within roughly 35 miles of Elgin. Honest drive times on every city page.',
  path: '/service-area',
});

const areaFaqs = faqsFor('service-area');

export default function ServiceAreaPage() {
  return (
    <>
      <section className="border-b bg-paper-raised">
        <Container>
          <div className="pt-10 pb-10 lg:pt-16 lg:pb-14">
            <h1 className="max-w-[20ch] text-3xl font-bold text-soil sm:text-4xl">
              Five towns, honestly stated drive times.
            </h1>
            <p className="mt-4 max-w-[48ch] text-lg text-steel">
              Drive time is the fastest way to destroy margin in this business, so we are
              straightforward about it. Inside the radius below you get our real response times.
              Outside it we will still talk to you — and tell you whether the drive makes it
              worth your money.
            </p>
          </div>
        </Container>
      </section>

      <RecordRail reference="ARE-01" date="09.26" divider={false}>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <div>
            <SectionHeading>Where we work</SectionHeading>
            <ul className="mt-5 border-t">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/service-area/${a.slug}`}
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
                        {a.driveTimeMinutes === 0 ? 'BASE' : `${a.driveTimeMinutes} min`}
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
            <FieldNote label="Outside the radius" className="mt-6">
              We will quote work further out, but the drive shows up in the price and we will not
              pretend otherwise. If you have several properties in one direction, that changes the
              arithmetic — tell us the addresses and we will quote the route.
            </FieldNote>
          </div>
          <ServiceAreaMap />
        </div>
      </RecordRail>

      <RecordRail reference="ARE-02">
        <SectionHeading>Questions about coverage</SectionHeading>
        <FAQ items={areaFaqs} className="mt-6 max-w-[52rem]" />
        <p className="mt-6 max-w-[46rem] text-sm text-steel">
          Not sure whether you are inside the {company.serviceRadiusMiles} mile radius? Send the
          address through the request form and we will tell you straight away, at no cost and with
          no follow-up call if the answer is no.
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
