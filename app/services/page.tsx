import { RecordRail } from '@/components/layout/RecordRail';
import { Container } from '@/components/layout/Container';
import { DivisionGrid } from '@/components/content/DivisionGrid';
import { CTABlock } from '@/components/content/CTABlock';
import { SectionHeading } from '@/components/content/SectionHeading';
import { JsonLd } from '@/components/layout/JsonLd';
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo';
import { launchedDivisions, upcomingDivisions } from '@/content/divisions';

export const metadata = pageMeta({
  title: 'Services — eight divisions, four running today',
  description:
    'Property Care, Field Inspections, Home Repair and Exterior Care are live across Elgin and Central Texas. Turn Services, Emergency Response, Asset Care and Trade Coordination are later phases.',
  path: '/services',
});

export default function ServicesIndexPage() {
  return (
    <>
      <section className="border-b bg-paper-raised">
        <Container>
          <div className="lg:grid lg:grid-cols-[8rem_1fr] lg:gap-6">
            <div className="pt-8 lg:pt-14">
              <span className="font-mono text-xs font-medium tracking-wide text-steel">DIV-00</span>
            </div>
            <div className="pt-2 pb-10 lg:pt-14 lg:pb-14">
              <h1 className="max-w-[18ch] text-3xl font-bold text-soil sm:text-4xl">
                Eight divisions. Four are running today.
              </h1>
              <p className="mt-4 max-w-[48ch] text-lg text-steel">
                We would rather tell you what is not ready than take a booking we cannot keep.
                Everything below marked as a later phase is exactly that — you can still ask, and
                we will tell you honestly when it will be real.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <RecordRail reference="DIV-01" date="09.26" divider={false}>
        <SectionHeading lead="Live today, with published pricing on every page.">
          Running now
        </SectionHeading>
        <DivisionGrid divisions={launchedDivisions} className="mt-6" columns={2} />
      </RecordRail>

      <RecordRail reference="DIV-02">
        <SectionHeading lead="Not running yet. Each page says what it will be and when — no aspirational copy pretending otherwise.">
          Later phases
        </SectionHeading>
        <DivisionGrid divisions={upcomingDivisions} className="mt-6" columns={4} />
      </RecordRail>

      <section className="border-t">
        <Container className="py-12 lg:pl-[calc(8rem+1.5rem)]">
          <CTABlock variant="single" location="services-index" />
        </Container>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
    </>
  );
}
