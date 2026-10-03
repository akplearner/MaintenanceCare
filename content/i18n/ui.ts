/**
 * Interface copy — the strings that live in components rather than in the
 * content data.
 *
 * Every field is required, so a missing Spanish string is a type error rather
 * than an English word on a Spanish page. Content data (services, FAQs, city
 * paragraphs) falls back instead, because there is far more of it; chrome is
 * small enough to hold to a stricter rule.
 */
import type { Locale } from '@/lib/i18n';

export interface Ui {
  skipToContent: string;
  closed: string;

  nav: {
    services: string;
    plans: string;
    propertyManagers: string;
    sampleReport: string;
    serviceArea: string;
    about: string;
    requestService: string;
    callNow: string;
    openMenu: string;
    closeMenu: string;
    language: string;
  };

  footer: {
    services: string;
    allServices: string;
    plansLink: string;
    whoWeWorkFor: string;
    sampleReport: string;
    about: string;
    serviceArea: string;
    disclosureLink: string;
    rights: string;
    audiences: { propertyManagers: string; investors: string; shortTermRentals: string };
    legal: { licensedPartners: string; terms: string; privacy: string };
  };


  home: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    lead: string;
    recordLabel: string;
    exampleRecord: string;
    downloadReal: string;
    noEmailNeeded: string;
    whatWeDo: string;
    whatWeDoLead: string;
    comingLater: string;
    seeAllServices: string;
    whoWeWorkFor: string;
    whoWeWorkForLead: string;
    alsoWorking: string;
    tellUsWhatYouManage: string;
    audiences: { href: string; title: string; body: string; cta: string }[];
    plans: string;
    plansLead: string;
    seeWhatsIncluded: string;
    weDoNotPerform: string;
    whatWeDoInstead: string;
    routedSuffix: string;
    howWeVet: string;
    sampleReport: string;
    sampleReportLead: string;
    sampleChips: string[];
    viewSample: string;
    questions: string;
  };

  hero: { forPortfolio: string; forPortfolioSub: string; forHome: string; forHomeSub: string };

  plansUi: {
    mostChosen: string;
    perMonth: string;
    startWith: string;
    effectivePrefix: string;
    effectiveSuffix: string;
  };

  portfolio: { heading: string; body: string; cta: string };

  servicesPage: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    lead: string;
    runningNow: string;
    runningNowLead: string;
    laterPhases: string;
    laterPhasesLead: string;
    breadcrumbServices: string;
  };

  plansPage: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    lead: string;
    fifteenAreas: string;
    fifteenAreasLead: string;
    observationLabel: string;
    observationBody: string;
    whereMoneyGoes: string;
    whereMoneyGoesLead: string;
    questions: string;
    notSure: string;
    describeProperty: string;
    notSureTail: string;
    breadcrumbHome: string;
    breadcrumbPlans: string;
  };

  cta: {
    portfolio: { eyebrow: string; heading: string; body: string; primary: string };
    single: { eyebrow: string; heading: string; body: string; primary: string };
    altToPortfolio: { question: string; label: string };
    altToSingle: { question: string; label: string };
  };
}

