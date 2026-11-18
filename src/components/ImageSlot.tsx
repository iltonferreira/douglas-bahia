import { useState } from 'react'
import type { ProjectImage } from '../content/projects'
import { site } from '../content/site'
import { ArchDrawing } from './ArchDrawing'

interface ImageSlotProps {
  image: ProjectImage
  variant?: number
  className?: string
  /** Imagem acima da dobra: carrega com prioridade. */
  priority?: boolean
  sizes?: string
}

type Status = 'loading' | 'loaded' | 'error'

/**
 * Fotografia com estado de carregamento e fallback.
 * Sem `src` (ou se o arquivo falhar), mostra um espaço reservado identificado.
 */
export function ImageSlot({ image, variant = 0, className = '', priority = false, sizes }: ImageSlotProps) {
  const [status, setStatus] = useState<Status>(image.src ? 'loading' : 'error')
  const showPlaceholder = !image.src || status === 'error'

  return (
    <div className={`image-slot image-slot--${image.ratio} is-${status} ${className}`.trim()}>
      {image.src && status !== 'error' && (
        <img
          src={image.src}
          alt={image.alt}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}
      {image.illustrative && !showPlaceholder && (
        <span className="image-slot__badge">Imagem ilustrativa</span>
      )}
      {showPlaceholder && (
        <div className="image-slot__placeholder" role="img" aria-label={`${image.alt} (fotografia a fornecer)`}>
          <ArchDrawing variant={variant} />
          {site.showDraftNotes && (
            <p className="image-slot__brief" aria-hidden="true">
              <span>Fotografia a fornecer</span>
              {image.brief}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
