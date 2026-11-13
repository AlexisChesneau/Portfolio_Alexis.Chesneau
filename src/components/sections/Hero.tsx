import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Download, Mail } from 'lucide-react'
import { profile, terminal } from '../../data/cv'
import { useRotatingText, useTypewriter } from '../../hooks/useTypewriter'
import { ButtonLink } from '../ui/Button'
import { GlitchText } from '../ui/GlitchText'
import { Terminal } from '../ui/Terminal'

/** Curseur clignotant de la machine à écrire. */
function TypeCursor({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`ml-1 inline-block w-[3px] animate-blink bg-accent-light align-baseline ${className}`} />
}

/** Animation d'entrée des éléments du hero (au chargement de la page). */
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}
/** Variante sans fondu pour le texte principal : visible immédiatement (meilleur LCP). */
const itemNoFade = {
  hidden: { y: 12 },
  visible: { y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero() {
  const reduceMotion = useReducedMotion() ?? false
  const fullName = `${profile.firstName} ${profile.lastName}`

  // Nom écrit lettre par lettre, puis rôles qui défilent en boucle
  const { displayed, done } = useTypewriter(fullName, { speed: 95, startDelay: 500, enabled: !reduceMotion })
  const role = useRotatingText(profile.roles, { start: done, enabled: !reduceMotion })

  const split = profile.firstName.length
  const first = displayed.slice(0, split)
  const last = displayed.slice(split + 1)
  const typingFirst = displayed.length <= split

  return (
    <section id="accueil" aria-labelledby="hero-titre" className="relative flex min-h-svh items-center overflow-hidden px-4 pt-24 pb-16 sm:px-6">
      {/* Grille décorative + halos */}
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 size-[560px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-[1100px] items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <motion.div variants={container} initial="hidden" animate="visible">
          {/* Badge de disponibilité */}
          <motion.p
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-surface/60 px-4 py-2 font-mono text-xs text-accent-light backdrop-blur"
          >
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </motion.p>

          {/* Nom : machine à écrire + glitch au survol */}
          <motion.h1 variants={item} id="hero-titre" className="text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="sr-only">{fullName}</span>
            <GlitchText text={`${first}\n${last}`} className="cursor-default">
              <span aria-hidden="true" className="block min-h-[1.05em] text-text">
                {first}
                {typingFirst && <TypeCursor className="h-[0.85em]" />}
              </span>
              <span aria-hidden="true" className="block min-h-[1.05em]">
                <span className="text-gradient">{last}</span>
                {!typingFirst && <TypeCursor className="h-[0.85em]" />}
              </span>
            </GlitchText>
          </motion.h1>

          {/* Rôles qui défilent */}
          <motion.p variants={item} className="mt-6 min-h-[1.75em] font-mono text-lg text-accent-light sm:text-xl">
            <span aria-hidden="true" className="text-muted">
              &gt;{' '}
            </span>
            <span aria-hidden="true">{role}</span>
            {!reduceMotion && <TypeCursor className="h-[1em] w-2" />}
            <span className="sr-only">{profile.roles.join(', ')}</span>
          </motion.p>

          <motion.p variants={itemNoFade} className="mt-6 max-w-xl text-lg font-medium text-text">
            {profile.title}
          </motion.p>
          <motion.p variants={itemNoFade} className="mt-2 max-w-xl text-muted">
            {profile.tagline}
          </motion.p>

          {/* Boutons d'action */}
          <motion.div variants={item} className="mt-8 flex flex-col gap-4 sm:flex-row">
            <ButtonLink
              href={`${import.meta.env.BASE_URL}${profile.cvFile}`}
              download
              icon={<Download className="size-5" aria-hidden="true" />}
            >
              Télécharger mon CV
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary" icon={<Mail className="size-5" aria-hidden="true" />}>
              Me contacter
            </ButtonLink>
          </motion.div>
        </motion.div>

        {/* Terminal animé */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Terminal lines={terminal} user={profile.firstName.toLowerCase()} startDelay={reduceMotion ? 0 : 2200} />
        </motion.div>
      </div>

      {/* Indicateur de défilement */}
      <a
        href="#chiffres-cles"
        aria-label="Faire défiler vers la suite"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-accent-light sm:block"
      >
        <motion.span
          className="block"
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="size-7" aria-hidden="true" />
        </motion.span>
      </a>
    </section>
  )
}
