import type { Metadata } from 'next'
import PageOffset from '@/components/ui/PageOffset'
import OrgchartSection from '@/components/sections/OrgchartSection'

export const metadata: Metadata = {
  title: 'Staff | GP Servicios SRL',
  description: 'Estructura organizacional y equipos técnicos de GP Servicios S.R.L.',
}

export default function StaffPage() {
  return (
    <PageOffset>
      <OrgchartSection standalone />
    </PageOffset>
  )
}