export const uiEn: Ui = {
  skipToContent: 'Skip to content',
  closed: 'Closed',

  nav: {
    services: 'Services',
    plans: 'Plans',
    propertyManagers: 'Property managers',
    sampleReport: 'Sample report',
    serviceArea: 'Service area',
    about: 'About',
    requestService: 'Request service',
    callNow: 'Call now',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
  },

  footer: {
    services: 'Services',
    allServices: 'All services',
    plansLink: 'Property Care plans',
    whoWeWorkFor: 'Who we work for',
    sampleReport: 'Sample report',
    about: 'About',
    serviceArea: 'Service area',
    disclosureLink: 'How our licensed partner model works',
    rights: 'All rights reserved.',
    audiences: {
      propertyManagers: 'Property managers',
      investors: 'Investors & absentee owners',
      shortTermRentals: 'Short-term rentals',
    },
    legal: { licensedPartners: 'Licensed partners', terms: 'Terms', privacy: 'Privacy' },
  },


  home: {
    metaTitle: 'Property maintenance and field services — Elgin & Central Texas',
    metaDescription:
      'Recurring maintenance plans, documented property inspections and general repair for property managers, investors and homeowners in Elgin, Bastrop, Manor, Taylor and Pflugerville.',
    h1: 'Someone looking after the property when you can’t.',
    lead: 'Maintenance on a schedule, and a dated photo record after every visit. For homeowners and for the people who manage doors across Elgin and Central Texas.',
    recordLabel: 'What you receive after every visit',
    exampleRecord: 'This is an example record.',
    downloadReal: 'Download a real one',
    noEmailNeeded: '— no email address required.',
    whatWeDo: 'What we do',
    whatWeDoLead: 'Four services are running today. We say plainly which ones are not.',
    comingLater: 'Coming later:',
    seeAllServices: 'See all services',
    whoWeWorkFor: 'Who we work for',
    whoWeWorkForLead: 'Whether it is one home or a portfolio of them.',
    alsoWorking: 'Also working with Realtors, HOAs, and commercial property.',
    tellUsWhatYouManage: 'Tell us what you manage',
    audiences: [
      {
        href: '/for/property-managers',
        title: 'Property managers',
        body: 'One company for maintenance, inspections and turnovers, with response times in writing and a report on every unit. Start with three properties free.',
        cta: 'See response times and pricing',
      },
      {
        href: '/for/investors',
        title: 'Investors & absentee owners',
        body: 'You do not need a handyman. You need someone standing at the property on a schedule, with photographs to prove they were there.',
        cta: 'See how we watch empty property',
      },
      {
        href: '/for/short-term-rentals',
        title: 'Short-term rentals',
        body: 'Maintenance scheduled around your booking calendar, and the small things caught before a guest photographs them into a review.',
        cta: 'See how we work around bookings',
      },
    ],
    plans: 'Property Care plans',
    plansLead:
      'A fixed monthly amount instead of a repair bill you cannot predict. Cancel with thirty days notice.',
    seeWhatsIncluded: 'See what’s included',
    weDoNotPerform: 'We do not perform',
    whatWeDoInstead: 'What we do instead',
    routedSuffix:
      '— we identify it, photograph it, and hand it to a licensed partner whose license and insurance we have checked.',
    howWeVet: 'How we vet a partner contractor',
    sampleReport: 'See a real report',
    sampleReportLead:
      'An anonymized report from a real visit. No form, no email address — read it and decide for yourself whether it is worth paying for.',
    sampleChips: ['Fifteen inspection areas', 'Dated photographs', 'Severity on every finding'],
    viewSample: 'See a sample report',
    questions: 'Questions people actually ask',
  },

  hero: {
    forPortfolio: 'For properties I manage',
    forPortfolioSub: 'Portfolio pricing and response times',
    forHome: 'For my home',
    forHomeSub: 'Get a written price',
  },

  plansUi: {
    mostChosen: 'Most chosen',
    perMonth: '/month',
    startWith: 'Start with',
    effectivePrefix: 'Pricing effective',
    effectiveSuffix: '. Month to month, cancel with thirty days notice. Reviewed quarterly.',
  },

  servicesPage: {
    metaTitle: 'Services — eight divisions, four running today',
    metaDescription:
      'Property Care, Field Inspections, Home Repair and Exterior Care are live across Elgin and Central Texas. Turn Services, Emergency Response, Asset Care and Trade Coordination are later phases.',
    h1: 'Eight services. Four are running today.',
    lead: 'We would rather tell you what is not ready than take a booking we cannot keep. Everything below marked as a later phase is exactly that — you can still ask, and we will tell you honestly when it will be real.',
    runningNow: 'Running now',
    runningNowLead: 'Live today, with published pricing on every page.',
    laterPhases: 'Later phases',
    laterPhasesLead:
      'Not running yet. Each page says what it will be and when — no aspirational copy pretending otherwise.',
    breadcrumbServices: 'Services',
  },

  plansPage: {
    metaTitle: 'Property Care plans — $49, $89 and $149 a month',
    metaDescription:
      'Recurring property maintenance on a plan: quarterly or monthly inspections, filter service, detector testing and a photo report every visit. Month to month, no long-term contract. Elgin and Central Texas.',
    h1: 'A maintenance budget you can actually predict.',
    lead: 'A technician on a fixed schedule, the same checks every visit, and a dated photo report afterwards. Month to month, cancel with thirty days notice, and every price on this page carries the date it took effect.',
    fifteenAreas: 'The fifteen inspection areas',
    fifteenAreasLead:
      'This is what a quarterly inspection actually covers. Specificity is the difference between a real product and a vague retainer — and it is the list your technician works from, not marketing copy.',
    observationLabel: 'Observation vs. repair',
    observationBody:
      'Areas marked “observation only” mean exactly that: we look, test what is safe to test, photograph what we find and write it down. We do not open a panel or a supply line. When something in those areas needs work, we price it and hand it to a licensed partner contractor — and you get the photographs either way.',
    whereMoneyGoes: 'Where the money actually goes',
    whereMoneyGoesLead:
      'Four categories where a plan is defensibly worth more than it costs. No percentages, because nobody can honestly promise you one.',
    questions: 'Questions about plans',
    notSure: 'Not sure which tier fits?',
    describeProperty: 'Describe the property',
    notSureTail:
      'and we will tell you which one we would put it on — including telling you when the cheapest one is the right answer.',
    breadcrumbHome: 'Home',
    breadcrumbPlans: 'Plans',
  },

  portfolio: {
    heading: 'Managing more than five properties?',
    body: 'Portfolio pricing is based on how many properties you manage, not on a plan tier. Coverage, visit schedule and response times are set against your actual portfolio rather than a tier.',
    cta: 'Portfolio pricing — based on how many properties. Ask us.',
  },

  cta: {
    portfolio: {
      eyebrow: 'For portfolios',
      heading: 'Start with three properties, free.',
      body: 'We inspect three of your properties at no cost and send you the same reports your owners would get. No contract. If they are not useful, you have lost nothing.',
      primary: 'Book the free audit',
    },
    single: {
      eyebrow: 'For your property',
      heading: 'Tell us what needs doing.',
      body: 'A short form, a reply within one business day, and a written price before anyone turns up.',
      primary: 'Request service',
    },
    altToPortfolio: {
      question: 'Managing more than one property?',
      label: 'Book a free three-property audit',
    },
    altToSingle: { question: 'Just the one property?', label: 'Request service' },
  },
};

