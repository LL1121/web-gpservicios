'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ServiceCard from '@/components/ui/ServiceCard'
import SectionTag from '@/components/ui/SectionTag'
import { civilEngineeringTasks, servicesCatalog } from '@/lib/site-content'
import type { ServiceSlug } from '@/lib/site-content'

gsap.registerPlugin(ScrollTrigger)

const serviceIcons: Record<ServiceSlug, React.ReactNode> = {
  'soldadura-montaje': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path d="M4 20 Q8 10 12 12 Q16 14 20 4" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  'conexion-pozo': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path d="M12 22V10M12 2v4" strokeLinecap="round" />
      <rect x="8" y="6" width="8" height="4" rx="1" />
      <path d="M8 22h8" strokeLinecap="round" />
    </svg>
  ),
  'pruebas-hidraulicas': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path d="M12 2 C9 7 5 9 5 14 a7 7 0 0 0 14 0 c0-5-4-7-7-12Z" strokeLinecap="round" />
    </svg>
  ),
  'prefabricado-lac-pluspetrol': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <rect x="4" y="10" width="16" height="8" rx="1" />
      <path d="M8 10V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" strokeLinecap="round" />
    </svg>
  ),
  'modificacion-descargadero': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path d="M3 21h18M6 21V8l6-4 6 4v13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'ingenieria-civil': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path d="M3 21h18M5 21V9l7-6 7 6v12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'arenado-pintura': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path d="M4 20h16M8 20V8l4-4 4 4v12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'movimiento-suelo': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path d="M2 18h20M6 18l2-8h8l2 8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

const gradients: Record<ServiceSlug, { from: string; to: string; tagline: string }> = {
  'soldadura-montaje': { from: '#1A2535', to: '#2C3848', tagline: 'Core operativo' },
  'conexion-pozo': { from: '#1F2D3F', to: '#243348', tagline: 'Campo' },
  'pruebas-hidraulicas': { from: '#1A2535', to: '#2A3441', tagline: 'Integridad' },
  'prefabricado-lac-pluspetrol': { from: '#1F2D3F', to: '#2C3848', tagline: 'Pluspetrol' },
  'modificacion-descargadero': { from: '#1A2535', to: '#243348', tagline: 'Descargadero' },
  'ingenieria-civil': { from: '#1A2535', to: '#243348', tagline: 'Obras civiles' },
  'arenado-pintura': { from: '#1F2D3F', to: '#2C3848', tagline: 'Recubrimiento' },
  'movimiento-suelo': { from: '#1A2535', to: '#2C3848', tagline: 'Terreno' },
}

const serviceCards = servicesCatalog.map(s => {
  const g = gradients[s.slug]
  const description =
    s.slug === 'ingenieria-civil'
      ? `${s.shortDescription} Incluye: ${civilEngineeringTasks.join('; ')}.`
      : s.shortDescription

  return {
    slug: s.slug,
    title: s.label,
    tagline: g.tagline,
    description,
    icon: serviceIcons[s.slug],
    gradientFrom: g.from,
    gradientTo: g.to,
  }
})

export default function ServicesSection({ standalone = false }: { standalone?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-header > *', {
        opacity: 0,
        y: 24,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.service-header',
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.service-card-wrapper', {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 75%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="servicios" style={{ background: '#F4F5F7' }}>
      <div
        className={`section-container max-w-7xl !pb-16 sm:!pb-24 lg:!pb-32 ${standalone ? '!pt-6 sm:!pt-8 lg:!pt-12' : ''}`}
      >
        <div className="service-header mb-8 flex flex-col sm:mb-10 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionTag label="Servicios" className="mb-4" />
            <h2
              className="font-[family-name:var(--font-barlow)] text-2xl font-extrabold sm:text-3xl lg:text-4xl xl:text-5xl"
              style={{ color: '#1A2535' }}
            >
              Gama de servicios{' '}
              <span style={{ color: '#D0021B' }}>para Oil & Gas</span>
            </h2>
          </div>
          <p className="mt-4 max-w-full text-sm sm:text-base lg:mt-0 lg:max-w-md lg:text-right" style={{ color: '#8A9BAB' }}>
            Catálogo operativo según carpeta institucional y sitio gpservicios.com.ar: desde soldadura
            y montaje hasta ingeniería civil, arenado y movimiento de suelo.
          </p>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {serviceCards.map(s => (
            <div key={s.slug} className="service-card-wrapper">
              <ServiceCard {...s} />
            </div>
          ))}
        </div>

        {!standalone && (
          <div className="mt-12 text-center">
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 font-[family-name:var(--font-barlow)]"
              style={{ background: '#1A2535', boxShadow: '0 4px 16px rgba(26,37,53,0.2)' }}
            >
              Ver todos los servicios
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
