'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import OrgNode from '@/components/ui/OrgNode'
import SectionTag from '@/components/ui/SectionTag'

gsap.registerPlugin(ScrollTrigger)

const departments: Record<string, {
  label: string
  sublabel: string
  role: string
  description: string
  responsibilities: string[]
  certifications: string[]
}> = {
  gerencia: {
    label: 'Gerencia General',
    sublabel: '',
    role: 'Dirección Ejecutiva',
    description:
      'Responsable de la dirección estratégica, relaciones institucionales con operadoras y supervisión del cumplimiento del Sistema de Gestión Integrado.',
    responsibilities: [
      'Aprobación de contratos y licitaciones',
      'Relaciones con YPF, Pluspetrol y ExxonMobil',
      'Revisión del SGI y objetivos anuales',
      'Representación legal de la empresa',
    ],
    certifications: ['ISO 9001:2015 — Responsable SGC', 'ISO 45001:2018 — Alta Dirección'],
  },
  tecnica: {
    label: 'Gerencia Técnica',
    sublabel: 'Operaciones',
    role: 'Dirección de Operaciones',
    description:
      'Coordinación de todos los frentes de trabajo en yacimiento. Planificación de recursos, control de avance físico y gestión de subcontratistas.',
    responsibilities: [
      'Supervisión de montaje de cañerías y piping',
      'Planificación y scheduling de obras',
      'Coordinación con ingeniería del cliente',
      'Gestión de recursos humanos operativos',
    ],
    certifications: ['API 1104 — Supervisor de Soldadura', 'ASME B31.3 — Piping Industrial'],
  },
  administrativa: {
    label: 'Gerencia Adm.',
    sublabel: 'Finanzas',
    role: 'Administración y Finanzas',
    description:
      'Gestión económica-financiera de la empresa, liquidación de sueldos, control presupuestario y cumplimiento fiscal.',
    responsibilities: [
      'Gestión de cuentas corrientes',
      'Liquidación de haberes y cargas sociales',
      'Control de costos por proyecto',
      'Rendiciones y facturación a operadoras',
    ],
    certifications: ['Matriculado FACPCE', 'Auditoría interna ISO 9001'],
  },
  qaqc: {
    label: 'QAQC',
    sublabel: 'Control de Calidad',
    role: 'Aseguramiento y Control de Calidad',
    description:
      'Responsable de la inspección de soldaduras, trazabilidad de materiales y emisión de documentación técnica de calidad exigida por las operadoras.',
    responsibilities: [
      'Inspección visual y dimensional de soldaduras',
      'Emisión de dossiers de calidad (WPS/PQR/WPQ)',
      'Trazabilidad de materiales (Mill Certificates)',
      'Control de END: ultrasonido, radiografía, líquidos penetrantes',
    ],
    certifications: [
      'Inspector de Soldadura AWS-CWI',
      'END Nivel II — UT / RT / PT (ASNT)',
      'ISO 9001:2015 — Auditor Interno',
    ],
  },
  hse: {
    label: 'HSE',
    sublabel: 'Seguridad e Higiene',
    role: 'Health, Safety & Environment',
    description:
      'Gestión del sistema de Seguridad, Salud Ocupacional y Medio Ambiente bajo las normativas exigidas por YPF, Pluspetrol y ExxonMobil en yacimientos.',
    responsibilities: [
      'Análisis de riesgos y ATS/JSA',
      'Capacitación inducción a personal propio y subcontratado',
      'Investigación y reporte de incidentes',
      'Auditorías de HSE en campo y gestión ambiental',
    ],
    certifications: [
      'Técnico Superior SHyMA (Ley 19587)',
      'ISO 45001:2018 — Auditor Interno',
      'ISO 14001:2015 — Auditor Interno',
    ],
  },
  oficina: {
    label: 'Oficina Técnica',
    sublabel: 'Ingeniería',
    role: 'Ingeniería y Proyectos',
    description:
      'Elaboración de ingeniería básica y de detalle, cómputos métricos, cálculo de líneas y gestión de la documentación técnica de proyectos.',
    responsibilities: [
      'Elaboración de isométricos y P&ID',
      'Cómputo y costo de materiales',
      'Gestión de databooks y planos As-Built',
      'Soporte técnico a supervisión de campo',
    ],
    certifications: ['AUTOCAD 2D/3D — Certificado', 'Cálculo de tuberías ASME B31.4 / B31.8'],
  },
}

const nodes = [
  { id: 'gerencia', x: 400, y: 50, isRoot: true },
  { id: 'tecnica', x: 130, y: 200 },
  { id: 'administrativa', x: 270, y: 200 },
  { id: 'qaqc', x: 400, y: 200 },
  { id: 'hse', x: 530, y: 200 },
  { id: 'oficina', x: 670, y: 200 },
]

const connections = nodes.slice(1).map(n => ({
  from: { x: 400, y: 78 },
  to: { x: n.x, y: 175 },
}))

