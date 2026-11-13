import { skills } from '../../data/cv'
import { Icon } from '../ui/Icon'
import { Stagger, StaggerItem } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { TiltCard } from '../ui/TiltCard'

/** Grille de cartes compétences (tilt 3D + halo au survol). */
export function Skills() {
  return (
    <Section id="competences" eyebrow="ls ./competences" title="Compétences">
      <Stagger as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((category) => (
          <StaggerItem as="li" key={category.title}>
            <TiltCard className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent shadow-[0_0_20px_-6px_rgb(6_182_212/0.6)] transition-colors group-hover:text-accent-light">
                  <Icon name={category.icon} className="size-5" />
                </span>
                <h3 className="text-lg font-semibold text-text">{category.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2" aria-label={`Compétences ${category.title}`}>
                {category.items.map((skill) => (
                  <li key={skill} className="rounded-md border border-accent/15 bg-bg/60 px-2 py-1 font-mono text-xs text-muted">
                    {skill}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
