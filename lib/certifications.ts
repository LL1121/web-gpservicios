/**
 * Catálogo de certificaciones de GP Servicios SRL.
 *
 * Los archivos viven en `public/certs/`. Cuando tengas los PDFs reales:
 *   1. Copiá el PDF a `public/certs/<archivo>.pdf`
 *   2. Si querés thumbnail propio, dejalo en `public/certs/thumbs/<slug>.jpg`
 *      (si no, usamos un placeholder genérico)
 *   3. `verifyUrl` debe apuntar al organismo certificador para que el cliente
 *      pueda validar la vigencia del certificado.
 */

export type CertificationKind =
  | 'iso-9001'
  | 'iso-14001'
  | 'iso-45001'
  | 'sgi'
  | 'otra'

export interface Certification {
  slug: string
  name: string
  /** Norma o estándar (ej: "ISO 9001:2015") */
  standard: string
  kind: CertificationKind
  /** Organismo certificador */
  issuer: string
  /** URL del organismo para verificar autenticidad */
  verifyUrl: string
  /** Año de emisión / vigencia o vencimiento */
  validity: string
  /** Bajada corta */
  description: string
  /** Path al PDF en /public (ej: "/certs/iso9001.pdf"). null si todavía no
   *  está cargado el archivo y la card debe mostrar "Próximamente". */
  fileUrl: string | null
  /** Color de acento por norma */
  accent: string
}

export const certifications: readonly Certification[] = [
  {
    slug: 'iso-9001',
    name: 'Sistema de Gestión de Calidad',
    standard: 'ISO 9001:2015 — Certificado N° 1696',
    kind: 'iso-9001',
    issuer: 'IRAM — Instituto Argentino de Normalización y Certificación',
    verifyUrl: 'https://www.iram.org.ar',
    validity: 'Vigente',
    description:
      'Certificación del Sistema de Gestión de Calidad aplicado a la ingeniería, construcción y montaje en Petróleo y Gas.',
    fileUrl: '/certs/Certificado1696.pdf',
    accent: '#136A26',
  },
  {
    slug: 'iso-14001',
    name: 'Sistema de Gestión Ambiental',
    standard: 'ISO 14001:2015',
    kind: 'iso-14001',
    issuer: 'IRAM — Instituto Argentino de Normalización y Certificación',
    verifyUrl: 'https://www.iram.org.ar',
    validity: 'Próximamente',
    description:
      'Gestión ambiental para la prevención de la contaminación y el cumplimiento legal en obras y operaciones.',
    fileUrl: null,
    accent: '#1B8A33',
  },
  {
    slug: 'iso-45001',
    name: 'Salud y Seguridad Ocupacional',
    standard: 'ISO 45001:2018',
    kind: 'iso-45001',
    issuer: 'IRAM — Instituto Argentino de Normalización y Certificación',
    verifyUrl: 'https://www.iram.org.ar',
    validity: 'Próximamente',
    description:
      'Sistema de gestión de Salud y Seguridad Ocupacional para la prevención de lesiones y enfermedades profesionales.',
    fileUrl: null,
    accent: '#FF0001',
  },
] as const
