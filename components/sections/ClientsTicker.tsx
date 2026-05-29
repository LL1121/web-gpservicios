'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import SectionTag from '@/components/ui/SectionTag'
/**
 * Logos en SVG estilizados con la identidad de cada operadora.
 * `url` = sitio oficial (verificar con el cliente y ajustar si difiere).
 */
interface ClientItem {
  id: string
  name: string
  brandColor: string
  logo: React.ReactNode
  url?: string
}

const clients: ClientItem[] = [
  {
    id: 'ypf',
    name: 'YPF',
    brandColor: '#005DA4',
    url: 'https://www.ypf.com',
    logo: (
      <svg viewBox="0 0 80 32" className="h-8 w-auto">
        <rect width="80" height="32" rx="4" fill="currentColor" />
        <text x="40" y="22" textAnchor="middle" fontSize="14" fontWeight="800" fontFamily="Barlow, sans-serif" fill="white">
          YPF
        </text>
      </svg>
    ),
  },
  {
    id: 'exxon',
    name: 'ExxonMobil',
    brandColor: '#C8102E',
    url: 'https://corporate.exxonmobil.com.ar',
    logo: (
      <svg viewBox="0 0 120 32" className="h-8 w-auto">
        <text x="4" y="24" fontSize="18" fontWeight="800" fontFamily="Barlow, sans-serif" fill="currentColor" letterSpacing="-0.5">
          Exx
          <tspan fill="#EF3340">on</tspan>
          Mobil
        </text>
      </svg>
    ),
  },
  {
    id: 'pluspetrol',
    name: 'Pluspetrol',
    brandColor: '#005BAA',
    url: 'https://www.pluspetrol.net',
    logo: (
      <svg viewBox="0 0 120 32" className="h-8 w-auto">
        <text x="4" y="22" fontSize="13" fontWeight="700" fontFamily="Barlow, sans-serif" fill="currentColor">
          pluspetrol
        </text>
      </svg>
    ),
  },
  {
    id: 'capex',
    name: 'CAPEX',
    brandColor: '#1A2228',
    url: 'https://www.capex.com.ar',
    logo: (
      <svg viewBox="0 0 90 32" className="h-8 w-auto">
        <text x="4" y="22" fontSize="16" fontWeight="800" fontFamily="Barlow, sans-serif" fill="currentColor" letterSpacing="2">
          CAPEX
        </text>
      </svg>
    ),
  },
  {
    id: 'gyp',
    name: 'Gas y Petróleo del Neuquén',
    brandColor: '#E8751A',
    url: 'https://www.gypnqn.com.ar',
    logo: (
      <svg viewBox="0 0 80 32" className="h-8 w-auto">
        <text x="4" y="24" fontSize="22" fontWeight="800" fontFamily="Barlow, sans-serif" fill="currentColor">
          GyP
        </text>
        <text x="40" y="24" fontSize="8" fontWeight="400" fontFamily="Inter, sans-serif" fill="currentColor" opacity="0.7">
          10 años
        </text>
      </svg>
    ),
  },
  {
    id: 'tecsa',
    name: 'TECSA',
    brandColor: '#1A2228',
    url: 'https://www.tecsa.com.ar',
    logo: (
      <svg viewBox="0 0 90 32" className="h-8 w-auto">
        <text x="4" y="22" fontSize="15" fontWeight="800" fontFamily="Barlow, sans-serif" fill="currentColor" letterSpacing="2">
          TECSA
        </text>
      </svg>
    ),
  },
  {
    id: 'ops',
    name: 'OPS S.A.C.I.',
    brandColor: '#0057A8',
    logo: (
      <svg viewBox="0 0 80 32" className="h-8 w-auto">
        <text x="4" y="22" fontSize="18" fontWeight="800" fontFamily="Barlow, sans-serif" fill="currentColor">
          OPS
        </text>
        <text x="4" y="30" fontSize="7" fontWeight="400" fontFamily="Inter, sans-serif" fill="currentColor" opacity="0.7">
          S.A.C.I.
        </text>
      </svg>
    ),
  },
  {
    id: 'patagonia',
    name: 'Patagonia Field Services',
    brandColor: '#C8102E',
    logo: (
      <svg viewBox="0 0 140 32" className="h-8 w-auto">
        <text x="4" y="22" fontSize="13" fontWeight="700" fontFamily="Barlow, sans-serif" fill="currentColor">
          PATAGONIA
        </text>
        <text x="4" y="30" fontSize="8" fontWeight="400" fontFamily="Inter, sans-serif" fill="currentColor" opacity="0.7">
          Field Services
        </text>
      </svg>
    ),
  },
  {
    id: 'simetra',
    name: 'SIMETRA Service',
    brandColor: '#2C6FAC',
    logo: (
      <svg viewBox="0 0 100 32" className="h-8 w-auto">
        <text x="4" y="22" fontSize="14" fontWeight="700" fontFamily="Barlow, sans-serif" fill="currentColor">
          SIMETRA
        </text>
        <text x="4" y="30" fontSize="8" fontWeight="400" fontFamily="Inter, sans-serif" fill="currentColor" opacity="0.7">
          Service S.R.L.
        </text>
      </svg>
    ),
  },
]

