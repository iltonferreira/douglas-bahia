import { defaultWhatsappMessage, site, whatsappLink } from '../content/site'
import { DraftNote } from './DraftNote'
import { Reveal } from './Reveal'
import { SectionLabel } from './SectionLabel'

/**
 * Apenas as etapas confirmadas pelos canais públicos do arquiteto.
 * Etapas de desenvolvimento e execução ficam pendentes até a confirmação.
 */
const steps = [
  {
    title: 'Primeiro contato',
    text: 'Conversa inicial pelo WhatsApp ou por e-mail para apresentar a ideia, o espaço e o momento do projeto.',
    link: { href: whatsappLink(defaultWhatsappMessage), label: 'Abrir WhatsApp' },
  },
  {
    title: 'Pedido de orçamento',
    text: 'Preenchimento do formulário de orçamento disponibilizado pelo próprio arquiteto.',
    link: { href: site.contact.quoteForm, label: 'Abrir formulário' },
  },
]

export function Process() {
  return (
    <section id="processo" className="process section" aria-labelledby="process-title">
      <div className="container process__grid">
        <div className="process__head">
          <SectionLabel index="05">Como começar</SectionLabel>
          <Reveal as="h2" className="process__title">
            <span id="process-title">
              Do primeiro <em>contato</em> ao orçamento.
            </span>
          </Reveal>
        </div>

        <ol className="process__steps">
          {steps.map((step, i) => (
            <Reveal as="li" className="step" key={step.title} delay={i * 100}>
              <span className="step__index">Etapa {String(i + 1).padStart(2, '0')}</span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__text">{step.text}</p>
              <a className="step__link" href={step.link.href} target="_blank" rel="noopener noreferrer">
                {step.link.label}
                <span className="visually-hidden"> (abre em nova aba)</span>
              </a>
            </Reveal>
          ))}
          {site.showDraftNotes && (
          <li className="step step--pending">
            <span className="step__index">Etapa 03 em diante</span>
            <DraftNote>
              Desenvolvimento do projeto, entregas e acompanhamento de obra: descrever somente após o Douglas
              confirmar como conduz cada etapa.
            </DraftNote>
          </li>
          )}
        </ol>
      </div>
    </section>
  )
}
