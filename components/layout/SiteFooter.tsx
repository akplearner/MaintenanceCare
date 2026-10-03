import Link from 'next/link';
import { locale as rootLocale } from 'next/root-params';
import { Container } from './Container';
import {
  company,
  LICENSED_PARTNER_DISCLOSURE,
  LICENSED_PARTNER_DISCLOSURE_ES,
} from '@/content/company';
import { FOOTER_LEGAL } from '@/lib/nav';
import { launchedDivisionsFor, areasFor } from '@/content/localized';
import { ui } from '@/content/i18n/ui';
import { DEFAULT_LOCALE, isLocale, localePath } from '@/lib/i18n';

export async function SiteFooter() {
  const raw = await rootLocale();
  const current = raw && isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = ui(current);
  const p = (path: string) => localePath(current, path);

  const year = new Date().getFullYear();
  const launched = launchedDivisionsFor(current);
  const areas = areasFor(current);

  // Required on every page, in the language of that page. BUILD.md 9.2.
  const disclosure =
    current === 'es' ? LICENSED_PARTNER_DISCLOSURE_ES : LICENSED_PARTNER_DISCLOSURE;

  const audiences = [
    { href: '/for/property-managers', label: t.footer.audiences.propertyManagers },
    { href: '/for/investors', label: t.footer.audiences.investors },
    { href: '/for/short-term-rentals', label: t.footer.audiences.shortTermRentals },
  ];
  const legalLabel: Record<string, string> = {
    '/legal/licensed-partners': t.footer.legal.licensedPartners,
    '/legal/terms': t.footer.legal.terms,
    '/legal/privacy': t.footer.legal.privacy,
  };

  return (
    <footer className="mt-auto border-t bg-soil text-paper">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="flex items-baseline gap-2 text-lg font-bold">
              <span aria-hidden className="inline-block h-4 w-4 translate-y-[1px] bg-accent-on-dark" />
              {company.name}
            </p>
            <address className="mt-3 space-y-1 text-sm not-italic text-ink-on-dark">
              <p>
                {company.address.locality}, {company.address.region} {company.address.postalCode}
              </p>
              <p>
                <a href={company.phoneHref} className="text-paper hover:text-accent-on-dark">
                  {company.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${company.email}`} className="hover:text-accent-on-dark">
                  {company.email}
                </a>
              </p>
            </address>
            <dl className="mt-4 space-y-0.5 text-sm text-ink-on-dark">
              {company.hours.map((h) => (
                <div key={h.days} className="flex gap-2">
                  <dt className="min-w-[8.5rem]">{h.days}</dt>
                  <dd>{h.open ? `${h.open}–${h.close}` : t.closed}</dd>
                </div>
              ))}
            </dl>
          </div>

          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className="text-sm font-semibold tracking-wide">
              {t.footer.services}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-on-dark">
              {launched.map((d) => (
                <li key={d.slug}>
                  <Link href={p(`/services/${d.slug}`)} className="hover:text-accent-on-dark">
                    {d.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={p('/services')} className="hover:text-accent-on-dark">
                  {t.footer.allServices}
                </Link>
              </li>
              <li>
                <Link href={p('/plans')} className="hover:text-accent-on-dark">
                  {t.footer.plansLink}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-who">
            <h2 id="footer-who" className="text-sm font-semibold tracking-wide">
              {t.footer.whoWeWorkFor}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-on-dark">
              {audiences.map((a) => (
                <li key={a.href}>
                  <Link href={p(a.href)} className="hover:text-accent-on-dark">
                    {a.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={p('/sample-report')} className="hover:text-accent-on-dark">
                  {t.footer.sampleReport}
                </Link>
              </li>
              <li>
                <Link href={p('/about')} className="hover:text-accent-on-dark">
                  {t.footer.about}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-area">
            <h2 id="footer-area" className="text-sm font-semibold tracking-wide">
              {t.footer.serviceArea}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-on-dark">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link href={p(`/service-area/${a.slug}`)} className="hover:text-accent-on-dark">
                    {a.city}, {a.state}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Required on every page. BUILD.md 9.2. */}
        <div className="border-t border-ink-on-dark/30 py-6">
          <p className="max-w-[46rem] text-sm text-ink-on-dark">{disclosure}</p>
          <p className="mt-2 text-sm text-ink-on-dark">
            <Link
              href={p('/legal/licensed-partners')}
              className="text-paper underline underline-offset-2 hover:text-accent-on-dark"
            >
              {t.footer.disclosureLink}
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-ink-on-dark/30 py-6 text-sm text-ink-on-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalEntity}. {t.footer.rights}
          </p>
          <ul className="flex flex-wrap gap-4">
            {FOOTER_LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={p(l.href)} className="hover:text-accent-on-dark">
                  {legalLabel[l.href] ?? l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