function ClientLogo({ client }: { client: ClientItem }) {
  const motionInner = (
    <motion.div
      className="flex flex-shrink-0 items-center justify-center px-5 py-4 sm:px-8"
      style={{ color: '#C8CBD0' }}
      whileHover={{ color: client.brandColor, scale: 1.08 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      title={client.url ? `${client.name} — ir al sitio oficial` : client.name}
    >
      {client.logo}
    </motion.div>
  )

  if (!client.url) {
    return <div aria-label={client.name}>{motionInner}</div>
  }

  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${client.name} — abrir sitio oficial en pestaña nueva`}
      className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[--color-gp-red]"
    >
      {motionInner}
    </a>
  )
}

export default function ClientsTicker({ standalone = false }: { standalone?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Measure single set width after mount
    const singleSetWidth = track.scrollWidth / 2

    tweenRef.current = gsap.to(track, {
      x: `-=${singleSetWidth}`,
      duration: singleSetWidth / 60, // ~60px per second
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % singleSetWidth),
      },
    })

    // Pause on hover
    const handleMouseEnter = () => tweenRef.current?.pause()
    const handleMouseLeave = () => tweenRef.current?.resume()
    track.parentElement?.addEventListener('mouseenter', handleMouseEnter)
    track.parentElement?.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      tweenRef.current?.kill()
      track.parentElement?.removeEventListener('mouseenter', handleMouseEnter)
      track.parentElement?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section id="clientes" className="bg-white">
      <div className={`section-container max-w-none !py-12 sm:!py-16 lg:!py-20 ${standalone ? '!pt-6 sm:!pt-8 lg:!pt-12' : ''}`}>
        <div className="mx-auto mb-8 max-w-7xl px-4 text-center sm:mb-10 sm:px-6 lg:px-8">
          <SectionTag label="Clientes y Operadoras" className="mb-4 justify-center" />
          <h2
            className="font-[family-name:var(--font-barlow)] text-2xl font-extrabold sm:text-3xl lg:text-4xl"
            style={{ color: '#1A2228' }}
          >
            Las operadoras que{' '}
            <span style={{ color: '#FF0001' }}>confían en GP</span>
          </h2>
          <p className="mt-3 text-sm max-w-md mx-auto" style={{ color: '#8A9BAB' }}>
            Clientes y operadoras del sector Petróleo y Gas en Neuquén y la Patagonia.
          </p>
        </div>

        {/* Ticker — overflow hidden container */}
        <div className="relative overflow-hidden">
          {/* Fade masks left/right */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-10 sm:w-16 md:w-24"
            style={{ background: 'linear-gradient(to right, white, transparent)' }}
          />
          <div
            className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-10 sm:w-16 md:w-24"
            style={{ background: 'linear-gradient(to left, white, transparent)' }}
          />

          <div
            ref={trackRef}
            className="ticker-track items-center border-t border-b border-[--color-gp-gray-tech]"
            style={{ display: 'flex', width: 'max-content' }}
          >
            {/* Duplicate for seamless loop */}
            {[...clients, ...clients].map((c, i) => (
              <ClientLogo key={`${c.id}-${i}`} client={c} />
            ))}
          </div>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: '#C8CBD0' }}>
          Hacé clic en cada logo para ir al sitio oficial de la operadora
        </p>
      </div>
    </section>
  )
}
