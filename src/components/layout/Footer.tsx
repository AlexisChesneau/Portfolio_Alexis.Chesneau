import { ArrowUp } from 'lucide-react'
import { profile } from '../../data/cv'

/** Pied de page simple. */
export function Footer() {
  return (
    <footer className="border-t border-accent/15 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.firstName} {profile.lastName}
          <span aria-hidden="true" className="text-accent">
            {' '}
            ·{' '}
          </span>
          <span className="block sm:inline">Conçu avec React, Tailwind CSS & Framer Motion</span>
        </p>
        <a
          href="#accueil"
          className="inline-flex items-center gap-2 rounded-lg border border-accent/30 px-3 py-2 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent-light"
        >
          <ArrowUp className="size-4" aria-hidden="true" />
          Haut de page
        </a>
      </div>
    </footer>
  )
}
