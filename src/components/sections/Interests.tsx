import { interests } from '../../data/cv'
import { Icon } from '../ui/Icon'
import { Stagger, StaggerItem } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function Interests() {
  return (
    <Section id="interets" eyebrow="ls ~/loisirs" title="Centres d'intérêt">
      <Stagger as="ul" className="grid gap-6 sm:grid-cols-3">
        {interests.map((interest) => (
          <StaggerItem
            as="li"
            key={interest.title}
            className="glass group flex flex-col items-center p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
          >
            <span className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent transition-all duration-300 group-hover:text-accent-light group-hover:shadow-[0_0_24px_-4px_rgb(6_182_212/0.7)]">
              <Icon name={interest.icon} className="size-7" />
            </span>
            <h3 className="font-semibold text-text">{interest.title}</h3>
            {interest.details && <p className="mt-2 font-mono text-xs text-muted">{interest.details}</p>}
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
