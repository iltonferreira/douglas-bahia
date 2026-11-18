import { defaultWhatsappMessage, site, whatsappLink } from '../content/site'
import { navItems } from './nav'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer section--dark">
      <div className="container footer__grid">
        <div className="footer__brand">
          <p className="footer__name">{site.name}</p>
          <p className="footer__role">{site.role}</p>
          <p className="footer__motto">“{site.motto}”</p>
        </div>

        <nav className="footer__col footer__col--nav" aria-label="Rodapé">
          <h2 className="footer__heading">Navegação</h2>
          <ul>
            {navItems.map((i) => (
              <li key={i.href}>
                <a href={i.href}>{i.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col footer__col--contact">
          <h2 className="footer__heading">Contato</h2>
          <ul>
            <li>
              <a href={whatsappLink(defaultWhatsappMessage)} target="_blank" rel="noopener noreferrer">
                WhatsApp <span className="nowrap">{site.contact.whatsappDisplay}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </li>
          </ul>
        </div>

        <div className="footer__col footer__col--social">
          <h2 className="footer__heading">Redes</h2>
          <ul>
            {site.contact.instagram.map((ig) => (
              <li key={ig.handle}>
                <a href={ig.url} target="_blank" rel="noopener noreferrer">
                  Instagram {ig.handle}
                </a>
              </li>
            ))}
            <li>
              <a href={site.contact.pinterest} target="_blank" rel="noopener noreferrer">
                Pinterest
              </a>
            </li>
            <li>
              <a href={site.contact.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {site.name}. Todos os direitos reservados.
        </p>
        <a href="#inicio" className="footer__top">
          Voltar ao topo <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  )
}
