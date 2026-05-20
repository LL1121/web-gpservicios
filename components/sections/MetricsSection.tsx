'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CurveDivider from '@/components/ui/CurveDivider'
import SectionTag from '@/components/ui/SectionTag'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  {
    value: 20,
    prefix: '+',
    suffix: '',
    label: 'Años de trayectoria técnica en Petróleo y Gas',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <circle cx="20" cy="20" r="16" />
        <path d="M20 10v10l6 4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 32 Q10 28 14 30" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: 10,
    prefix: '+',
    suffix: '',
    label: 'Operadoras en cartera activa YPF · ExxonMobil · Pluspetrol',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <rect x="8" y="14" width="24" height="18" rx="2" />
        <path d="M14 14V10a6 6 0 0 1 12 0v4" strokeLinecap="round" />
        <circle cx="20" cy="23" r="2" />
        <path d="M20 25v4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: 100,
    prefix: '',
    suffix: '%',
    label: 'Cumplimiento HSEQ bajo Sistema de Gestión Integrado',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path d="M20 6 L32 11 V20 C32 28 26 34 20 36 C14 34 8 28 8 20 V11 Z" strokeLinejoin="round" />
        <path d="M14 20 l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: 1,
    prefix: '',
    suffix: '',
    label: 'Base operativa propia — Parque Industrial Centenario, Neuquén',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path d="M20 4 C12 4 6 10 6 18 C6 28 20 38 20 38 C20 38 34 28 34 18 C34 10 28 4 20 4Z" strokeLinejoin="round" />
        <circle cx="20" cy="18" r="4" />
      </svg>
    ),
  },
]

export default function MetricsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      counterRefs.current.forEach((el, i) => {
        if (!el) return
        const target = metrics[i].value
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
          onUpdate() {
            el.textContent = Math.round(obj.val).toString()
          },
        })
      })

      // Card reveal stagger
      gsap.from('.metric-card', {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="metricas" style={{ background: '#F4F5F7' }}>
      <CurveDivider fill="#F4F5F7" direction="up" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center mb-14">
          <SectionTag label="Credenciales Técnicas" className="justify-center mb-4" />
          <h2
            className="font-[family-name:var(--font-barlow)] font-extrabold text-3xl lg:text-4xl"
            style={{ color: '#1A2535' }}
          >
            Respaldo que las operadoras exigen
          </h2>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: '#8A9BAB' }}>
            Nuestra trayectoria habla por sí misma en cada auditoría técnica y de seguridad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="metric-card relative bg-white rounded-xl p-8 text-center border border-[--color-gp-gray-tech] overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Red top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
                style={{ background: '#D0021B' }}
              />

              {/* Icon */}
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-5 transition-colors"
                style={{ background: '#F4F5F7', color: '#2D7D46' }}
              >
                {m.icon}
              </div>

              {/* Counter */}
              <p
                className="font-[family-name:var(--font-barlow)] font-extrabold leading-none mb-2"
                style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: '#1A2535' }}
              >
                {m.prefix}
                <span
                  ref={el => { counterRefs.current[i] = el }}
                >
                  0
                </span>
                {m.suffix}
              </p>

              {/* Label */}
              <p className="text-sm leading-snug" style={{ color: '#8A9BAB' }}>
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
