/**
 * Renders the specimen inspection report to public/sample-report.pdf.
 *
 * Run with: pnpm run report:pdf
 *
 * The PDF is generated from content/sample-report.ts, so the downloadable
 * document and the page can never drift apart. Replace the source data with a
 * genuinely anonymized real report and re-run this; nothing else changes.
 */
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { RESULT_LABEL, SAMPLE_REPORT_IS_SPECIMEN, sampleReport } from '../content/sample-report';
import { company, LICENSED_PARTNER_DISCLOSURE } from '../content/company';

const INK = '#24262A';
const STEEL = '#5B6670';
const RULE = '#B4BAC0';
const PAPER = '#F2F1ED';
const RAISED = '#FBFAF8';
const HIVIS = '#E5B62B';
const VERIFIED = '#2E6B4F';
const FLAG = '#A62F1F';

const TONE = { pass: VERIFIED, attention: FLAG, note: STEEL } as const;

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function buildHtml(): string {
  const r = sampleReport;

  const meta = [
    ['Date', r.date],
    ['On site', r.window],
    ['Technician', r.technician],
    ['Coverage', r.planTier],
    ['Year built', String(r.yearBuilt)],
    ['Occupancy', r.occupancy],
    ['Conditions', r.weather],
    ['Next visit', r.nextVisit],
  ]
    .map(
      ([k, v]) =>
        `<div class="meta-cell"><p class="meta-k">${esc(k!)}</p><p class="meta-v">${esc(v!)}</p></div>`,
    )
    .join('');

  const findings = r.findings
    .map(
      (f, i) => `<li class="finding">
  <span class="idx">${String(i + 1).padStart(2, '0')}</span>
  <div>
    <div class="fhead">
      <h3>${esc(f.area)}</h3>
      <span class="chip" style="border-color:${TONE[f.result]};color:${TONE[f.result]}">${esc(RESULT_LABEL[f.result])}</span>
      ${f.photos ? `<span class="photos">${f.photos} PHOTO${f.photos > 1 ? 'S' : ''}</span>` : ''}
    </div>
    <p class="obs">${esc(f.observation)}</p>
    ${f.action ? `<p class="action"><strong>Action:</strong> ${esc(f.action)}</p>` : ''}
  </div>
</li>`,
    )
    .join('');

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${esc(r.workOrder)} — Property inspection record</title>
<style>
  @page { size: A4; margin: 14mm 13mm 16mm; }
  * { box-sizing: border-box; }
  body { margin:0; font-family: Archivo, "Helvetica Neue", Arial, sans-serif; color:${INK}; font-size:10pt; line-height:1.5; background:#fff; }
  .mono { font-family: "IBM Plex Mono", ui-monospace, monospace; }
  header { background:${INK}; color:${PAPER}; padding:12px 14px; display:flex; justify-content:space-between; align-items:flex-start; gap:12px; }
  header .kicker { margin:0; font-size:7.5pt; letter-spacing:.12em; text-transform:uppercase; color:${HIVIS}; font-family:"IBM Plex Mono",monospace; }
  header .wo { margin:3px 0 0; font-size:15pt; font-weight:600; font-family:"IBM Plex Mono",monospace; }
  header .prop { margin:2px 0 0; font-size:9pt; color:${RULE}; }
  .stamp { border:2px solid ${HIVIS}; color:${HIVIS}; padding:3px 8px; font-size:7.5pt; letter-spacing:.14em; text-transform:uppercase; font-family:"IBM Plex Mono",monospace; white-space:nowrap; }
  .meta { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:${RULE}; border-bottom:1px solid ${RULE}; }
  .meta-cell { background:${RAISED}; padding:6px 9px; }
  .meta-k { margin:0; font-size:6.5pt; letter-spacing:.1em; text-transform:uppercase; color:${STEEL}; font-family:"IBM Plex Mono",monospace; }
  .meta-v { margin:1px 0 0; font-size:8.5pt; }
  .summary { border-left:3px solid ${HIVIS}; background:${RAISED}; padding:9px 12px; margin:0; border-bottom:1px solid ${RULE}; }
  .summary p.k { margin:0 0 3px; font-size:6.5pt; letter-spacing:.1em; text-transform:uppercase; color:${STEEL}; font-family:"IBM Plex Mono",monospace; }
  .summary p.v { margin:0; font-size:9.5pt; }
  h2.sec { margin:14px 0 5px; font-size:6.5pt; letter-spacing:.1em; text-transform:uppercase; color:${STEEL}; font-family:"IBM Plex Mono",monospace; font-weight:500; }
  ol.findings { list-style:none; margin:0; padding:0; border-top:1px solid ${RULE}; }
  li.finding { display:grid; grid-template-columns:22px 1fr; gap:8px; padding:7px 0; border-bottom:1px solid ${RULE}; break-inside:avoid; }
  .idx { font-family:"IBM Plex Mono",monospace; font-size:7.5pt; color:${RULE}; padding-top:2px; }
  .fhead { display:flex; align-items:center; gap:7px; flex-wrap:wrap; }
  .fhead h3 { margin:0; font-size:10pt; font-weight:600; }
  .chip { border:1px solid; padding:1px 5px; font-size:6.5pt; letter-spacing:.08em; text-transform:uppercase; font-family:"IBM Plex Mono",monospace; }
  .photos { font-size:6.5pt; color:${RULE}; font-family:"IBM Plex Mono",monospace; }
  .obs { margin:3px 0 0; font-size:9pt; color:${STEEL}; }
  .action { margin:3px 0 0; padding-left:9px; border-left:2px solid ${RULE}; font-size:9pt; }
  footer { margin-top:14px; padding-top:8px; border-top:1px solid ${RULE}; font-size:7.5pt; color:${STEEL}; }
  footer .mono { display:block; margin-bottom:4px; }
  .specimen-bar { background:${HIVIS}; color:${INK}; padding:5px 12px; font-size:8pt; font-weight:600; font-family:"IBM Plex Mono",monospace; letter-spacing:.04em; }
</style></head><body>
${
  SAMPLE_REPORT_IS_SPECIMEN
    ? `<div class="specimen-bar">SPECIMEN — shows the exact report format. Not a record of a real visit to a real property.</div>`
    : ''
}
<header>
  <div>
    <p class="kicker">Property inspection record</p>
    <p class="wo">${esc(r.workOrder)}</p>
    <p class="prop">${esc(r.propertyLabel)}</p>
  </div>
  <span class="stamp">${SAMPLE_REPORT_IS_SPECIMEN ? 'Specimen' : 'Complete'}</span>
</header>
<div class="meta">${meta}</div>
<div class="summary"><p class="k">Summary for the owner</p><p class="v">${esc(r.summary)}</p></div>
<h2 class="sec">Findings — ${r.findings.length} areas inspected</h2>
<ol class="findings">${findings}</ol>
<footer>
  <span class="mono">${esc(r.reference)} · ${esc(r.anonymizedNote)}</span>
  Licensed trade findings are recorded as observation only and routed to a licensed partner
  contractor. ${esc(LICENSED_PARTNER_DISCLOSURE)}<br>
  ${esc(company.name)} · ${esc(company.address.locality)}, ${esc(company.address.region)} ${esc(company.address.postalCode)} · ${esc(company.phone)}
</footer>
</body></html>`;
}

async function main(): Promise<void> {
  const out = path.join(process.cwd(), 'public', 'sample-report.pdf');
  // This sandbox ships a Chromium that may not match the version @playwright/test
  // expects, so prefer the one on disk when PLAYWRIGHT_CHROMIUM_PATH points at it.
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH;
  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  try {
    const page = await browser.newPage();
    await page.setContent(buildHtml(), { waitUntil: 'load' });
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `<div style="width:100%;padding:0 13mm;font-size:7pt;color:#5B6670;font-family:Arial,sans-serif;display:flex;justify-content:space-between">
        <span>${company.name} — property inspection record</span>
        <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
      </div>`,
      margin: { top: '14mm', bottom: '16mm', left: '13mm', right: '13mm' },
    });
    await writeFile(out, pdf);
    console.log(`Wrote ${out} (${(pdf.length / 1024).toFixed(0)} KB)`);
  } finally {
    await browser.close();
  }
}

// Only render when run directly, so the HTML builder can be imported in tests.
if (process.argv[1] && path.resolve(process.argv[1]).endsWith('generate-sample-report.ts')) {
  void main();
}
