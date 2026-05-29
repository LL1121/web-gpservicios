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
  | 'ley-3338'
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

/**
 * Para sumar una certificación nueva:
 *   1. Dropeá el PDF en `public/certs/<archivo>.pdf`
 *   2. Agregá una entrada con `fileUrl: "/certs/<archivo>.pdf"`
 *
 * Mantené `fileUrl: null` solo si querés mostrar la card como "Próximamente".
 */
export const certifications: readonly Certification[] = [
  {
    slug: 'ley-3338',
    name: 'Compre Neuquino — Registro PyME',
    standard: 'Ley Provincial 3338 — Certificado N° 1696',
    kind: 'ley-3338',
    issuer: 'ADENEU — Agencia para el Desarrollo Económico del Neuquén',
    verifyUrl:
      'https://ley3338.adeneu.com.ar/CPYME/(S(050q13drcdpu0pcpis5rbtke))/Certificados.aspx?ID=1696',
    validity: 'Vigente',
    description:
      'Inscripción en el registro provincial de PyMES neuquinas bajo la Ley 3338. Habilita a GP Servicios como proveedor preferente para operadoras y empresas que contratan en la provincia del Neuquén.',
    fileUrl: '/certs/Certificado1696.pdf',
    accent: '#136A26',
  },
] as const
