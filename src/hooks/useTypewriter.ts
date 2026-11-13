import { useEffect, useState } from 'react'

interface TypewriterOptions {
  /** Délai entre deux lettres (ms). */
  speed?: number
  /** Délai avant de commencer (ms). */
  startDelay?: number
  /** Si false, le texte complet est affiché immédiatement (reduced motion). */
  enabled?: boolean
}

/**
 * Écrit un texte lettre par lettre.
 * Renvoie le texte affiché et un booléen indiquant si l'écriture est terminée.
 */
export function useTypewriter(text: string, { speed = 70, startDelay = 300, enabled = true }: TypewriterOptions = {}) {
  const [count, setCount] = useState(enabled ? 0 : text.length)

  useEffect(() => {
    if (!enabled) {
      setCount(text.length)
      return
    }
    setCount(0)
    let timer: number
    let i = 0
    const tick = () => {
      i += 1
      setCount(i)
      if (i < text.length) timer = window.setTimeout(tick, speed)
    }
    timer = window.setTimeout(tick, startDelay)
    return () => window.clearTimeout(timer)
  }, [text, speed, startDelay, enabled])

  return { displayed: text.slice(0, count), done: count >= text.length }
}

interface RotatingOptions {
  typeSpeed?: number
  deleteSpeed?: number
  /** Pause une fois le mot entièrement écrit (ms). */
  pause?: number
  /** Démarrage de l'animation (permet d'attendre la fin d'une autre). */
  start?: boolean
  enabled?: boolean
}

/**
 * Fait défiler une liste de mots en boucle : écriture → pause → effacement → mot suivant.
 */
export function useRotatingText(
  words: readonly string[],
  { typeSpeed = 65, deleteSpeed = 35, pause = 1800, start = true, enabled = true }: RotatingOptions = {},
) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!enabled || !start || words.length === 0) return
    const word = words[index % words.length]
    let delay = deleting ? deleteSpeed : typeSpeed

    if (!deleting && text === word) delay = pause
    else if (deleting && text === '') delay = 300

    const timer = window.setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
      }
    }, delay)
    return () => window.clearTimeout(timer)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause, start, enabled])

  // Sans animation : tous les rôles sont affichés en statique
  return enabled ? text : words.join(' · ')
}
