import type { Metadata } from 'next'
import PageOffset from '@/components/ui/PageOffset'
import CertificationsSection from '@/components/sections/CertificationsSection'

export const metadata: Metadata = {
  title: 'Certificaciones | GP Servicios SRL',
  description:
    'Certificados ISO 9001, 14001 y 45001 del Sistema de Gestión Integrado de GP Servicios SRL. Visor nativo y verificación contra el organismo emisor.',
}

export default function CertificacionesPage() {
  return (
    <PageOffset>
      <CertificationsSection standalone />
    </PageOffset>
  )
}
