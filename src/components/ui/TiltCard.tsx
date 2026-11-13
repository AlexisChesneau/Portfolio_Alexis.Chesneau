import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useRef, type MouseEvent, type ReactNode } from 'react'
import { FINE_POINTER_QUERY, useMediaQuery } from '../../hooks/useMediaQuery'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Inclinaison maximale en degrés. */
  maxTilt?: number
}

/**
 * Carte avec effet tilt 3D au survol et halo cyan qui suit la souris.
 * Désactivé sur écran tactile et si l'utilisateur préfère réduire les animations.
 */
export function TiltCard({ children, className = '', maxTilt = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const finePointer = useMediaQuery(FINE_POINTER_QUERY)
  const interactive = finePointer && !reduceMotion

  // Position relative de la souris dans la carte (0 → 1)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 200, damping: 18, mass: 0.4 }
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), spring)
  // Position du halo en pourcentage
  const haloX = useTransform(px, (v) => `${v * 100}%`)
  const haloY = useTransform(py, (v) => `${v * 100}%`)
  const halo = useTransform(
    [haloX, haloY],
    ([x, y]) => `radial-gradient(320px circle at ${x} ${y}, rgb(6 182 212 / 0.16), transparent 65%)`,
  )
  const haloOpacity = useSpring(0, { stiffness: 200, damping: 25 })

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!interactive || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const handleLeave = () => {
    px.set(0.5)
    py.set(0.5)
    haloOpacity.set(0)
  }

  return (
    <div className="h-full [perspective:900px]">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => interactive && haloOpacity.set(1)}
        onMouseLeave={handleLeave}
        style={interactive ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
        className={`glass group relative h-full overflow-hidden transition-colors duration-300 hover:border-accent/45 ${className}`}
      >
        {/* Halo lumineux qui suit le curseur */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: halo, opacity: haloOpacity }}
        />
        <div className="relative">{children}</div>
      </motion.div>
    </div>
  )
}
