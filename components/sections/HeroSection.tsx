'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import SectionTag from '@/components/ui/SectionTag'
import { company, quienesSomos } from '@/lib/site-content'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(tagRef.current, { opacity: 0, x: -20, duration: 0.6 })
        .from(headlineRef.current, { opacity: 0, y: 40, duration: 0.8 }, '-=0.3')
        .from(ctasRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.35')
        .from(badgesRef.current, { opacity: 0, y: 10, duration: 0.5 }, '-=0.3')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative flex min-h-[calc(100svh-5rem)] items-center overflow-hidden pt-20 sm:min-h-[85vh] sm:pt-24 md:pt-28"
      style={{ background: '#1b232e' }}
    >
      {/* Background image with curved mask */}
      <div className="absolute inset-0">
        {/* Placeholder gradient that simulates a field operation photo */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at 70% 50%, #32434F 0%, #1A2228 60%, #0D1620 100%)',
          }}
        />
        {/* SVG clip-path to create the organic curved edge on the image side */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-2/3 xl:w-3/5">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 800 900"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <clipPath id="hero-clip">
                <path d="M180,0 C120,150 60,300 80,450 C60,600 100,750 80,900 L800,900 L800,0 Z" />
              </clipPath>
            </defs>
            {/* Image would be placed here — using a gradient stand-in */}
            <rect
              width="800"
              height="900"
              fill="url(#hero-img-gradient)"
              clipPath="url(#hero-clip)"
            />
            <defs>
              <linearGradient id="hero-img-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#32434F" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#1A2228" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0D1620" stopOpacity="0.9" />
              </linearGradient>
            </defs>
          </svg>
          {/* Real image with clip-path via CSS */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 15% 100%, 8% 50%)',
              background: 'linear-gradient(135deg, #32434F 0%, #1A2228 100%)',
            }}
          />
        </div>

        {/* Bottom wave transition */}
        <svg
          className="absolute bottom-0 left-0 right-0 h-10 w-full sm:h-16 lg:h-20"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C240,20 480,80 720,40 C960,0 1200,60 1440,20 L1440,80 Z"
            fill="#F4F5F7"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-2 sm:px-6 sm:pb-24 lg:px-8 md:pb-32">
        <div className="max-w-2xl xl:max-w-3xl">

          {/* Section tag */}
          <div ref={tagRef} className="mb-6">
            <SectionTag label={`${company.sector} — Neuquén, Argentina`} light />
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-[family-name:var(--font-barlow)] font-extrabold text-white leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(1.875rem, 6vw, 4.5rem)' }}
          >
            Ingeniería, construcción y{' '}
            <span style={{ color: '#FF0001' }}>montaje industrial</span>
          </h1>

          <p className="mb-8 max-w-4xl text-base font-normal leading-relaxed text-gray-300 sm:mb-10 sm:text-lg md:text-xl">
            {quienesSomos.intro}
          </p>

          {/* CTAs */}
          <div ref={ctasRef} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="#explorar"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 font-[family-name:var(--font-barlow)] sm:w-auto"
              style={{
                background: '#FF0001',
                boxShadow: '0 4px 20px rgba(189,23,32,0.4)',
              }}
            >
              Explorar el sitio
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href="/quienes-somos"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border px-7 py-3.5 text-sm font-bold transition-all hover:bg-white/10 font-[family-name:var(--font-barlow)] sm:w-auto"
              style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
            >
              Conocer la Empresa
            </Link>
          </div>

          {/* Trust badges */}
          <div ref={badgesRef} className="mt-10 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/10 pt-6 sm:mt-14 sm:flex sm:flex-wrap sm:items-center sm:gap-6 sm:pt-8">
            {[
              { label: '2013', sub: 'actividad comercial' },
              { label: '+20', sub: 'años en el rubro' },
              { label: 'SGI', sub: 'gestión integrada' },
              { label: 'Oil & Gas', sub: 'sector principal' },
            ].map(b => (
              <div key={b.label} className="text-center">
                <p
                  className="text-2xl font-extrabold leading-none font-[family-name:var(--font-barlow)]"
                  style={{ color: '#FF0001' }}
                >
                  {b.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#8A9BAB' }}>
                  {b.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-40 md:flex">
        <span className="text-xs tracking-widest text-white uppercase">Scroll</span>
        <svg className="w-4 h-4 text-white animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
