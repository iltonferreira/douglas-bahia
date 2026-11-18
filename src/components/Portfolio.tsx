import { useMemo, useState } from 'react'
import { projects } from '../content/projects'
import type { Project } from '../content/projects'
import { DraftNote } from './DraftNote'
import { ImageSlot } from './ImageSlot'
import { Lightbox } from './Lightbox'
import type { LightboxItem } from './Lightbox'
import { Reveal } from './Reveal'
import { SectionLabel } from './SectionLabel'

/** Índice da primeira imagem de cada projeto na lista plana da galeria. */
const startIndex = projects.reduce<number[]>(
  (acc, _project, i) => [...acc, i === 0 ? 0 : acc[i - 1] + projects[i - 1].images.length],
  [],
)

function projectTitle(p: Project, index: number) {
  return p.confirmed && p.title ? p.title : `Projeto ${String(index + 1).padStart(2, '0')}`
}

function projectMeta(p: Project) {
  if (!p.confirmed) return 'Nome, categoria e local a confirmar'
  return [p.category, p.location, p.year].filter(Boolean).join(' · ')
}

export function Portfolio() {
  const items = useMemo<LightboxItem[]>(
    () =>
      projects.flatMap((p, pi) =>
        p.images.map((image) => ({
          image,
          title: projectTitle(p, pi),
          meta: projectMeta(p),
          variant: pi,
        })),
      ),
    [],
  )
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="projetos" className="portfolio section" aria-labelledby="portfolio-title">
      <div className="container portfolio__head">
        <SectionLabel index="02">Projetos</SectionLabel>
        <Reveal as="h2" className="portfolio__title">
          <span id="portfolio-title">
            Projetos <em>selecionados</em>
          </span>
        </Reveal>
        <Reveal className="portfolio__intro" delay={80}>
          <p>Uma seleção de trabalhos em arquitetura residencial, comercial e paisagismo.</p>
          <DraftNote>
            As fotos atuais são imagens ilustrativas de banco de imagens, não projetos do Douglas. Serão
            substituídas pelas fotografias reais e pelos dados de cada projeto após autorização e envio dos
            arquivos originais.
          </DraftNote>
        </Reveal>
      </div>

      <div className="container portfolio__grid">
        {projects.map((p, pi) => {
          const start = startIndex[pi]
          return (
            <article key={p.id} className={`project project--${p.layout}`}>
              <div className="project__images">
                {p.images.map((img, ii) => (
                  <Reveal key={ii} className="project__frame" delay={ii * 90}>
                    <button
                      type="button"
                      className="project__open"
                      onClick={() => setOpenIndex(start + ii)}
                      aria-label={`Ampliar imagem: ${img.alt}`}
                    >
                      <ImageSlot
                        image={img}
                        variant={pi + ii}
                        sizes="(min-width: 900px) 60vw, 100vw"
                      />
                      <span className="project__zoom" aria-hidden="true">
                        Ampliar
                      </span>
                    </button>
                  </Reveal>
                ))}
              </div>
              <Reveal className="project__caption" delay={120}>
                <span className="project__number">{String(pi + 1).padStart(2, '0')}</span>
                <h3 className="project__title">{projectTitle(p, pi)}</h3>
                <p className="project__meta">{projectMeta(p)}</p>
                {p.confirmed && p.description && <p className="project__desc">{p.description}</p>}
              </Reveal>
            </article>
          )
        })}
      </div>

      <Lightbox items={items} index={openIndex} onChange={setOpenIndex} />
    </section>
  )
}
