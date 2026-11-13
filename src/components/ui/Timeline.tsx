import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { useRef } from 'react'
import type { Experience } from '../../data/cv'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface TimelineProps {
  items: Experience[]
}

/**
 * Frise chronologique verticale :
 * - la ligne se « dessine » au fil du défilement,
 * - une pastille lumineuse s'allume pour chaque poste,
 * - sur grand écran, les cartes alternent de part et d'autre de la ligne.
 */
export function Timeline({ items }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  // Sur mobile, les cartes glissent verticalement (un décalage horizontal ferait déborder la page)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <div ref={ref} className="relative">
      {/* Rail de fond */}
      <div aria-hidden="true" className="absolute inset-y-0 left-4 w-px -translate-x-1/2 bg-accent/15 md:left-1/2" />
      {/* Ligne lumineuse qui se dessine au scroll */}
      <motion.div
        aria-hidden="true"
        style={{ scaleY: reduceMotion ? 1 : scaleY }}
        className="absolute inset-y-0 left-4 w-0.5 origin-top -translate-x-1/2 bg-linear-to-b from-accent-light via-accent to-blue shadow-[0_0_12px_rgb(6_182_212/0.8)] md:left-1/2"
      />

      <ol className="space-y-12">
        {items.map((exp, i) => {
          const isRight = i % 2 === 1
          const isIt = exp.domain === 'it'
          return (
            <li key={`${exp.company}-${exp.period}`} className="relative pl-12 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
              {/* Pastille lumineuse */}
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0.3, opacity: 0.3 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '0px 0px -30% 0px' }}
                transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                className={`absolute top-7 left-4 z-10 flex size-4 -translate-x-1/2 items-center justify-center rounded-full border-2 md:left-1/2 ${
                  isIt
                    ? 'border-accent-light bg-bg shadow-[0_0_0_4px_rgb(6_182_212/0.15),0_0_18px_rgb(6_182_212/0.9)]'
                    : 'border-muted bg-bg'
                }`}
              >
                <span className={`size-1.5 rounded-full ${isIt ? 'bg-accent-light' : 'bg-muted'}`} />
              </motion.span>

              {/* Période (grand écran : de l'autre côté de la ligne) */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`hidden pt-5 md:block md:row-start-1 ${isRight ? 'md:col-start-1 md:text-right' : 'md:col-start-2'}`}
              >
                <p className={`font-mono text-lg ${isIt ? 'text-accent' : 'text-muted'}`}>{exp.period}</p>
                {exp.type && <p className="font-mono text-xs tracking-widest text-muted uppercase">{exp.type}</p>}
              </motion.div>

              {/* Carte du poste */}
              <motion.article
                initial={{
                  opacity: 0,
                  x: reduceMotion || !isDesktop ? 0 : isRight ? 40 : -40,
                  y: reduceMotion || isDesktop ? 0 : 24,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`glass p-6 transition-colors duration-300 hover:border-accent/40 ${
                  isRight ? 'md:col-start-2 md:row-start-1' : 'md:col-start-1 md:row-start-1'
                } ${isIt ? '' : 'opacity-90'}`}
              >
                <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-xs md:hidden">
                  <span className={isIt ? 'text-accent' : 'text-muted'}>{exp.period}</span>
                  {exp.type && (
                    <span className="rounded-full border border-accent/30 px-2 py-0.5 text-accent-light">{exp.type}</span>
                  )}
                </div>
                <h3 className="text-lg leading-snug font-semibold text-text">{exp.role}</h3>
                <p className={`mt-1 flex items-center gap-2 font-mono text-sm ${isIt ? 'text-accent-light' : 'text-muted'}`}>
                  <Briefcase className="size-4 shrink-0" aria-hidden="true" />
                  {exp.company}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {exp.missions.map((mission) => (
                    <li key={mission} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/70" />
                      <span>{mission}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
