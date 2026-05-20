'use client'

import { useEffect, useRef, useId } from 'react'
import { gsap } from 'gsap'

/**
 * Divisor GP — orden SVG estricto (atrás → adelante):
 * 1) Rojo institucional (panza alta, izquierda)
 * 2) Pizarra técnica (montada encima, derecha → centro)
 */
export default function HeaderWaveBrand() {
  const uid = useId().replace(/:/g, '')
  const containerRef = useRef<HTMLDivElement>(null)
  const redRef = useRef<SVGPathElement>(null)
  const slateRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(redRef.current, { opacity: 0, y: 28 })
      gsap.set(slateRef.current, { opacity: 0, y: 16 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Capa trasera primero, delantera después
      tl.to(redRef.current, { opacity: 1, y: 0, duration: 0.55 })
        .to(slateRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.25')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-20 md:h-24 overflow-hidden bg-white"
      aria-hidden="true"
    >
      <div
        className="absolute top-0 left-0 w-full h-0.5 md:h-1"
        style={{ background: 'color-mix(in srgb, var(--slate-tech) 12%, transparent)' }}
      />

      <svg
        className="absolute top-0 left-0 h-full w-full"
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id={`industrial-shadow-${uid}`}
            x="-5%"
            y="-5%"
            width="110%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="6"
              floodOpacity="0.18"
              floodColor="#000000"
            />
          </filter>
        </defs>

        {/* 1. CAPA TRASERA — Rojo (declarado primero = z-index inferior) */}
        <path
          ref={redRef}
          fill="var(--primary-red)"
          d="
            M 0 0
            L 0 128
            C 160 132 320 128 440 108
            C 560 88 660 62 760 50
            C 820 44 860 42 900 42
            L 900 0
            Z
          "
        />

        {/* 2. CAPA DELANTERA — Pizarra (declarado segundo = monta sobre el rojo) */}
        <path
          ref={slateRef}
          fill="var(--slate-tech)"
          filter={`url(#industrial-shadow-${uid})`}
          d="
            M 1440 0
            L 1440 94
            C 1240 96 1040 118 820 122
            C 640 118 520 88 440 58
            C 400 48 320 26 260 12
            C 230 6 210 0 188 0
            Z
          "
        />
      </svg>
    </div>
  )
}
