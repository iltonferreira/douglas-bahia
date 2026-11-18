/**
 * Portfólio.
 *
 * As fotos atuais são EXEMPLOS do Unsplash (licença livre), marcadas como
 * "Imagem ilustrativa" e com crédito ao fotógrafo. Não são trabalhos do
 * Douglas e devem ser substituídas pelas fotos reais.
 *
 * Nenhuma fotografia real do arquiteto foi incluída: as imagens do Instagram não podem ser
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

import { asset } from './asset'

export type Ratio = 'landscape' | 'portrait' | 'square' | 'wide'

export interface ProjectImage {
  src?: string
  /**
   * Foto de exemplo (banco de imagens com licença livre), não é trabalho do
   * arquiteto. Exibe o selo "Imagem ilustrativa" e o crédito do fotógrafo.
   */
  illustrative?: { photographer: string; url: string }
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
        src: asset('images/exemplos/p01-a.jpg'),
        illustrative: { photographer: '旅人 森', url: 'https://unsplash.com/photos/modern-house-with-wood-siding-s1Ywd6wgQyE' },
        alt: 'Imagem ilustrativa: casa com fachada de madeira e janelas amplas',
        brief: 'Fachada ou vista principal de um projeto concluído',
        ratio: 'landscape',
      },
      {
        src: asset('images/exemplos/p01-b.jpg'),
        illustrative: { photographer: 'Suhyeon Choi', url: 'https://unsplash.com/photos/sunlit-interior-with-sofa-and-table-ehxwis6Ltxg' },
        alt: 'Imagem ilustrativa: interior com luz natural e sombras de janela',
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
        src: asset('images/exemplos/p02.jpg'),
        illustrative: { photographer: 'Alesia Kazantceva', url: 'https://unsplash.com/photos/minimalist-concrete-staircase-with-vase-0B7ijYKaKcE' },
        alt: 'Imagem ilustrativa: escada de concreto claro',
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
        src: asset('images/exemplos/p03.jpg'),
        illustrative: { photographer: 'Hazel J', url: 'https://unsplash.com/photos/empty-modern-cafe-interior-with-tables-chairs-and-plants-B6xJi0rn040' },
        alt: 'Imagem ilustrativa: café vazio com mesas e plantas',
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
        src: asset('images/exemplos/p04.jpg'),
        illustrative: { photographer: 'Declan Sun', url: 'https://unsplash.com/photos/white-gravel-courtyard-with-modern-building-and-tree-ADftSGzfEbs' },
        alt: 'Imagem ilustrativa: pátio com cascalho branco e árvore',
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
        src: asset('images/exemplos/p05-a.jpg'),
        illustrative: { photographer: 'G', url: 'https://unsplash.com/photos/concrete-wall-texture-is-seen-up-close-v8o8Fvxxnto' },
        alt: 'Imagem ilustrativa: textura de concreto',
        brief: 'Detalhe construtivo: material, encaixe, textura',
        ratio: 'square',
      },
      {
        src: asset('images/exemplos/p05-b.jpg'),
        illustrative: { photographer: 'Julia', url: 'https://unsplash.com/photos/minimalist-living-room-with-wooden-sideboard-aX1TTOuq83M' },
        alt: 'Imagem ilustrativa: sala minimalista com aparador de madeira',
        brief: 'Vista geral do mesmo ambiente',
        ratio: 'portrait',
      },
    ],
  },
]

/** Fotografias de apoio fora do portfólio. */
export const heroImage: ProjectImage = {
  src: asset('images/exemplos/hero.jpg'),
  illustrative: { photographer: 'Pham Nhat', url: 'https://unsplash.com/photos/minimalist-house-with-green-trees-YhXZhD0ATD0' },
  alt: 'Imagem ilustrativa: casa contemporânea bege entre árvores',
  brief: 'Fotografia de impacto de um projeto concluído, horizontal, com profundidade',
  ratio: 'wide',
}

export const portraitImage: ProjectImage = {
  src: asset('images/exemplos/retrato.jpg'),
  illustrative: { photographer: 'Jonathan Borba', url: 'https://unsplash.com/photos/architectural-blueprints-and-a-laptop-on-a-marble-desk-rn00OVh0gEI' },
  alt: 'Imagem ilustrativa: plantas arquitetônicas sobre mesa de mármore',
  brief: 'Retrato profissional do arquiteto, luz natural, fundo neutro (a foto atual é só ilustrativa)',
  ratio: 'portrait',
}
