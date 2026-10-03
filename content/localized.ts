/**
 * Locale-aware views of the content data.
 *
 * Components keep taking the same `Division`, `Service`, `Plan`, `Faq` and
 * `ServiceArea` shapes they always did — only the strings differ — so adding
 * Spanish did not require touching the rendering layer.
 *
 * Anything without a Spanish entry falls back to English.
 */
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import { alt, type Division, type Faq, type Plan, type Service, type ServiceArea } from './types';
import { divisions as enDivisions, getDivision as enGetDivision } from './divisions';
import { services as enServices, flatRateMenu as enFlatRate } from './services';
import { plans as enPlans, INSPECTION_AREAS as enInspectionAreas } from './plans';
import { faqs as enFaqs } from './faqs';
import { areas as enAreas } from './areas';
import { CREDENTIALS as enCredentials } from './company';
import type { Credential } from './types';
import { es } from './i18n/es';
import type { ContentCopy, ServiceCopy } from './i18n/types';

const COPY: Partial<Record<Locale, ContentCopy>> = { es };

function copyFor(locale: Locale): ContentCopy {
  return (locale === DEFAULT_LOCALE ? undefined : COPY[locale]) ?? {};
}

/* ── Divisions ───────────────────────────────────────────────────────────── */

export function divisionsFor(locale: Locale): Division[] {
  const c = copyFor(locale).divisions;
  if (!c) return enDivisions;
  return enDivisions.map((d) => {
    const t = c[d.slug];
    if (!t) return d;
    return {
      ...d,
      name: t.name ?? d.name,
      promise: t.promise ?? d.promise,
      summary: t.summary ?? d.summary,
      included: t.included ?? d.included,
      image: t.imageAlt ? { ...d.image, alt: alt(t.imageAlt) } : d.image,
    };
  });
}

export function launchedDivisionsFor(locale: Locale): Division[] {
  return divisionsFor(locale).filter((d) => d.fullyLaunched);
}

export function upcomingDivisionsFor(locale: Locale): Division[] {
  return divisionsFor(locale).filter((d) => !d.fullyLaunched);
}

export function getDivisionFor(slug: string, locale: Locale): Division | undefined {
  if (locale === DEFAULT_LOCALE) return enGetDivision(slug);
  return divisionsFor(locale).find((d) => d.slug === slug);
}

/* ── Services ────────────────────────────────────────────────────────────── */

function localizeService(s: Service, t: ContentCopy['services']): Service {
  const o: ServiceCopy | undefined = t?.[s.id];
  if (!o) return s;
  const pricing =
    o.pricingNote && 'note' in s.pricing
      ? ({ ...s.pricing, note: o.pricingNote } as Service['pricing'])
      : s.pricing;
  return {
    ...s,
    name: o.name ?? s.name,
    description: o.description ?? s.description,
    includes: o.includes ?? s.includes,
    pricing,
  };
}

export function servicesFor(locale: Locale): Service[] {
  const c = copyFor(locale).services;
  if (!c) return enServices;
  return enServices.map((s) => localizeService(s, c));
}

export function servicesForDivisionIn(slug: string, locale: Locale): Service[] {
  return servicesFor(locale).filter((s) => s.division === slug);
}

export function flatRateMenuFor(locale: Locale): Service[] {
  const c = copyFor(locale).services;
  if (!c) return enFlatRate;
  return enFlatRate.map((s) => localizeService(s, c));
}

/* ── Plans ───────────────────────────────────────────────────────────────── */

export function plansFor(locale: Locale): Plan[] {
  const c = copyFor(locale).plans;
  if (!c) return enPlans;
  return enPlans.map((p) => {
    const t = c[p.slug];
    if (!t) return p;
    return {
      ...p,
      name: t.name ?? p.name,
      cadence: t.cadence ?? p.cadence,
      bestFor: t.bestFor ?? p.bestFor,
      includes: t.includes ?? p.includes,
    };
  });
}

export function inspectionAreasFor(locale: Locale): { area: string; detail: string }[] {
  return copyFor(locale).inspectionAreas ?? enInspectionAreas;
}

/* ── FAQs ────────────────────────────────────────────────────────────────── */

export function faqsForIn(context: Faq['contexts'][number], locale: Locale): Faq[] {
  const c = copyFor(locale).faqs;
  const selected = enFaqs.filter((f) => f.contexts.includes(context));
  if (!c) return selected;
  return selected.map((f) => {
    const t = c[f.id];
    if (!t) return f;
    return { ...f, question: t.question ?? f.question, answer: t.answer ?? f.answer };
  });
}

/* ── Service areas ───────────────────────────────────────────────────────── */

export function areasFor(locale: Locale): ServiceArea[] {
  const c = copyFor(locale).areas;
  if (!c) return enAreas;
  return enAreas.map((a) => {
    const t = c[a.slug];
    if (!t) return a;
    return { ...a, local: t.local ?? a.local, note: t.note ?? a.note };
  });
}

export function getAreaFor(slug: string, locale: Locale): ServiceArea | undefined {
  return areasFor(locale).find((a) => a.slug === slug);
}

/* ── Credentials ─────────────────────────────────────────────────────────── */

export function credentialsFor(locale: Locale): Credential[] {
  const c = copyFor(locale).credentials;
  if (!c) return enCredentials;
  return enCredentials.map((x) => {
    const t = c[x.id];
    if (!t) return x;
    return { ...x, label: t.label ?? x.label, detail: t.detail ?? x.detail };
  });
}
