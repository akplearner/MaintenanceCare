import { locale as rootLocale } from 'next/root-params';

import { ui } from '@/content/i18n/ui';
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n';

/** First focusable element in the DOM. */
export async function SkipLink() {
  const raw = await rootLocale();
  const current = raw && isLocale(raw) ? raw : DEFAULT_LOCALE;

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-soil focus:px-4 focus:py-3 focus:font-medium focus:text-paper"
    >
      {ui(current).skipToContent}
    </a>
  );
}
