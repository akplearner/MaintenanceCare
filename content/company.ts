/**
 * Single source of truth for NAP, legal stance and contact routing.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * SETUP REQUIRED — every value marked PLACEHOLDER must be replaced before the
 * site is advertised. `pnpm compliance` lists them on every run. See SETUP.md.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { Credential } from './types';

export const PLACEHOLDER_KEYS = [
  'phone',
  'email',
  'legalEntity',
  'foundedYear',
] as const;

export const company = {
  /** PLACEHOLDER — confirm the trading name. Repo name assumed. */
  name: 'MaintenanceCare',
  shortName: 'MaintenanceCare',
  tagline: 'Property maintenance and field services',

  /** PLACEHOLDER — registered entity for the legal pages. */
  legalEntity: 'MaintenanceCare LLC',

  /** PLACEHOLDER — real business line. 555-01xx is the reserved fiction range. */
  phone: '(512) 555-0147',
  phoneHref: 'tel:+15125550147',

  /** PLACEHOLDER — .example never resolves, by design. Replace before launch. */
  email: 'office@maintenancecare.example',

  /**
   * Service-area business: crews travel to the property, so no storefront
   * address is published. `LocalBusiness` JSON-LD uses `areaServed` instead of
   * a `streetAddress`, which is both accurate and what Google expects here.
   */
  serviceAreaBusiness: true,
  address: {
    streetAddress: null,
    locality: 'Elgin',
    region: 'TX',
    postalCode: '78621',
    country: 'US',
  },

  /** Elgin, TX centroid — used for the geo block in LocalBusiness JSON-LD. */
  geo: { lat: 30.3496, lng: -97.3703 },

  /** PLACEHOLDER — first year of operation, for the about page. */
  foundedYear: 2026,

  hours: [
    { days: 'Monday – Friday', open: '07:30', close: '18:00' },
    { days: 'Saturday', open: '08:00', close: '14:00' },
    { days: 'Sunday', open: null, close: null },
  ],

  /** Plain-language response commitment. Restated on the thanks page. */
  responseCommitment: 'We reply to every request within one business day.',
  responseCommitmentEs: 'Respondemos a cada solicitud dentro de un día hábil.',

  /** Honest service radius. Anything past this is quoted with a drive-time line. */
  serviceRadiusMiles: 35,

  social: {
    /** Empty until real profiles exist. Never link a placeholder profile. */
    facebook: '',
    google: '',
  },
} as const;

/**
 * What a customer is actually buying beyond the labor, stated as things we can
 * produce on request rather than as adjectives. Rendered by `TrustBar` and
 * `CredentialGrid`.
 *
 * Deliberately absent: any rating, star, review count or "award". Section 8
 * bans review structured data until there are genuine reviews, and a badge a
 * company issues to itself is worth nothing to a property manager.
 */
export const CREDENTIALS: Credential[] = [
  {
    id: 'insurance',
    label: 'Insured',
    detail: 'We carry general liability cover, and send the certificate on request before the first visit.',
    icon: 'shield',
  },
  {
    id: 'background-checked',
    label: 'Background-checked technicians',
    detail: 'Every technician who enters a property has been background-checked.',
    icon: 'user-check',
  },
  {
    id: 'written-price',
    label: 'Written price first',
    detail: 'You approve a written price before any work starts. No invoice ever arrives as a surprise.',
    icon: 'file-text',
  },
  {
    id: 'verified-partners',
    label: 'Verified partner licenses',
    detail: 'When a job needs a licensed trade, we check that partner’s state license and insurance before they are dispatched.',
    icon: 'badge-check',
  },
];

/**
 * Required on every page. BUILD.md 9.2. The compliance check asserts this exact
 * string is rendered by SiteFooter, and that it still names every trade.
 *
 * Naming the trades here is the whole purpose of the disclosure: it states who
 * performs them, which is the opposite of claiming we do.
 */
/* compliance-allow-start: 9.2 requires this disclosure to name the licensed trades */
export const LICENSED_PARTNER_DISCLOSURE =
  'Licensed trade work — plumbing, electrical, HVAC, irrigation, and pest control — is performed by verified, insured, licensed partner contractors.';
/* compliance-allow-end */

/**
 * The same disclosure in Spanish. BUILD.md 9.2 requires it on every page, and
 * a Spanish page is still every page. Naming the trades is the entire purpose
 * of the disclosure — it states who performs them, which is the opposite of
 * claiming we do — so the banned-phrase check is suspended here exactly as it
 * is for the English string, and nowhere else.
 */
/* compliance-allow-start: 9.2 requires this disclosure to name the licensed trades */
export const LICENSED_PARTNER_DISCLOSURE_ES =
  'El trabajo de oficios con licencia — plomería, electricidad, HVAC, riego y control de plagas — lo realizan contratistas asociados con licencia, asegurados y verificados por nosotros.';
/* compliance-allow-end */

/**
 * The licensing boundary, stated as a trust asset rather than fine print.
 *
 * This block names the licensed trades in the NEGATIVE — it is the disclosure
 * that keeps the business compliant, so the banned-phrase check is suspended
 * here deliberately and nowhere else in the copy.
 */
