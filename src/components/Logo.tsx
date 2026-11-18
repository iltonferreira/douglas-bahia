import { site } from '../content/site'

export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <a href="#inicio" className={`logo logo--${tone}`}>
      <span className="logo__name">Douglas Bahia</span>
      <span className="logo__role">{site.role}</span>
    </a>
  )
}
