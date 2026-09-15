import { areas } from '@/content/areas';
import { company } from '@/content/company';

/**
 * Static SVG. No live map API in Phase 1 — it would be the heaviest thing on
 * the site and this page loads on rural Bastrop County signal.
 *
 * Coordinates are projected from the real lat/lng in content/areas.ts, so the
 * relative geography is correct even though the map is schematic.
 */
const BOUNDS = { minLat: 30.05, maxLat: 30.63, minLng: -97.68, maxLng: -97.26 };
const W = 520;
const H = 420;

function project(lat: number, lng: number) {
  const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * W;
  const y = ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * H;
  return { x: Math.round(x), y: Math.round(y) };
}

export function ServiceAreaMap({ highlight }: { highlight?: string }) {
  const base = project(company.geo.lat, company.geo.lng);

  return (
    <figure className="overflow-hidden rounded-lg border bg-paper-raised shadow-sm">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Service area map. Based in ${company.address.locality}, Texas, covering ${areas
          .map((a) => a.city)
          .join(', ')} within roughly ${company.serviceRadiusMiles} miles.`}
      >
        <rect width={W} height={H} fill="var(--paper)" />

        {/* Graticule — reads as a survey sheet, not decoration. */}
        <g stroke="var(--steel-light)" strokeWidth="0.5" opacity="0.5">
          {Array.from({ length: 12 }, (_, i) => (
            <line key={`v${i}`} x1={(i + 1) * 40} y1="0" x2={(i + 1) * 40} y2={H} />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={(i + 1) * 40} x2={W} y2={(i + 1) * 40} />
          ))}
        </g>

        {/* Honest radius ring, drawn to the same projection. */}
        <circle
          cx={base.x}
          cy={base.y}
          r={165}
          fill="var(--hivis)"
          fillOpacity="0.07"
          stroke="var(--hivis-ink)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {areas.map((a) => {
          const p = project(a.lat, a.lng);
          const isBase = a.driveTimeMinutes === 0;
          const isActive = highlight === a.slug;
          return (
            <g key={a.slug}>
              <line
                x1={base.x}
                y1={base.y}
                x2={p.x}
                y2={p.y}
                stroke="var(--steel-light)"
                strokeWidth="1"
              />
              <rect
                x={p.x - (isBase ? 6 : 4)}
                y={p.y - (isBase ? 6 : 4)}
                width={isBase ? 12 : 8}
                height={isBase ? 12 : 8}
                fill={isActive || isBase ? 'var(--hivis)' : 'var(--paper-raised)'}
                stroke="var(--soil)"
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <text
                x={p.x + 11}
                y={p.y + 4}
                fontSize="13"
                fontFamily="var(--font-plex-mono), monospace"
                fill="var(--soil)"
                fontWeight={isActive || isBase ? 600 : 400}
              >
                {a.city}
              </text>
              <text
                x={p.x + 11}
                y={p.y + 19}
                fontSize="10.5"
                fontFamily="var(--font-plex-mono), monospace"
                fill="var(--steel)"
              >
                {isBase ? 'BASE' : `${a.driveTimeMinutes} MIN`}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="border-t px-4 py-2.5 text-xs text-steel">
        Service area — {company.serviceRadiusMiles} mile working radius from{' '}
        {company.address.locality}. Drive times are honest averages, not best cases.
      </figcaption>
    </figure>
  );
}
