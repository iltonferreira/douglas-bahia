interface SectionLabelProps {
  index: string
  children: string
  tone?: 'dark' | 'light'
}

/** Rótulo editorial de seção: "02 — Projetos". */
export function SectionLabel({ index, children, tone = 'dark' }: SectionLabelProps) {
  return (
    <p className={`section-label section-label--${tone}`}>
      <span className="section-label__index">{index}</span>
      <span className="section-label__rule" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}
