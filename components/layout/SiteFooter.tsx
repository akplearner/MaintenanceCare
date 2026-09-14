import Link from 'next/link';
import { Container } from './Container';
import { company, LICENSED_PARTNER_DISCLOSURE } from '@/content/company';
import { FOOTER_AUDIENCES, FOOTER_LEGAL } from '@/lib/nav';
import { divisions } from '@/content/divisions';
import { areas } from '@/content/areas';

export function SiteFooter() {
  const year = new Date().getFullYear();
  const launched = divisions.filter((d) => d.fullyLaunched);

  return (
    <footer className="mt-auto border-t bg-soil text-paper">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="flex items-baseline gap-2 text-lg font-bold">
              <span aria-hidden className="inline-block h-4 w-4 translate-y-[1px] bg-hivis" />
              {company.name}
            </p>
            <address className="mt-3 space-y-1 text-sm not-italic text-steel-light">
              <p>
                {company.address.locality}, {company.address.region} {company.address.postalCode}
              </p>
              <p>
                <a href={company.phoneHref} className="font-mono text-paper hover:text-hivis">
                  {company.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${company.email}`} className="hover:text-hivis">
                  {company.email}
                </a>
              </p>
            </address>
            <dl className="mt-4 space-y-0.5 text-sm text-steel-light">
              {company.hours.map((h) => (
                <div key={h.days} className="flex gap-2">
                  <dt className="min-w-[8.5rem]">{h.days}</dt>
                  <dd className="font-mono">{h.open ? `${h.open}–${h.close}` : 'Closed'}</dd>
                </div>
              ))}
            </dl>
          </div>

          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className="text-sm font-semibold tracking-wide">
              Services
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-steel-light">
              {launched.map((d) => (
                <li key={d.slug}>
                  <Link href={`/services/${d.slug}`} className="hover:text-hivis">
                    {d.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="hover:text-hivis">
                  All divisions
                </Link>
              </li>
              <li>
                <Link href="/plans" className="hover:text-hivis">
                  Property Care plans
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-who">
            <h2 id="footer-who" className="text-sm font-semibold tracking-wide">
              Who we work for
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-steel-light">
              {FOOTER_AUDIENCES.map((a) => (
                <li key={a.href}>
                  <Link href={a.href} className="hover:text-hivis">
                    {a.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/sample-report" className="hover:text-hivis">
                  Sample report
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-hivis">
                  About
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-area">
            <h2 id="footer-area" className="text-sm font-semibold tracking-wide">
              Service area
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-steel-light">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link href={`/service-area/${a.slug}`} className="hover:text-hivis">
                    {a.city}, {a.state}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Required on every page. BUILD.md 9.2. */}
        <div className="border-t border-steel/40 py-6">
          <p className="max-w-[46rem] text-sm text-steel-light">{LICENSED_PARTNER_DISCLOSURE}</p>
          <p className="mt-2 text-sm text-steel-light">
            <Link href="/legal/licensed-partners" className="text-paper underline underline-offset-2 hover:text-hivis">
              How our licensed partner model works
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-steel/40 py-6 text-sm text-steel-light sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalEntity}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-4">
            {FOOTER_LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-hivis">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
