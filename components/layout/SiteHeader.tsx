'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { Container } from './Container';
import { ButtonLink } from '@/components/ui/Button';
import { company } from '@/content/company';
import { PRIMARY_NAV } from '@/lib/nav';
import { ctaAttrs } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { LOCALES, LOCALE_LABEL, localePath, stripLocale, type Locale } from '@/lib/i18n';
import { ui } from '@/content/i18n/ui';

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const navLabel: Record<string, string> = {
    '/services': t.nav.services,
    '/plans': t.nav.plans,
    '/for/property-managers': t.nav.propertyManagers,
    '/sample-report': t.nav.sampleReport,
    '/service-area': t.nav.serviceArea,
  };
  const other = LOCALES.find((l) => l !== locale)!;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close the mobile menu when the route changes. Adjusting state during
  // render is the documented pattern for this — an effect here would cause a
  // cascading render on every navigation.
  if (pathname !== openedAt) {
    setOpenedAt(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b bg-paper/95 backdrop-blur-[2px]">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href={localePath(locale, '/')}
            className="flex items-baseline gap-2 text-lg font-bold tracking-tight text-soil"
          >
            <span
              aria-hidden
              className="inline-block h-4 w-4 translate-y-[1px] border-2 border-soil bg-hivis"
            />
            {company.name}
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {PRIMARY_NAV.map((item) => {
                const href = localePath(locale, item.href);
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'border-b-2 py-1 text-sm font-medium transition-colors',
                        active
                          ? 'border-accent-ink text-soil'
                          : 'border-transparent text-steel hover:text-soil',
                      )}
                    >
                      {navLabel[item.href] ?? item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={company.phoneHref}
              {...ctaAttrs('call', 'header')}
              className="hidden items-center gap-1.5 text-sm font-medium text-soil hover:text-hivis-ink md:inline-flex"
            >
              <Phone aria-hidden size={15} strokeWidth={1.5} />
              <span className="sr-only">{t.nav.callNow} </span>
              {company.phone}
            </a>
            {/* Wrapped rather than given a `hidden` class: Button's own
                `inline-flex` is a display utility too, and which one wins is
                decided by stylesheet order, not by class order. */}
            <Link
              href={localePath(other, stripLocale(pathname))}
              hrefLang={other}
              lang={other}
              aria-label={`${t.nav.language}: ${LOCALE_LABEL[other]}`}
              className="hidden text-sm font-medium text-steel underline decoration-hivis decoration-2 underline-offset-4 hover:text-soil sm:inline"
            >
              {LOCALE_LABEL[other]}
            </Link>
            <span className="hidden sm:inline-flex">
              <ButtonLink href={localePath(locale, '/request')} {...ctaAttrs('request', 'header')}>
                {t.nav.requestService}
              </ButtonLink>
            </span>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center border lg:hidden"
            >
              <span className="sr-only">{open ? t.nav.closeMenu : t.nav.openMenu}</span>
              {open ? (
                <X aria-hidden size={20} strokeWidth={1.5} />
              ) : (
                <Menu aria-hidden size={20} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t bg-paper lg:hidden">
          <Container>
            <nav aria-label="Mobile" className="py-4">
              <ul className="flex flex-col">
                {PRIMARY_NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={localePath(locale, item.href)}
                      className="block border-b py-3.5 text-base font-medium text-soil"
                    >
                      {navLabel[item.href] ?? item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={localePath(locale, '/for/investors')}
                    className="block border-b py-3.5 text-base font-medium text-soil"
                  >
                    {t.footer.audiences.investors}
                  </Link>
                </li>
                <li>
                  <Link href={localePath(locale, '/about')} className="block border-b py-3.5 text-base font-medium text-soil">
                    {t.nav.about}
                  </Link>
                </li>
              </ul>
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href={localePath(other, stripLocale(pathname))}
                  hrefLang={other}
                  lang={other}
                  className="inline-flex min-h-[2.75rem] items-center justify-center rounded-md border border-steel-light px-5 py-2.5 text-base font-medium text-soil"
                >
                  {LOCALE_LABEL[other]}
                </Link>
                <ButtonLink href={localePath(locale, '/request')} size="lg" {...ctaAttrs('request', 'mobile-nav')}>
                  {t.nav.requestService}
                </ButtonLink>
                <a
                  href={company.phoneHref}
                  {...ctaAttrs('call', 'mobile-nav')}
                  className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-md border border-soil px-5 py-2.5 text-base font-medium text-soil"
                >
                  <Phone aria-hidden size={16} strokeWidth={1.5} />
                  {company.phone}
                </a>
              </div>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
