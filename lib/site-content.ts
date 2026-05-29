/** Contenido institucional — PDF Carpeta A4 GP Servicios + gpservicios.com.ar */

export const company = {
  legalName: 'GP SERVICIOS S.R.L.',
  shortName: 'GP Servicios',
  sector: 'Petróleo y Gas',
  commercialStartYear: 2013,
  experienceYears: '20+',
  tagline:
    'Empresa dedicada a la ingeniería, construcción y montaje en el sector Petróleo y Gas.',
  website: 'https://gpservicios.com.ar',
} as const

export const quienesSomos = {
  intro:
    'GP SERVICIOS S.R.L. es una firma que inicia su actividad comercial en el año 2013, avalada por una trayectoria de más de 20 años en el rubro de montajes de líneas de oleoductos, gasoductos y piping en la industria en diferentes yacimientos y clientes.',
  experiencia:
    'Esta sociedad capitaliza su experiencia, impulsando un crecimiento constante y capacitación continua, con el fin de brindar servicios donde el cliente lo requiera, principalmente en el sector de Petróleo y Gas.',
  objetivo:
    'Ofrecemos una amplia gama de servicios, asumiendo el desafío actual en costos y calidad, sin descuidar la seguridad, el medio ambiente y la salud ocupacional.',
} as const

export const politicasGestion = {
  intro:
    'GP SERVICIOS SRL es una empresa dedicada a la Ingeniería, construcción y montaje. Dentro del marco de su visión y misión, establece la siguiente política de gestión aplicable a todas sus actividades y servicios.',
  closing:
    'Esta política proporciona el marco de referencia para establecer y revisar los objetivos del Sistema de Gestión Integrado.',
  commitments: [
    {
      num: '01',
      text: 'Establecer, documentar, implementar y mantener un Sistema de Gestión Integrado, que nos permita mejorar continuamente la calidad de los productos y servicios brindados, el desempeño de seguridad y salud en el trabajo y ambiente, satisfaciendo las necesidades y expectativas de nuestros clientes, implícitas y explícitas y de otras partes interesadas.',
    },
    {
      num: '02',
      text: 'Adoptar para todas las actividades, el principio de prevención de la contaminación y establecer acciones de protección del medio ambiente.',
    },
    {
      num: '03',
      text: 'Cumplir con todos los requisitos legales aplicables y otros a los que la organización suscriba.',
    },
    {
      num: '04',
      text: 'Asegurar la competencia personal mediante su concientización y capacitación permanente, favoreciendo la participación y la consulta para el desarrollo de una actitud proactiva y su involucramiento en el logro de los objetivos de la empresa.',
    },
    {
      num: '05',
      text: 'Proporcionar los recursos necesarios para la mejora continua del desempeño organizacional, a través de su seguimiento y análisis, la detección de desvíos y la adopción de las medidas necesarias.',
    },
    {
      num: '06',
      text: 'Asegurar condiciones de trabajo seguras y saludables para prevenir lesiones y enfermedades profesionales, eliminando peligros y reduciendo los riesgos mediante acciones de control continuas y eficaces.',
    },
    {
      num: '07',
      text: 'Comunicar esa política a todos los miembros de la organización, incluyendo el personal contratado, poniéndola a disposición del público y de toda parte interesada.',
    },
    {
      num: '08',
      text: 'Todo el personal está involucrado y es responsable, en forma individual y mancomunada, del cumplimiento de los compromisos aquí asumidos, siendo por ello condición básica de empleo y un factor determinante en la evaluación de su desempeño.',
    },
  ],
} as const

export const civilEngineeringTasks = [
  'Excavación y compactación',
  'Encofrado y armadura de hierros y compactación',
  'Colocación de hormigón',
  'Soldadura de estructura',
  'Fraguado y colocación de dados',
  'Montaje de estructuras',
] as const

export type ServiceSlug =
  | 'soldadura-montaje'
  | 'conexion-pozo'
  | 'pruebas-hidraulicas'
  | 'prefabricado-lac-pluspetrol'
  | 'modificacion-descargadero'
  | 'ingenieria-civil'
  | 'arenado-pintura'
  | 'movimiento-suelo'

export interface ServiceEntry {
  slug: ServiceSlug
  label: string
  shortDescription: string
  /** Bajada extensa para la página de detalle */
  longDescription: string
  /** Lista de actividades / alcance del servicio */
  scope: readonly string[]
  /** Aplicaciones / casos típicos */
  applications: readonly string[]
  /** Tagline corto (chip arriba del título) */
  tagline: string
  detail?: string
  civilTasks?: readonly string[]
}

