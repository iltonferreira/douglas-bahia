import type { ReactNode } from 'react'
import { site } from '../content/site'

/** Anotação visível apenas na versão de apresentação (site.showDraftNotes). */
export function DraftNote({ children, className = '' }: { children: ReactNode; className?: string }) {
  if (!site.showDraftNotes) return null
  return (
    <p className={`draft-note ${className}`.trim()}>
      <span className="draft-note__tag">A confirmar</span>
      {children}
    </p>
  )
}
