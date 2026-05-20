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

export const servicesCatalog: ReadonlyArray<{
  slug: ServiceSlug
  label: string
  shortDescription: string
  detail?: string
  civilTasks?: readonly string[]
}> = [
  {
    slug: 'soldadura-montaje',
    label: 'Soldadura y montaje',
    shortDescription:
      'Montajes de líneas de oleoductos, gasoductos y piping en yacimientos e instalaciones industriales.',
  },
  {
    slug: 'conexion-pozo',
    label: 'Conexión a pozo',
    shortDescription: 'Servicios de conexión a pozo para operaciones en campo.',
  },
  {
    slug: 'pruebas-hidraulicas',
    label: 'P.H. Pruebas Hidráulicas',
    shortDescription: 'Pruebas hidráulicas de integridad en líneas e instalaciones.',
  },
  {
    slug: 'prefabricado-lac-pluspetrol',
    label: 'Prefabricado y montaje módico LAC',
    shortDescription:
      'Prefabricado y montaje de módico unidad LAC — operaciones para Pluspetrol.',
    detail: 'Prefabricado, y montaje de módico unidad LAC. Pluspetrol',
  },
  {
    slug: 'modificacion-descargadero',
    label: 'Modificación y montaje en descargadero',
    shortDescription:
      'Modificación y montaje de prefabricado en descargadero.',
  },
  {
    slug: 'ingenieria-civil',
    label: 'Ingeniería civil',
    shortDescription:
      'Obras civiles en yacimiento: excavación, hormigón, estructuras y montaje.',
    civilTasks: civilEngineeringTasks,
  },
  {
    slug: 'arenado-pintura',
    label: 'Arenado y pintura',
    shortDescription:
      'Preparación de superficies, arenado y recubrimiento para equipos e instalaciones.',
  },
  {
    slug: 'movimiento-suelo',
    label: 'Movimiento de suelo',
    shortDescription:
      'Movimiento de suelos y preparación de terreno para obras en campo.',
  },
]

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
