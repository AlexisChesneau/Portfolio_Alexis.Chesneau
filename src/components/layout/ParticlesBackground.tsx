import type { ISourceOptions } from '@tsparticles/engine'
import Particles, { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useMemo } from 'react'
import { MOBILE_QUERY, useMediaQuery } from '../../hooks/useMediaQuery'

/** Charge le bundle « slim » de tsParticles (liens, répulsion, ajout au clic…). */
const initEngine = async (engine: Parameters<typeof loadSlim>[0]) => {
  await loadSlim(engine)
}

/**
 * Fond plein écran de particules cyan reliées entre elles (effet constellation).
 * - survol : les particules sont repoussées
 * - clic   : de nouvelles particules apparaissent et se connectent au réseau
 * Ce composant est chargé en différé (React.lazy) et n'est jamais monté
 * si l'utilisateur préfère réduire les animations.
 */
export default function ParticlesBackground() {
  const isMobile = useMediaQuery(MOBILE_QUERY)

  const options = useMemo<ISourceOptions>(() => {
    // Moins de 80 particules sur desktop, moins de 30 sur mobile (clics compris)
    const count = isMobile ? 22 : 64
    const limit = isMobile ? 29 : 79
    return {
      fullScreen: { enable: true, zIndex: 0 },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      detectRetina: true,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      particles: {
        number: { value: count, limit: { mode: 'delete', value: limit }, density: { enable: false } },
        color: { value: ['#06B6D4', '#67E8F9'] },
        shape: { type: 'circle' },
        opacity: { value: { min: 0.3, max: 0.8 } },
        size: { value: { min: 1, max: 2.5 } },
        links: {
          enable: true,
          color: '#06B6D4',
          distance: isMobile ? 110 : 150,
          opacity: 0.25,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.6,
          direction: 'none',
          random: false,
          straight: false,
          outModes: { default: 'bounce' },
        },
      },
      interactivity: {
        // Les événements sont écoutés sur la fenêtre : l'effet marche même au-dessus du contenu
        detectsOn: 'window',
        events: {
          onHover: { enable: !isMobile, mode: ['repulse', 'grab'] },
          onClick: { enable: true, mode: 'push' },
        },
        modes: {
          repulse: { distance: 110, duration: 0.4, speed: 0.6 },
          grab: { distance: 170, links: { opacity: 0.45, color: '#67E8F9' } },
          push: { quantity: 3 },
        },
      },
    }
  }, [isMobile])

  return (
    <ParticlesProvider init={initEngine}>
      <Particles id="tsparticles" options={options} className="pointer-events-none" />
    </ParticlesProvider>
  )
}
