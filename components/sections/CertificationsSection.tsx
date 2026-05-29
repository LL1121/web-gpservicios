'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionTag from '@/components/ui/SectionTag'
import { certifications, type Certification } from '@/lib/certifications'

function CertCard({ cert, onView }: { cert: Certification; onView: () => void }) {
  const hasFile = Boolean(cert.fileUrl)

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-md"
      style={{ borderColor: '#E2E5E9', boxShadow: '0 8px 28px -10px rgba(26,34,40,0.18)' }}
    >
      <div
        className="relative flex h-44 items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${cert.accent}26 0%, ${cert.accent}14 60%, #F4F5F7 100%)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.45) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />
        <div
          className="relative flex h-20 w-20 items-center justify-center rounded-full text-white shadow-md"
          style={{ background: cert.accent }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-9 w-9">
            <path
              d="M12 2l3 2 3-1 1 3 3 1-1 3 2 3-2 3 1 3-3 1-1 3-3-1-3 2-3-2-3 1-1-3-3-1 1-3-2-3 2-3-1-3 3-1 1-3 3 1 3-2z"
              strokeLinejoin="round"
            />
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: cert.accent }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: cert.accent }}
            aria-hidden="true"
          />
          {cert.validity}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p
          className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: cert.accent }}
        >
          {cert.standard}
        </p>
        <h3
          className="mb-2 font-[family-name:var(--font-barlow)] text-lg font-bold leading-tight"
          style={{ color: '#1A2228' }}
        >
          {cert.name}
        </h3>
        <p
          className="mb-4 flex-1 text-sm leading-relaxed"
          style={{ color: '#4A5568' }}
        >
          {cert.description}
        </p>

        <p className="mb-4 text-xs" style={{ color: '#8A9BAB' }}>
          Emitido por <span className="font-semibold" style={{ color: '#1A2228' }}>{cert.issuer}</span>
        </p>

        <div className="flex flex-wrap gap-2">
          {hasFile ? (
            <button
              type="button"
              onClick={onView}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-4 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: '#1A2228' }}
              aria-label={`Ver ${cert.name}`}
            >
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M8 3a8 8 0 0 0-7.5 5 8 8 0 0 0 15 0A8 8 0 0 0 8 3Zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>
              Ver certificado
            </button>
          ) : (
            <span
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-dashed px-4 text-sm font-semibold"
              style={{ borderColor: '#C8CBD0', color: '#8A9BAB' }}
            >
              Próximamente
            </span>
          )}
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border px-4 text-sm font-semibold transition-colors hover:bg-[#F4F5F7]"
            style={{ borderColor: '#E2E5E9', color: '#1A2228' }}
            aria-label={`Verificar autenticidad en ${cert.issuer}`}
          >
            Verificar
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-3.5 w-3.5">
              <path d="M5 11L11 5M11 5h-4M11 5v4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </motion.article>
  )
}

type CertWithFile = Certification & { fileUrl: string }

