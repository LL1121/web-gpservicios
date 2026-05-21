'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionTag from '@/components/ui/SectionTag'
import { homeExploreLinks } from '@/lib/navigation'

export default function HomeSectionNav() {
  return (
    <section
      id="explorar"
      className="relative"
      style={{ background: '#F4F5F7' }}
    >
      <div className="section-container max-w-7xl !py-12 sm:!py-16 lg:!py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <SectionTag label="Navegación del sitio" className="justify-center mb-4" />
          <h2
            className="font-[family-name:var(--font-barlow)] font-extrabold text-2xl lg:text-3xl"
            style={{ color: '#1A2535' }}
          >
            ¿Querés profundizar?
          </h2>
          <p className="mt-3 text-sm lg:text-base" style={{ color: '#8A9BAB' }}>
            Elegí una sección para conocer el detalle institucional, técnico y operativo de GP Servicios.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {homeExploreLinks.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <Link
                href={item.href}
                className="group flex flex-col h-full rounded-xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ borderColor: '#E2E5E9' }}
              >
                <span
                  className="block w-8 h-1 rounded-full mb-4 transition-all group-hover:w-12"
                  style={{ background: item.accent }}
                />
                <h3
                  className="font-[family-name:var(--font-barlow)] font-bold text-lg mb-2 transition-colors group-hover:text-[#D0021B]"
                  style={{ color: '#1A2535' }}
                >
                  {item.label}
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: '#8A9BAB' }}>
                  {item.description}
                </p>
                <span
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold"
                  style={{ color: '#2D7D46' }}
                >
                  Ir a la sección
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
