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
        <CurveDivider fill={topCurve.fill} direction="up" height={72} />
      )}

      <div
        className={`max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 ${
          standalone ? 'pt-8 lg:pt-12' : ''
        }`}
      >
        <header className="mb-12 lg:mb-16 max-w-3xl">
          <SectionTag label={tag} className="mb-4" light={background === '#1A2535'} />
          <h2
            className="font-[family-name:var(--font-barlow)] font-extrabold text-3xl lg:text-4xl leading-tight"
            style={{ color: background === '#1A2535' ? '#FFFFFF' : '#1A2535' }}
          >
            {title}
          </h2>
          {description && (
            <p
              className="mt-4 text-base lg:text-lg leading-relaxed"
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
