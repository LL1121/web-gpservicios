import type { Metadata } from 'next'
import PageOffset from '@/components/ui/PageOffset'
import HSEQSection from '@/components/sections/HSEQSection'

export const metadata: Metadata = {
  title: 'Políticas de gestión | GP Servicios SRL',
  description:
    'Política de gestión y ocho compromisos del Sistema de Gestión Integrado de GP SERVICIOS SRL.',
}

export default function PoliticasGestionPage() {
  return (
    <PageOffset>
      <HSEQSection standalone />
    </PageOffset>
  )
}