export const servicesCatalog: readonly ServiceEntry[] = [
  {
    slug: 'soldadura-montaje',
    label: 'Soldadura y montaje',
    tagline: 'Core operativo',
    shortDescription:
      'Montajes de líneas de oleoductos, gasoductos y piping en yacimientos e instalaciones industriales.',
    longDescription:
      'Servicio integral de soldadura y montaje de cañerías de proceso para la industria del Petróleo y Gas. Operamos en yacimientos, plantas de tratamiento y baterías, ejecutando montajes de líneas de oleoductos, gasoductos y piping bajo procedimientos calificados (WPS/PQR) y con soldadores homologados.',
    scope: [
      'Montaje de líneas de oleoductos y gasoductos',
      'Piping industrial en plantas y baterías',
      'Soldadura calificada bajo WPS/PQR (API 1104, ASME IX)',
      'Soporterías, racks y estructuras complementarias',
      'Trazabilidad de materiales y dossier de soldaduras',
    ],
    applications: [
      'Montaje de líneas troncales en yacimientos',
      'Conexionado de plantas de tratamiento',
      'Reemplazo y reparación de tramos en operación',
    ],
  },
  {
    slug: 'conexion-pozo',
    label: 'Conexión a pozo',
    tagline: 'Campo',
    shortDescription:
      'Servicios de conexión a pozo para operaciones en campo.',
    longDescription:
      'Trabajos de conexión a pozo desde la boca del pozo hasta la línea principal, incluyendo armado de árbol de navidad, manifolds, válvulas y tramos de flowline. Coordinamos con equipos de workover, perforación y producción para minimizar tiempos de pozo cerrado.',
    scope: [
      'Armado y montaje de manifolds en boca de pozo',
      'Instalación de válvulas y trees',
      'Tendido y empalme de flowlines',
      'Pruebas de estanqueidad post-conexión',
      'Coordinación con equipos de pulling / workover',
    ],
    applications: [
      'Puesta en producción de pozos nuevos',
      'Reconexión post intervención',
      'Cambios de configuración por aumento de caudal',
    ],
  },
  {
    slug: 'pruebas-hidraulicas',
    label: 'P.H. Pruebas Hidráulicas',
    tagline: 'Integridad',
    shortDescription:
      'Pruebas hidráulicas de integridad en líneas e instalaciones.',
    longDescription:
      'Pruebas hidráulicas para validar la integridad mecánica y la estanqueidad de líneas, manifolds e instalaciones antes de su puesta en servicio. Procedimientos según norma del cliente (ASME B31.4 / B31.8 / API), con registros instrumentados de presión y temperatura para auditoría.',
    scope: [
      'Llenado, presurización y mantenimiento de presión',
      'Pruebas con agua o glicol según requerimiento',
      'Registros gráficos de presión y temperatura',
      'Inspección de soldaduras y juntas durante prueba',
      'Emisión de protocolos firmados por el cliente',
    ],
    applications: [
      'Recepción de líneas montadas previo a puesta en servicio',
      'Recertificación periódica de integridad',
      'Validación post-reparación',
    ],
  },
  {
    slug: 'prefabricado-lac-pluspetrol',
    label: 'Prefabricado y montaje módico LAC',
    tagline: 'Pluspetrol',
    shortDescription:
      'Prefabricado y montaje de módico unidad LAC — operaciones para Pluspetrol.',
    longDescription:
      'Prefabricado en taller y montaje en campo de spools, racks y estructuras tubulares para la unidad LAC (Lease Automatic Custody) en operaciones para Pluspetrol. Control dimensional bajo isométricos, trazabilidad de materiales desde el origen y prearmado en taller para minimizar tiempos en yacimiento.',
    scope: [
      'Prefabricado de spools en taller propio',
      'Soporterías y racks tubulares',
      'Montaje en obra y empalme con líneas existentes',
      'Control dimensional vs. isométricos del cliente',
      'Trazabilidad de materiales y dossier de obra',
    ],
    applications: [
      'Plantas LAC en yacimientos de Pluspetrol',
      'Ampliaciones y modificaciones de unidades de medición',
      'Reemplazo de tramos por upgrade o mantenimiento',
    ],
    detail: 'Prefabricado, y montaje de módico unidad LAC. Pluspetrol',
  },
  {
    slug: 'modificacion-descargadero',
    label: 'Modificación y montaje en descargadero',
    tagline: 'Descargadero',
    shortDescription:
      'Modificación y montaje de prefabricado en descargadero.',
    longDescription:
      'Modificación, prefabricado y montaje de tramos en descargaderos de hidrocarburos. Trabajamos en interrupciones programadas con cronogramas ajustados, asegurando la vuelta al servicio en los tiempos acordados con el cliente.',
    scope: [
      'Relevamiento previo y propuesta de modificación',
      'Prefabricado de tramos en taller',
      'Desmontaje de configuración existente',
      'Montaje de la nueva configuración',
      'Pruebas y entrega operativa',
    ],
    applications: [
      'Adecuación de descargaderos a nuevas operadoras',
      'Cambios de capacidad y flujo',
      'Reemplazo por desgaste o normativa',
    ],
  },
  {
    slug: 'ingenieria-civil',
    label: 'Ingeniería civil',
    tagline: 'Obras civiles',
    shortDescription:
      'Obras civiles en yacimiento: excavación, hormigón, estructuras y montaje.',
    longDescription:
      'Obras civiles complementarias a los frentes de montaje: desde el movimiento de suelos inicial hasta las fundaciones, dados de hormigón y estructuras terminadas. Equipo propio para ejecutar el ciclo civil completo.',
    scope: civilEngineeringTasks,
    applications: [
      'Fundaciones para equipos y skids',
      'Dados de hormigón para racks y soporterías',
      'Bases para tanques y estructuras de proceso',
    ],
    civilTasks: civilEngineeringTasks,
  },
  {
    slug: 'arenado-pintura',
    label: 'Arenado y pintura',
    tagline: 'Recubrimiento',
    shortDescription:
      'Preparación de superficies, arenado y recubrimiento para equipos e instalaciones.',
    longDescription:
      'Preparación de superficies metálicas mediante arenado al grado especificado y aplicación de esquemas de pintura industrial. Se ejecutan controles de espesor, adherencia y rugosidad según norma del cliente.',
    scope: [
      'Arenado al grado SSPC / ISO según especificación',
      'Aplicación de primer, intermedio y terminación',
      'Control de espesor de película (DFT)',
      'Verificación de adherencia',
      'Reparación localizada de recubrimientos',
    ],
    applications: [
      'Líneas y skids antes de la puesta en servicio',
      'Mantenimiento de tanques y equipos',
      'Recubrimiento de estructuras estructurales',
    ],
  },
  {
    slug: 'movimiento-suelo',
    label: 'Movimiento de suelo',
    tagline: 'Terreno',
    shortDescription:
      'Movimiento de suelos y preparación de terreno para obras en campo.',
    longDescription:
      'Preparación de terrenos para frentes de obra: limpieza, nivelación, excavación, relleno y compactación. Incluye apertura de zanjas para tendido de líneas y plataformas para equipos.',
    scope: [
      'Limpieza y desbroce',
      'Nivelación y compactación',
      'Excavación de zanjas',
      'Relleno y reconformación',
      'Plataformas para equipos y skids',
    ],
    applications: [
      'Apertura de traza para nuevas líneas',
      'Plataformas para baterías y plantas',
      'Caminos internos de yacimiento',
    ],
  },
]

