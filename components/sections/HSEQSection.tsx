'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTag from '@/components/ui/SectionTag'
import CurveDivider from '@/components/ui/CurveDivider'
import { politicasGestion } from '@/lib/site-content'

gsap.registerPlugin(ScrollTrigger)

export default function HSEQSection({ standalone = false }: { standalone?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Institutional copy reveal
      gsap.from('.hseq-intro > *', {
        opacity: 0,
        x: -30,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.hseq-intro',
          start: 'top 75%',
          once: true,
        },
      })

      // Commitment cards — sequential stagger as the user scrolls
      gsap.from('.commitment-item', {
        opacity: 0,
        y: 30,
        stagger: {
          each: 0.1,
          from: 'start',
        },
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.commitments-grid',
          start: 'top 70%',
          once: true,
        },
      })

      // Badge reveal
      gsap.from('.hseq-badge', {
        opacity: 0,
        scale: 0.85,
        duration: 0.7,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.hseq-badge',
          start: 'top 85%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="politicas-gestion" style={{ background: '#1A2228' }}>
      {!standalone && <CurveDivider fill="#1A2228" direction="up" />}

      <div
        className={`section-container max-w-7xl ${standalone ? '!pt-6 sm:!pt-8 lg:!pt-12' : '!pt-10 sm:!pt-12'}`}
      >
        <div className="mb-10 grid gap-8 sm:mb-12 lg:mb-16 lg:grid-cols-2 lg:gap-20">
          {/* Left — Institutional copy */}
          <div className="hseq-intro">
            <SectionTag label="Políticas de gestión" light className="mb-5" />
            <h2
              className="mb-6 font-[family-name:var(--font-barlow)] text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl"
            >
              HSEQ como{' '}
              <span style={{ color: '#136A26' }}>columna vertebral</span>{' '}
              de cada operación
            </h2>
            <p className="text-base lg:text-lg leading-relaxed mb-6" style={{ color: '#8A9BAB' }}>
              {politicasGestion.intro}
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#8A9BAB' }}>
              {politicasGestion.closing}
            </p>

            {/* SGI Badge */}
            <div className="hseq-badge mt-8 flex max-w-full flex-wrap items-center gap-3 rounded-xl border border-white/10 px-4 py-4 sm:mt-10 sm:gap-4 sm:px-6" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="flex-shrink-0">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-12 h-12" style={{ color: '#136A26' }}>
                  <path d="M24 6 L38 12 V24 C38 34 32 42 24 44 C16 42 10 34 10 24 V12 Z" strokeLinejoin="round" />
                  <path d="M18 24 l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="24" cy="24" r="2" fill="#136A26" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white font-[family-name:var(--font-barlow)]">
                  Sistema de Gestión Integrado
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#8A9BAB' }}>
                  Calidad · Seguridad · Medio Ambiente
                </p>
              </div>
            </div>
          </div>

          {/* Right — 8 commitments as scroll-revealed items */}
          <div className="commitments-grid space-y-3">
            {politicasGestion.commitments.map(c => (
              <div
                key={c.num}
                className="commitment-item flex gap-4 rounded-lg p-4 border border-white/5 transition-colors hover:border-white/15 hover:bg-white/5"
              >
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold font-[family-name:var(--font-barlow)]"
                  style={{ background: 'rgba(45,125,70,0.2)', color: '#136A26' }}
                >
                  {c.num}
                </span>
                <p className="text-[13px] leading-relaxed sm:text-xs" style={{ color: '#8A9BAB' }}>
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-10">
          {[
            { label: 'Compromisos', value: '8', sub: 'política de gestión' },
            { label: 'Trayectoria', value: '+20', sub: 'años en el rubro' },
            { label: 'Desde', value: '2013', sub: 'actividad comercial' },
            { label: 'Ámbito', value: 'SGI', sub: 'calidad · seguridad · ambiente' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p
                className="font-[family-name:var(--font-barlow)] font-extrabold text-2xl lg:text-3xl"
                style={{ color: '#FF0001' }}
              >
                {s.value}
              </p>
              <p className="text-xs font-semibold text-white mt-0.5">{s.label}</p>
              <p className="text-xs mt-0.5" style={{ color: '#8A9BAB' }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <CurveDivider fill="#F4F5F7" direction="down" />
    </section>
  )
}
