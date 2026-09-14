import { ImageResponse } from 'next/og';
import { company } from '@/content/company';

export const alt = `${company.name} — property maintenance and field services, Elgin TX`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * The OG card is the record card, not a logo on a gradient. Same rules as the
 * site: square corners, hairlines, one accent.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#F2F1ED',
          color: '#24262A',
          fontFamily: 'sans-serif',
          padding: 64,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 26, height: 26, background: '#E5B62B', border: '3px solid #24262A' }} />
          <div style={{ fontSize: 30, fontWeight: 700 }}>{company.name}</div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 40,
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            maxWidth: 940,
          }}
        >
          We maintain property for people who aren&rsquo;t standing in front of it.
        </div>

        <div style={{ display: 'flex', marginTop: 28, fontSize: 28, color: '#5B6670', maxWidth: 900 }}>
          Recurring maintenance, documented inspections, and one number to call.
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 'auto',
            paddingTop: 24,
            borderTop: '2px solid #B4BAC0',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 24,
            color: '#5B6670',
          }}
        >
          <div style={{ display: 'flex' }}>
            Elgin · Bastrop · Manor · Taylor · Pflugerville
          </div>
          <div
            style={{
              display: 'flex',
              border: '3px solid #2E6B4F',
              color: '#2E6B4F',
              padding: '6px 14px',
              fontSize: 22,
              letterSpacing: '0.12em',
              fontWeight: 600,
            }}
          >
            DOCUMENTED
          </div>
        </div>
      </div>
    ),
    size,
  );
}
