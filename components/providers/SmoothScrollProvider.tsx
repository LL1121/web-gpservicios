'use client'

import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: t => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    lenisRef.current = lenis
    document.documentElement.classList.add('lenis')

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
      document.documentElement.classList.remove('lenis')
    }
  }, [])

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  return children
}
