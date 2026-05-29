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

/**
 * Card de servicio uniforme:
 * - Altura fija por breakpoint (todas iguales).
 * - Imagen con tinte oscuro consistente (sin animaciones de hover sobre el texto).
 * - Toda la tarjeta es un Link al detalle del servicio.
 */
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
      className="h-full"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <Link
        href={`/servicios/${slug}`}
        aria-label={`Ver detalle del servicio ${title}`}
        className="group relative flex h-[360px] flex-col overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[--color-gp-red] focus-visible:ring-offset-2 sm:h-[380px]"
        style={{ background: '#1A2228' }}
      >
        {/* Imagen de fondo — el zoom es el único efecto en hover */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
        {/* Tinte oscuro uniforme en TODAS las cards */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(26,34,40,0.55) 0%, rgba(26,34,40,0.72) 55%, rgba(26,34,40,0.94) 100%)',
          }}
          aria-hidden="true"
        />
        {/* Acento rojo izquierdo al hover */}
        <div
          className="absolute bottom-0 left-0 top-0 w-1 origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100"
          style={{ background: '#FF0001' }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full flex-col p-5 sm:p-7">
          <div
            className="mb-4 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12"
            style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(4px)' }}
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

          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-white/85">
            {description}
          </p>

          <span
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:text-white"
            style={{ color: '#FF3334' }}
          >
            Ver servicio
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
