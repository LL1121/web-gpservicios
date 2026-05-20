import type { Metadata } from 'next'
import PageOffset from '@/components/ui/PageOffset'
import ClientsTicker from '@/components/sections/ClientsTicker'

export const metadata: Metadata = {
  title: 'Clientes | GP Servicios SRL',
  description: 'Operadoras de Petróleo y Gas que confían en GP Servicios S.R.L.',
}

export default function ClientesPage() {
  return (
    <PageOffset>
      <ClientsTicker standalone />
    </PageOffset>
  )
}
