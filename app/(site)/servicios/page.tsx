import type { Metadata } from 'next'
import PageOffset from '@/components/ui/PageOffset'
import ServicesSection from '@/components/sections/ServicesSection'

export const metadata: Metadata = {
  title: 'Servicios | GP Servicios SRL',
  description:
    'Soldadura y montaje, conexión a pozo, P.H. pruebas hidráulicas, prefabricado LAC Pluspetrol, ingeniería civil, arenado y pintura.',
}

export default function ServiciosPage() {
  return (
    <PageOffset>
      <ServicesSection standalone />
    </PageOffset>
  )
}
