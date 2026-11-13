import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface CounterProps {
  value: number
  /** Durée de l'animation (s). */
  duration?: number
  className?: string
}

/**
 * Compteur animé : part de 0 et monte jusqu'à `value` quand il entre à l'écran.
 * La valeur finale est toujours lisible par les lecteurs d'écran.
 */
export function Counter({ value, duration = 1.8, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(reduceMotion ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, duration, reduceMotion])

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
