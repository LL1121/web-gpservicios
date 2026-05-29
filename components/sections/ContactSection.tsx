import SectionTag from '@/components/ui/SectionTag'
import ContactForm from '@/components/sections/ContactForm'
import { company, contact } from '@/lib/site-content'

export default function ContactSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section id="contacto" className="bg-white">
      <div
        className={`section-container max-w-7xl ${standalone ? '!pt-6 sm:!pt-8 lg:!pt-12' : ''}`}
      >
        <header className="mb-10 max-w-3xl sm:mb-12 lg:mb-16">
          <SectionTag label="Contacto" className="mb-4" />
          <h1
            className="font-[family-name:var(--font-barlow)] text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl"
            style={{ color: '#1A2228' }}
          >
            Estamos en{' '}
            <span style={{ color: '#FF0001' }}>Centenario, Neuquén</span>
          </h1>
          <p className="mt-4 text-base lg:text-lg leading-relaxed" style={{ color: '#4A5568' }}>
            Datos de contacto de {company.legalName} — planta industrial, domicilios fiscal y base,
            teléfonos, correos institucionales y formulario directo.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Columna izquierda: form de contacto */}
          <div className="lg:col-span-7">
            <div
              className="rounded-2xl border p-5 sm:p-7 lg:p-9"
              style={{ borderColor: '#E2E5E9', background: '#F4F5F7' }}
            >
              <header className="mb-6">
                <SectionTag label="Escribinos" className="mb-3" />
                <h2
                  className="font-[family-name:var(--font-barlow)] text-xl font-extrabold leading-tight sm:text-2xl"
                  style={{ color: '#1A2228' }}
                >
                  Mandanos un mensaje
                </h2>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: '#4A5568' }}>
                  Cotizaciones, pedidos de información o coordinación de visita técnica. Te
                  contactamos al correo o teléfono que dejes acá.
                </p>
              </header>
              <ContactForm />
            </div>
          </div>

          {/* Columna derecha: ubicaciones, teléfonos y emails */}
          <div className="lg:col-span-5">
            <div className="space-y-5">
              {[contact.plant, contact.fiscal, contact.base].map(loc => (
                <div
                  key={loc.title}
                  className="rounded-xl border p-5 lg:p-6"
                  style={{ borderColor: '#E2E5E9', background: '#FFFFFF' }}
                >
                  <h3
                    className="mb-3 text-xs font-bold tracking-widest uppercase font-[family-name:var(--font-barlow)]"
                    style={{ color: '#136A26' }}
                  >
                    {loc.title}
                  </h3>
                  <address
                    className="not-italic text-sm leading-relaxed sm:text-[15px]"
                    style={{ color: '#4A5568' }}
                  >
                    {loc.lines.map(line => (
                      <p key={line}>{line}</p>
                    ))}
                  </address>
                </div>
              ))}

              <div
                className="rounded-xl border p-5 lg:p-6"
                style={{ borderColor: '#E2E5E9', background: '#FFFFFF' }}
              >
                <p
                  className="mb-4 text-xs font-bold tracking-widest uppercase font-[family-name:var(--font-barlow)]"
                  style={{ color: '#136A26' }}
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
                        className="text-base font-semibold transition-colors hover:text-[#FF0001] font-[family-name:var(--font-barlow)] sm:text-lg"
                        style={{ color: '#1A2228' }}
                      >
                        {phone.value}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-xl border p-5 lg:p-6"
                style={{ borderColor: '#E2E5E9', background: '#FFFFFF' }}
              >
                <p
                  className="mb-4 text-xs font-bold tracking-widest uppercase font-[family-name:var(--font-barlow)]"
                  style={{ color: '#136A26' }}
                >
                  Correos
                </p>
                <ul className="space-y-3">
                  {contact.emails.map(item => (
                    <li key={item.email}>
                      <p className="text-xs" style={{ color: '#8A9BAB' }}>
                        {item.label}
                      </p>
                      <a
                        href={`mailto:${item.email}`}
                        className="break-all text-sm font-semibold transition-colors hover:text-[#FF0001] font-[family-name:var(--font-barlow)] sm:text-[15px]"
                        style={{ color: '#1A2228' }}
                      >
                        {item.email}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-xl border p-5 lg:p-6"
                style={{ borderColor: '#E2E5E9', background: '#FFFFFF' }}
              >
                <p
                  className="mb-2 text-xs font-bold tracking-widest uppercase font-[family-name:var(--font-barlow)]"
                  style={{ color: '#136A26' }}
                >
                  Web institucional
                </p>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold transition-colors hover:text-[#FF0001] font-[family-name:var(--font-barlow)] sm:text-lg"
                  style={{ color: '#1A2228' }}
                >
                  gpservicios.com.ar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
