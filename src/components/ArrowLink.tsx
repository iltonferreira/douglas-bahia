import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface ArrowLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: 'line' | 'solid' | 'ghost'
  tone?: 'dark' | 'light'
}

/** Link de ação com seta desenhada que se estende no hover. */
export function ArrowLink({ children, variant = 'line', tone = 'dark', className = '', ...rest }: ArrowLinkProps) {
  const external = rest.href?.startsWith('http')
  return (
    <a
      className={`cta cta--${variant} cta--${tone} ${className}`.trim()}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      <span className="cta__label">{children}</span>
      <svg className="cta__arrow" viewBox="0 0 40 10" aria-hidden="true" focusable="false">
        <path d="M0 5h38M33 1l5 4-5 4" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      {external && <span className="visually-hidden"> (abre em nova aba)</span>}
    </a>
  )
}
