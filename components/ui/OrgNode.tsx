'use client'

import { motion } from 'framer-motion'

interface OrgNodeProps {
  id: string
  label: string
  sublabel?: string
  x: number
  y: number
  isRoot?: boolean
  isActive: boolean
  onClick: (id: string) => void
}

export default function OrgNode({
  id,
  label,
  sublabel,
  x,
  y,
  isRoot = false,
  isActive,
  onClick,
}: OrgNodeProps) {
  const width = isRoot ? 160 : 140
  const height = isRoot ? 56 : 50

  return (
    <motion.g
      transform={`translate(${x - width / 2}, ${y - height / 2})`}
      onClick={() => onClick(id)}
      style={{ cursor: 'pointer' }}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.2 }}
    >
      {/* Node background */}
      <motion.rect
        width={width}
        height={height}
        rx={isRoot ? 10 : 8}
        fill={isRoot ? '#FF0001' : isActive ? '#32434F' : '#1A2228'}
        stroke={isActive ? '#FF0001' : isRoot ? '#CC0001' : '#32434F'}
        strokeWidth={isActive && !isRoot ? 1.5 : 1}
        animate={{
          stroke: isActive && !isRoot ? '#FF0001' : isRoot ? '#CC0001' : '#32434F',
          fill: isRoot ? '#FF0001' : isActive ? '#32434F' : '#1A2228',
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Glow on active */}
      {isActive && !isRoot && (
        <rect
          width={width}
          height={height}
          rx={8}
          fill="none"
          stroke="#FF0001"
          strokeWidth={3}
          opacity={0.2}
        />
      )}

      {/* Label */}
      <text
        x={width / 2}
        y={sublabel ? height / 2 - 6 : height / 2 + 5}
        textAnchor="middle"
        fontSize={isRoot ? 13 : 12}
        fontWeight="700"
        fontFamily="Barlow, sans-serif"
        fill="white"
      >
        {label}
      </text>

      {sublabel && (
        <text
          x={width / 2}
          y={height / 2 + 10}
          textAnchor="middle"
          fontSize={9}
          fontWeight="400"
          fontFamily="Inter, sans-serif"
          fill={isRoot ? 'rgba(255,255,255,0.7)' : '#8A9BAB'}
        >
          {sublabel}
        </text>
      )}

      {/* Active indicator dot */}
      {isActive && !isRoot && (
        <circle cx={width - 8} cy={8} r={4} fill="#FF0001" />
      )}
    </motion.g>
  )
}
