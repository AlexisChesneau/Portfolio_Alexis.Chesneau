import { useSyncExternalStore } from 'react'

/**
 * Renvoie `true` si la media query CSS correspond, et se met à jour
 * automatiquement (redimensionnement, changement de préférence système…).
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Raccourcis utilisés dans le site. */
export const MOBILE_QUERY = '(max-width: 767px)'
export const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'
