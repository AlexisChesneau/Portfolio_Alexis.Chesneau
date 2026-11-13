import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Ajoute un léger effet de survol (bordure plus visible). */
  hoverable?: boolean
}

/** Carte glassmorphism de base (fond translucide, flou, bordure cyan). */
export function Card({ children, className = '', hoverable = false, ...props }: CardProps) {
  return (
    <div
      className={`glass p-6 ${
        hoverable ? 'transition-colors duration-300 hover:border-accent/40' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
