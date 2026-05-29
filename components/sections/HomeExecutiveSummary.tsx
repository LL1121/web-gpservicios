import SectionTag from '@/components/ui/SectionTag'
import { company, homeHighlights, quienesSomos } from '@/lib/site-content'
import { homeExecutiveImage } from '@/lib/site-images'

export default function HomeExecutiveSummary() {
  return (
    <section className="relative isolate overflow-hidden border-b" style={{ borderColor: '#E2E5E9' }}>
      {/* Imagen de fondo — operación Oil & Gas */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${homeExecutiveImage})` }}
        aria-hidden="true"
      />
      {/* Overlay para legibilidad del texto sobre la imagen */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.86) 60%, rgba(244,245,247,0.92) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="section-container max-w-7xl !py-12 sm:!py-16 lg:!py-20">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionTag label="Resumen ejecutivo" className="mb-5" />
            <h2
              className="mb-6 font-[family-name:var(--font-barlow)] text-2xl font-extrabold leading-tight lg:text-3xl xl:text-4xl"
              style={{ color: '#1A2228' }}
            >
              Ingeniería, construcción y montaje en{' '}
              <span style={{ color: '#FF0001' }}>{company.sector}</span>
            </h2>
            <p className="text-base leading-relaxed lg:text-lg" style={{ color: '#4A5568' }}>
              {quienesSomos.intro}
            </p>
            <ul className="mt-8 space-y-3">
              {[
                quienesSomos.experiencia,
                quienesSomos.objetivo,
                'Soldadura y montaje, conexión a pozo, pruebas hidráulicas, prefabricados, ingeniería civil, arenado y pintura.',
              ].map(item => (
                <li
                  key={item}
                  className="flex gap-3 text-sm lg:text-base"
                  style={{ color: '#4A5568' }}
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ background: '#136A26' }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div
              className="rounded-2xl border p-6 shadow-sm backdrop-blur-sm lg:p-8"
              style={{ borderColor: '#E2E5E9', background: 'rgba(255,255,255,0.92)' }}
            >
              <p
                className="mb-6 font-[family-name:var(--font-barlow)] text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: '#136A26' }}
              >
                En números
              </p>
              <div className="grid grid-cols-2 gap-6">
                {homeHighlights.map(h => (
                  <div key={h.label}>
                    <p
                      className="font-[family-name:var(--font-barlow)] text-2xl font-extrabold leading-none lg:text-3xl"
                      style={{ color: '#1A2228' }}
                    >
                      {h.value}
                    </p>
                    <p className="mt-1.5 text-xs leading-snug" style={{ color: '#8A9BAB' }}>
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
