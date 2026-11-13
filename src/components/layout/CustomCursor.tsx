import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FINE_POINTER_QUERY, useMediaQuery } from '../../hooks/useMediaQuery'

/** Éléments sur lesquels l'anneau s'agrandit. */
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label'

/**
 * Curseur personnalisé : un point qui suit exactement la souris et un anneau
 * qui le rattrape avec du retard. Désactivé sur mobile/tactile et en reduced motion.
 */
export function CustomCursor() {
  const finePointer = useMediaQuery(FINE_POINTER_QUERY)
  const reduceMotion = useReducedMotion()
  const enabled = finePointer && !reduceMotion

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 })

  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      setHovering(e.target instanceof Element && e.target.closest(INTERACTIVE) !== null)
    }
    const leave = () => setVisible(false)
    const down = () => setPressed(true)
    const up = () => setPressed(false)

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      {/* Anneau (avec retard) */}
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-accent-light"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.8 : 1,
          backgroundColor: hovering ? 'rgba(6, 182, 212, 0.12)' : 'rgba(6, 182, 212, 0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
      {/* Point (suit exactement la souris) */}
      <motion.div
        className="absolute top-0 left-0 size-1.5 rounded-full bg-accent-light shadow-[0_0_10px_rgb(103_232_249)]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
    </div>
  )
}