function CertModal({ cert, onClose }: { cert: CertWithFile; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      key="cert-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6"
      style={{ background: 'rgba(10,16,20,0.78)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Visor: ${cert.name}`}
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.215, 0.61, 0.355, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
      >
        <header
          className="flex items-start justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4"
          style={{ background: '#1A2228' }}
        >
          <div className="min-w-0">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: cert.accent }}
            >
              {cert.standard}
            </p>
            <h2 className="mt-0.5 truncate font-[family-name:var(--font-barlow)] text-base font-bold text-white sm:text-lg">
              {cert.name}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={cert.fileUrl}
              download
              className="hidden items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white sm:inline-flex"
              style={{ borderColor: 'rgba(255,255,255,0.18)' }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-3.5 w-3.5">
                <path d="M8 2v8M5 7l3 3 3-3M3 13h10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Descargar
            </a>
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 sm:inline-flex"
              style={{ background: cert.accent }}
            >
              Verificar
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-3.5 w-3.5">
                <path d="M5 11L11 5M11 5h-4M11 5v4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar visor"
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </header>

        <div className="relative flex-1 overflow-hidden" style={{ background: '#1A2228' }}>
          <object
            data={`${cert.fileUrl}#view=FitH`}
            type="application/pdf"
            className="h-[calc(95vh-7rem)] w-full"
            aria-label={`Visor PDF: ${cert.name}`}
          >
            <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-12 w-12 opacity-60">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinejoin="round" />
                <path d="M14 2v6h6" strokeLinejoin="round" />
              </svg>
              <p className="max-w-md text-sm leading-relaxed text-white/80">
                Tu navegador no puede previsualizar este PDF. Podés{' '}
                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                  style={{ color: cert.accent }}
                >
                  abrirlo en una pestaña nueva
                </a>{' '}
                o descargarlo desde el botón superior.
              </p>
            </div>
          </object>
        </div>

        <footer
          className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 text-xs sm:hidden"
          style={{ borderColor: '#E2E5E9', color: '#4A5568' }}
        >
          <a
            href={cert.fileUrl}
            download
            className="inline-flex items-center gap-1.5 font-semibold"
            style={{ color: '#1A2228' }}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-3.5 w-3.5">
              <path d="M8 2v8M5 7l3 3 3-3M3 13h10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Descargar
          </a>
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-semibold text-white"
            style={{ background: cert.accent }}
          >
            Verificar
          </a>
        </footer>
      </motion.div>
    </motion.div>
  )
}

export default function CertificationsSection({ standalone = false }: { standalone?: boolean }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const active: CertWithFile | null = activeSlug
    ? (certifications.find(
        (c): c is CertWithFile => c.slug === activeSlug && c.fileUrl !== null,
      ) ?? null)
    : null

  return (
    <section id="certificaciones" style={{ background: '#F4F5F7' }}>
      <div
        className={`section-container max-w-7xl ${standalone ? '!pt-6 sm:!pt-8 lg:!pt-12' : ''}`}
      >
        <header className="mb-10 max-w-2xl sm:mb-12 lg:mb-16">
          <SectionTag label="Certificaciones" className="mb-4" />
          <h2
            className="font-[family-name:var(--font-barlow)] text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl"
            style={{ color: '#1A2228' }}
          >
            Acreditaciones y registros{' '}
            <span style={{ color: '#FF0001' }}>oficiales</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: '#4A5568' }}>
            Inscripciones y certificados emitidos por organismos provinciales y nacionales que
            avalan a GP Servicios para operar como proveedor de la industria del Petróleo y Gas.
            Cada documento puede visualizarse acá mismo y verificarse contra el organismo emisor.
          </p>
        </header>

        <div
          className={
            certifications.length === 1
              ? 'mx-auto max-w-md'
              : certifications.length === 2
                ? 'mx-auto grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2'
                : 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'
          }
        >
          {certifications.map(cert => (
            <CertCard
              key={cert.slug}
              cert={cert}
              onView={() => setActiveSlug(cert.slug)}
            />
          ))}
        </div>

        <div
          className="mt-10 rounded-xl border p-5 text-sm sm:mt-12 sm:p-6"
          style={{ borderColor: '#E2E5E9', background: '#FFFFFF', color: '#4A5568' }}
        >
          <p className="font-[family-name:var(--font-barlow)] font-bold" style={{ color: '#1A2228' }}>
            ¿Necesitás validar la vigencia?
          </p>
          <p className="mt-1.5 leading-relaxed">
            Cada certificado tiene un botón <em>Verificar</em> que abre el sitio del organismo
            emisor donde podés confirmar que el certificado está vigente y emitido a nombre de
            GP SERVICIOS S.R.L.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {active && <CertModal cert={active} onClose={() => setActiveSlug(null)} />}
      </AnimatePresence>
    </section>
  )
}
