import { stats } from '../../data/cv'
import { Counter } from '../ui/Counter'
import { Stagger, StaggerItem } from '../ui/Reveal'

/** Bandeau de chiffres clés avec compteurs animés. */
export function Stats() {
  return (
    <section id="chiffres-cles" aria-labelledby="chiffres-titre" className="px-4 py-12 sm:px-6">
      <h2 id="chiffres-titre" className="sr-only">
        Chiffres clés
      </h2>
      <Stagger as="ul" className="mx-auto grid max-w-[1100px] grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {stats.map((stat) => (
          <StaggerItem as="li" key={stat.label} className="glass flex flex-col items-center p-6 text-center transition-colors hover:border-accent/40">
            <p className="flex items-baseline gap-2">
              <Counter value={stat.value} className="text-gradient text-4xl font-extrabold tabular-nums sm:text-5xl" />
              {stat.suffix && <span className="font-mono text-sm text-accent-light">{stat.suffix}</span>}
            </p>
            <p className="mt-2 text-sm font-semibold text-text sm:text-base">{stat.label}</p>
            {stat.detail && <p className="mt-1 font-mono text-xs text-muted">{stat.detail}</p>}
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
