import type { ElementType, ReactNode, CSSProperties } from 'react'
import { useReveal } from '../hooks/useReveal'

interface RevealProps {
  as?: ElementType
  children: ReactNode
  className?: string
  delay?: number
  style?: CSSProperties
}

export function Reveal({ as: Tag = 'div', children, className = '', delay = 0, style }: RevealProps) {
  const ref = useReveal<HTMLElement>()
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ ...style, ['--reveal-delay' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
