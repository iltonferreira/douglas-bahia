import { useCallback, useEffect, useRef } from 'react'
import type { ProjectImage } from '../content/projects'
import { useScrollLock } from '../hooks/useScrollLock'
import { ImageSlot } from './ImageSlot'

export interface LightboxItem {
  image: ProjectImage
  title: string
  meta: string
  variant: number
}

interface LightboxProps {
  items: LightboxItem[]
  index: number | null
  onChange: (index: number | null) => void
}

/** Visualização ampliada com teclado (← → Esc), toque (deslizar) e foco preso. */
export function Lightbox({ items, index, onChange }: LightboxProps) {
  const open = index !== null
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const touchX = useRef<number | null>(null)

  useScrollLock(open)

  const go = useCallback(
    (delta: number) => {
      if (index === null) return
      onChange((index + delta + items.length) % items.length)
    },
    [index, items.length, onChange],
  )

  const close = useCallback(() => onChange(null), [onChange])

  useEffect(() => {
    if (!open) return
    returnFocus.current = document.activeElement as HTMLElement
    closeRef.current?.focus()
    return () => returnFocus.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Tab' && dialogRef.current) {
        const f = [...dialogRef.current.querySelectorAll<HTMLElement>('button')]
        const first = f[0]
        const last = f[f.length - 1]
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
  }, [open, close, go])

  if (!open || index === null) return null
  const item = items[index]

  return (
    <div
      ref={dialogRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Imagem ampliada: ${item.image.alt}`}
      onClick={(e) => e.target === e.currentTarget && close()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <div className="lightbox__top">
        <p className="lightbox__counter" aria-live="polite">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </p>
        <button ref={closeRef} type="button" className="lightbox__close" onClick={close}>
          Fechar <span aria-hidden="true">×</span>
        </button>
      </div>

      <figure className="lightbox__figure" key={index}>
        <ImageSlot image={item.image} variant={item.variant} className="lightbox__image" sizes="100vw" />
        <figcaption className="lightbox__caption">
          <strong>{item.title}</strong>
          <span>{item.meta}</span>
        </figcaption>
      </figure>

      <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)}>
        <span className="visually-hidden">Imagem anterior</span>
        <svg viewBox="0 0 40 10" aria-hidden="true"><path d="M40 5H2M7 1L2 5l5 4" fill="none" stroke="currentColor" /></svg>
      </button>
      <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => go(1)}>
        <span className="visually-hidden">Próxima imagem</span>
        <svg viewBox="0 0 40 10" aria-hidden="true"><path d="M0 5h38M33 1l5 4-5 4" fill="none" stroke="currentColor" /></svg>
      </button>
    </div>
  )
}
