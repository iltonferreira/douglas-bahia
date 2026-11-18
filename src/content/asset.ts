/** Caminho de arquivo em /public respeitando o `base` do Vite (ex.: GitHub Pages). */
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
