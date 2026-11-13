import type { ReactNode } from 'react'

interface GlitchTextProps {
  /** Texte brut dupliqué par l'effet (doit correspondre au contenu visible). */
  text: string
  children: ReactNode
  className?: string
}

/** Applique un effet « glitch » discret au survol (voir .glitch dans index.css). */
export function GlitchText({ text, children, className = '' }: GlitchTextProps) {
  return (
    <span className={`glitch ${className}`} data-text={text}>
      {children}
    </span>
  )
}