/* compliance-allow-start: negative-context — this copy states what we do NOT perform */
export const LICENSING_STANCE = {
  heading: 'What we do not do',
  lead: 'We are not a licensed trade contractor, and we will not pretend to be one.',
  body: [
    'MaintenanceCare performs maintenance, inspection, documentation and general repair work that does not require a state trade license. That covers a great deal — filters, detectors, drywall, paint, fences, gutters, lawns, punch lists, vacant property checks, and the written record of all of it.',
    'It does not cover plumbing, electrical, HVAC repair, irrigation or pest control. Those are licensed trades in Texas. When your property needs one, we identify the problem, photograph it, and dispatch a licensed partner contractor whose license and insurance we have verified — then we stay on it until the work is finished and documented.',
  ],
  reassurance:
    'Property managers tell us this is the first thing they check. The vendors who create liability are the ones who quietly do a little electrical work on the side.',
};

/** Rendered as the explicit exclusion list. Negative context — see above. */
export const NOT_PROVIDED_DIRECTLY = [
  'Plumbing repair or replacement',
  'Electrical repair or new circuits',
  'HVAC repair or refrigerant work',
  'Irrigation repair',
  'Pest control treatment or extermination',
  'Roof replacement or structural engineering',
  'Anything requiring a permit we cannot pull',
] as const;
/* compliance-allow-end */

/**
 * The same boundary in Spanish. Negative context throughout — it states what we
 * do NOT perform — so the banned-phrase check is suspended here exactly as it
 * is for the English block.
 */
/* compliance-allow-start: negative-context — this copy states what we do NOT perform */
export const LICENSING_STANCE_ES = {
  heading: 'Lo que no hacemos',
  lead: 'No somos un contratista de oficios con licencia, y no vamos a fingir que lo somos.',
  body: [
    'MaintenanceCare hace mantenimiento, inspección, documentación y reparación general que no requiere una licencia estatal de oficio. Eso abarca bastante — filtros, detectores, tablaroca, pintura, cercas, canaletas, jardines, listas de pendientes, revisiones de propiedades vacías, y el registro escrito de todo ello.',
    'No abarca plomería, electricidad, reparación de HVAC, riego ni control de plagas. En Texas esos oficios requieren licencia. Cuando su propiedad necesita uno, identificamos el problema, lo fotografiamos y mandamos a un contratista asociado con licencia cuya licencia y seguro ya verificamos — y le damos seguimiento hasta que el trabajo queda terminado y documentado.',
  ],
  reassurance:
    'Los administradores de propiedades nos dicen que esto es lo primero que revisan. Los proveedores que les crean problemas legales son los que hacen un poco de trabajo eléctrico por su cuenta y sin decirlo.',
};

/** Rendered as the explicit exclusion list, in Spanish. Negative context. */
export const NOT_PROVIDED_DIRECTLY_ES = [
  'Reparación o reemplazo de plomería',
  'Reparación eléctrica o circuitos nuevos',
  'Reparación de HVAC o trabajo con refrigerante',
  'Reparación de sistemas de riego',
  'Tratamiento o exterminio de plagas',
  'Reemplazo de techo o ingeniería estructural',
  'Cualquier cosa que requiera un permiso que no podemos tramitar',
] as const;
/* compliance-allow-end */

/** The Spanish counterpart of ROUTED_INSTEAD. Approved phrasing, live-checked. */
export const ROUTED_INSTEAD_ES = [
  { trade: 'Plomería', we: 'Coordinación — encontramos la fuga, cerramos el paso, la fotografiamos y mandamos a un plomero con licencia.' },
  { trade: 'Electricidad', we: 'Inspección y envío de un proveedor con licencia — probamos, documentamos y entregamos un trabajo ya definido a un electricista con licencia.' },
  { trade: 'HVAC', we: 'Programa de filtros y manejo del contratista — mantenemos los filtros al día y manejamos al contratista con licencia cuando un sistema falla.' },
  { trade: 'Plagas', we: 'Inspección y coordinación — registramos la evidencia y la actividad, y traemos a un operador con licencia.' },
  { trade: 'Riego', we: 'Observación y referencia a un irrigador con licencia — corremos las zonas, anotamos qué falló y lo referimos.' },
] as const;

/** What we route, and what we do around it. Rendered beside the exclusions. */
export const ROUTED_INSTEAD = [
  { trade: 'Plumbing', we: 'Plumbing coordination — we find the leak, shut it off, photograph it, and dispatch a licensed plumber.' },
  { trade: 'Electrical', we: 'Electrical inspection and licensed vendor dispatch — we test, document, and hand a fully described job to a licensed electrician.' },
  { trade: 'HVAC', we: 'HVAC filter program and contractor management — we keep filters on schedule and manage the licensed contractor when a system fails.' },
  { trade: 'Pest', we: 'Pest inspection and vendor coordination — we log evidence and activity and bring in a licensed operator.' },
  { trade: 'Irrigation', we: 'Irrigation observation and licensed irrigator referral — we run the zones, note what failed, and refer a licensed irrigator.' },
] as const;

export type Company = typeof company;
