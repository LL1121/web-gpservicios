interface CurveDividerProps {
  /** Fill color of the wave (the "incoming" section color) */
  fill: string
  /** Direction: "down" = wave goes down (default), "up" = wave goes up */
  direction?: 'down' | 'up'
  /** Height of the SVG in pixels */
  height?: number
  className?: string
}

/**
 * Organic wave connector between sections.
 * Emulates the fluid S-curve pipe/tubing aesthetic from the GP Servicios brochure.
 */
export default function CurveDivider({
  fill,
  direction = 'down',
  height,
  className = '',
}: CurveDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] h-12 sm:h-16 lg:h-20 ${className}`}
      style={height !== undefined ? { height } : undefined}
      aria-hidden="true"
    >
      {direction === 'down' ? (
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          {/* Asymmetric double-curve — mirrors the organic page edge from the PDF */}
          <path
            d="M0,0 C240,80 480,0 720,40 C960,80 1200,0 1440,60 L1440,80 L0,80 Z"
            fill={fill}
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <path
            d="M0,80 C240,0 480,80 720,40 C960,0 1200,80 1440,20 L1440,0 L0,0 Z"
            fill={fill}
          />
        </svg>
      )}
    </div>
  )
}
