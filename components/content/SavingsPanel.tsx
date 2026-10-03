import { cn } from '@/lib/cn';

/**
 * Four defensible categories. No percentages, no promises of a saving, no
 * invented statistics — BUILD.md 9.5. Every figure here is drawn from our own
 * published price list, which is the only source we can actually stand behind.
 */
const CATEGORIES = [
  {
    ref: '01',
    title: 'Prevention',
    body: 'A gutter clearing is $125–$175 and it is on the price list. Water that has been running behind fascia for two seasons is not on anyone\'s price list. The value of a scheduled visit is that the first number is the one you pay.',
    example: 'Known cost, on a known date, against an unknown one.',
  },
  {
    ref: '02',
    title: 'Vacancy',
    body: 'Every day a unit sits unrented is a day of rent you can calculate exactly. A turnover that stalls waiting on three vendors to call back costs those days. We hold the schedule and the access, so the calendar is the constraint rather than the phone.',
    example: 'You already know your daily rent figure. Multiply it by the days you lost last turn.',
  },
  {
    ref: '03',
    title: 'Dispatch',
    body: 'One call instead of four. We price the job before a licensed contractor is sent out, meet them for access, and verify the work was done — so you are not paying a trip charge because nobody could get in, and not chasing a photograph of the finished work three weeks later.',
    example: 'Fewer trip charges, no second visit for access, one invoice to check.',
  },
  {
    ref: '04',
    title: 'Portfolio pricing',
    body: 'Priced on how many properties you manage rather than per plan. A portfolio is a mix — occupied, empty, between tenants — and charging the same for every one of them overcharges you on the easy ones. We price against the real mix and revisit it as that changes.',
    example: 'Coverage sized to the portfolio, not to a tier.',
  },
] as const;

const CATEGORIES_ES = [
  {
    ref: '01',
    title: 'Prevención',
    body: 'Limpiar una canaleta cuesta entre $125 y $175, y está en la lista de precios. El agua que lleva dos temporadas corriendo detrás de la fascia no está en la lista de nadie. El valor de una visita programada es que usted paga el primer número.',
    example: 'Un costo conocido, en una fecha conocida, contra uno que no se conoce.',
  },
  {
    ref: '02',
    title: 'Unidades vacías',
    body: 'Cada día que una unidad está sin rentar es un día de renta que usted puede calcular exacto. Una entrega que se atora esperando a que tres proveedores devuelvan la llamada cuesta esos días. Nosotros manejamos el calendario y el acceso, para que el límite sea la agenda y no el teléfono.',
    example: 'Usted ya sabe cuánto renta al día. Multiplíquelo por los días que perdió en la última entrega.',
  },
  {
    ref: '03',
    title: 'Coordinación',
    body: 'Una llamada en lugar de cuatro. Cotizamos el trabajo antes de mandar a un contratista con licencia, lo recibimos para darle acceso y verificamos que quedó hecho — así usted no paga un cargo por viaje porque nadie pudo entrar, ni anda persiguiendo una foto del trabajo terminado tres semanas después.',
    example: 'Menos cargos por viaje, ninguna segunda visita por el acceso, una sola factura que revisar.',
  },
  {
    ref: '04',
    title: 'Precio por portafolio',
    body: 'El precio va según cuántas propiedades administra, no por plan. Un portafolio es una mezcla — ocupadas, vacías, entre inquilinos — y cobrar lo mismo por todas le cobra de más en las fáciles. Ponemos el precio contra la mezcla real y lo revisamos conforme cambia.',
    example: 'Cobertura del tamaño del portafolio, no de un nivel fijo.',
  },
] as const;

export function SavingsPanel({
  className,
  locale = 'en',
}: {
  className?: string;
  locale?: 'en' | 'es';
}) {
  const CATEGORIES_FOR = locale === 'es' ? CATEGORIES_ES : CATEGORIES;
  return (
    <div className={cn('grid gap-px overflow-hidden rounded-lg border bg-rule sm:grid-cols-2', className)}>
      {CATEGORIES_FOR.map((c) => (
        <div key={c.ref} className="bg-paper-raised p-5">
          <p className="font-mono text-xs text-ink-muted">{c.ref}</p>
          <h3 className="mt-1 text-lg font-semibold text-soil">{c.title}</h3>
          <p className="mt-2 text-sm text-steel">{c.body}</p>
          <p className="mt-3 border-l-2 border-l-hivis pl-3 text-sm text-soil-soft">{c.example}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * The honest framing for any avoided-loss figure. Exported so no page invents
 * its own wording, and so the compliance check has one string to look for.
 */
export const AVOIDED_LOSS_FRAMING =
  'Figures describe potential avoided-loss exposure based on our own published pricing. They are not a savings guarantee, and your property will have its own numbers.';