function DepartmentPanel({
  activeNode,
  activeData,
  onClose,
}: {
  activeNode: string
  activeData: (typeof departments)[string]
  onClose: () => void
}) {
  return (
    <motion.div
      key={activeNode}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
      className="w-full flex-shrink-0 overflow-hidden rounded-xl border border-[--color-gp-gray-tech] bg-white xl:w-80"
    >
      <div
        className="border-b border-[--color-gp-gray-tech] px-4 py-4 sm:px-6"
        style={{ background: '#1A2228' }}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#136A26' }}>
              {activeData.role}
            </p>
            <p className="mt-0.5 text-base font-bold text-white font-[family-name:var(--font-barlow)]">
              {activeData.label}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center text-white/40 transition-colors hover:text-white"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-5 p-4 sm:p-6">
        <p className="text-sm leading-relaxed" style={{ color: '#4A5568' }}>
          {activeData.description}
        </p>

        <div>
          <p className="mb-3 text-xs font-bold tracking-widest uppercase" style={{ color: '#1A2228' }}>
            Funciones Clave
          </p>
          <ul className="space-y-2">
            {activeData.responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#4A5568' }}>
                <span
                  className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ background: '#136A26' }}
                />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold tracking-widest uppercase" style={{ color: '#1A2228' }}>
            Certificaciones
          </p>
          <div className="space-y-1.5">
            {activeData.certifications.map((cert, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium"
                style={{ background: '#F4F5F7', color: '#1A2228' }}
              >
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: '#FF0001' }} />
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function OrgchartSection({ standalone = false }: { standalone?: boolean }) {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleNodeClick = (id: string) => {
    setActiveNode(prev => (prev === id ? null : id))
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.orgchart-container', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const activeData = activeNode ? departments[activeNode] : null

  return (
    <section ref={sectionRef} id="staff" style={{ background: '#F4F5F7' }}>
      <div
        className={`section-container max-w-7xl ${standalone ? '!pt-6 sm:!pt-8 lg:!pt-12' : ''}`}
      >
        <div className="mb-8 text-center sm:mb-10 lg:mb-14">
          <SectionTag label="Staff" className="mb-4 justify-center" />
          <h2
            className="font-[family-name:var(--font-barlow)] text-2xl font-extrabold sm:text-3xl lg:text-4xl"
            style={{ color: '#1A2228' }}
          >
            Equipo técnico de{' '}
            <span style={{ color: '#FF0001' }}>alta especialización</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base" style={{ color: '#8A9BAB' }}>
            Tocá un departamento para ver funciones y certificaciones
          </p>
        </div>

        <div className="orgchart-container flex flex-col gap-6 xl:flex-row xl:items-start xl:gap-8">
          {/* Mobile / tablet: lista accesible */}
          <div className="w-full space-y-2 lg:hidden">
            {nodes.map(n => {
              const dept = departments[n.id]
              const isActive = activeNode === n.id
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => handleNodeClick(n.id)}
                  className="flex min-h-[52px] w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors"
                  style={{
                    borderColor: isActive ? '#FF0001' : '#E2E5E9',
                    background: isActive ? '#1A2228' : '#FFFFFF',
                  }}
                >
                  <div>
                    <p
                      className="text-sm font-bold font-[family-name:var(--font-barlow)]"
                      style={{ color: isActive ? '#FFFFFF' : '#1A2228' }}
                    >
                      {dept.label}
                    </p>
                    {dept.sublabel && (
                      <p
                        className="text-xs"
                        style={{ color: isActive ? '#8A9BAB' : '#8A9BAB' }}
                      >
                        {dept.sublabel}
                      </p>
                    )}
                  </div>
                  <svg
                    viewBox="0 0 16 16"
                    className="h-4 w-4 flex-shrink-0 transition-transform"
                    style={{
                      color: isActive ? '#FF0001' : '#8A9BAB',
                      transform: isActive ? 'rotate(90deg)' : 'none',
                    }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )
            })}
          </div>

          {/* Desktop: organigrama SVG */}
          <div className="hidden min-w-0 flex-1 lg:block">
            <div className="overflow-hidden rounded-xl border border-[--color-gp-gray-tech] bg-white">
              <svg
                viewBox="0 0 800 280"
                className="w-full"
                style={{ fontFamily: 'Barlow, Inter, sans-serif' }}
              >
                {connections.map((c, i) => {
                  const cp1y = c.from.y + (c.to.y - c.from.y) * 0.45
                  const cp2y = c.from.y + (c.to.y - c.from.y) * 0.55
                  const nodeId = nodes[i + 1].id
                  const isActive = activeNode === nodeId
                  return (
                    <motion.path
                      key={i}
                      d={`M ${c.from.x} ${c.from.y} C ${c.from.x} ${cp1y}, ${c.to.x} ${cp2y}, ${c.to.x} ${c.to.y}`}
                      fill="none"
                      stroke={isActive ? '#FF0001' : '#E2E5E9'}
                      strokeWidth={isActive ? 2 : 1.5}
                      animate={{ stroke: isActive ? '#FF0001' : '#E2E5E9' }}
                      transition={{ duration: 0.25 }}
                    />
                  )
                })}

                {nodes.map(n => (
                  <OrgNode
                    key={n.id}
                    id={n.id}
                    label={departments[n.id].label}
                    sublabel={departments[n.id].sublabel}
                    x={n.x}
                    y={n.y}
                    isRoot={n.isRoot}
                    isActive={activeNode === n.id}
                    onClick={handleNodeClick}
                  />
                ))}
              </svg>
            </div>
            <p className="mt-3 text-center text-xs" style={{ color: '#8A9BAB' }}>
              Parque Industrial Centenario · Neuquén, Argentina
            </p>
          </div>

          <AnimatePresence mode="wait">
            {activeData && activeNode && (
              <DepartmentPanel
                activeNode={activeNode}
                activeData={activeData}
                onClose={() => setActiveNode(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
