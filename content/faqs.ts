import type { Faq } from './types';

export const faqs: Faq[] = [
  {
    id: 'what-is-property-care',
    question: 'What is a Property Care plan, in plain terms?',
    answer:
      'A technician visits your property on a fixed schedule, performs the same checklist every time, fixes the small things on the spot, and sends you a dated photo report. You pay a flat monthly amount instead of guessing at a repair budget. Nothing is bundled in that you did not agree to, and there is no long-term contract.',
    contexts: ['home', 'plans'],
  },
  {
    id: 'licensed-trades',
    question: 'Do you do plumbing, electrical or HVAC work?',
    /* compliance-allow: negative-context — answer states we do not perform these */
    answer:
      'No, and we will not pretend otherwise. Those are licensed trades in Texas. What we do is identify the problem, photograph it, scope it properly, and dispatch a licensed partner contractor whose licence and insurance we have verified — then manage access and stay on it until the job is closed out and documented. You get one point of contact instead of four phone calls.',
    contexts: ['home', 'plans', 'property-managers'],
  },
  {
    id: 'contract-length',
    question: 'Am I locked into a contract?',
    answer:
      'No. Plans are month to month and you can cancel with thirty days notice. Portfolio agreements are negotiated separately and usually run annually, because pricing by door count only works if the door count is stable.',
    contexts: ['plans'],
  },
  {
    id: 'insurance',
    question: 'Are you insured?',
    answer:
      'Yes. A certificate of insurance is available on request, and we will send it to your compliance address before the first visit without being asked twice. If your management agreement requires you to be named as an additional insured, tell us and we will arrange it.',
    contexts: ['property-managers', 'home'],
  },
  {
    id: 'response-time',
    question: 'How fast do you respond?',
    answer:
      'We reply to every request within one business day. Scheduled work is booked to a named date, not a window. Response-time commitments for portfolio clients are written into the agreement — see the table on the property managers page.',
    contexts: ['home', 'property-managers', 'request'],
  },
  {
    id: 'access',
    question: 'How do you get into the property?',
    answer:
      'We arrange access with whoever you tell us to contact — you, a tenant, an on-site manager, or your existing lockbox process. We deliberately do not collect gate, lockbox or alarm codes through this website. Access credentials belong in an access-controlled system, not in a web form or an email inbox.',
    contexts: ['request', 'investors'],
  },
  {
    id: 'reports',
    question: 'What does the report actually look like?',
    answer:
      'A dated work order with the property address, every checklist area with its result, photographs of anything noted, and a plain-language summary of what needs attention and what does not. You can download a real anonymised one from the sample report page — no email address required.',
    contexts: ['home', 'plans', 'property-managers', 'investors'],
  },
  {
    id: 'older-homes',
    question: 'Why do you ask what year the property was built?',
    answer:
      'Because the federal Renovation, Repair and Painting rule can require Lead-Safe Certified Firm status for qualifying work in housing built before 1978, and we gate paint and demolition scheduling on it. Asking up front is how we avoid sending a technician to a job we are not permitted to start.',
    contexts: ['request'],
  },
  {
    id: 'vacant',
    question: 'What happens if you find something wrong at a vacant property?',
    answer:
      'Anything urgent gets a phone call within the hour, not an email you read on Monday. We photograph it, stabilise what we safely can, and give you a scoped recommendation with a cost band. If it needs a licensed trade, we have the partner contacted before you call us back.',
    contexts: ['investors', 'property-managers'],
  },
  {
    id: 'portfolio-pricing',
    question: 'How does portfolio pricing work?',
    answer:
      'By door count rather than by plan tier, because a forty-door portfolio does not need the same cadence on every unit. We look at your actual mix — occupied, vacant, turning — and price the coverage against it. Start with the free three-property audit and we will quote from what we actually find.',
    contexts: ['property-managers', 'plans'],
  },
  {
    id: 'service-area',
    question: 'Do you cover my area?',
    answer:
      'We work Elgin, Bastrop, Manor, Taylor and Pflugerville, roughly a thirty-five mile radius from Elgin. Outside that we will still talk to you, but we will be honest about whether the drive time makes it worth your money.',
    contexts: ['service-area'],
  },
  {
    id: 'str-turnovers',
    question: 'Can you handle short-term rental turnovers?',
    answer:
      'We handle maintenance, inspections, repairs and exterior care for short-term rentals today, and we schedule around your booking calendar. Full turnover and make-ready coordination is a Phase 2 division and is not running yet — we would rather tell you that than take the booking and disappoint a guest.',
    contexts: ['str'],
  },
  {
    id: 'emergency',
    question: 'Do you offer after-hours emergency response?',
    answer:
      'Not as a standing programme yet — the on-call rotation is a later phase and we will not advertise a promise we cannot keep at 2am. Plan customers get priority response during business hours, and urgent findings during a visit are escalated by phone immediately.',
    contexts: ['property-managers'],
  },
  {
    id: 'pricing-changes',
    question: 'Why does every price on this site carry a date?',
    answer:
      'Because we review our pricing against local benchmarks quarterly, and a price without a date is a price you cannot rely on. If a figure here is out of date, the date tells you so before you call.',
    contexts: ['plans'],
  },
];

export function faqsFor(context: Faq['contexts'][number]): Faq[] {
  return faqs.filter((f) => f.contexts.includes(context));
}
