import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  icon?: ReactNode
}

const VARIANTS = {
  primary:
    'bg-accent text-bg shadow-[0_0_24px_-4px_rgb(6_182_212/0.6)] hover:bg-accent-light hover:shadow-[0_0_32px_-2px_rgb(103_232_249/0.7)]',
  secondary: 'border border-accent/40 bg-surface/60 text-text backdrop-blur hover:border-accent hover:text-accent-light',
}

/** Lien stylé en bouton (les actions du site sont toutes des liens). */
export function ButtonLink({ children, variant = 'primary', icon, className = '', ...props }: ButtonLinkProps) {
  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:-translate-y-0.5 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </a>
  )
}
