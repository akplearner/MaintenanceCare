/**
 * Spanish copy, keyed by the English object's id.
 *
 * Written rather than machine-translated: the register is the same plain,
 * direct Spanish a customer in Elgin would use, not a literal rendering of the
 * English. Anything absent here falls back to English.
 *
 * Note what is deliberately *not* said. Describing licensed trade work as our
 * own service is banned in Spanish exactly as it is in English — see
 * scripts/compliance-check.ts — so the wording here stays on inspection,
 * documentation, coordination and dispatch.
 */
import type { ContentCopy } from './types';

export const es: ContentCopy = {
  divisions: {
    'property-care': {
      name: 'Cuidado de Propiedades',
      promise: 'Mantenimiento preventivo recurrente, documentado en cada visita.',
      summary:
        'Un técnico visita en un horario fijo, hace las mismas revisiones cada vez y deja un registro fotográfico con fecha. Esto convierte un presupuesto de reparaciones impredecible en una cantidad fija al mes.',
      included: [
        'Visitas en un horario fijo — usted sabe la fecha con anticipación',
        'La misma lista de revisión cada visita, para poder comparar los hallazgos con el tiempo',
        'Cambio de filtros de HVAC, con la medida correcta anotada',
        'Prueba de detectores de humo y de monóxido de carbono, con la fecha de las baterías',
        'Recorrido exterior con fotografías de todo lo que cambie',
        'Ajustes menores resueltos en el momento, sin cargo adicional por la visita',
        'Informe escrito con fotos, enviado por correo dentro de 24 horas',
        'Envío de un contratista asociado con licencia cuando un hallazgo lo requiere',
      ],
      imageAlt:
        'Técnico anotando la medida del filtro de HVAC en una hoja de mantenimiento dentro de un cuarto de servicio',
    },
    'field-inspections': {
      name: 'Inspecciones de Campo',
      promise: 'Alguien parado físicamente en su propiedad, con las fotos que lo comprueban.',
      summary:
        'Revisiones de propiedades ocupadas, vacías y después de una tormenta, con registro fechado. Hecho para dueños que no viven en el condado, para prestamistas que necesitan evidencia del estado de la propiedad, y para administradores que necesitan responder «¿cuándo estuvo alguien ahí por última vez?» en un clic.',
      included: [
        'Recorrido interior y exterior siguiendo una lista escrita',
        'Fotografías con fecha y ubicación de cada condición encontrada',
        'Revisión de filtraciones de agua, evidencia de plagas y vandalismo en propiedades vacías',
        'Lectura de medidores y servicios donde haya acceso',
        'Revisión de riesgo de congelamiento en temporada',
        'Informe escrito el mismo día, con la gravedad anotada en cada hallazgo',
        'Llamada dentro de la hora si algo es urgente',
      ],
      imageAlt:
        'Fotografía de inspección exterior de una casa desocupada, con la fecha marcada en la esquina',
    },
    'turn-services': {
      name: 'Servicios de Entrega',
      promise: 'Preparación de unidades entre inquilinos, en un calendario documentado.',
      summary:
        'Coordinación de la preparación entre inquilinos — limpieza, retoque de pintura, lista de pendientes y el registro del estado que resuelve las disputas por el depósito.',
      imageAlt: 'Unidad de renta vacía, lista para un nuevo inquilino',
    },
    'home-repair': {
      name: 'Reparaciones del Hogar',
      promise: 'Trabajo de mantenimiento a precio fijo, no a una tarifa por hora sin final.',
      summary:
        'Tablaroca, pintura, puertas, cercas, accesorios y listas de pendientes. La mayoría de los trabajos comunes tienen un precio fijo publicado en esta página, porque un precio con nombre es lo que el cliente de verdad quiere y lo que casi nadie más le da.',
      included: [
        'Un precio fijo para los trabajos que hacemos más seguido — el menú completo está en esta página',
        'Trabajo por hora cotizado por adelantado, con un tope que no se pasa',
        'Materiales desglosados por separado, nunca con un sobreprecio escondido',
        'Fotografías de antes y después en cada trabajo',
        'Listas de pendientes cotizadas en bloque, no por pieza',
        'Lo que requiera licencia de oficio se identifica y se canaliza, no se intenta',
      ],
      imageAlt: 'Reparación de tablaroca resanada y lijada en un pasillo, lista para pintar',
    },
    'exterior-care': {
      name: 'Cuidado Exterior',
      promise:
        'Jardín, canaletas, lavado a presión y acarreo de escombro, en un calendario que usted no tiene que perseguir.',
      summary:
        'La mitad visible del estado de una propiedad. Servicio de jardinería recurrente, limpieza de canaletas antes de la temporada de tormentas, lavado a presión y retiro de escombro — el trabajo que decide lo que ve un prestamista, un comprador o un inspector municipal al pasar por enfrente.',
      included: [
        'Servicio recurrente o de una sola vez, usted decide',
        'El escombro se lo llevan, no se queda embolsado en la banqueta',
        'Fotografías de antes y después en cada visita',
        'Se verifica que las canaletas y bajadas corran, no solo que estén limpias',
        'Prueba en un área pequeña antes del lavado a presión completo',
        'Los costos de tiradero se dicen por adelantado en los acarreos',
      ],
      imageAlt: 'Canaleta despejada, fotografiada desde una escalera después de retirar el escombro',
    },
    'emergency-response': {
      name: 'Respuesta de Emergencia',
      promise: 'Respuesta fuera de horario cuando una propiedad no puede esperar al lunes.',
      summary:
        'Respuesta de guardia ante filtraciones de agua, daños por tormenta, allanamientos y congelamientos — dejarlo seguro, documentarlo y poner en marcha al oficio con licencia que corresponda.',
      imageAlt: 'Daño por agua documentado en un piso laminado durante una llamada fuera de horario',
    },
    'asset-care': {
      name: 'Cuidado de Equipos',
      promise: 'Sepa cuánta vida le queda a cada sistema importante antes de que falle.',
      summary:
        'Edad, estado y pronóstico de reemplazo de techos, calentadores de agua, sistemas de HVAC y electrodomésticos grandes en todo un portafolio, para que planear el gasto deje de ser una sorpresa.',
      imageAlt:
        'Placa de datos de un calentador de agua, fotografiada para registrar el modelo y la fecha de instalación',
    },
    'trade-coordination': {
      name: 'Coordinación de Oficios',
      promise: 'Un solo número al cual llamar, y nosotros manejamos a los contratistas con licencia.',
      summary:
        'Cotización, envío, acceso, verificación y cierre del trabajo de oficios con licencia que realizan nuestros contratistas asociados. Ya está disponible dentro de nuestros otros servicios; como servicio independiente viene en una etapa posterior.',
      imageAlt: 'Hoja de orden de trabajo en una tabla, junto a la camioneta de un contratista',
    },
  },

  plans: {
    essential: {
      name: 'Esencial',
      cadence: 'Revisión exterior trimestral',
      bestFor: 'Una segunda casa o una sola renta que casi nunca ve en persona.',
      includes: [
        'Revisión exterior de la propiedad cada trimestre',
        'Registro fotográfico con fecha de cada visita',
        'Prioridad para agendar, por delante de quien no tiene plan',
        'Tarifa con descuento en la visita de servicio de cualquier reparación',
        'Historial de mantenimiento guardado para la propiedad',
      ],
    },
    standard: {
      name: 'Estándar',
      cadence: 'Inspección completa trimestral',
      bestFor: 'El plan en el que debería estar la mayoría de los dueños y arrendadores de una propiedad.',
      includes: [
        'Inspección completa cada trimestre — interior y exterior',
        'Cambio de filtro de HVAC en cada visita',
        'Prueba de detectores de humo y de monóxido de carbono, con la fecha de las baterías',
        'Inspección exterior con fotografías de todo lo que cambie',
        'Ajustes menores resueltos en el momento, sin cargo adicional por la visita',
        'Informe escrito con fotos, enviado por correo dentro de 24 horas',
        'Prioridad para agendar y tarifa con descuento en la visita de servicio',
        'Envío y coordinación de un contratista asociado con licencia cuando se necesita',
      ],
    },
    premium: {
      name: 'Premium',
      cadence: 'Exterior mensual, interior trimestral',
      bestFor: 'Dueños ausentes, rentas de corto plazo y todo lo que usted no puede revisar por su cuenta.',
      includes: [
        'Revisiones exteriores cada mes — doce visitas documentadas al año',
        'Inspección interior completa cada trimestre',
        'Servicio de filtro de HVAC en cada visita',
        'Prueba de detectores y cambio de baterías',
        'Respuesta prioritaria por delante de cualquier otra programación',
        'Crédito anual para limpieza de canaletas o lavado a presión',
        'Informe completo de mantenimiento con el historial del estado año con año',
        'Una persona asignada como contacto para la propiedad',
      ],
    },
  },

  inspectionAreas: [
    { area: 'Techo y drenaje', detail: 'Daño visible, canaletas vencidas, bajadas tapadas y agua estancada junto a los cimientos.' },
    { area: 'Exterior de la casa', detail: 'Recubrimiento, molduras, aleros y sellos — cualquier cosa que deje entrar el clima o las plagas.' },
    { area: 'Cimientos y nivelación', detail: 'Grietas visibles, separaciones, y si el terreno todavía tiene la caída necesaria para alejar el agua de la casa.' },
    { area: 'Ventanas y puertas', detail: 'Funcionamiento, chapas, sellos contra el clima, vidrios y estado de los mosquiteros.' },
    { area: 'Filtro y flujo de aire del HVAC', detail: 'Filtro cambiado y medida anotada, revisión del retorno de aire, ajustes y baterías del termostato.' },
    { area: 'Calentador de agua', detail: 'Edad y modelo según la placa de datos, corrosión, charola y conexiones visibles.' },
    { area: 'Instalaciones de agua visibles', detail: 'Solo observación — goteos, manchas y llaves que siguen corriendo se anotan y se pasan a un plomero con licencia.' },
    { area: 'Panel eléctrico y contactos', detail: 'Solo observación — etiquetado del panel, daño visible y prueba de GFCI en zonas húmedas.' },
    { area: 'Detectores de humo y de CO', detail: 'Se prueba cada unidad, se fecha la batería y se marcan por cuarto los detectores vencidos.' },
    { area: 'Techos interiores, muros y pisos', detail: 'Manchas nuevas, grietas, partes blandas y cualquier cosa que se haya movido desde la última visita.' },
    { area: 'Cocina y baños', detail: 'Estado de gabinetes y cubiertas, sellador y lechada, y revisión de humedad debajo de los lavabos.' },
    { area: 'Funcionamiento de electrodomésticos', detail: 'Cada aparato instalado se enciende un momento y se observa.' },
    { area: 'Acceso a ático y cimentación', detail: 'Donde se pueda entrar con seguridad — aislamiento, humedad, entradas de luz y evidencia de plagas.' },
    { area: 'Cochera y construcciones exteriores', detail: 'Funcionamiento de la puerta y su reversa de seguridad, bodegas, cercas y portones.' },
    { area: 'Evidencia de plagas y fauna', detail: 'Observación y documentación, y después coordinación con un operador con licencia.' },
  ],

  faqs: {
    'what-is-property-care': {
      question: '¿Qué es un plan de Cuidado de Propiedades, en palabras simples?',
      answer:
        'Un técnico visita su propiedad en un horario fijo, hace la misma lista de revisión cada vez, arregla las cosas pequeñas en el momento y le manda un informe con fotos y fecha. Usted paga una cantidad fija al mes en lugar de adivinar un presupuesto de reparaciones. No se le incluye nada que usted no haya aceptado, y no hay contrato de largo plazo.',
    },
    'licensed-trades': {
      question: '¿Hacen trabajo de plomería, electricidad o HVAC?',
      answer:
        'No, y no vamos a fingir lo contrario. En Texas esos son oficios que requieren licencia. Lo que hacemos es identificar el problema, fotografiarlo, cotizarlo bien y mandar a un contratista asociado con licencia cuya licencia y seguro ya verificamos — después manejamos el acceso y le damos seguimiento hasta que el trabajo queda terminado y documentado. Usted tiene un solo contacto en lugar de cuatro llamadas.',
    },
    'contract-length': {
      question: '¿Quedo amarrado a un contrato?',
      answer:
        'No. Los planes son mes a mes y puede cancelar avisando con treinta días. Los acuerdos de portafolio se negocian por separado y normalmente son anuales, porque ese precio solo funciona si el número de propiedades se mantiene estable.',
    },
    insurance: {
      question: '¿Están asegurados?',
      answer:
        'Sí. El certificado de seguro está disponible cuando lo pida, y se lo mandamos a su área de cumplimiento antes de la primera visita sin que tenga que pedirlo dos veces. Si su contrato de administración exige que lo nombren como asegurado adicional, díganos y lo arreglamos.',
    },
    'response-time': {
      question: '¿Qué tan rápido responden?',
      answer:
        'Respondemos a cada solicitud dentro de un día hábil. El trabajo programado se agenda con una fecha exacta, no con una ventana de horas. Los tiempos de respuesta para clientes de portafolio quedan por escrito en el acuerdo — vea la tabla en la página de administradores de propiedades.',
    },
    access: {
      question: '¿Cómo entran a la propiedad?',
      answer:
        'Coordinamos la entrada con quien usted nos diga — usted, un inquilino, un administrador en sitio, o el sistema de caja de llaves que ya usa. A propósito no pedimos códigos de portón, de caja de llaves ni de alarma por este sitio. Esa información va en un sistema con control de acceso, no en un formulario de internet ni en un correo.',
    },
    reports: {
      question: '¿Cómo es el informe por dentro?',
      answer:
        'Una orden de trabajo con fecha, la dirección de la propiedad, cada área de la lista con su resultado, fotografías de todo lo que se anotó y un resumen en palabras simples de qué necesita atención y qué no. Puede bajar uno real y sin datos personales desde la página del informe de ejemplo — no le pedimos su correo.',
    },
    'older-homes': {
      question: '¿Por qué preguntan en qué año se construyó la propiedad?',
      answer:
        'Porque la regla federal de Renovación, Reparación y Pintura puede exigir la certificación Lead-Safe para cierto trabajo en viviendas construidas antes de 1978, y nosotros condicionamos la programación de pintura y demolición a eso. Preguntarlo desde el principio es como evitamos mandar a un técnico a un trabajo que no tenemos permitido empezar.',
    },
    vacant: {
      question: '¿Qué pasa si encuentran algo mal en una propiedad vacía?',
      answer:
        'Si es urgente, recibe una llamada dentro de la hora, no un correo que lee hasta el lunes. Lo fotografiamos, lo dejamos seguro si se puede, y le decimos qué se necesita para arreglarlo y más o menos cuánto cuesta. Si requiere un oficio con licencia, ya contactamos al socio antes de que usted nos regrese la llamada.',
    },
    'portfolio-pricing': {
      question: '¿Cómo funciona el precio por portafolio?',
      answer:
        'Según cuántas propiedades administra, no por nivel de plan, porque cuarenta unidades no necesitan todas la misma frecuencia de visita. Vemos su mezcla real — ocupadas, vacías, en cambio de inquilino — y ponemos el precio contra eso. Empiece con la inspección gratis de tres propiedades y cotizamos con lo que de verdad encontremos.',
    },
    'service-area': {
      question: '¿Cubren mi zona?',
      answer:
        'Trabajamos en Elgin, Bastrop, Manor, Taylor y Pflugerville, más o menos un radio de treinta y cinco millas desde Elgin. Fuera de ahí igual hablamos con usted, pero le vamos a decir con honestidad si el tiempo de camino hace que valga la pena o no.',
    },
    'str-turnovers': {
      question: '¿Pueden encargarse de la entrega entre huéspedes?',
      answer:
        'Hoy hacemos mantenimiento, inspecciones, reparaciones y cuidado exterior para rentas de corto plazo, y nos acomodamos a su calendario de reservaciones. La coordinación completa de entrega y preparación todavía no está funcionando — preferimos decírselo a aceptar la reservación y quedarle mal a un huésped.',
    },
    emergency: {
      question: '¿Dan respuesta de emergencia fuera de horario?',
      answer:
        'Todavía no — una guardia las veinticuatro horas es algo que vamos a agregar después, y no lo vamos a prometer antes de poder cumplirlo. Los clientes con plan tienen respuesta prioritaria en horario de oficina, y si encontramos algo urgente durante una visita le llamamos de inmediato.',
    },
    'pricing-changes': {
      question: '¿Por qué cada precio en este sitio trae una fecha?',
      answer:
        'Porque revisamos nuestros precios contra los del mercado local cada trimestre, y un precio sin fecha es un precio en el que no se puede confiar. Si una cifra aquí ya quedó vieja, la fecha se lo dice antes de que llame.',
    },
  },

  credentials: {
    insurance: {
      label: 'Asegurados',
      detail:
        'Contamos con seguro de responsabilidad civil y le enviamos el certificado cuando lo pida, antes de la primera visita.',
    },
    'background-checked': {
      label: 'Técnicos con antecedentes verificados',
      detail: 'A todo técnico que entra a una propiedad se le revisan los antecedentes.',
    },
    'written-price': {
      label: 'Precio por escrito primero',
      detail:
        'Usted aprueba un precio por escrito antes de que empiece cualquier trabajo. Ninguna factura llega de sorpresa.',
    },
    'verified-partners': {
      label: 'Licencias de socios verificadas',
      detail:
        'Cuando un trabajo requiere un oficio con licencia, verificamos la licencia estatal y el seguro de ese socio antes de enviarlo.',
    },
  },
};
