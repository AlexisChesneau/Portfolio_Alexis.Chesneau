import { CalendarDays } from 'lucide-react'
import { certifications, education } from '../../data/cv'
import { Icon } from '../ui/Icon'
import { Reveal, Stagger, StaggerItem } from '../ui/Reveal'
import { Section } from '../ui/Section'

/** Sous-titre façon commentaire de code. */
function SubTitle({ children }: { children: string }) {
  return (
    <h3 className="mb-6 font-mono text-sm text-accent">
      <span aria-hidden="true" className="text-muted">
        #{' '}
      </span>
      {children}
    </h3>
  )
}

export function Education() {
  return (
    <Section id="formation" eyebrow="cat diplomes.txt" title="Formation & certifications">
      <div className="grid gap-12 lg:grid-cols-[1.8fr_1fr]">
        {/* Formations */}
        <div>
          <Reveal>
            <SubTitle>formation</SubTitle>
          </Reveal>
          <Stagger as="ul" className="grid gap-4 sm:grid-cols-2">
            {education.map((edu) => (
              <StaggerItem as="li" key={edu.title} className="glass flex h-full gap-4 p-6 transition-colors hover:border-accent/40">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <Icon name="graduation" className="size-5" />
                </span>
                <div>
                  <h4 className="leading-snug font-semibold text-text">{edu.title}</h4>
                  {edu.school && <p className="mt-1 text-sm text-accent-light">{edu.school}</p>}
                  {edu.details && <p className="mt-2 text-sm text-muted">{edu.details}</p>}
                  {edu.period && (
                    <p className="mt-3 flex items-center gap-2 font-mono text-xs text-muted">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      {edu.period}
                    </p>
                  )}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Certifications */}
        <div>
          <Reveal>
            <SubTitle>certifications</SubTitle>
          </Reveal>
          <Stagger as="ul" className="space-y-4">
            {certifications.map((cert) => (
              <StaggerItem
                as="li"
                key={cert.title}
                className="glass relative flex items-center gap-4 overflow-hidden p-6 transition-colors hover:border-accent/40"
              >
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-accent-light to-blue" />
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <Icon name={cert.icon} className="size-5" />
                </span>
                <div>
                  <h4 className="font-semibold text-text">{cert.title}</h4>
                  {cert.details && <p className="font-mono text-xs text-muted">{cert.details}</p>}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  )
}
