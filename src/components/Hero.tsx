import { heroImage } from '../content/projects'
import { site } from '../content/site'
import { ArrowLink } from './ArrowLink'
import { ImageSlot } from './ImageSlot'

export function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__top container">
        <h1 id="hero-title" className="hero__title">
          <span className="hero__line hero__line--1">Arquitetura</span>
          <span className="hero__line hero__line--2">
            <em>para morar,</em>
          </span>
          <span className="hero__line hero__line--3">trabalhar</span>
          <span className="hero__line hero__line--4">
            <em>e estar ao ar livre.</em>
          </span>
        </h1>

        <div className="hero__aside">
          <ol className="hero__index" aria-label="Áreas de atuação">
            {site.services.map((s, i) => (
              <li key={s.id}>
                <span>({String(i + 1).padStart(2, '0')})</span> {s.title}
              </li>
            ))}
          </ol>
          <p className="hero__lead">
            {site.name} é arquiteto e urbanista. Desenvolve projetos residenciais, comerciais e de paisagismo.
          </p>
          <div className="hero__actions">
            <ArrowLink href="#projetos" variant="solid">
              Explorar projetos
            </ArrowLink>
            <ArrowLink href="#contato" variant="line">
              Contato
            </ArrowLink>
          </div>
        </div>
      </div>

      <div className="hero__media">
        <ImageSlot image={heroImage} variant={0} priority sizes="100vw" />
        <p className="hero__caption container">
          <span>{site.role}</span>
          <span aria-hidden="true">—</span>
          <span>Residencial · Comercial · Paisagismo</span>
        </p>
      </div>
    </section>
  )
}
