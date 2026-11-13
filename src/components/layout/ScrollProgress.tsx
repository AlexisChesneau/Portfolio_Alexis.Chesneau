import { motion, useScroll, useSpring } from 'framer-motion'

/** Fine barre de progression de lecture en haut de page (dégradé cyan → bleu). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-linear-to-r from-accent via-accent-light to-blue shadow-[0_0_10px_rgb(6_182_212/0.7)]"
    />
  )
}
