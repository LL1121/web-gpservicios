'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface ServiceCardProps {
  slug: string
  title: string
  description: string
  tagline: string
  icon: React.ReactNode
  /** URL de imagen de fondo (Unsplash placeholder o foto real desde /public) */
  image: string
}

export default function ServiceCard({
  slug,
  title,
  description,
  tagline,
  icon,
  image,
}: ServiceCardProps) {
  return (
    <motion.div
      className="group relative min-h-[240px] overflow-hidden rounded-xl sm:min-h-[280px]"
      style={{ background: '#1A2228' }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {/* Foto de fondo — grayscale + oscurecida por defecto, color al hover */}
      <motion.div
        className="service-card-bg absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        initial={{ filter: 'grayscale(1) brightness(0.35)' }}
        whileHover={{ filter: 'grayscale(0) brightness(0.55)' }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />
      {/* Overlay degradado para contraste del texto */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(26,34,40,0.35) 0%, rgba(26,34,40,0.55) 55%, rgba(26,34,40,0.92) 100%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="service-card-accent absolute bottom-0 left-0 top-0 w-1 origin-bottom"
        style={{ background: '#FF0001' }}
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
      />

      <div className="relative z-10 flex h-full min-h-[240px] flex-col p-5 sm:min-h-[280px] sm:p-7">
        <div
          className="mb-4 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12"
          style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)' }}
        >
          <span style={{ color: '#FFFFFF' }}>{icon}</span>
        </div>

        <p
          className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-xs"
          style={{ color: '#1B8A33' }}
        >
          {tagline}
        </p>

        <h3 className="mb-3 font-[family-name:var(--font-barlow)] text-lg font-bold leading-tight text-white sm:text-xl">
          {title}
        </h3>

        <motion.p
          className="service-card-desc flex-1 text-sm leading-relaxed text-white/85"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          {description}
        </motion.p>

        <motion.div
          className="service-card-cta mt-4"
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Link
            href="/servicios"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-[--color-gp-red-light]"
            style={{ color: '#FF3334' }}
          >
            Ver servicio
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
