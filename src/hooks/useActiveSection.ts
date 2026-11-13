import { useEffect, useState } from 'react'

/**
 * Détermine quelle section est actuellement visible à l'écran
 * (utilisé pour surligner le lien actif de la navigation).
 * La section « active » est celle qui croise une bande horizontale
 * située autour du tiers supérieur de la fenêtre.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
