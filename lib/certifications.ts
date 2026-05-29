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
  /** Path al PDF en /public (ej: "/certs/iso9001.pdf") */
  fileUrl: string
  /** Color de acento por norma */
  accent: string
}

export const certifications: readonly Certification[] = [
  {
    slug: 'iso-9001',
    name: 'Sistema de Gestión de Calidad',
    standard: 'ISO 9001:2015',
    kind: 'iso-9001',
    issuer: 'IRAM — Instituto Argentino de Normalización y Certificación',
    verifyUrl: 'https://www.iram.org.ar',
    validity: 'Vigente',
    description:
      'Certificación del Sistema de Gestión de Calidad aplicado a la ingeniería, construcción y montaje en Petróleo y Gas.',
    fileUrl: '/certs/iso-9001.pdf',
    accent: '#136A26',
  },
  {
    slug: 'iso-14001',
    name: 'Sistema de Gestión Ambiental',
    standard: 'ISO 14001:2015',
    kind: 'iso-14001',
    issuer: 'IRAM — Instituto Argentino de Normalización y Certificación',
    verifyUrl: 'https://www.iram.org.ar',
    validity: 'Vigente',
    description:
      'Gestión ambiental para la prevención de la contaminación y el cumplimiento legal en obras y operaciones.',
    fileUrl: '/certs/iso-14001.pdf',
    accent: '#1B8A33',
  },
  {
    slug: 'iso-45001',
    name: 'Salud y Seguridad Ocupacional',
    standard: 'ISO 45001:2018',
    kind: 'iso-45001',
    issuer: 'IRAM — Instituto Argentino de Normalización y Certificación',
    verifyUrl: 'https://www.iram.org.ar',
    validity: 'Vigente',
    description:
      'Sistema de gestión de Salud y Seguridad Ocupacional para la prevención de lesiones y enfermedades profesionales.',
    fileUrl: '/certs/iso-45001.pdf',
    accent: '#FF0001',
  },
  {
    slug: 'sgi',
    name: 'Sistema de Gestión Integrado',
    standard: 'SGI — Calidad, Ambiente y SST',
    kind: 'sgi',
    issuer: 'GP Servicios SRL',
    verifyUrl: 'https://www.iram.org.ar',
    validity: 'Política institucional',
    description:
      'Política integrada que articula los compromisos de calidad, medio ambiente y seguridad ocupacional bajo un solo marco.',
    fileUrl: '/certs/sgi-politica.pdf',
    accent: '#32434F',
  },
] as const
