import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { StatusStamp } from '@/components/record/StatusStamp';
import { ButtonLink } from '@/components/ui/Button';
import { PRIMARY_NAV } from '@/lib/nav';
import { company } from '@/content/company';

export default function NotFound() {
  return (
    <Container className="py-16 lg:py-24">
      <div className="max-w-[40rem]">
        <StatusStamp kind="needs-attention" />
        <p className="mt-5 font-mono text-sm text-steel">HTTP 404</p>
        <h1 className="mt-2 text-3xl font-bold text-soil sm:text-4xl">
          That page is not on file.
        </h1>
        <p className="mt-4 text-lg text-steel">
          The link is wrong or the page has moved. Here is where most people were heading.
        </p>
        <ul className="mt-6 border-t">
          {PRIMARY_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block border-b py-3 text-base font-medium text-soil hover:underline hover:decoration-hivis hover:decoration-2 hover:underline-offset-4"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/request" size="lg">
            Request service
          </ButtonLink>
          <a
            href={company.phoneHref}
            className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 border border-soil px-6 py-3 font-mono font-medium text-soil transition-colors hover:bg-soil hover:text-paper"
          >
            {company.phone}
          </a>
        </div>
      </div>
    </Container>
  );
}
