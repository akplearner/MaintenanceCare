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

export function SiteHeader() {
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
            href="/"
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
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'border-b-2 py-1 text-sm font-medium transition-colors',
                        active
                          ? 'border-hivis text-soil'
                          : 'border-transparent text-steel hover:text-soil',
                      )}
                    >
                      {item.label}
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
              className="hidden items-center gap-1.5 font-mono text-sm font-medium text-soil hover:text-hivis-ink md:inline-flex"
            >
              <Phone aria-hidden size={15} strokeWidth={1.5} />
              <span className="sr-only">Call </span>
              {company.phone}
            </a>
            {/* Wrapped rather than given a `hidden` class: Button's own
                `inline-flex` is a display utility too, and which one wins is
                decided by stylesheet order, not by class order. */}
            <span className="hidden sm:inline-flex">
              <ButtonLink href="/request" {...ctaAttrs('request', 'header')}>
                Request service
              </ButtonLink>
            </span>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center border lg:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
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
                      href={item.href}
                      className="block border-b py-3.5 text-base font-medium text-soil"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/for/investors"
                    className="block border-b py-3.5 text-base font-medium text-soil"
                  >
                    Investors &amp; absentee owners
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="block border-b py-3.5 text-base font-medium text-soil">
                    About
                  </Link>
                </li>
              </ul>
              <div className="mt-4 flex flex-col gap-3">
                <ButtonLink href="/request" size="lg" {...ctaAttrs('request', 'mobile-nav')}>
                  Request service
                </ButtonLink>
                <a
                  href={company.phoneHref}
                  {...ctaAttrs('call', 'mobile-nav')}
                  className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 border border-soil px-5 py-2.5 font-mono text-base font-medium text-soil"
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
