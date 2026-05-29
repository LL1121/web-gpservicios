'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTag from '@/components/ui/SectionTag'

gsap.registerPlugin(ScrollTrigger)

interface Department {
  id: string
  label: string
  sublabel?: string
  role: string
  description: string
  responsibilities: string[]
  certifications: string[]
}

const root: Department = {
  id: 'gerencia',
  label: 'Gerencia General',
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
}

const branches: Department[] = [
  {
    id: 'tecnica',
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
  {
    id: 'administrativa',
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
  {
    id: 'qaqc',
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
  {
    id: 'hse',
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
  {
    id: 'oficina',
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
]

const allDepartments: Department[] = [root, ...branches]

interface NodeCardProps {
  dept: Department
  isRoot?: boolean
  isActive: boolean
  onSelect: (id: string) => void
}

function NodeCard({ dept, isRoot = false, isActive, onSelect }: NodeCardProps) {
  const baseBg = isRoot ? '#FF0001' : isActive ? '#32434F' : '#1A2228'
  const baseBorder = isActive && !isRoot ? '#FF0001' : isRoot ? '#CC0001' : 'transparent'

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(dept.id)}
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ duration: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
      aria-expanded={isActive}
      aria-controls={`org-panel-${dept.id}`}
      className={`relative flex flex-col items-center justify-center rounded-xl px-4 py-4 text-center text-white shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 ${
        isRoot ? 'min-h-[88px] w-full sm:w-[260px]' : 'min-h-[80px] w-full'
      }`}
      style={{
        background: baseBg,
        border: `2px solid ${baseBorder}`,
      }}
    >
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: isRoot ? 'rgba(255,255,255,0.85)' : '#1B8A33' }}
      >
        {dept.role}
      </span>
      <span
        className={`mt-1 font-[family-name:var(--font-barlow)] font-extrabold leading-tight ${
          isRoot ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
        }`}
      >
        {dept.label}
      </span>
      {dept.sublabel && (
        <span className="text-[11px] opacity-80">{dept.sublabel}</span>
      )}
      {isActive && !isRoot && (
        <span
          className="absolute right-2 top-2 h-2 w-2 rounded-full"
          style={{ background: '#FF0001', boxShadow: '0 0 0 3px rgba(255,0,1,0.25)' }}
          aria-hidden="true"
        />
      )}
    </motion.button>
  )
}

interface DetailPanelProps {
  dept: Department
  onClose: () => void
}

function DetailPanel({ dept, onClose }: DetailPanelProps) {
  return (
    <motion.div
      key={dept.id}
      id={`org-panel-${dept.id}`}
      initial={{ opacity: 0, y: 16, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      exit={{ opacity: 0, y: 8, height: 0 }}
      transition={{ duration: 0.32, ease: [0.215, 0.61, 0.355, 1] }}
      className="overflow-hidden"
    >
      <div
        className="mt-6 overflow-hidden rounded-2xl border bg-white shadow-sm sm:mt-8"
        style={{ borderColor: '#E2E5E9' }}
      >
        <div
          className="flex items-start justify-between gap-4 px-5 py-4 sm:px-7 sm:py-5"
          style={{ background: '#1A2228' }}
        >
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: '#1B8A33' }}
            >
              {dept.role}
            </p>
            <p className="mt-1 font-[family-name:var(--font-barlow)] text-lg font-extrabold leading-tight text-white sm:text-xl">
              {dept.label}
              {dept.sublabel && (
                <span className="ml-2 text-sm font-medium opacity-70">
                  · {dept.sublabel}
                </span>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalle"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-3 lg:gap-10">
          <div className="lg:col-span-3">
            <p className="text-sm leading-relaxed sm:text-[15px]" style={{ color: '#4A5568' }}>
              {dept.description}
            </p>
          </div>

          <div className="lg:col-span-2">
            <p
              className="mb-3 text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: '#1A2228' }}
            >
              Funciones clave
            </p>
            <ul className="space-y-2.5">
              {dept.responsibilities.map(r => (
                <li
                  key={r}
                  className="flex gap-3 text-sm leading-relaxed sm:text-[15px]"
                  style={{ color: '#4A5568' }}
                >
                  <span
                    className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ background: '#136A26' }}
                    aria-hidden="true"
                  />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="mb-3 text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: '#1A2228' }}
            >
              Certificaciones
            </p>
            <div className="space-y-2">
              {dept.certifications.map(cert => (
                <div
                  key={cert}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium"
                  style={{ background: '#F4F5F7', color: '#1A2228' }}
                >
                  <span
                    className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ background: '#FF0001' }}
                    aria-hidden="true"
                  />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function OrgchartSection({ standalone = false }: { standalone?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    setActiveId(prev => (prev === id ? null : id))
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.orgchart-card', {
        opacity: 0,
        y: 28,
        stagger: 0.07,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const activeDept = activeId
    ? allDepartments.find(d => d.id === activeId) ?? null
    : null

  return (
    <section ref={sectionRef} id="staff" style={{ background: '#F4F5F7' }}>
      <div
        className={`section-container max-w-7xl ${standalone ? '!pt-6 sm:!pt-8 lg:!pt-12' : ''}`}
      >
        <div className="mb-8 max-w-2xl sm:mb-10 lg:mb-14">
          <SectionTag label="Staff" className="mb-4" />
          <h2
            className="font-[family-name:var(--font-barlow)] text-2xl font-extrabold sm:text-3xl lg:text-4xl"
            style={{ color: '#1A2228' }}
          >
            Equipo técnico de{' '}
            <span style={{ color: '#FF0001' }}>alta especialización</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base" style={{ color: '#8A9BAB' }}>
            Tocá un departamento para ver funciones, alcance y certificaciones.
          </p>
        </div>

        {/* Árbol — root + ramas */}
        <div className="mx-auto max-w-5xl">
          {/* Root */}
          <div className="orgchart-card flex justify-center">
            <NodeCard
              dept={root}
              isRoot
              isActive={activeId === root.id}
              onSelect={handleSelect}
            />
          </div>

          {/* Conector vertical desde root al trunk */}
          <div className="relative mx-auto h-8 w-px" style={{ background: '#C8CBD0' }} />

          {/* Trunk horizontal — solo desktop, conecta las 5 ramas */}
          <div
            className="relative mx-auto hidden h-px max-w-[88%] sm:block"
            style={{ background: '#C8CBD0' }}
          />

          {/* 5 ramas en grid */}
          <div className="relative mt-0">
            {/* Drops verticales del trunk a cada card (solo sm+) */}
            <div
              className="pointer-events-none absolute left-0 right-0 top-0 hidden h-8 sm:block"
              aria-hidden="true"
            >
              <div className="mx-auto grid h-full max-w-[88%] grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {branches.map(b => (
                  <div key={b.id} className="flex justify-center">
                    <span
                      className="block h-full w-px"
                      style={{ background: '#C8CBD0' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 sm:grid-cols-3 sm:gap-4 sm:pt-8 lg:grid-cols-5">
              {branches.map(b => (
                <div key={b.id} className="orgchart-card">
                  <NodeCard
                    dept={b}
                    isActive={activeId === b.id}
                    onSelect={handleSelect}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Panel inline */}
          <AnimatePresence mode="wait">
            {activeDept && (
              <DetailPanel dept={activeDept} onClose={() => setActiveId(null)} />
            )}
          </AnimatePresence>
        </div>

        <p
          className="mt-8 text-center text-xs sm:mt-10"
          style={{ color: '#8A9BAB' }}
        >
          Parque Industrial Centenario · Neuquén, Argentina
        </p>
      </div>
    </section>
  )
}
