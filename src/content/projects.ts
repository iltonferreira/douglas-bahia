/**
 * Portfólio.
 *
 * Nenhuma fotografia real foi incluída: as imagens do Instagram não podem ser
 * reproduzidas sem autorização do autor, e os arquivos originais ainda não
 * foram fornecidos. Cada item abaixo é um espaço reservado com a composição
 * definida. Para publicar:
 *
 * 1. Coloque o arquivo em /public/images/projetos/ (JPG ou WebP, lado maior
 *    com 2400 px, até ~400 KB).
 * 2. Preencha `images[].src`, `alt`, `title`, `category` e, se houver,
 *    `location`, `year` e `description` com dados confirmados pelo cliente.
 * 3. Troque `confirmed` para `true`.
 */

export type Ratio = 'landscape' | 'portrait' | 'square' | 'wide'

export interface ProjectImage {
  src?: string
  alt: string
  /** O que esta fotografia deve mostrar (usado no espaço reservado). */
  brief: string
  ratio: Ratio
}

export interface Project {
  id: string
  confirmed: boolean
  title?: string
  category?: string
  location?: string
  year?: string
  description?: string
  /** Posição na grade editorial. */
  layout: 'feature' | 'tall' | 'offset' | 'wide' | 'pair'
  images: ProjectImage[]
}

export const projects: Project[] = [
  {
    id: 'projeto-01',
    confirmed: false,
    layout: 'feature',
    images: [
      {
        alt: 'Projeto 01 — fachada',
        brief: 'Fachada ou vista principal de um projeto concluído',
        ratio: 'landscape',
      },
      {
        alt: 'Projeto 01 — interior',
        brief: 'Interior do mesmo projeto, luz natural',
        ratio: 'portrait',
      },
    ],
  },
  {
    id: 'projeto-02',
    confirmed: false,
    layout: 'tall',
    images: [
      {
        alt: 'Projeto 02 — ambiente interno',
        brief: 'Ambiente interno residencial, enquadramento vertical',
        ratio: 'portrait',
      },
    ],
  },
  {
    id: 'projeto-03',
    confirmed: false,
    layout: 'offset',
    images: [
      {
        alt: 'Projeto 03 — espaço comercial',
        brief: 'Espaço comercial: salão, loja ou escritório',
        ratio: 'landscape',
      },
    ],
  },
  {
    id: 'projeto-04',
    confirmed: false,
    layout: 'wide',
    images: [
      {
        alt: 'Projeto 04 — paisagismo',
        brief: 'Área externa ou jardim, plano aberto',
        ratio: 'wide',
      },
    ],
  },
  {
    id: 'projeto-05',
    confirmed: false,
    layout: 'pair',
    images: [
      {
        alt: 'Projeto 05 — detalhe',
        brief: 'Detalhe construtivo: material, encaixe, textura',
        ratio: 'square',
      },
      {
        alt: 'Projeto 05 — vista geral',
        brief: 'Vista geral do mesmo ambiente',
        ratio: 'portrait',
      },
    ],
  },
]

/** Fotografias de apoio fora do portfólio. */
export const heroImage: ProjectImage = {
  alt: 'Projeto de Douglas Bahia — imagem de abertura',
  brief: 'Fotografia de impacto de um projeto concluído, horizontal, com profundidade',
  ratio: 'wide',
}

export const portraitImage: ProjectImage = {
  alt: 'Retrato de Douglas Bahia',
  brief: 'Retrato profissional do arquiteto, luz natural, fundo neutro',
  ratio: 'portrait',
}
