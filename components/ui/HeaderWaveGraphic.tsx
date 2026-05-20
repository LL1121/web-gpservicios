'use client'

import { useEffect, useRef, useId } from 'react'
import { gsap } from 'gsap'

/**
 * Bloque gráfico estático de ondas (NO fixed).
 * Se desplaza con el scroll natural de la página.
 */
export default function HeaderWaveGraphic() {
  const uid = useId().replace(/:/g, '')
  const blockRef = useRef<HTMLDivElement>(null)
  const redRef = useRef<SVGPathElement>(null)
  const slateRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([redRef.current, slateRef.current], { opacity: 0 })
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(redRef.current, { opacity: 1, duration: 0.55 })
        .to(slateRef.current, { opacity: 1, duration: 0.5 }, '-=0.25')
    }, blockRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={blockRef}
      className="relative w-full h-24 md:h-28 shrink-0"
      style={{ background: 'var(--slate-tech)' }}
      aria-hidden
    >
      <svg
        className="absolute bottom-0 left-0 h-full w-full"
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id={`wave-shadow-${uid}`}
            x="-5%"
            y="-5%"
            width="110%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.22" floodColor="#000000" />
          </filter>
        </defs>

        {/* Base pizarra — sin blanco residual */}
        <rect width="1440" height="140" fill="var(--slate-tech)" />

        {/* 1. Capa trasera — rojo: arco alto, recorrido largo hacia la derecha */}
        <path
          ref={redRef}
          fill="var(--primary-red)"
          d="M0,0 L0,118 C120,125 280,128 420,118 C580,102 740,72 920,58 C1020,50 1080,48 1180,48 L1180,0 Z"
        />

        {/* 2. Capa delantera — pizarra: corta, desde la derecha, monta sobre el rojo */}
        <path
          ref={slateRef}
          fill="var(--slate-tech)"
          filter={`url(#wave-shadow-${uid})`}
          d="M1440,0 L1440,92 C1280,96 1160,118 1020,120 C900,108 820,82 760,64 C700,44 640,22 600,0 Z"
        />
      </svg>
    </div>
  )
}
