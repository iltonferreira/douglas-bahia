import { portraitImage } from '../content/projects'
import { site } from '../content/site'
import { DraftNote } from './DraftNote'
import { ImageSlot } from './ImageSlot'
import { Reveal } from './Reveal'
import { SectionLabel } from './SectionLabel'

export function About() {
  return (
    <section id="sobre" className="about section" aria-labelledby="about-title">
      <div className="container about__grid">
        <Reveal className="about__portrait">
          <ImageSlot image={portraitImage} variant={4} sizes="(min-width: 900px) 40vw, 100vw" />
        </Reveal>

        <div className="about__body">
          <SectionLabel index="03">Sobre</SectionLabel>
          <Reveal as="h2" className="about__title" delay={60}>
            <span id="about-title">{site.name}</span>
            <small>{site.role}</small>
          </Reveal>

          <Reveal className="about__text" delay={120}>
            <p>
              Douglas Bahia é arquiteto e urbanista e atua em três frentes: arquitetura residencial, arquitetura
              comercial e paisagismo.
            </p>
            <DraftNote>
              Trajetória, formação, cidade de atuação e visão sobre arquitetura serão escritas a partir de uma
              conversa com o Douglas. Nenhuma dessas informações foi publicada nos canais consultados.
            </DraftNote>
          </Reveal>

          <Reveal as="dl" className="about__facts" delay={180}>
            <div>
              <dt>Atuação</dt>
              <dd>Residencial, comercial e paisagismo</dd>
            </div>
            <div>
              <dt>Atendimento</dt>
              <dd>WhatsApp, e-mail e formulário de orçamento</dd>
            </div>
          </Reveal>
        </div>

        <Reveal as="figure" className="about__quote" delay={80}>
          <blockquote>
            <p>{site.motto}</p>
          </blockquote>
          <figcaption>— {site.name}</figcaption>
        </Reveal>
      </div>
    </section>
  )
}
