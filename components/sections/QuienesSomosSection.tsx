import SectionShell from '@/components/ui/SectionShell'
import { quienesSomos } from '@/lib/site-content'

export default function QuienesSomosSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <SectionShell
      id="quienes-somos"
      standalone={standalone}
      tag="Quiénes somos"
      title={
        <>
          Ingeniería, construcción y montaje{' '}
          <span style={{ color: '#FF0001' }}>en Petróleo y Gas</span>
        </>
      }
      description={quienesSomos.intro}
      topCurve={{ fill: '#FFFFFF', from: '#F4F5F7' }}
    >
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-14">
        <div className="lg:col-span-2 space-y-5 text-base leading-relaxed" style={{ color: '#4A5568' }}>
          <p>{quienesSomos.intro}</p>
          <p>{quienesSomos.experiencia}</p>
        </div>

        <div className="space-y-4">
          {[
            { title: 'Experiencia', text: quienesSomos.experiencia },
            { title: 'Objetivo', text: quienesSomos.objetivo },
            {
              title: 'Base operativa',
              text: 'Parque Industrial de Centenario, Neuquén — planta, taller y logística en el corazón de la cuenca neuquina.',
            },
          ].map(card => (
            <div
              key={card.title}
              className="rounded-xl border p-5"
              style={{ borderColor: '#E2E5E9', background: '#F4F5F7' }}
            >
              <p
                className="text-sm font-bold font-[family-name:var(--font-barlow)] mb-2"
                style={{ color: '#1A2228' }}
              >
                {card.title}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#4A5568' }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
