import type { ReactElement } from 'react'

/**
 * Desenho de linha original, usado apenas como fundo dos espaços reservados
 * para fotografia. Não representa nenhum projeto real.
 */
interface ArchDrawingProps {
  variant?: number
}

const drawings: Array<ReactElement> = [
  // 0 — elevação com volumes sobrepostos
  <g key="0">
    <path d="M0 78h200" />
    <path d="M24 78V40h70v38M94 52h62v26" />
    <path d="M24 40l35-14 35 14" />
    <path d="M108 60h16v18M134 60h12v10h-12z" />
    <path d="M36 52h14v14H36zM62 52h18v26" />
    <circle cx="168" cy="26" r="9" />
  </g>,
  // 1 — corte com pé-direito duplo e escada
  <g key="1">
    <path d="M10 82h180M10 82V22h120v60M130 46h50v36" />
    <path d="M10 52h70" />
    <path d="M80 82v-6h8v-6h8v-6h8v-6h8v-6h8" />
    <path d="M30 22v-8h80v8" />
    <path d="M144 58h22v24" />
  </g>,
  // 2 — planta baixa
  <g key="2">
    <path d="M30 16h140v68H30z" />
    <path d="M30 50h56M86 16v34M120 16v26h50M120 60v24M86 66h34" />
    <path d="M86 50a16 16 0 0 1 16 16" />
    <path d="M120 42a18 18 0 0 0 18 18" />
    <path d="M44 28h28v12H44z" />
  </g>,
  // 3 — paisagem com pérgola
  <g key="3">
    <path d="M0 80h200" />
    <path d="M40 80V44M120 80V44M40 44h96M48 44v-4M64 44v-4M80 44v-4M96 44v-4M112 44v-4M128 44v-4" />
    <path d="M150 80c0-14 6-24 14-28 8 4 14 14 14 28" />
    <path d="M164 80V58" />
    <path d="M8 80c4-10 14-14 22-12" />
  </g>,
  // 4 — detalhe de esquadria
  <g key="4">
    <path d="M60 10h80v80H60z" />
    <path d="M66 16h68v68H66zM100 16v68M66 50h68" />
    <path d="M40 90h120" />
    <path d="M72 22l20 20M106 22l22 22" />
  </g>,
]

export function ArchDrawing({ variant = 0 }: ArchDrawingProps) {
  return (
    <svg
      className="arch-drawing"
      viewBox="0 0 200 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
        {drawings[variant % drawings.length]}
      </g>
    </svg>
  )
}
