import { useInView, useReducedMotion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { TerminalLine } from '../../data/cv'

interface TerminalProps {
  lines: TerminalLine[]
  /** Nom d'utilisateur affiché dans l'invite de commande. */
  user: string
  /** Délai avant la première commande (ms). */
  startDelay?: number
}

/** Étapes de l'animation : on tape la commande, puis la sortie s'affiche. */
type Phase = 'idle' | 'typing' | 'output' | 'done'

const TYPE_SPEED = 55
const OUTPUT_DELAY = 350
const NEXT_LINE_DELAY = 900

/** Invite de commande façon shell Linux. */
function Prompt({ user }: { user: string }) {
  return (
    <span className="select-none">
      <span className="text-accent">{user}@cv</span>
      <span className="text-muted">:</span>
      <span className="text-blue">~</span>
      <span className="text-muted">$ </span>
    </span>
  )
}

/** Faux terminal qui tape des commandes et affiche leur résultat. */
export function Terminal({ lines, user, startDelay = 1200 }: TerminalProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduceMotion = useReducedMotion()

  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')
  const [run, setRun] = useState(0) // incrémenté pour rejouer l'animation

  // Machine à états de l'animation de frappe
  useEffect(() => {
    if (reduceMotion) {
      setLineIndex(lines.length)
      setPhase('done')
      return
    }
    if (!inView) return

    let timer: number
    const current = lines[lineIndex]

    if (phase === 'idle') {
      timer = window.setTimeout(() => setPhase('typing'), run === 0 ? startDelay : 300)
    } else if (phase === 'typing' && current) {
      if (charIndex < current.command.length) {
        timer = window.setTimeout(() => setCharIndex((c) => c + 1), TYPE_SPEED + Math.random() * 40)
      } else {
        timer = window.setTimeout(() => setPhase('output'), OUTPUT_DELAY)
      }
    } else if (phase === 'output') {
      timer = window.setTimeout(() => {
        const next = lineIndex + 1
        setLineIndex(next)
        setCharIndex(0)
        setPhase(next < lines.length ? 'typing' : 'done')
      }, NEXT_LINE_DELAY)
    }
    return () => window.clearTimeout(timer)
  }, [inView, phase, charIndex, lineIndex, lines, reduceMotion, startDelay, run])

  const replay = () => {
    setLineIndex(0)
    setCharIndex(0)
    setPhase('idle')
    setRun((r) => r + 1)
  }

  const current = lines[lineIndex]

  return (
    <div ref={ref} className="glass overflow-hidden shadow-[0_0_60px_-20px_rgb(6_182_212/0.45)]">
      {/* Barre de titre */}
      <div className="flex items-center gap-2 border-b border-accent/15 bg-surface/80 px-4 py-3">
        <span aria-hidden="true" className="flex gap-2">
          <span className="size-3 rounded-full bg-accent/70" />
          <span className="size-3 rounded-full bg-blue/70" />
          <span className="size-3 rounded-full bg-muted/50" />
        </span>
        <p className="ml-2 flex-1 truncate font-mono text-xs text-muted">{user}@cv: ~</p>
        {!reduceMotion && (
          <button
            type="button"
            onClick={replay}
            disabled={phase !== 'done'}
            className="rounded-md p-1 text-muted transition-colors hover:text-accent-light disabled:opacity-0"
            aria-label="Rejouer l'animation du terminal"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Version texte complète pour les lecteurs d'écran */}
      <ul className="sr-only">
        {lines.map((line) => (
          <li key={line.command}>
            Commande {line.command} : {line.output}
          </li>
        ))}
      </ul>

      {/* Contenu animé (masqué aux lecteurs d'écran) */}
      <div aria-hidden="true" className="min-h-[248px] space-y-3 p-4 font-mono text-[13px] leading-relaxed sm:p-6 sm:text-sm">
        {lines.slice(0, lineIndex).map((line) => (
          <div key={line.command}>
            <p className="break-words">
              <Prompt user={user} />
              <span className="text-text">{line.command}</span>
            </p>
            <p className={`break-words ${line.highlight ? 'text-accent-light' : 'text-muted'}`}>
              <span className="text-accent">→ </span>
              {line.output}
            </p>
          </div>
        ))}

        {/* Ligne en cours de frappe */}
        {current && phase !== 'done' && (
          <div>
            <p className="break-words">
              <Prompt user={user} />
              <span className="text-text">{current.command.slice(0, charIndex)}</span>
              {phase !== 'output' && <Cursor />}
            </p>
            {phase === 'output' && (
              <p className={`break-words ${current.highlight ? 'text-accent-light' : 'text-muted'}`}>
                <span className="text-accent">→ </span>
                {current.output}
              </p>
            )}
          </div>
        )}

        {/* Invite finale */}
        {phase === 'done' && (
          <p>
            <Prompt user={user} />
            <Cursor />
          </p>
        )}
      </div>
    </div>
  )
}

/** Curseur de terminal clignotant. */
function Cursor() {
  return <span className="ml-0.5 inline-block h-[1.1em] w-2 translate-y-[3px] animate-blink bg-accent-light" />
}
