import { servicesCatalog } from '@/lib/site-content'

export const mainNavLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/quienes-somos', label: 'Quiénes somos' },
  { href: '/politicas-gestion', label: 'Políticas de gestión' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/clientes', label: 'Clientes' },
  { href: '/staff', label: 'Staff' },
  { href: '/contacto', label: 'Contacto' },
] as const

export const homeExploreLinks = [
  {
    href: '/quienes-somos',
    label: 'Quiénes somos',
    description:
      'Firma con actividad comercial desde 2013 y más de 20 años en montajes de oleoductos, gasoductos y piping.',
    accent: '#136A26',
  },
  {
    href: '/politicas-gestion',
    label: 'Políticas de gestión',
    description:
      'Política de gestión y ocho compromisos del Sistema de Gestión Integrado.',
    accent: '#1A2228',
  },
  {
    href: '/servicios',
    label: 'Servicios',
    description:
      'Soldadura, conexión a pozo, pruebas hidráulicas, prefabricados, ingeniería civil, arenado y más.',
    accent: '#FF0001',
  },
  {
    href: '/clientes',
    label: 'Clientes',
    description: 'Operadoras y empresas del sector que confían en GP Servicios.',
    accent: '#005DA4',
  },
  {
    href: '/staff',
    label: 'Staff',
    description: 'Estructura organizacional y áreas de la empresa.',
    accent: '#32434F',
  },
  {
    href: '/contacto',
    label: 'Contacto',
    description:
      'Planta en Parque Industrial Centenario, domicilios fiscal y base, teléfonos y correos.',
    accent: '#FF0001',
  },
] as const

/** Listado resumido para footer y referencias rápidas */
export const services = servicesCatalog.map(s => ({
  slug: s.slug,
  label: s.label,
  description: s.shortDescription,
}))