export const uiEs: Ui = {
  skipToContent: 'Saltar al contenido',
  closed: 'Cerrado',

  nav: {
    services: 'Servicios',
    plans: 'Planes',
    propertyManagers: 'Administradores',
    sampleReport: 'Informe de ejemplo',
    serviceArea: 'Zona de servicio',
    about: 'Quiénes somos',
    requestService: 'Solicitar servicio',
    callNow: 'Llamar ahora',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    language: 'Idioma',
  },

  footer: {
    services: 'Servicios',
    allServices: 'Todos los servicios',
    plansLink: 'Planes de Cuidado de Propiedades',
    whoWeWorkFor: 'Para quién trabajamos',
    sampleReport: 'Informe de ejemplo',
    about: 'Quiénes somos',
    serviceArea: 'Zona de servicio',
    disclosureLink: 'Cómo funciona nuestro modelo de contratistas con licencia',
    rights: 'Todos los derechos reservados.',
    audiences: {
      propertyManagers: 'Administradores de propiedades',
      investors: 'Inversionistas y dueños ausentes',
      shortTermRentals: 'Rentas de corto plazo',
    },
    legal: {
      licensedPartners: 'Contratistas con licencia',
      terms: 'Términos',
      privacy: 'Privacidad',
    },
  },


  home: {
    metaTitle: 'Mantenimiento de propiedades y servicios de campo — Elgin y Texas Central',
    metaDescription:
      'Planes de mantenimiento recurrente, inspecciones documentadas y reparación general para administradores de propiedades, inversionistas y dueños de casa en Elgin, Bastrop, Manor, Taylor y Pflugerville.',
    h1: 'Alguien que cuida la propiedad cuando usted no puede.',
    lead: 'Mantenimiento en un horario fijo y un registro fotográfico con fecha después de cada visita. Para dueños de casa y para quienes administran propiedades en Elgin y Texas Central.',
    recordLabel: 'Lo que recibe después de cada visita',
    exampleRecord: 'Este es un registro de ejemplo.',
    downloadReal: 'Baje uno real',
    noEmailNeeded: '— no hace falta dar su correo.',
    whatWeDo: 'Lo que hacemos',
    whatWeDoLead: 'Hoy funcionan cuatro servicios. Le decimos con claridad cuáles todavía no.',
    comingLater: 'Más adelante:',
    seeAllServices: 'Ver todos los servicios',
    whoWeWorkFor: 'Para quién trabajamos',
    whoWeWorkForLead: 'Ya sea una casa o un portafolio completo.',
    alsoWorking: 'También trabajamos con agentes de bienes raíces, asociaciones de vecinos y propiedad comercial.',
    tellUsWhatYouManage: 'Cuéntenos qué administra',
    audiences: [
      {
        href: '/for/property-managers',
        title: 'Administradores de propiedades',
        body: 'Una sola empresa para mantenimiento, inspecciones y entregas, con tiempos de respuesta por escrito y un informe de cada unidad. Empiece con tres propiedades gratis.',
        cta: 'Ver tiempos de respuesta y precios',
      },
      {
        href: '/for/investors',
        title: 'Inversionistas y dueños ausentes',
        body: 'No necesita un handyman. Necesita a alguien parado en la propiedad en un horario fijo, con fotografías que comprueben que estuvo ahí.',
        cta: 'Ver cómo cuidamos una propiedad vacía',
      },
      {
        href: '/for/short-term-rentals',
        title: 'Rentas de corto plazo',
        body: 'Mantenimiento agendado alrededor de su calendario de reservaciones, y los detalles pequeños atendidos antes de que un huésped los fotografíe en una reseña.',
        cta: 'Ver cómo trabajamos entre reservaciones',
      },
    ],
    plans: 'Planes de Cuidado de Propiedades',
    plansLead:
      'Una cantidad fija al mes en lugar de una cuenta de reparación que no puede predecir. Cancele avisando con treinta días.',
    seeWhatsIncluded: 'Ver qué incluye',
    weDoNotPerform: 'Lo que no hacemos',
    whatWeDoInstead: 'Lo que hacemos en su lugar',
    routedSuffix:
      '— lo identificamos, lo fotografiamos y se lo entregamos a un contratista asociado cuya licencia y seguro ya verificamos.',
    howWeVet: 'Cómo verificamos a un contratista asociado',
    sampleReport: 'Vea un informe real',
    sampleReportLead:
      'Un informe de una visita real, sin datos personales. Sin formulario y sin correo — léalo y decida usted mismo si vale la pena pagarlo.',
    sampleChips: ['Quince áreas de inspección', 'Fotografías con fecha', 'Gravedad en cada hallazgo'],
    viewSample: 'Ver un informe de ejemplo',
    questions: 'Preguntas que la gente de verdad hace',
  },

  hero: {
    forPortfolio: 'Para propiedades que administro',
    forPortfolioSub: 'Precios de portafolio y tiempos de respuesta',
    forHome: 'Para mi casa',
    forHomeSub: 'Obtener un precio por escrito',
  },

  plansUi: {
    mostChosen: 'El más elegido',
    perMonth: '/mes',
    startWith: 'Empiece con',
    effectivePrefix: 'Precios vigentes desde',
    effectiveSuffix: '. Mes a mes, cancele avisando con treinta días. Revisados cada trimestre.',
  },

  servicesPage: {
    metaTitle: 'Servicios — ocho áreas, cuatro funcionando hoy',
    metaDescription:
      'Cuidado de Propiedades, Inspecciones de Campo, Reparaciones del Hogar y Cuidado Exterior ya funcionan en Elgin y Texas Central. Servicios de Entrega, Respuesta de Emergencia, Cuidado de Equipos y Coordinación de Oficios vienen más adelante.',
    h1: 'Ocho servicios. Cuatro ya funcionan hoy.',
    lead: 'Preferimos decirle qué no está listo a aceptar un trabajo que no podemos cumplir. Todo lo que aparece abajo marcado para más adelante es exactamente eso — igual puede preguntar, y le diremos con honestidad cuándo será real.',
    runningNow: 'Funcionando hoy',
    runningNowLead: 'Ya disponibles, con precios publicados en cada página.',
    laterPhases: 'Más adelante',
    laterPhasesLead:
      'Todavía no funcionan. Cada página dice qué será y cuándo — sin texto que finja lo contrario.',
    breadcrumbServices: 'Servicios',
  },

  plansPage: {
    metaTitle: 'Planes de Cuidado de Propiedades — $49, $89 y $149 al mes',
    metaDescription:
      'Mantenimiento recurrente con plan: inspecciones trimestrales o mensuales, servicio de filtros, prueba de detectores y un informe con fotos en cada visita. Mes a mes, sin contrato de largo plazo. Elgin y Texas Central.',
    h1: 'Un presupuesto de mantenimiento que sí puede predecir.',
    lead: 'Un técnico en un horario fijo, las mismas revisiones en cada visita y un informe con fotos y fecha después. Mes a mes, cancele avisando con treinta días, y cada precio de esta página trae la fecha en que entró en vigor.',
    fifteenAreas: 'Las quince áreas de inspección',
    fifteenAreasLead:
      'Esto es lo que cubre de verdad una inspección trimestral. El detalle es la diferencia entre un producto real y una iguala vaga — y es la lista con la que trabaja su técnico, no texto publicitario.',
    observationLabel: 'Observación y reparación no son lo mismo',
    observationBody:
      'Las áreas marcadas como «solo observación» son exactamente eso: vemos, probamos lo que se puede probar con seguridad, fotografiamos lo que encontramos y lo anotamos. No abrimos un panel ni una línea de agua. Cuando algo de esas áreas necesita trabajo, lo cotizamos y se lo entregamos a un contratista asociado con licencia — y usted recibe las fotografías de todos modos.',
    whereMoneyGoes: 'A dónde se va el dinero en realidad',
    whereMoneyGoesLead:
      'Cuatro categorías donde un plan vale de forma demostrable más de lo que cuesta. Sin porcentajes, porque nadie puede prometerle uno con honestidad.',
    questions: 'Preguntas sobre los planes',
    notSure: '¿No sabe cuál nivel le conviene?',
    describeProperty: 'Describa la propiedad',
    notSureTail:
      'y le decimos en cuál la pondríamos nosotros — incluso si la respuesta correcta es el más barato.',
    breadcrumbHome: 'Inicio',
    breadcrumbPlans: 'Planes',
  },

  portfolio: {
    heading: '¿Administra más de cinco propiedades?',
    body: 'El precio de portafolio se calcula según cuántas propiedades administra, no por nivel de plan. La cobertura, la frecuencia de visitas y los tiempos de respuesta se ajustan a su portafolio real y no a un nivel fijo.',
    cta: 'Precio de portafolio — según cuántas propiedades. Pregúntenos.',
  },

  cta: {
    portfolio: {
      eyebrow: 'Para portafolios',
      heading: 'Empiece con tres propiedades, gratis.',
      body: 'Inspeccionamos tres de sus propiedades sin costo y le enviamos los mismos informes que recibirían sus dueños. Sin contrato. Si no le sirven, no ha perdido nada.',
      primary: 'Agendar la inspección gratis',
    },
    single: {
      eyebrow: 'Para su propiedad',
      heading: 'Cuéntenos qué necesita.',
      body: 'Un formulario corto, una respuesta en un día hábil y un precio por escrito antes de que alguien se presente.',
      primary: 'Solicitar servicio',
    },
    altToPortfolio: {
      question: '¿Administra más de una propiedad?',
      label: 'Agende una inspección gratis de tres propiedades',
    },
    altToSingle: { question: '¿Solo una propiedad?', label: 'Solicitar servicio' },
  },
};

const DICTIONARIES: Record<Locale, Ui> = { en: uiEn, es: uiEs };

export function ui(locale: Locale): Ui {
  return DICTIONARIES[locale];
}
