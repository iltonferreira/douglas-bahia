# Douglas Bahia — Arquiteto e Urbanista

Landing page editorial em React 19 + TypeScript + Vite. CSS próprio, sem framework de UI e sem dependências de runtime além do React.

O relatório completo da entrega (pesquisa, fontes, pendências, fotografias e testes) está em [`ENTREGA.md`](./ENTREGA.md).

## Executar

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build e pré-visualização

```bash
npm run build      # tsc + vite build → dist/
npm run preview    # http://localhost:4173
npm run lint       # oxlint
```

Teste de fumaça (opcional, usa Playwright):

```bash
npm i -D playwright && npx playwright install chromium
npm run build && npm run preview &
npm run test:smoke
```

## Estrutura

```
src/
  content/
    site.ts        ← nome, contatos, serviços, frase. Fonte única dos dados.
    projects.ts    ← portfólio, imagem do hero e retrato.
  components/      ← Header, Hero, Portfolio, Lightbox, About, Services,
                     Process, Contact, ContactForm, Footer + peças reutilizáveis
                     (ImageSlot, Reveal, SectionLabel, ArrowLink, DraftNote, Logo)
  hooks/           ← useReveal (entrada ao rolar), useScrollLock
  styles/index.css ← tokens de cor/tipografia, grade de 12 colunas, todas as seções
public/            ← favicon, ícones, og-image.png, robots.txt, sitemap.xml
public/images/projetos/ ← onde entram as fotografias autorizadas
scripts/           ← generate-assets.mjs (OG + ícones), smoke-test.cjs
```

## Inserir as fotografias

1. Salve os arquivos em `public/images/projetos/` (JPG ou WebP, lado maior com cerca de 2400 px, até ~400 KB).
2. Em `src/content/projects.ts`, preencha `src: asset('images/projetos/arquivo.jpg')`, apague a linha `illustrative`, o `alt` e os dados confirmados (`title`, `category`, `location`, `year`, `description`) e mude `confirmed` para `true`.
3. Para o hero e o retrato, preencha `heroImage.src` e `portraitImage.src` no mesmo arquivo.

Enquanto não houver `src`, ou se o arquivo falhar, o componente `ImageSlot` mostra um espaço reservado com desenho de linha e a descrição da foto esperada. Durante o carregamento aparece um brilho discreto; ao terminar, a imagem entra com fade.

## Antes de publicar

- Em `src/content/site.ts`, mude `showDraftNotes` para `false`. Isso esconde todas as anotações "A confirmar" e as legendas "Fotografia a fornecer".
- Troque `https://iltonferreira.github.io/douglas-bahia` (domínio provisório) pelo domínio real em `index.html`, `public/robots.txt`, `public/sitemap.xml` e `src/content/site.ts`.
- Se mudar nome ou cores, regenere a imagem de compartilhamento e os ícones com `npm run assets` (requer Playwright).

## Imagens ilustrativas

As fotos em `public/images/exemplos/` são exemplos do Unsplash (licença livre, créditos em `creditos.json`). Elas aparecem com o selo "Imagem ilustrativa" e com o crédito do fotógrafo na galeria. **Não são trabalhos do Douglas**: troque pelas fotos reais antes de usar o site como portfólio dele.

## Publicar

### GitHub Pages (configurado)

Cada `push` na branch `main` roda `.github/workflows/deploy.yml`, que gera o build com `BASE_PATH=/douglas-bahia/` e publica em https://iltonferreira.github.io/douglas-bahia/. Se o nome do repositório mudar, ajuste `BASE_PATH` no workflow.

### Outras opções

O resultado de `npm run build` é um site estático em `dist/`.

- **Vercel**: importe o repositório. Framework "Vite", build `npm run build`, saída `dist`.
- **Netlify**: build `npm run build`, publish `dist`. Também é possível arrastar a pasta `dist/` em app.netlify.com/drop.
- **Hospedagem comum (cPanel, FTP)**: envie o conteúdo de `dist/` para a pasta pública do domínio.

## Formulário de contato

O formulário não precisa de servidor: ele monta a mensagem e abre o WhatsApp (ou o aplicativo de e-mail) do arquiteto já preenchido. Nenhum dado é armazenado pelo site. Para receber envios direto por e-mail, dá para ligar o mesmo formulário a um serviço como Formspree ou Netlify Forms depois.
