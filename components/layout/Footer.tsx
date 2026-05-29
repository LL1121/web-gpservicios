import Image from 'next/image'
import Link from 'next/link'
import { mainNavLinks, services } from '@/lib/navigation'
import { company, contact, quienesSomos } from '@/lib/site-content'

export default function Footer() {
  return (
    <footer style={{ background: '#1A2228' }}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="-mb-1 h-10 w-full sm:h-16 lg:h-20"
        style={{ display: 'block', background: '#FFFFFF' }}
      >
        <path
          d="M0,0 C240,80 480,0 720,40 C960,80 1200,0 1440,60 L1440,80 L0,80 Z"
          fill="#1A2228"
        />
      </svg>

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <div className="mb-10 grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4 lg:mb-14">
          <div className="lg:col-span-1">
            <Image
              src="/images/logogp.png"
              alt="GP Servicios SRL"
              width={325}
              height={174}
              sizes="13rem"
              className="mb-5 h-12 w-auto sm:h-14"
            />
            <span
              className="mb-3 block text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: '#8A9BAB' }}
            >
              {company.legalName}
            </span>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#8A9BAB' }}>
              {company.tagline} {quienesSomos.objetivo}
            </p>
            <div
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs"
              style={{ background: 'rgba(45,125,70,0.15)', color: '#1B8A33' }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path d="M8 2L13 4V9C13 12.3 11 14.5 8 15C5 14.5 3 12.3 3 9V4Z" strokeLinejoin="round" />
                <path d="M5.5 8.5l2 2 3-3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Sistema de Gestión Integrado
            </div>
          </div>

          <div>
            <h4
              className="text-xs font-bold tracking-[0.2em] uppercase mb-5 font-[family-name:var(--font-barlow)]"
              style={{ color: '#136A26' }}
            >
              Servicios
            </h4>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s.slug}>
                  <Link
                    href="/servicios"
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: '#8A9BAB' }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-xs font-bold tracking-[0.2em] uppercase mb-5 font-[family-name:var(--font-barlow)]"
              style={{ color: '#136A26' }}
            >
              Empresa
            </h4>
            <ul className="space-y-2.5">
              {mainNavLinks.map(n => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: '#8A9BAB' }}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-xs font-bold tracking-[0.2em] uppercase mb-5 font-[family-name:var(--font-barlow)]"
              style={{ color: '#136A26' }}
            >
              Contacto
            </h4>
            <address className="not-italic space-y-4 text-sm" style={{ color: '#8A9BAB' }}>
              <div className="flex gap-3">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 flex-shrink-0 mt-0.5"
                  style={{ color: '#FF0001' }}
                >
                  <path
                    fillRule="evenodd"
                    d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  {contact.plant.lines.map(line => (
                    <p key={line}>{line}</p>
                  ))}
                  <p className="mt-2" style={{ color: '#8A9BAB' }}>
                    {contact.fiscal.title}: {contact.fiscal.lines[0]}
                  </p>
                  <p>{contact.base.title}: {contact.base.lines[0]}</p>
                </div>
              </div>

              <div className="space-y-2">
                {contact.emails.slice(0, 2).map(e => (
                  <div key={e.email} className="flex items-start gap-3">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: '#FF0001' }}
                    >
                      <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                      <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                    </svg>
                    <div>
                      <p className="text-xs" style={{ color: '#4A5568' }}>
                        {e.label}
                      </p>
                      <a
                        href={`mailto:${e.email}`}
                        className="break-all text-sm transition-colors hover:text-white"
                        style={{ color: '#8A9BAB' }}
                      >
                        {e.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: '#FF0001' }}
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-2.034-8.997a5.502 5.502 0 0 0 4.077 0c.06.46.09.928.09 1.397 0 .46-.032.92-.09 1.37a5.503 5.503 0 0 0-4.077 0 9.98 9.98 0 0 1-.09-1.37c0-.469.03-.936.09-1.397Zm-.82-.327a10.118 10.118 0 0 0-.078 1.724 10.047 10.047 0 0 0 .08 1.647 5.5 5.5 0 0 1-2.83-2.25c.47-.59 1.094-1.073 1.827-1.121ZM5.5 10a4.5 4.5 0 0 0 4.5 4.5 4.5 4.5 0 0 0 4.5-4.5A4.5 4.5 0 0 0 10 5.5 4.5 4.5 0 0 0 5.5 10Z"
                    clipRule="evenodd"
                  />
                </svg>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: '#8A9BAB' }}
                >
                  gpservicios.com.ar
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div
            className="flex flex-col items-center justify-between gap-3 text-[13px] md:flex-row md:text-xs"
            style={{ color: '#4A5568' }}
          >
            <p>© {new Date().getFullYear()} {company.legalName} — Todos los derechos reservados.</p>
            <p>
              Diseño y desarrollo:{' '}
              <a
                href="https://lyntrix.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-colors hover:text-white"
                style={{ color: '#8A9BAB' }}
              >
                LYNTRIX
              </a>{' '}
              — 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