export const servicesBySlug: Record<ServiceSlug, ServiceEntry> = Object.fromEntries(
  servicesCatalog.map(s => [s.slug, s]),
) as Record<ServiceSlug, ServiceEntry>

export const contact = {
  plant: {
    title: 'Planta — Parque Industrial Centenario',
    lines: [
      'Calle AI-63 / Pampa N° 761',
      'Parque Industrial / Centenario',
      'Lote 6 — MA ZONA 49 PIC',
      'Provincia del Neuquén (8300)',
    ],
  },
  fiscal: {
    title: 'Domicilio fiscal',
    lines: ['Colombia 1153 / Neuquén', 'Provincia del Neuquén (8300)'],
  },
  base: {
    title: 'Domicilio base',
    lines: ['Mendoza 363 / Centenario', 'Provincia del Neuquén (8300)'],
  },
  phones: [
    { label: 'Administración', value: '299 487 3514', href: 'tel:+542994873514' },
    { label: 'Comercial', value: '+54 9 299 5574 7500', href: 'tel:+54929955747500' },
    { label: 'Contacto', value: '+54 9 299 412 031', href: 'tel:+549299412031' },
    { label: 'Contacto', value: '+54 9 299 531 6095', href: 'tel:+5492995316095' },
  ],
  emails: [
    { label: 'Administración', email: 'administracion@gpservicios.com.ar' },
    { label: 'Comercial', email: 'comercial@gpservicios.com.ar' },
    { label: 'Marco', email: 'marco.gpservicios@outlook.com' },
    { label: 'Carlos', email: 'carlos.gpservicios@outlook.com' },
  ],
} as const

export const homeHighlights = [
  { value: '2013', label: 'inicio actividad comercial' },
  { value: '+20', label: 'años de trayectoria en el rubro' },
  { value: 'SGI', label: 'Sistema de Gestión Integrado' },
  { value: 'Oil & Gas', label: 'sector Petróleo y Gas' },
] as const
