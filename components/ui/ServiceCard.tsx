'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface ServiceCardProps {
  slug: string
  title: string
  description: string
  tagline: string
  icon: React.ReactNode
  /** Gradient used as stand-in when no real photo is available */
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
      className="relative group rounded-xl overflow-hidden cursor-pointer"
      style={{ background: '#2C3848', minHeight: 280 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {/* Background image layer — grayscale by default, color on hover */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        }}
        initial={{ filter: 'grayscale(1) brightness(0.4)' }}
        whileHover={{ filter: 'grayscale(0) brightness(0.55)' }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />

      {/* Red left accent — slides in on hover */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 origin-bottom"
        style={{ background: '#D0021B' }}
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
      />

      {/* Content */}
      <div className="relative z-10 p-7 flex flex-col h-full" style={{ minHeight: 280 }}>
        {/* Icon */}
        <div
          className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center mb-4"
          style={{ background: 'rgba(255,255,255,0.1)' }}
        >
          <span style={{ color: '#2D7D46' }}>{icon}</span>
        </div>

        {/* Tagline — always visible */}
        <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: '#2D7D46' }}>
          {tagline}
        </p>

        {/* Title */}
        <h3
          className="font-[family-name:var(--font-barlow)] font-bold text-xl text-white leading-tight mb-3"
        >
          {title}
        </h3>

        {/* Description — slides up on hover */}
        <motion.p
          className="text-sm leading-relaxed flex-1"
          style={{ color: '#8A9BAB' }}
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          {description}
        </motion.p>

        {/* CTA link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-4"
        >
          <Link
            href={`/servicios/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-[--color-gp-red-light]"
            style={{ color: '#D0021B' }}
          >
            Ver detalle técnico
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
