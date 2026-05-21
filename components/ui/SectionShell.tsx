import CurveDivider from '@/components/ui/CurveDivider'
import SectionTag from '@/components/ui/SectionTag'

interface SectionShellProps {
  id: string
  tag: string
  title: React.ReactNode
  description?: string
  children: React.ReactNode
  background?: string
  topCurve?: { fill: string; from: string }
  standalone?: boolean
  className?: string
}

/**
 * Contenedor con aire vertical y curva de transición entre bloques del home.
 */
export default function SectionShell({
  id,
  tag,
  title,
  description,
  children,
  background = '#FFFFFF',
  topCurve,
  standalone = false,
  className = '',
}: SectionShellProps) {
  return (
    <section id={id} style={{ background }} className={className}>
      {!standalone && topCurve && (
        <CurveDivider fill={topCurve.fill} direction="up" className="lg:h-[4.5rem]" />
      )}

      <div
        className={`section-container max-w-7xl ${
          standalone ? '!pt-6 sm:!pt-8 lg:!pt-12' : ''
        }`}
      >
        <header className="mb-8 max-w-3xl sm:mb-12 lg:mb-16">
          <SectionTag label={tag} className="mb-4" light={background === '#1A2535'} />
          <h2
            className="font-[family-name:var(--font-barlow)] text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl"
            style={{ color: background === '#1A2535' ? '#FFFFFF' : '#1A2535' }}
          >
            {title}
          </h2>
          {description && (
            <p
              className="mt-4 text-[15px] leading-relaxed sm:text-base lg:text-lg"
              style={{ color: background === '#1A2535' ? '#8A9BAB' : '#4A5568' }}
            >
              {description}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  )
}
