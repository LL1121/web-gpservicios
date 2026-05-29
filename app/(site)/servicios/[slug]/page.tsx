import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageOffset from '@/components/ui/PageOffset'
import SectionTag from '@/components/ui/SectionTag'
import { servicesCatalog, servicesBySlug, company, contact } from '@/lib/site-content'
import type { ServiceSlug } from '@/lib/site-content'
import { serviceImages } from '@/lib/site-images'

export const dynamicParams = false

export function generateStaticParams() {
  return servicesCatalog.map(s => ({ slug: s.slug }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

function isServiceSlug(value: string): value is ServiceSlug {
  return Object.prototype.hasOwnProperty.call(servicesBySlug, value)
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  if (!isServiceSlug(slug)) return { title: 'Servicio no encontrado | GP Servicios SRL' }
  const service = servicesBySlug[slug]
  return {
    title: `${service.label} | ${company.shortName}`,
    description: service.shortDescription,
  }
}

export default async function ServicioDetailPage({ params }: PageProps) {
  const { slug } = await params
  if (!isServiceSlug(slug)) notFound()

  const service = servicesBySlug[slug]
  const image = serviceImages[slug]
  const adminPhone = contact.phones[0]
  const adminEmail = contact.emails[0]
  const otherServices = servicesCatalog.filter(s => s.slug !== slug).slice(0, 4)

  return (
    <PageOffset>
      {/* Hero del servicio */}
      <section className="relative isolate overflow-hidden" style={{ background: '#1A2228' }}>
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(180deg, rgba(26,34,40,0.72) 0%, rgba(26,34,40,0.85) 60%, rgba(26,34,40,0.96) 100%)',
          }}
          aria-hidden="true"
        />

        <div className="section-container max-w-7xl !pt-12 !pb-16 sm:!pt-16 sm:!pb-20 lg:!pt-20 lg:!pb-28">
          <nav
            className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-white/70 sm:text-sm"
            aria-label="Migas"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/servicios" className="transition-colors hover:text-white">
              Servicios
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">{service.label}</span>
          </nav>

          <SectionTag label={service.tagline} className="mb-4" light />
          <h1
            className="mb-5 max-w-3xl font-[family-name:var(--font-barlow)] text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl"
          >
            {service.label}
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
            {service.longDescription}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 font-[family-name:var(--font-barlow)] sm:w-auto"
              style={{ background: '#FF0001', boxShadow: '0 4px 18px rgba(255,0,1,0.35)' }}
            >
              Solicitar cotización
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10 font-[family-name:var(--font-barlow)] sm:w-auto"
            >
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Alcance + Aplicaciones */}
      <section style={{ background: '#FFFFFF' }}>
        <div className="section-container max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <SectionTag label="Alcance del servicio" className="mb-4" />
              <h2
                className="mb-6 font-[family-name:var(--font-barlow)] text-2xl font-extrabold leading-tight sm:text-3xl"
                style={{ color: '#1A2228' }}
              >
                Qué incluye
              </h2>
              <ul className="space-y-3">
                {service.scope.map(item => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-lg border p-4 text-sm leading-relaxed sm:text-base"
                    style={{ borderColor: '#E2E5E9', background: '#F4F5F7', color: '#4A5568' }}
                  >
                    <span
                      className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ background: '#136A26' }}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 20 20" fill="white" className="h-3 w-3">
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.29a1 1 0 0 1 0 1.42l-7.5 7.5a1 1 0 0 1-1.42 0l-3.5-3.5a1 1 0 1 1 1.42-1.42L8.5 12.08l6.79-6.79a1 1 0 0 1 1.414 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:col-span-5">
              <div
                className="rounded-2xl border p-6 lg:p-8"
                style={{ borderColor: '#E2E5E9', background: '#F4F5F7' }}
              >
                <SectionTag label="Aplicaciones" className="mb-4" />
                <h3
                  className="mb-5 font-[family-name:var(--font-barlow)] text-xl font-extrabold leading-tight sm:text-2xl"
                  style={{ color: '#1A2228' }}
                >
                  Casos típicos
                </h3>
                <ul className="space-y-2.5 text-sm leading-relaxed sm:text-[15px]" style={{ color: '#4A5568' }}>
                  {service.applications.map(item => (
                    <li key={item} className="flex gap-2.5">
                      <span
                        className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ background: '#FF0001' }}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className="mt-7 rounded-xl border p-5"
                  style={{ borderColor: '#E2E5E9', background: '#FFFFFF' }}
                >
                  <p
                    className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
                    style={{ color: '#136A26' }}
                  >
                    Coordinación operativa
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#4A5568' }}>
                    Para frentes de obra, programación de paradas o cotización de proyecto:
                  </p>
                  <div className="mt-4 space-y-2 text-sm" style={{ color: '#1A2228' }}>
                    <a
                      href={adminPhone.href}
                      className="block font-semibold transition-colors hover:text-[#FF0001]"
                    >
                      {adminPhone.value}
                    </a>
                    <a
                      href={`mailto:${adminEmail.email}`}
                      className="block break-all font-semibold transition-colors hover:text-[#FF0001]"
                    >
                      {adminEmail.email}
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Otros servicios */}
      <section style={{ background: '#F4F5F7' }}>
        <div className="section-container max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionTag label="Otros servicios" className="mb-3" />
              <h2
                className="font-[family-name:var(--font-barlow)] text-2xl font-extrabold leading-tight sm:text-3xl"
                style={{ color: '#1A2228' }}
              >
                Capacidades complementarias
              </h2>
            </div>
            <Link
              href="/servicios"
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
              style={{ color: '#FF0001' }}
            >
              Ver catálogo completo
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherServices.map(s => (
              <Link
                key={s.slug}
                href={`/servicios/${s.slug}`}
                className="group relative h-44 overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[--color-gp-red]"
                style={{ background: '#1A2228' }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${serviceImages[s.slug]})` }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(26,34,40,0.55) 0%, rgba(26,34,40,0.92) 100%)',
                  }}
                  aria-hidden="true"
                />
                <div className="relative z-10 flex h-full flex-col justify-end p-4">
                  <p
                    className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: '#1B8A33' }}
                  >
                    {s.tagline}
                  </p>
                  <p className="font-[family-name:var(--font-barlow)] text-base font-bold leading-tight text-white">
                    {s.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageOffset>
  )
}
