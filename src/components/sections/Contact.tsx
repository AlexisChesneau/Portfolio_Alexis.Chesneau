import { Check, Copy, Mail, MapPin, Phone } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { contact, profile } from '../../data/cv'
import { ButtonLink } from '../ui/Button'
import { Card } from '../ui/Card'
import { LinkedinIcon } from '../ui/Icon'
import { Reveal, Stagger, StaggerItem } from '../ui/Reveal'
import { Section } from '../ui/Section'

/** Copie un texte dans le presse-papiers (avec repli pour les anciens navigateurs). */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    area.remove()
    return ok
  }
}

/** Ligne de contact : icône + libellé + valeur (lien ou texte). */
function ContactRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-xs tracking-wider text-muted uppercase">{label}</p>
        {children}
      </div>
    </div>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)

  // Le message « Copié » disparaît après 2,5 s
  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2500)
    return () => window.clearTimeout(timer)
  }, [copied])

  const handleCopy = async () => setCopied(await copyToClipboard(contact.email))

  const linkClass = 'break-all text-lg font-medium text-text transition-colors hover:text-accent-light'

  return (
    <Section id="contact" eyebrow="ping recruteur" title="Contact" intro={profile.tagline}>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <Card className="h-full sm:p-8">
            <Stagger className="space-y-6">
              <StaggerItem>
                <ContactRow icon={<Phone className="size-5" aria-hidden="true" />} label="Téléphone">
                  <a href={`tel:${contact.phoneHref}`} className={linkClass}>
                    {contact.phone}
                  </a>
                </ContactRow>
              </StaggerItem>

              <StaggerItem>
                <ContactRow icon={<Mail className="size-5" aria-hidden="true" />} label="E-mail">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <a href={`mailto:${contact.email}`} className={linkClass}>
                      {contact.email}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-accent/30 px-3 py-1 font-mono text-xs text-accent-light transition-colors hover:border-accent hover:bg-accent/10"
                      aria-label={copied ? 'Copié ! Adresse e-mail copiée' : "Copier l'adresse e-mail"}
                    >
                      {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
                      {copied ? 'Copié !' : 'Copier'}
                    </button>
                  </div>
                  {/* Annonce pour les lecteurs d'écran */}
                  <span role="status" aria-live="polite" className="sr-only">
                    {copied ? 'Adresse e-mail copiée dans le presse-papiers' : ''}
                  </span>
                </ContactRow>
              </StaggerItem>

              <StaggerItem>
                <ContactRow icon={<MapPin className="size-5" aria-hidden="true" />} label="Localisation">
                  <p className="text-lg font-medium text-text">{contact.location}</p>
                </ContactRow>
              </StaggerItem>

              {/* LinkedIn : affiché uniquement si renseigné dans cv.ts */}
              {contact.linkedin && (
                <StaggerItem>
                  <ContactRow icon={<LinkedinIcon className="size-5" />} label="LinkedIn">
                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      Voir mon profil
                      <span className="sr-only"> (s'ouvre dans un nouvel onglet)</span>
                    </a>
                  </ContactRow>
                </StaggerItem>
              )}
            </Stagger>
          </Card>
        </Reveal>

        {/* Appel à l'action */}
        <Reveal delay={0.15}>
          <Card className="relative flex h-full flex-col justify-center overflow-hidden sm:p-8">
            <div aria-hidden="true" className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-accent/20 blur-3xl" />
            <p className="relative font-mono text-sm text-accent-light">
              <span aria-hidden="true" className="text-muted">
                &gt;{' '}
              </span>
              {profile.availability}
            </p>
            <p className="relative mt-4 text-2xl font-bold text-text">Échangeons sur votre projet d'alternance.</p>
            <div className="relative mt-8 flex flex-col gap-4">
              <ButtonLink href={`mailto:${contact.email}`} icon={<Mail className="size-5" aria-hidden="true" />}>
                M'écrire un e-mail
              </ButtonLink>
              <ButtonLink href={`tel:${contact.phoneHref}`} variant="secondary" icon={<Phone className="size-5" aria-hidden="true" />}>
                M'appeler
              </ButtonLink>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
