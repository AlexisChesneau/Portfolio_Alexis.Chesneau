import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navigation, profile } from '../../data/cv'
import { useActiveSection } from '../../hooks/useActiveSection'

const SECTION_IDS = navigation.map((n) => n.id)

/** Navigation fixe avec effet de flou, lien actif selon la section visible et menu burger mobile. */
export function Navbar() {
  const active = useActiveSection(SECTION_IDS)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Fond plus opaque une fois la page défilée
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fermeture du menu mobile avec Échap
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        open
          ? 'border-b border-accent/15 bg-bg/95 backdrop-blur-lg'
          : scrolled
            ? 'border-b border-accent/15 bg-bg/75 backdrop-blur-lg'
            : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Navigation principale" className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <a
          href="#accueil"
          className="group flex items-center gap-2 font-mono text-sm font-bold"
          onClick={() => setOpen(false)}
        >
          <span className="sr-only">
            {profile.firstName} {profile.lastName} — retour en haut de page
          </span>
          <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-lg border border-accent/40 bg-surface text-accent transition-shadow group-hover:shadow-[0_0_16px_rgb(6_182_212/0.6)]">
            {profile.initials}
          </span>
          <span aria-hidden="true" className="hidden text-text sm:inline">
            {profile.firstName.toLowerCase()}
            <span className="text-accent">.</span>
            {profile.lastName.toLowerCase()}
          </span>
        </a>

        {/* Liens desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative isolate block rounded-lg px-3 py-2 font-mono text-[13px] transition-colors ${
                    isActive ? 'text-accent-light' : 'text-muted hover:text-text'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-lg border border-accent/30 bg-accent/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Bouton burger mobile */}
        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-lg border border-accent/30 text-accent md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden md:hidden"
          >
            <ul className="space-y-1 px-4 pt-2 pb-6">
              {navigation.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? 'location' : undefined}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 font-mono text-sm ${
                      active === item.id ? 'bg-accent/10 text-accent-light' : 'text-muted'
                    }`}
                  >
                    <span aria-hidden="true" className="text-accent">
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
