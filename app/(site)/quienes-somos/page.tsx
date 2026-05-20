import type { Metadata } from 'next'
import PageOffset from '@/components/ui/PageOffset'
import QuienesSomosSection from '@/components/sections/QuienesSomosSection'

export const metadata: Metadata = {
  title: 'Quiénes somos | GP Servicios SRL',
  description:
    'GP SERVICIOS S.R.L. desde 2013, con más de 20 años en montajes de oleoductos, gasoductos y piping en Petróleo y Gas.',
}

export default function QuienesSomosPage() {
  return (
    <PageOffset>
      <QuienesSomosSection standalone />
    </PageOffset>
  )
}
