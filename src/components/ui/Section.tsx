import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  /** Petit titre façon terminal (ex. « ~/competences »). */
  eyebrow: string
  title: string
  /** Texte d'introduction facultatif. */
  intro?: string
  children: ReactNode
  className?: string
}

/** Section de page avec en-tête homogène (étiquette mono + titre + intro). */
export function Section({ id, eyebrow, title, intro, children, className = '' }: SectionProps) {
  const headingId = `${id}-titre`
  return (
    <section id={id} aria-labelledby={headingId} className={`px-4 py-16 sm:px-6 md:py-24 ${className}`}>
      <div className="mx-auto max-w-[1100px]">
        <Reveal className="mb-12">
          <p className="mb-3 font-mono text-sm text-accent">
            <span aria-hidden="true" className="text-muted">
              ${' '}
            </span>
            {eyebrow}
          </p>
          <h2 id={headingId} className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 max-w-2xl text-muted">{intro}</p>}
          <div aria-hidden="true" className="mt-6 h-px w-24 bg-linear-to-r from-accent to-transparent" />
        </Reveal>
        {children}
      </div>
    </section>
  )
}
