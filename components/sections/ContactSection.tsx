import SectionTag from '@/components/ui/SectionTag'
import { company, contact } from '@/lib/site-content'

export default function ContactSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section id="contacto" className="bg-white">
      <div className={`max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 ${standalone ? 'pt-8 lg:pt-12' : ''}`}>
        <header className="mb-12 lg:mb-16 max-w-3xl">
          <SectionTag label="Contacto" className="mb-4" />
          <h1
            className="font-[family-name:var(--font-barlow)] font-extrabold text-3xl lg:text-4xl leading-tight"
            style={{ color: '#1A2535' }}
          >
            Estamos en{' '}
            <span style={{ color: '#bd1720' }}>Centenario, Neuquén</span>
          </h1>
          <p className="mt-4 text-base lg:text-lg leading-relaxed" style={{ color: '#4A5568' }}>
            Datos de contacto de {company.legalName} — planta industrial, domicilios fiscal y base,
            teléfonos y correos institucionales.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {[contact.plant, contact.fiscal, contact.base].map(loc => (
              <div
                key={loc.title}
                className="rounded-xl border p-6 lg:p-8"
                style={{ borderColor: '#E2E5E9', background: '#F4F5F7' }}
              >
                <h2
                  className="mb-4 text-sm font-bold tracking-widest uppercase font-[family-name:var(--font-barlow)]"
                  style={{ color: '#2D7D46' }}
                >
                  {loc.title}
                </h2>
                <address className="not-italic text-base leading-relaxed" style={{ color: '#4A5568' }}>
                  {loc.lines.map(line => (
                    <p key={line}>{line}</p>
                  ))}
                </address>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div
              className="rounded-xl border p-6"
              style={{ borderColor: '#E2E5E9', background: '#FFFFFF' }}
            >
              <p
                className="mb-4 text-xs font-bold tracking-widest uppercase"
                style={{ color: '#8A9BAB' }}
              >
                Teléfonos
              </p>
              <ul className="space-y-3">
                {contact.phones.map(phone => (
                  <li key={phone.href}>
                    <p className="text-xs" style={{ color: '#8A9BAB' }}>
                      {phone.label}
                    </p>
                    <a
                      href={phone.href}
                      className="text-base font-semibold transition-colors hover:text-[#bd1720] font-[family-name:var(--font-barlow)]"
                      style={{ color: '#1A2535' }}
                    >
                      {phone.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {contact.emails.map(item => (
              <div
                key={item.email}
                className="rounded-xl border p-6"
                style={{ borderColor: '#E2E5E9', background: '#FFFFFF' }}
              >
                <p className="mb-2 text-xs font-bold tracking-widest uppercase" style={{ color: '#8A9BAB' }}>
                  {item.label}
                </p>
                <a
                  href={`mailto:${item.email}`}
                  className="text-lg font-semibold transition-colors hover:text-[#bd1720] font-[family-name:var(--font-barlow)]"
                  style={{ color: '#1A2535' }}
                >
                  {item.email}
                </a>
              </div>
            ))}

            <div
              className="rounded-xl border p-6"
              style={{ borderColor: '#E2E5E9', background: '#FFFFFF' }}
            >
              <p className="mb-2 text-xs font-bold tracking-widest uppercase" style={{ color: '#8A9BAB' }}>
                Web institucional
              </p>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold transition-colors hover:text-[#bd1720] font-[family-name:var(--font-barlow)]"
                style={{ color: '#1A2535' }}
              >
                gpservicios.com.ar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
