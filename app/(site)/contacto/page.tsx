import type { Metadata } from 'next'
import PageOffset from '@/components/ui/PageOffset'
import ContactSection from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Contacto | GP Servicios SRL',
  description:
    'Planta Parque Industrial Centenario, domicilios fiscal y base, teléfonos y correos de GP Servicios S.R.L.',
}

export default function ContactoPage() {
  return (
    <PageOffset>
      <ContactSection standalone />
    </PageOffset>
  )
}
