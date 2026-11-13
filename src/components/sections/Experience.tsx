import { experiences } from '../../data/cv'
import { Section } from '../ui/Section'
import { Timeline } from '../ui/Timeline'

export function Experience() {
  return (
    <Section id="experiences" eyebrow="git log --experiences" title="Expériences">
      <Timeline items={experiences} />
    </Section>
  )
}
