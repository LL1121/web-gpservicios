'use client'

import { useId } from 'react'
import { RED, RED_WAVE_PATH, SLATE, SLATE_WAVE_PATH } from './wave-assets'

export default function WaveBackground() {
  const filterId = useId().replace(/:/g, '')

  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id={`pdf-layer-shadow-${filterId}`}
            x="-10%"
            y="-10%"
            width="120%"
            height="130%"
          >
            <feDropShadow
              dx="-4"
              dy="6"
              stdDeviation="5"
              floodOpacity="0.35"
              floodColor="#000000"
            />
          </filter>
        </defs>
        <path d={RED_WAVE_PATH} fill={RED} />
        <path
          d={SLATE_WAVE_PATH}
          fill={SLATE}
          filter={`url(#pdf-layer-shadow-${filterId})`}
        />
      </svg>
    </div>
  )
}
