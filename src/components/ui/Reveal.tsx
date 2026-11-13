import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

/** Animation standard d'apparition : fondu + glissement vers le haut. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

interface RevealProps {
  children: ReactNode
  className?: string
  /** Délai avant l'apparition (s). */
  delay?: number
  as?: 'div' | 'li' | 'article' | 'p'
}

/** Fait apparaître son contenu (fade + slide) lorsqu'il entre à l'écran. */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}

interface StaggerProps {
  children: ReactNode
  className?: string
  /** Décalage entre chaque enfant (s). */
  stagger?: number
  as?: 'div' | 'ul' | 'ol'
}

/** Conteneur qui fait apparaître ses <StaggerItem> les uns après les autres. */
export function Stagger({ children, className, stagger = 0.08, as = 'div' }: StaggerProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </MotionTag>
  )
}

/** Élément enfant d'un <Stagger>. */
export function StaggerItem({ children, className, as = 'div' }: Omit<RevealProps, 'delay'>) {
  const MotionTag = motion[as]
  return (
    <MotionTag className={className} variants={revealVariants}>
      {children}
    </MotionTag>
  )
}
