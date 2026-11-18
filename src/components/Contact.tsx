import { defaultWhatsappMessage, site, whatsappLink } from '../content/site'
import { ContactForm } from './ContactForm'
import { Reveal } from './Reveal'
import { SectionLabel } from './SectionLabel'

export function Contact() {
  const { contact } = site
  const channels = [
    { label: 'WhatsApp', value: contact.whatsappDisplay, href: whatsappLink(defaultWhatsappMessage) },
    { label: 'E-mail', value: contact.email, href: `mailto:${contact.email}` },
    ...contact.instagram.map((ig) => ({ label: 'Instagram', value: ig.handle, href: ig.url })),
    { label: 'Orçamento', value: 'Formulário de orçamento', href: contact.quoteForm },
  ]

  return (
    <section id="contato" className="contact section" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__head">
          <SectionLabel index="06">Contato</SectionLabel>
          <Reveal as="h2" className="contact__title">
            <span id="contact-title">
              Tem um projeto <em>em mente?</em>
            </span>
          </Reveal>
          <Reveal className="contact__lead" delay={80}>
            <p>Residência, espaço comercial ou paisagismo: conte o que você imagina e vamos conversar.</p>
          </Reveal>

          <Reveal as="ul" className="channels" delay={140}>
            {channels.map((c) => {
              const external = c.href.startsWith('http')
              return (
                <li key={c.href}>
                  <span className="channels__label">{c.label}</span>
                  <a
                    href={c.href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="channels__link"
                  >
                    {c.value}
                    {external && <span className="visually-hidden"> (abre em nova aba)</span>}
                  </a>
                </li>
              )
            })}
          </Reveal>
        </div>

        <Reveal className="contact__form" delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
