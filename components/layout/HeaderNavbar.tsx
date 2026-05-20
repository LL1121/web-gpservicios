'use client'

import { useState, useEffect, useId } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { mainNavLinks } from '@/lib/navigation'

const SLATE = '#1b232e'
const RED = '#bd1720'
const SCROLL_THRESHOLD = 40

const inicioLink = mainNavLinks.find(l => l.href === '/')
const slateNavLinks = mainNavLinks.filter(l => l.href !== '/')

/** Paths calibrados para viewBox 1440×80 — proporción del manual de marca */
const RED_WAVE_PATH = 'M 0,0 L 0,80 C 420,80 650,25 900,20 L 1000,0 Z'
const SLATE_WAVE_PATH =
  'M 1440,0 L 1440,65 C 1200,65 1050,75 720,30 C 650,25 550,10 480,0 Z'

export default function HeaderNavbar() {
  const filterId = useId().replace(/:/g, '')
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const useLightText = isHome || isScrolled
  const linkColor = useLightText ? '#FFFFFF' : RED
  const linkMuted = useLightText ? 'rgba(255,255,255,0.9)' : '#8A9BAB'
  const linkHoverClass = isScrolled
    ? 'hover:text-red-300'
    : useLightText
      ? 'hover:text-gray-300'
      : 'hover:text-[#991219]'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isScrolled) setMobileOpen(false)
  }, [isScrolled])

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full overflow-hidden transition-all duration-300 ease-in-out ${
          isScrolled ? 'h-20' : 'h-24 bg-transparent md:h-28'
        }`}
        aria-label="Encabezado de navegación"
      >
        {/* Capa vectorial — visible solo al hacer scroll (modo compacto PDF) */}
        <div
          className={`pointer-events-none absolute inset-0 h-full w-full transition-all duration-300 ease-in-out ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={!isScrolled}
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter
                id={`pdf-layer-shadow-${filterId}`}
                x="-10%"
                y="-10%"
                width="120%"
                height="130%"
              >
                <feDropShadow
                  dx="-4"
                  dy="6"
                  stdDeviation="5"
                  floodOpacity="0.35"
                  floodColor="#000000"
                />
              </filter>
            </defs>
            <path d={RED_WAVE_PATH} fill={RED} />
            <path
              d={SLATE_WAVE_PATH}
              fill={SLATE}
              filter={`url(#pdf-layer-shadow-${filterId})`}
            />
          </svg>
        </div>

        {/* Interfaz encajada en la franja superior del SVG (h-12/h-14, no el alto total) */}
        <div className="absolute top-0 left-0 z-20 h-12 w-full md:h-14">
          <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Zona roja — identidad + Inicio */}
          <div className="flex min-w-0 items-center gap-3 md:gap-4">
            <Link href="/" className="group flex min-w-0 items-center gap-3 select-none md:gap-3.5">
              <div
                className={`shrink-0 rounded px-2.5 py-1 text-base font-black tracking-tighter shadow-md transition-transform group-hover:scale-[1.02] font-[family-name:var(--font-barlow)] ${
                  isScrolled ? 'bg-white' : ''
                }`}
                style={
                  isScrolled
                    ? { color: RED }
                    : { background: RED, color: '#FFFFFF' }
                }
              >
                GP
              </div>
              <div className="flex min-w-0 flex-col font-bold leading-none font-[family-name:var(--font-barlow)]">
                <span
                  className="truncate text-xs tracking-wider drop-shadow-sm transition-colors duration-300 md:text-sm"
                  style={{ color: linkColor }}
                >
                  GP SERVICIOS
                </span>
                <span
                  className="text-[9px] font-mono tracking-widest transition-colors duration-300 md:text-[10px]"
                  style={{ color: linkMuted }}
                >
                  S.R.L.
                </span>
              </div>
            </Link>

            {inicioLink && (
              <Link
                href={inicioLink.href}
                className={`hidden shrink-0 whitespace-nowrap text-xs font-semibold tracking-wide transition-colors duration-300 md:block md:text-sm ${linkHoverClass}`}
                style={{ color: linkColor }}
              >
                {inicioLink.label}
              </Link>
            )}
          </div>

          {/* Zona pizarra — navegación principal */}
          <nav
            className="hidden items-center gap-5 text-xs font-medium tracking-wide lg:flex lg:gap-6 lg:text-sm"
            aria-label="Secciones"
          >
            {slateNavLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap transition-colors duration-300 ${linkHoverClass}`}
                style={{ color: isScrolled ? '#FFFFFF' : linkColor }}
              >
                {link.label}
                {link.href === '/servicios' ? ' ▾' : ''}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="flex shrink-0 flex-col gap-1.5 p-2 lg:hidden"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className={`block h-0.5 w-6 rounded transition-all ${
                  i === 1 && mobileOpen ? 'opacity-0' : ''
                } ${i === 0 && mobileOpen ? 'translate-y-2 rotate-45' : ''} ${
                  i === 2 && mobileOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
                style={{ background: linkColor }}
              />
            ))}
          </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`fixed left-0 right-0 z-40 border-b border-white/10 shadow-lg lg:hidden ${
              isScrolled ? 'top-20' : 'top-24 md:top-28'
            }`}
            style={{ background: SLATE }}
          >
            <nav className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto px-4 py-4">
              {mainNavLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
