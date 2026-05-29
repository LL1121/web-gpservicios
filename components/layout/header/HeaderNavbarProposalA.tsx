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

const DARK_TEXT = '#1A2228'

export default function HeaderNavbarProposalA() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  /** La onda solo se muestra al scrollear; el menú móvil no la fuerza.
   *  Pero el color de los textos sí se vuelve claro cuando el drawer
   *  móvil está abierto (su fondo slate queda detrás del header). */
  const waveVisible = isScrolled
  const lightOnDark = isHome || waveVisible || mobileOpen
  const linkColor = lightOnDark ? '#FFFFFF' : DARK_TEXT
  const logoSubColor = lightOnDark ? 'rgba(255,255,255,0.75)' : 'rgba(26,37,53,0.65)'
  const hamburgerColor = lightOnDark ? '#FFFFFF' : DARK_TEXT

  const logoTransform =
    isDesktop && isScrolled
      ? 'translate(calc(-50% - 12px), calc(-50% + 24px))'
      : isDesktop
        ? 'translate(-50%, -50%)'
        : 'translateY(-50%)'

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
        <div
          className={`pointer-events-none absolute inset-0 h-full w-full transition-all duration-300 ease-out ${
            waveVisible
              ? 'translate-y-0 opacity-100'
              : '-translate-y-full opacity-0'
          }`}
          aria-hidden={!waveVisible}
        >
          <WaveBackground />
        </div>

        <Link
          href="/"
          className="absolute top-1/2 left-4 z-30 flex max-w-[calc(100%-4.5rem)] items-center gap-2 select-none transition-[color,transform] duration-300 ease-out sm:gap-2.5 lg:left-1/2 lg:max-w-none lg:gap-3"
          style={{ transform: logoTransform }}
          aria-label="GP Servicios — Inicio"
        >
          <div
            className="rounded-sm bg-white px-2 py-0.5 text-sm font-black tracking-tighter font-[family-name:var(--font-barlow)] sm:px-2.5 sm:py-1 sm:text-base"
            style={{ color: RED }}
          >
            GP
          </div>
          <div
            className="flex min-w-0 flex-col font-bold leading-tight font-[family-name:var(--font-barlow)] transition-colors duration-300 ease-out"
            style={{ color: linkColor }}
          >
            <span className="truncate text-[11px] tracking-[0.1em] sm:text-xs md:text-sm">
              GP SERVICIOS
            </span>
            <span
              className="hidden text-[9px] font-[family-name:var(--font-inter)] font-medium tracking-[0.2em] transition-colors duration-300 ease-out sm:block sm:text-[10px]"
              style={{ color: logoSubColor }}
            >
              S.R.L.
            </span>
          </div>
        </Link>

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
          className="absolute right-3 top-1/2 z-40 flex min-h-[44px] min-w-[44px] -translate-y-1/2 flex-col items-center justify-center gap-1.5 p-2 sm:right-4 lg:hidden"
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
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

      {/* Menú móvil: siempre cae desde el top por detrás del header (z-40 vs z-50).
          Con onda: la curva SVG queda como techo y los items asoman bajo ella.
          Sin onda: el slate del drawer cubre el área del header — los textos
          del navbar pasan a blanco (ver `lightOnDark`) para mantener contraste. */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 shadow-lg lg:hidden"
            style={{ background: SLATE, paddingTop: '5rem' }}
          >
            <nav className="mx-auto flex max-h-[min(calc(70vh+5rem),100dvh)] max-w-7xl flex-col gap-0.5 overflow-y-auto px-4 py-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
              {mainNavLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[48px] items-center rounded-lg px-3 py-3 text-base font-medium text-white transition-colors hover:bg-white/10 font-[family-name:var(--font-inter)]"
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
