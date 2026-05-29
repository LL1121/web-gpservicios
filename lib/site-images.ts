/**
 * Imágenes placeholder del sitio (Unsplash).
 *
 * Cada URL apunta a una foto temática estable de Unsplash. Cuando
 * tengas las fotos reales de obras GP, dejalas en `/public/images/...`
 * y reemplazá las URLs por rutas locales (ej: `/images/home/exec.jpg`).
 *
 * Tamaños recomendados por slot:
 * - homeExecutiveSummary: 1920×1080 (panorámica industrial)
 * - service.<slug>:        1200×800  (landscape por card)
 */

import type { ServiceSlug } from '@/lib/site-content'

const UNSPLASH = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

/** Fondo del bloque "Resumen ejecutivo" en la home — operación Oil & Gas */
export const homeExecutiveImage = UNSPLASH('photo-1518709268805-4e9042af2176', 2000)

/** Imagen por slug de servicio — orden y temática alineados al PDF */
export const serviceImages: Record<ServiceSlug, string> = {
  'soldadura-montaje':           UNSPLASH('photo-1581094271901-8022df4466f9'),
  'conexion-pozo':               UNSPLASH('photo-1610028290816-5d937a395a49'),
  'pruebas-hidraulicas':         UNSPLASH('photo-1565793298595-6a879b1d9492'),
  'prefabricado-lac-pluspetrol': UNSPLASH('photo-1581092335879-5e0f1d4e8a08'),
  'modificacion-descargadero':   UNSPLASH('photo-1473341304170-971dccb5ac1e'),
  'ingenieria-civil':            UNSPLASH('photo-1504917595217-d4dc5ebe6122'),
  'arenado-pintura':             UNSPLASH('photo-1597844808249-09abedfdc5f7'),
  'movimiento-suelo':            UNSPLASH('photo-1487958449943-2429e8be8625'),
}
