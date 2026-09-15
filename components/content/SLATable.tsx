import { Callout } from '@/components/ui/Callout';

export interface SlaRow {
  situation: string;
  acknowledge: string;
  onSite: string;
}

/**
 * Response-time commitments. Deliberately conservative — an SLA you can beat
 * every week is worth more than one you miss once.
 */
export const SLA_ROWS: SlaRow[] = [
  {
    situation: 'Active water intrusion or a safety hazard',
    acknowledge: 'Within 1 hour, business hours',
    onSite: 'Same business day',
  },
  {
    situation: 'No cooling or no heat, occupied unit',
    acknowledge: 'Within 2 hours, business hours',
    onSite: 'Licensed partner dispatched same business day',
  },
  {
    situation: 'Tenant-reported repair, habitability affecting',
    acknowledge: 'Within 4 business hours',
    onSite: 'Within 1 business day',
  },
  {
    situation: 'Routine repair or punch list item',
    acknowledge: 'Within 1 business day',
    onSite: 'Within 3 business days',
  },
  {
    situation: 'Scheduled plan visit or inspection',
    acknowledge: 'Booked to a named date',
    onSite: 'On the agreed date',
  },
  {
    situation: 'Written report after any visit',
    acknowledge: '—',
    onSite: 'Emailed within 24 hours',
  },
];

export function SLATable({ rows = SLA_ROWS }: { rows?: SlaRow[] }) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <thead>
            <tr className="border-y">
              <th scope="col" className="py-2.5 pr-4 text-sm font-semibold text-soil">
                Situation
              </th>
              <th scope="col" className="py-2.5 pr-4 text-sm font-semibold text-soil">
                We acknowledge
              </th>
              <th scope="col" className="py-2.5 text-sm font-semibold text-soil">
                We are on site
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.situation} className="border-b align-top">
                <th scope="row" className="py-3 pr-4 text-sm font-normal text-soil">
                  {r.situation}
                </th>
                <td className="py-3 pr-4 text-sm text-steel">{r.acknowledge}</td>
                <td className="py-3 text-sm text-steel">{r.onSite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Callout className="mt-4">
        Business hours are Monday to Friday 07:30–18:00 and Saturday 08:00–14:00. A standing
        after-hours rotation is a later phase, and we will not write it into an agreement before it
        exists. These commitments are written into the portfolio agreement, not just this page.
      </Callout>
    </div>
  );
}
