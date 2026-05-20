import SectionTag from '@/components/ui/SectionTag'
import { company, homeHighlights, quienesSomos } from '@/lib/site-content'

export default function HomeExecutiveSummary() {
  return (
    <section className="bg-white border-b" style={{ borderColor: '#E2E5E9' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <SectionTag label="Resumen ejecutivo" className="mb-5" />
            <h2
              className="font-[family-name:var(--font-barlow)] font-extrabold text-2xl lg:text-3xl xl:text-4xl leading-tight mb-6"
              style={{ color: '#1A2535' }}
            >
              Ingeniería, construcción y montaje en{' '}
              <span style={{ color: '#D0021B' }}>{company.sector}</span>
            </h2>
            <p className="text-base lg:text-lg leading-relaxed" style={{ color: '#4A5568' }}>
              {quienesSomos.intro}
            </p>
            <ul className="mt-8 space-y-3">
              {[
                quienesSomos.experiencia,
                quienesSomos.objetivo,
                'Soldadura y montaje, conexión a pozo, pruebas hidráulicas, prefabricados, ingeniería civil, arenado y pintura.',
              ].map(item => (
                <li key={item} className="flex gap-3 text-sm lg:text-base" style={{ color: '#4A5568' }}>
                  <span
                    className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                    style={{ background: '#2D7D46' }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div
              className="rounded-2xl border p-6 lg:p-8"
              style={{ borderColor: '#E2E5E9', background: '#F4F5F7' }}
            >
              <p
                className="text-xs font-semibold tracking-[0.18em] uppercase mb-6 font-[family-name:var(--font-barlow)]"
                style={{ color: '#2D7D46' }}
              >
                En números
              </p>
              <div className="grid grid-cols-2 gap-6">
                {homeHighlights.map(h => (
                  <div key={h.label}>
                    <p
                      className="font-[family-name:var(--font-barlow)] font-extrabold text-2xl lg:text-3xl leading-none"
                      style={{ color: '#1A2535' }}
                    >
                      {h.value}
                    </p>
                    <p className="text-xs mt-1.5 leading-snug" style={{ color: '#8A9BAB' }}>
                      {h.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
