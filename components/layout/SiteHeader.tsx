'use client'

import { useState, useEffect, useRef, useId } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { mainNavLinks, services } from '@/lib/navigation'

const serviceIcons: Record<string, React.ReactNode> = {
  'soldadura-montaje': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M4 20 Q8 10 12 12 Q16 14 20 4" strokeLinecap="round" />
    </svg>
  ),
  'conexion-pozo': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M12 22V10M12 2v4" strokeLinecap="round" />
      <rect x="8" y="6" width="8" height="4" rx="1" />
    </svg>
  ),
  'pruebas-hidraulicas': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M12 2C8 8 4 10 4 15a8 8 0 0 0 16 0c0-5-4-7-8-13Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  prefabricados: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <rect x="4" y="10" width="16" height="8" rx="1" />
      <path d="M8 10V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" strokeLinecap="round" />
    </svg>
  ),
  'ingenieria-civil': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M3 21h18M5 21V9l7-6 7 6v12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

/** Altura total del bloque header (ondas) — usada para padding del hero */
export const SITE_HEADER_HEIGHT = 'h-[7.5rem] md:h-[10rem]'

export default function SiteHeader() {
  const uid = useId().replace(/:/g, '')
  const headerRef = useRef<HTMLElement>(null)
  const redRef = useRef<SVGPathElement>(null)
  const slateRef = useRef<SVGPathElement>(null)

  const [overLight, setOverLight] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setOverLight(window.scrollY > window.innerHeight * 0.65)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(redRef.current, { opacity: 0, y: 24 })
      gsap.set(slateRef.current, { opacity: 0, y: 14 })
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(redRef.current, { opacity: 1, y: 0, duration: 0.6 })
        .to(slateRef.current, { opacity: 1, y: 0, duration: 0.55 }, '-=0.28')
    }, headerRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const onDarkBg = !overLight
  const linkColor = onDarkBg ? '#FFFFFF' : '#1A2535'
  const linkMuted = onDarkBg ? 'rgba(255,255,255,0.65)' : '#8A9BAB'
  const linkHover = onDarkBg ? 'rgba(255,255,255,0.12)' : '#F4F5F7'

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 overflow-hidden"
      style={{ background: 'var(--slate-tech)' }}
    >
      {/* Ondas industriales — fondo real del menú */}
      <div className={`relative w-full ${SITE_HEADER_HEIGHT}`}>
        <svg
          className="absolute top-0 left-0 h-full w-full"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <filter
              id={`refined-shadow-${uid}`}
              x="-5%"
              y="-5%"
              width="110%"
              height="120%"
              colorInterpolationFilters="sRGB"
            >
              <feDropShadow dx="0" dy="10" stdDeviation="8" floodOpacity="0.22" floodColor="#000000" />
            </filter>
          </defs>

          {/* Relleno pizarra bajo las curvas → continuidad con el hero */}
          <rect x="0" y="0" width="1440" height="160" fill="var(--slate-tech)" />

          {/* 1. Capa trasera — rojo masivo, panza alta, pasa el centro */}
          <path
            ref={redRef}
            fill="var(--primary-red)"
            d="
              M 0 0
              L 0 148
              C 220 152 420 150 580 138
              C 720 118 860 72 980 58
              C 1040 52 1100 50 1180 50
              L 1180 0
              Z
            "
          />

          {/* 2. Capa delantera — pizarra corta, concentrada a la derecha */}
          <path
            ref={slateRef}
            fill="var(--slate-tech)"
            filter={`url(#refined-shadow-${uid})`}
            d="
              M 1440 0
              L 1440 108
              C 1340 110 1240 132 1080 136
              C 920 130 800 88 720 68
              C 660 56 580 32 520 14
              C 500 8 490 0 478 0
              Z
            "
          />
        </svg>
      </div>

      {/* Navbar integrado — transparente sobre las ondas */}
      <nav
        className="absolute top-0 left-0 z-10 w-full bg-transparent"
        aria-label="Navegación principal"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[4.5rem] md:h-20">
            <Link href="#inicio" className="flex items-center gap-2.5 flex-shrink-0">
              <svg viewBox="0 0 48 48" className="w-10 h-10 lg:w-11 lg:h-11 flex-shrink-0">
                <rect width="48" height="48" rx="4" fill="#D0021B" />
                <text x="24" y="32" textAnchor="middle" fontSize="22" fontWeight="800" fontFamily="Barlow, sans-serif" fill="white">
                  GP
                </text>
              </svg>
              <div className="hidden sm:block">
                <span
                  className="block text-sm font-bold tracking-widest uppercase leading-none font-[family-name:var(--font-barlow)] transition-colors duration-300"
                  style={{ color: linkColor }}
                >
                  GP SERVICIOS
                </span>
                <span
                  className="block text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
                  style={{ color: linkMuted }}
                >
                  S.R.L.
                </span>
              </div>
            </Link>

            <div className="hidden xl:flex items-center gap-0.5">
              {mainNavLinks.map(link => {
                if (link.href === '/servicios') {
                  return (
                    <div key={link.href} className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onMouseEnter={() => setServicesOpen(true)}
                        onClick={() => setServicesOpen(v => !v)}
                        aria-expanded={servicesOpen}
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors"
                        style={{ color: linkColor }}
                        onMouseOver={e => { e.currentTarget.style.background = linkHover }}
                        onMouseOut={e => { e.currentTarget.style.background = 'transparent' }}
                      >
                        {link.label}
                        <motion.svg animate={{ rotate: servicesOpen ? 180 : 0 }} viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                          <path d="M8 10.5 3 5.5h10L8 10.5Z" />
                        </motion.svg>
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            onMouseLeave={() => setServicesOpen(false)}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-white rounded-xl shadow-2xl border overflow-hidden"
                            style={{ borderColor: '#E2E5E9' }}
                          >
                            <div className="px-5 py-3 border-b" style={{ background: '#F4F5F7', borderColor: '#E2E5E9' }}>
                              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#2D7D46' }}>
                                Pilares operativos
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-1 p-2">
                              {services.map(s => (
                                <Link
                                  key={s.slug}
                                  href={`/servicios/${s.slug}`}
                                  onClick={() => setServicesOpen(false)}
                                  className="flex gap-2.5 p-3 rounded-lg hover:bg-[#F4F5F7] transition-colors group"
                                >
                                  <span className="text-[#2D7D46] group-hover:text-[#D0021B]">{serviceIcons[s.slug]}</span>
                                  <div>
                                    <p className="text-sm font-semibold font-[family-name:var(--font-barlow)]" style={{ color: '#1A2535' }}>{s.label}</p>
                                    <p className="text-xs mt-0.5 line-clamp-2" style={{ color: '#8A9BAB' }}>{s.description}</p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <div className="px-5 py-2.5 border-t" style={{ background: '#F4F5F7', borderColor: '#E2E5E9' }}>
                              <Link href="#servicios" onClick={() => setServicesOpen(false)} className="text-xs font-medium hover:text-[#D0021B]" style={{ color: '#1A2535' }}>
                                Ver sección de servicios →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium rounded-md transition-colors"
                    style={{ color: linkColor }}
                    onMouseOver={e => { e.currentTarget.style.background = linkHover }}
                    onMouseOut={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menú"
              className="xl:hidden flex flex-col gap-1.5 p-2"
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  animate={
                    mobileOpen
                      ? i === 0 ? { rotate: 45, y: 8 } : i === 1 ? { opacity: 0 } : { rotate: -45, y: -8 }
                      : { rotate: 0, y: 0, opacity: 1 }
                  }
                  className="block w-6 h-0.5 rounded"
                  style={{ background: linkColor }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-[4.5rem] left-0 right-0 z-20 xl:hidden border-b overflow-hidden"
            style={{ background: 'var(--slate-tech)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {mainNavLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/10 pt-2 mt-2">
                <p className="px-3 text-xs font-semibold uppercase tracking-widest mb-1 text-[#2D7D46]">Servicios</p>
                {services.map(s => (
                  <Link
                    key={s.slug}
                    href={`/servicios/${s.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-sm text-white/80"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
