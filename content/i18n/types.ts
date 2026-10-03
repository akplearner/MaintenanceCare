/**
 * Spanish overrides, keyed by the English object's id.
 *
 * Deliberately *not* a second copy of each content file. Prices, slugs, ids,
 * phases and referential links stay in one place, so BUILD.md's rule still
 * holds: a price change is a one-file edit, and it cannot drift between
 * languages because there is only one copy of it.
 *
 * Every field is optional. A missing translation falls back to English rather
 * than rendering blank — a half-translated page is survivable, a broken one is
 * not.
 */
import type { DivisionSlug, PlanSlug } from '../types';

export interface DivisionCopy {
  name?: string;
  promise?: string;
  summary?: string;
  included?: string[];
  imageAlt?: string;
}

export interface ServiceCopy {
  name?: string;
  description?: string;
  includes?: string[];
  /** Overrides `pricing.note` where the variant has one. */
  pricingNote?: string;
}

export interface PlanCopy {
  name?: string;
  cadence?: string;
  bestFor?: string;
  includes?: string[];
}

export interface FaqCopy {
  question?: string;
  answer?: string;
}

export interface AreaCopy {
  local?: string;
  note?: string;
}

export interface ContentCopy {
  divisions?: Partial<Record<DivisionSlug, DivisionCopy>>;
  /** Keyed by `Service.id`. */
  services?: Record<string, ServiceCopy>;
  plans?: Partial<Record<PlanSlug, PlanCopy>>;
  /** Keyed by `Faq.id`. */
  faqs?: Record<string, FaqCopy>;
  /** Keyed by `ServiceArea.slug`. */
  areas?: Record<string, AreaCopy>;
  /** Keyed by `Credential.id`. */
  credentials?: Record<string, { label?: string; detail?: string }>;
  /** The fifteen inspection areas, in order. */
  inspectionAreas?: { area: string; detail: string }[];
}
