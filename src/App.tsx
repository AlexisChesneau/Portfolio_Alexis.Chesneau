import { MotionConfig, useReducedMotion } from 'framer-motion'
import { lazy, Suspense, useEffect, useState } from 'react'
import { CustomCursor } from './components/layout/CustomCursor'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Education } from './components/sections/Education'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Interests } from './components/sections/Interests'
import { Skills } from './components/sections/Skills'
import { Stats } from './components/sections/Stats'

// Les particules (~100 Ko) sont chargées à part pour ne pas ralentir le premier affichage
const ParticlesBackground = lazy(() => import('./components/layout/ParticlesBackground'))

/** Attend que le navigateur soit inactif avant d'afficher les particules. */
function useIdleReady(enabled: boolean) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!enabled) return
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 2000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(() => setReady(true), 1200)
    return () => clearTimeout(id)
  }, [enabled])
  return ready
}

export default function App() {
  const reduceMotion = useReducedMotion()
  const showParticles = useIdleReady(!reduceMotion)

  return (
    // reducedMotion="user" : Framer Motion coupe les animations de déplacement
    // si l'utilisateur a activé « réduire les animations » dans son système
    <MotionConfig reducedMotion="user">
      {/* Lien d'évitement pour la navigation au clavier */}
      <a
        href="#contenu"
        className="sr-only z-[200] rounded-lg bg-accent px-4 py-2 font-semibold text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Aller au contenu
      </a>

      {showParticles && !reduceMotion && (
        // Calque fixe : le canvas ne peut jamais pousser le contenu (évite tout décalage de mise en page)
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
          <Suspense fallback={null}>
            <ParticlesBackground />
          </Suspense>
        </div>
      )}
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <main id="contenu" tabIndex={-1} className="relative z-10 overflow-x-clip outline-none">
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Interests />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </MotionConfig>
  )
}
