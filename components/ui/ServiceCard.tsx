'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface ServiceCardProps {
  slug: string
  title: string
  description: string
  tagline: string
  icon: React.ReactNode
  gradientFrom: string
  gradientTo: string
}

export default function ServiceCard({
  slug,
  title,
  description,
  tagline,
  icon,
  gradientFrom,
  gradientTo,
}: ServiceCardProps) {
  return (
    <motion.div
      className="relative group rounded-xl overflow-hidden min-h-[240px] sm:min-h-[280px]"
      style={{ background: '#2C3848' }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <motion.div
        className="service-card-bg absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        }}
        initial={{ filter: 'grayscale(1) brightness(0.4)' }}
        whileHover={{ filter: 'grayscale(0) brightness(0.55)' }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />

      <motion.div
        className="service-card-accent absolute left-0 top-0 bottom-0 w-1 origin-bottom"
        style={{ background: '#D0021B' }}
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
      />

      <div className="relative z-10 flex h-full min-h-[240px] flex-col p-5 sm:min-h-[280px] sm:p-7">
        <div
          className="mb-4 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12"
          style={{ background: 'rgba(255,255,255,0.1)' }}
        >
          <span style={{ color: '#2D7D46' }}>{icon}</span>
        </div>

        <p
          className="mb-2 text-[11px] font-semibold tracking-[0.18em] uppercase sm:text-xs"
          style={{ color: '#2D7D46' }}
        >
          {tagline}
        </p>

        <h3 className="mb-3 font-[family-name:var(--font-barlow)] text-lg font-bold leading-tight text-white sm:text-xl">
          {title}
        </h3>

        <motion.p
          className="service-card-desc flex-1 text-sm leading-relaxed"
          style={{ color: '#8A9BAB' }}
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
            className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold transition-colors hover:text-[--color-gp-red-light]"
            style={{ color: '#D0021B' }}
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
