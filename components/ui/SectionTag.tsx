interface SectionTagProps {
  label: string
  className?: string
  light?: boolean
}

export default function SectionTag({ label, className = '', light = false }: SectionTagProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Green indicator bar — matches the PDF's green block identifier */}
      <span
        className="block w-6 h-0.5 rounded-full"
        style={{ backgroundColor: light ? '#1B8A33' : '#136A26' }}
        aria-hidden="true"
      />
      <span
        className="text-xs font-semibold tracking-[0.18em] uppercase font-[family-name:var(--font-barlow)]"
        style={{ color: light ? '#1B8A33' : '#136A26' }}
      >
        {label}
      </span>
    </div>
  )
}
