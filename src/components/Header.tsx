import { useEffect, useRef, useState } from 'react'
import { useScrollLock } from '../hooks/useScrollLock'
import { defaultWhatsappMessage, site, whatsappLink } from '../content/site'
import { Logo } from './Logo'
import { navItems } from './nav'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#inicio')
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useScrollLock(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Destaca o item da seção visível.
  useEffect(() => {
    const sections = navItems
      .map((i) => document.querySelector<HTMLElement>(i.href))
      .filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    panel?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (e.key === 'Tab' && panel) {
        const focusables = [toggleRef.current, ...panel.querySelectorAll<HTMLElement>('a')].filter(
          Boolean,
        ) as HTMLElement[]
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const close = () => mq.matches && setOpen(false)
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [])

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="header__bar container">
        <Logo />

        <nav className="header__nav" aria-label="Principal">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="nav-link"
                  aria-current={active === item.href ? 'location' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          className="header__cta"
          href={whatsappLink(defaultWhatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Fale comigo
          <span className="visually-hidden"> pelo WhatsApp (abre em nova aba)</span>
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="header__toggle-label">{open ? 'Fechar' : 'Menu'}</span>
          <span className="header__toggle-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        id="menu-mobile"
        ref={panelRef}
        className="mobile-menu"
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <nav className="mobile-menu__nav container" aria-label="Menu mobile">
          <ol>
            {navItems.map((item, i) => (
              <li key={item.href} style={{ ['--i' as string]: i }}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  <span className="mobile-menu__index">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
          <div className="mobile-menu__foot" style={{ ['--i' as string]: navItems.length }}>
            <a href={whatsappLink(defaultWhatsappMessage)} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href={`mailto:${site.contact.email}`}>E-mail</a>
            <a href={site.contact.instagram[0].url} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
