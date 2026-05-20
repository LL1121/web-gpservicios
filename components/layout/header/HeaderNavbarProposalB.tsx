'use client'

/**
 * PROPUESTA B — Shell max-w-7xl + colchón de menú (58% der) con justify-between.
 */
import { useId, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { mainNavLinks } from '@/lib/navigation'
import { RED, RED_WAVE_PATH, SLATE, SLATE_WAVE_PATH_B } from './wave-assets'

const navItemClass =
  'inline-flex shrink-0 whitespace-nowrap text-[11px] font-medium tracking-[0.06em] text-white transition-opacity hover:opacity-85 font-[family-name:var(--font-inter)] lg:text-xs xl:text-sm'

export default function HeaderNavbarProposalB() {
  const uid = useId().replace(/:/g, '')
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header
        className="fixed top-0 left-0 z-50 isolate h-20 w-full overflow-hidden border-b border-black/5 bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]"
        aria-label="Navbar — Propuesta B"
        data-layout-test="proposal-b"
      >
        <div className="pointer-events-none absolute inset-0 z-0 bg-white" aria-hidden />

        <svg
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <filter id={`slate-shadow-${uid}`} x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="-4" dy="6" stdDeviation="5" floodOpacity="0.28" floodColor="#000" />
            </filter>
          </defs>
          <rect width="1440" height="80" fill="#ffffff" />
          <path d={RED_WAVE_PATH} fill={RED} />
          <path d={SLATE_WAVE_PATH_B} fill={SLATE} filter={`url(#slate-shadow-${uid})`} />
        </svg>

        <div className="relative z-10 mx-auto h-full w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-full w-full items-center">
            {/* Bloque identidad — polo izquierdo */}
            <div className="flex h-full shrink-0 items-center">
              <Link
                href="/"
                className="flex items-center gap-3 select-none md:gap-3.5"
                aria-label="GP Servicios — Inicio"
              >
                <div
                  className="rounded-sm bg-white px-2.5 py-1 text-sm font-black tracking-tighter shadow-sm font-[family-name:var(--font-barlow)] md:text-base"
                  style={{ color: RED }}
                >
                  GP
                </div>
                <div className="flex flex-col font-bold leading-tight text-white font-[family-name:var(--font-barlow)]">
                  <span className="text-xs tracking-[0.12em] md:text-sm">GP SERVICIOS</span>
                  <span className="text-[9px] font-[family-name:var(--font-inter)] font-medium tracking-[0.2em] text-white/75 md:text-[10px]">
                    S.R.L.
                  </span>
                </div>
              </Link>
            </div>

            {/* Colchón del menú — ~58% del shell, reparto igualitario interno */}
            <div
              className="ml-auto hidden h-full min-w-[50%] max-w-[62%] flex-[0_0_58%] items-center lg:flex"
              data-nav-cushion
            >
              <nav
                className="flex h-full w-full flex-nowrap items-center justify-between px-5 sm:px-6 xl:px-8"
                aria-label="Navegación principal"
              >
                {mainNavLinks.map(link => (
                  <Link key={link.href} href={link.href} className={navItemClass}>
                    {link.label}
                    {link.href === '/servicios' ? ' ▾' : ''}
                  </Link>
                ))}
              </nav>
            </div>

            <button
              type="button"
              className="ml-auto flex shrink-0 flex-col gap-1.5 p-2 lg:hidden"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setMobileOpen(v => !v)}
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className={`block h-0.5 w-5 rounded transition-all ${
                    i === 0 && mobileOpen ? 'translate-y-2 rotate-45 bg-white' : 'bg-[#1b232e]'
                  } ${i === 1 && mobileOpen ? 'opacity-0 bg-white' : ''} ${
                    i === 2 && mobileOpen ? '-translate-y-2 -rotate-45 bg-white' : 'bg-[#1b232e]'
                  }`}
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
            className="fixed left-0 right-0 top-20 z-40 border-b border-white/10 shadow-lg lg:hidden"
            style={{ background: SLATE }}
          >
            <nav className="mx-auto flex max-h-[70vh] max-w-7xl flex-col gap-1 overflow-y-auto px-4 py-4 sm:px-6">
              {mainNavLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10 font-[family-name:var(--font-inter)]"
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
