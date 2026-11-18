/**
 * Conteúdo central da landing page.
 *
 * Tudo o que aparece na página sai deste arquivo. Cada informação traz a
 * origem em comentário. Itens marcados como `pending` ainda precisam ser
 * confirmados ou fornecidos pelo cliente antes da publicação.
 */

export type Source = 'briefing' | 'bio.site' | 'pending'

const WHATSAPP_NUMBER = '5562995343588' // bio.site/bahia.arq → botão "CONTATO"

export const site = {
  /** Mostra as anotações "a confirmar" na página. Desligue para publicar. */
  showDraftNotes: true,

  /** Domínio final. Atualize também index.html, robots.txt e sitemap.xml. */
  url: 'https://iltonferreira.github.io/douglas-bahia',

  name: 'Douglas Bahia', // briefing
  shortName: 'Bahia', // bio.site: "Bahia | Arquiteto"
  role: 'Arquiteto e Urbanista', // briefing
  motto: 'Sempre alegre, mas nunca satisfeito.', // briefing (frase do perfil no Instagram)

  /** bio.site: "comercial ✦ residencial ✦ paisagismo" */
  services: [
    {
      id: 'residencial',
      title: 'Residencial',
      text: 'Projetos de arquitetura para casas e apartamentos.',
    },
    {
      id: 'comercial',
      title: 'Comercial',
      text: 'Projetos de arquitetura para espaços comerciais.',
    },
    {
      id: 'paisagismo',
      title: 'Paisagismo',
      text: 'Projetos de áreas externas, jardins e paisagem.',
    },
  ],

  contact: {
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappDisplay: '+55 62 99534-3588',
    email: 'bahia.arquiteto@gmail.com', // bio.site
    /** Formulário de orçamento publicado pelo próprio arquiteto (bio.site → "ORÇAMENTO"). */
    quoteForm:
      'https://docs.google.com/forms/d/e/1FAIpQLSfrj2yDXJrJ55KXdNRuyCTmP73IV8mhRrkv6-Z7BR5f-rHwCg/viewform',
    instagram: [
      { handle: '@douglas.bahiaa', url: 'https://www.instagram.com/douglas.bahiaa/' }, // briefing
      { handle: '@bahia.arq', url: 'https://www.instagram.com/bahia.arq/' }, // bio.site
    ],
    pinterest: 'https://www.pinterest.com/bahiaarq/', // bio.site
    facebook: 'https://www.facebook.com/103581122624141', // bio.site
  },
} as const

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const defaultWhatsappMessage =
  'Olá, Douglas! Conheci seu trabalho pelo site e gostaria de conversar sobre um projeto.'
