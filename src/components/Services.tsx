import { site } from '../content/site'
import { Reveal } from './Reveal'
import { SectionLabel } from './SectionLabel'

export function Services() {
  return (
    <section id="servicos" className="services section section--dark" aria-labelledby="services-title">
      <div className="container services__grid">
        <div className="services__head">
          <SectionLabel index="04" tone="light">
            Serviços
          </SectionLabel>
          <Reveal as="h2" className="services__title">
            <span id="services-title">
              Três frentes <em>de projeto.</em>
            </span>
          </Reveal>
        </div>

        <ol className="services__list">
          {site.services.map((s, i) => (
            <Reveal as="li" key={s.id} className="service" delay={i * 90}>
              <span className="service__index">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="service__title">{s.title}</h3>
              <p className="service__text">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
