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

  services: {
    'property-care-essential': { name: 'Cuidado de Propiedades — Esencial', description: 'Revisión exterior trimestral con registro fotográfico, prioridad para agendar y tarifa con descuento en la visita de servicio.' },
    'property-care-standard': { name: 'Cuidado de Propiedades — Estándar', description: 'Inspección completa trimestral con servicio de filtros, prueba de detectores, ajustes menores e informe con fotos.' },
    'property-care-premium': { name: 'Cuidado de Propiedades — Premium', description: 'Revisiones exteriores mensuales, inspección interior trimestral, respuesta prioritaria y un crédito anual para canaletas o lavado a presión.' },
    'hvac-filter-service': {
      name: 'Servicio de filtros de HVAC',
      description: 'Cambio de filtro con la medida anotada en el expediente de la propiedad, más revisión del retorno de aire y del termostato. Es parte de nuestro programa de filtros; la reparación del sistema la hace un contratista con licencia.',
      includes: [
        'Medida correcta del filtro anotada en el expediente de la propiedad',
        'Revisión del retorno de aire y de las rejillas',
        'Revisión del ajuste y de las baterías del termostato',
        'Fotografía del filtro instalado, con fecha',
      ],
      pricingNote: 'Más el costo del filtro',
    },
    'smoke-co-check': {
      name: 'Revisión de detectores de humo y CO',
      description: 'Se prueba cada detector, se fechan las baterías y se reportan los que faltan o ya vencieron. Texas exige detectores de humo funcionando en propiedades de renta; este es el registro que comprueba que cumplió.',
      includes: [
        'Prueba del botón y, donde aplique, verificación de entrada de humo en cada unidad',
        'Cambio de batería con la fecha de instalación escrita en la unidad',
        'Revisión de la fecha de fabricación — los detectores vencen a los diez años',
        'Lista escrita, por cuarto, de los que faltan o están vencidos',
      ],
      pricingNote: 'Más los dispositivos',
    },
    'water-heater-flush-observation': { name: 'Observación y registro del calentador de agua', description: 'Edad, modelo, capacidad y estado visible anotados con una fotografía de la placa de datos, más revisión de corrosión y charola. Cualquier reparación se pasa a un plomero con licencia.' },
    'seasonal-checklist': { name: 'Visita de preparación por temporada', description: 'Preparación para el frío en otoño y para la temporada de calor en primavera. Llaves de manguera, tuberías expuestas, acceso al ático, sellos contra el clima y drenaje.' },
    'health-check-basic': {
      name: 'Revisión de Estado — Básica',
      description: 'Recorrido exterior y observación de los puntos clave del interior, con resumen fotográfico. La forma más rápida de responder «¿en qué estado está ahorita?».',
      includes: [
        'Recorrido completo del perímetro exterior',
        'Observación del techo y el drenaje desde el piso',
        'Revisión de entradas, ventanas y chapas',
        '10 a 15 fotografías con fecha',
        'Resumen de una página enviado el mismo día',
      ],
    },
    'health-check-standard': {
      name: 'Revisión de Estado — Estándar',
      description: 'Inspección interior y exterior siguiendo nuestra lista de quince áreas, con fotografías en cada hallazgo.',
      includes: [
        'Todo lo de la revisión Básica',
        'Recorrido interior cuarto por cuarto',
        'Observación de fugas visibles, manchas y humedad',
        'Verificación de detectores y dispositivos de seguridad',
        'Observación del funcionamiento de electrodomésticos',
        '25 a 40 fotografías con fecha',
      ],
    },
    'health-check-detailed': {
      name: 'Revisión de Estado — Informe detallado',
      description: 'La inspección completa más un informe escrito del estado, con nivel de gravedad, acciones recomendadas e inventario de equipos. Hecho para reenviarse a un dueño, un prestamista o una aseguradora.',
      includes: [
        'Todo lo de la revisión Estándar',
        'Nivel de gravedad en cada hallazgo',
        'Inventario de sistemas importantes con su edad donde se alcanza a leer la placa de datos',
        'Qué recomendamos hacer al respecto, y más o menos cuánto cuesta',
        'PDF con formato, listo para reenviarse a un dueño o a un prestamista',
      ],
    },
    'vacant-watch-biweekly': {
      name: 'Vacant Property Watch — cada dos semanas',
      description: 'Una visita documentada cada dos semanas. Filtraciones de agua, evidencia de plagas, entradas forzadas, jardín y acumulación de correo.',
      includes: [
        'Dos visitas documentadas al mes',
        'Recorrido interior y exterior en cada visita',
        'Revisión de filtraciones y de riesgo de congelamiento',
        'Revisión de entrada forzada, vandalismo y ocupación indebida',
        'Se retira el correo, la publicidad y los avisos acumulados',
        'Informe con fotos el mismo día de cada visita',
        'Llamada dentro de la hora si algo es urgente',
      ],
    },
    'vacant-watch-weekly': {
      name: 'Vacant Property Watch — semanal',
      description: 'Una visita documentada cada semana. Es la frecuencia que la mayoría de las aseguradoras y los prestamistas quieren ver en una propiedad vacía.',
      includes: [
        'Cuatro visitas documentadas al mes',
        'Todo lo del programa de cada dos semanas',
        'Registro fotográfico semanal, apto para un expediente de seguro',
        'Prioridad para agendar cualquier trabajo que se derive',
      ],
    },
    'storm-check': { name: 'Revisión después de una tormenta', description: 'Se envía después de un evento climático con nombre. Documentación de daños exteriores, revisión de filtraciones y un juego de fotos con fecha para el expediente del reclamo.' },
    'move-in-condition-report': { name: 'Informe de estado de entrada y salida', description: 'Registro fotográfico del estado, cuarto por cuarto, al momento de la entrega. El documento que resuelve una disputa por el depósito antes de que se vuelva una.' },
    'handyman-call-minimum': { name: 'Mínimo por visita de servicio', description: 'Cubre el viaje y el primer bloque de trabajo. Se aplica una vez por visita, no por tarea — junte varios trabajos chicos en una sola visita.' },
    'handyman-hourly': { name: 'Tarifa por hora, después del mínimo', description: 'Para trabajo que no tiene precio fijo. Se cotiza por adelantado con un tope que no se pasa, para que una tarifa por hora nunca se vuelva un cheque en blanco.' },
    'door-adjustment': { name: 'Ajuste o alineación de puerta', description: 'Puerta que se atora, raspa o está desalineada: se vuelve a colgar y ajustar, y se reubica el contrachapa.' },
    'drywall-patch-small': { name: 'Resane de tablaroca — chico (hasta 1 pie²)', description: 'Se corta, resana, encinta, aplana y lija, listo para pintar. Se iguala la textura donde se puede.' },
    'drywall-patch-large': { name: 'Resane de tablaroca — grande (hasta 4 pies²)', description: 'Abertura más grande resanada con respaldo, encintada, aplanada y lijada.' },
    'interior-door-install': { name: 'Instalación de puerta interior premontada', description: 'Se retira la pieza vieja, se coloca la puerta premontada, se calza, se cuelga y se instala la herrería.', pricingNote: 'La puerta la pone usted o se cotiza por separado' },
    'blind-install': { name: 'Instalación de persiana — por ventana', description: 'Soportes a nivel, pieza colgada y funcionamiento probado.' },
    'shelving-install': { name: 'Instalación de repisas — por tramo', description: 'Repisas de pared o de clóset fijadas a los postes o con anclas adecuadas, y niveladas.' },
    'tv-mount': { name: 'Montaje de televisión — hasta 65 pulgadas', description: 'Soporte fijado a los postes, pantalla colgada y cables acomodados. Ocultar el cableado se cotiza por separado.' },
    'caulk-reseal-bath': { name: 'Sellado de tina o regadera', description: 'Se retira el sellador viejo, se limpia y seca la superficie, y se aplica sellador nuevo resistente al moho.' },
    'weatherstrip-door': { name: 'Burlete y guardapolvo de puerta exterior', description: 'Se cambia el sello del perímetro y el guardapolvo del umbral. Un arreglo barato que se nota en el siguiente recibo de luz.' },
    'cabinet-hardware': { name: 'Herrería de gabinetes — por cada 10 piezas', description: 'Perillas o jaladeras colocadas con plantilla para que todo el tramo quede parejo.' },
    'fence-picket-repair': { name: 'Reparación de cerca — hasta 10 tablas', description: 'Se cambian las tablas dañadas y se vuelven a fijar los travesaños. Materiales desglosados.' },
    'fence-gate-rehang': { name: 'Recolgado o ajuste de portón de cerca', description: 'Portón vencido escuadrado, bisagras y pasador reajustados, y poste revisado.' },
    'trim-baseboard-repair': { name: 'Reparación de molduras o zoclo — por cada 10 pies', description: 'Se retira y cambia la moldura dañada, se corta a inglete, se resana y se sella, lista para pintar.' },
    'screen-repair': { name: 'Reparación de mosquitero — por pieza', description: 'Se cambia la malla o el marco y se vuelve a colocar.' },
    'mailbox-post-reset': { name: 'Reinstalación de buzón o poste', description: 'Poste chueco o dañado colocado a plomo y asegurado, con el buzón reinstalado.' },
    'paint-single-room': { name: 'Pintura de un cuarto — muros, 12 × 12 estándar', description: 'Muros preparados, perfilados y rodillados, dos manos. Techo y molduras se cotizan por separado.', pricingNote: 'La pintura la pone usted o se desglosa' },
    'punch-list-half-day': { name: 'Lista de pendientes — medio día (hasta 4 horas)', description: 'Un bloque de trabajos chicos resueltos en una sola visita. Sale más barato que cotizar pieza por pieza, y es como deberían comprarse casi todas las entregas.' },
    'fixture-coordination': { name: 'Coordinación de cambio de accesorios', description: 'Llaves, excusados, trituradores, ventiladores de techo y lámparas. Cotizamos el trabajo, lo fotografiamos, le damos acceso al contratista y manejamos a un socio con licencia hasta el final.', pricingNote: 'Se cotiza junto con el socio con licencia — no le ponemos un sobreprecio escondido a su mano de obra' },
    'lawn-standard-lot': { name: 'Jardinería — lote estándar', description: 'Poda, orillado, recorte y soplado. Se retira el pasto cortado si lo pide.' },
    'lawn-large-lot': { name: 'Jardinería — lote grande (más de ¼ de acre)', description: 'Poda, orillado, recorte y soplado en un lote más grande, cotizado por área.' },
    'gutter-clean-single': {
      name: 'Limpieza de canaletas — una planta',
      description: 'Tramos despejados a mano, bajadas destapadas y flujo verificado, con el escombro retirado.',
      includes: [
        'Tramos despejados a mano, no soplados hacia el techo',
        'Bajadas destapadas y flujo verificado en la salida',
        'Escombro embolsado y retirado',
        'Fotografías de cada tramo antes y después',
        'Se reportan los soportes flojos y las uniones separadas',
      ],
    },
    'gutter-clean-two-story': { name: 'Limpieza de canaletas — dos plantas', description: 'Igual que en una planta, con el acceso y el tiempo que requiere un segundo piso.' },
    'pressure-wash-driveway': { name: 'Lavado a presión — entrada de cochera', description: 'Superficie lavada a la presión correcta para el material, después de una prueba en un área pequeña.' },
    'pressure-wash-house': { name: 'Lavado a presión — exterior de la casa', description: 'Lavado suave en recubrimiento y molduras, cotizado por número de fachadas y tipo de superficie.' },
    'junk-removal-small': { name: 'Retiro de escombro — carga de camioneta', description: 'Se carga, se lleva y se tira. Los costos de tiradero se dicen por adelantado.' },
    'junk-removal-large': { name: 'Retiro de escombro — remolque completo', description: 'Limpieza más grande, normalmente de una entrega o de una propiedad heredada.' },
    'cleaning-standard-house': { name: 'Limpieza — casa estándar', description: 'Limpieza completa para una entrega, para poner la propiedad en venta, o al volver a ocuparla.' },
    'lot-clearing-light': { name: 'Desmonte ligero y corte de maleza', description: 'Se corta y retira la maleza de un lote vacío o descuidado. Se cotiza después de verlo.', pricingNote: 'Se cotiza después de una visita — el estado del lote define el precio' },
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

  areas: {
    elgin: {
      local:
        'Elgin es donde estamos basados, así que recibe los tiempos de respuesta más rápidos que ofrecemos y sin que el tiempo de camino afecte la programación. Las casas aquí se dividen en dos grupos muy distintos: un centro histórico alrededor de Main Street con mucha construcción anterior a 1978, y fraccionamientos nuevos saliendo por la Carretera 290 levantados en los últimos quince años. Eso cambia lo que buscamos. En las casas viejas revisamos los requisitos de seguridad por plomo antes de programar cualquier pintura o demolición, y dedicamos más tiempo al movimiento de los cimientos y a observar la instalación eléctrica original. Las casas nuevas tienen su propio patrón: accesorios de línea económica, drenajes que nunca quedaron del todo terminados, y sistemas de HVAC ya con la edad suficiente para que estar al día con los filtros decida si llegan al año quince.',
    },
    bastrop: {
      local:
        'Bastrop está a unos veinticinco minutos de nuestra base, y lo programamos en días fijos en lugar de cuando caiga, para que el camino se reparta entre varias propiedades. Mucho de lo que hacemos aquí es vigilancia de propiedades vacías y documentación después de tormentas. Por el historial de incendios forestales y la zona inundable del río Colorado, las aseguradoras y los prestamistas piden pruebas del estado de la propiedad más seguido que en cualquier otro lugar donde trabajamos. Un juego de fotografías con fecha les vale mucho más que una llamada diciendo que todo se ve bien. La cantidad de árboles y maleza en los lotes grandes también genera trabajo exterior real — despejar alrededor de las construcciones aquí no es jardinería, es reducir el riesgo.',
      note: 'Programado en días fijos de servicio para que el tiempo de camino no se le cobre.',
    },
    manor: {
      local:
        'Manor está a veinte minutos al oeste y es el mercado con más inversionistas de nuestra zona. Grandes conjuntos de rentas casi idénticas construidas en los años 2010 significan dos cosas: los inquilinos cambian constantemente, y las mismas fallas aparecen propiedad tras propiedad. Esa repetición es una ventaja — una vez que hemos inspeccionado una docena de unidades en el mismo fraccionamiento, ya sabemos qué atajos del constructor buscar y los encontramos más rápido. La mayor parte de nuestro trabajo en Manor se programa alrededor del cambio de inquilino, con informes del estado de la propiedad a la entrada y a la salida.',
    },
    taylor: {
      local:
        'Taylor está a veinticinco minutos al norte, y su mercado ha cambiado más rápido que el de cualquier otro pueblo que cubrimos desde que se anunció la planta de semiconductores. Las casas viejas cerca del centro histórico las están comprando como rentas inversionistas que nunca las han visto en persona. Eso es exactamente para quien están hechos Vacant Property Watch y nuestros informes del estado de la propiedad. Buena parte de las casas antiguas de aquí se construyeron antes de 1978, así que siempre preguntamos el año de construcción antes de programar pintura o demolición.',
    },
    pflugerville: {
      local:
        'Pflugerville está en el extremo oeste de nuestro radio de servicio, a unos treinta minutos, y le vamos a decir con claridad qué significa eso. Lo programamos en bloques y no una visita a la vez, y no vamos a prometer aquí una salida de emergencia el mismo día cuando sí la podemos prometer en Elgin. Lo que funciona bien en Pflugerville es la cobertura con plan recurrente y el trabajo de inspección programado, donde la fecha se conoce con anticipación. En los fraccionamientos con asociación de vecinos, cómo se ve el exterior no es solo cuestión de estética. Un jardín descuidado o una entrada sucia se convierte en una carta, y adelantarse a eso cuesta menos que contestarla.',
      note: 'Extremo oeste de nuestro radio — solo trabajo programado, agrupado por día.',
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
