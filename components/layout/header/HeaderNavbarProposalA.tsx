'use client'

/**
 * Navbar estándar — logo y links rojos anclados al viewport (izq);
 * menú pizarra en shell max-w-7xl (der). Onda roja: path PDF original sin cambios.
 *
 * En home (/) el hero es oscuro → texto blanco por defecto.
 * En el resto, el top es claro → texto oscuro, transiciona a blanco cuando aparece la onda al scrollear.
 */
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { mainNavLinks } from '@/lib/navigation'
import WaveBackground from './WaveBackground'
import { RED, SLATE } from './wave-assets'

const SCROLL_THRESHOLD = 40

const RED_HREFS = new Set(['/', '/quienes-somos', '/politicas-gestion'])
const redZoneLinks = mainNavLinks.filter(l => RED_HREFS.has(l.href))
const slateNavLinks = mainNavLinks.filter(l => !RED_HREFS.has(l.href))

const DARK_TEXT = '#1A2535'

export default function HeaderNavbarProposalA() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /** Texto blanco si hay fondo oscuro (hero del home o la onda ya bajó). */
  const lightOnDark = isHome || isScrolled
  const linkColor = lightOnDark ? '#FFFFFF' : DARK_TEXT
  const logoSubColor = lightOnDark ? 'rgba(255,255,255,0.75)' : 'rgba(26,37,53,0.65)'
  const hamburgerColor = lightOnDark ? '#FFFFFF' : DARK_TEXT

  const linkBaseClass =
    'whitespace-nowrap text-xs font-semibold tracking-[0.08em] transition-colors duration-300 ease-out hover:opacity-80 font-[family-name:var(--font-inter)] md:text-sm'

  const slateLinkClass =
    'whitespace-nowrap text-[11px] font-medium tracking-[0.06em] transition-colors duration-300 ease-out hover:opacity-80 md:text-xs lg:text-sm'

  return (
    <>
      <header
        className="fixed top-0 left-0 z-50 h-20 w-full overflow-hidden"
        aria-label="Encabezado de navegación"
      >
        {/* Fondo SVG: oculto al inicio, se despliega hacia abajo al scrollear */}
        <div
          className={`pointer-events-none absolute inset-0 h-full w-full transition-all duration-300 ease-out ${
            isScrolled
              ? 'translate-y-0 opacity-100'
              : '-translate-y-full opacity-0'
          }`}
          aria-hidden={!isScrolled}
        >
          <WaveBackground />
        </div>

        {/* Logo: centrado en estado inicial; al scrollear baja para
            esquivar el lomo de las ondas que se despliegan. */}
        <Link
          href="/"
          className="absolute top-1/2 left-1/2 z-30 flex items-center gap-2.5 select-none transition-transform duration-300 ease-out md:gap-3"
          style={{
            transform: `translate(calc(-50% - ${isScrolled ? '12px' : '0px'}), calc(-50% + ${isScrolled ? '24px' : '0px'}))`,
          }}
          aria-label="GP Servicios — Inicio"
        >
          <div
            className="rounded-sm bg-white px-2.5 py-1 text-base font-black tracking-tighter font-[family-name:var(--font-barlow)]"
            style={{ color: RED }}
          >
            GP
          </div>
          <div
            className="flex flex-col font-bold leading-tight font-[family-name:var(--font-barlow)] transition-colors duration-300 ease-out"
            style={{ color: linkColor }}
          >
            <span className="text-xs tracking-[0.12em] md:text-sm">GP SERVICIOS</span>
            <span
              className="text-[9px] font-[family-name:var(--font-inter)] font-medium tracking-[0.2em] md:text-[10px] transition-colors duration-300 ease-out"
              style={{ color: logoSubColor }}
            >
              S.R.L.
            </span>
          </div>
        </Link>

        {/* Onda roja (izquierda): 3 botones */}
        <div className="absolute top-[calc(50%-10px)] left-3 z-30 hidden -translate-y-1/2 items-center gap-5 sm:left-4 lg:left-6 lg:flex lg:gap-6 xl:left-8 xl:gap-8">
          {redZoneLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={linkBaseClass}
              style={{ color: linkColor }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <nav
          className="absolute top-[calc(50%-10px)] right-3 z-30 hidden shrink-0 -translate-y-1/2 items-center gap-5 font-[family-name:var(--font-inter)] sm:right-4 lg:right-6 lg:flex lg:gap-7 xl:right-8 xl:gap-9"
          style={{ color: linkColor }}
          aria-label="Secciones"
        >
          {slateNavLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={slateLinkClass}
              style={{ color: linkColor }}
            >
              {link.label}
              {link.href === '/servicios' ? ' ▾' : ''}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="absolute right-3 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-1.5 p-2 sm:right-4 lg:hidden"
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMobileOpen(v => !v)}
        >
          {[0, 1, 2].map(i => {
            const open = mobileOpen
            const transform =
              i === 0 && open
                ? 'translate-y-2 rotate-45'
                : i === 2 && open
                  ? '-translate-y-2 -rotate-45'
                  : ''
            const opacity = i === 1 && open ? 'opacity-0' : ''
            return (
              <span
                key={i}
                className={`block h-0.5 w-5 rounded transition-all duration-300 ${transform} ${opacity}`}
                style={{ background: open ? '#FFFFFF' : hamburgerColor }}
              />
            )
          })}
        </button>
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
