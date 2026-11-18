// Gera og-image.png e ícones PNG a partir de HTML, usando o Chromium do Playwright.
// Uso: node scripts/generate-assets.mjs
import { createRequire } from 'node:module'
// Requer o pacote playwright instalado (npx playwright install chromium). Os arquivos gerados já estão em /public.
const { chromium } = createRequire(import.meta.url)('playwright')
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public')
const fonts =
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Inter:wght@400;500&display=block">'

const og = `<!doctype html><html><head>${fonts}<style>
  body{margin:0;width:1200px;height:630px;background:#F5F3EE;color:#20201E;font-family:Inter,sans-serif;position:relative;overflow:hidden}
  .grid{position:absolute;inset:0;background:linear-gradient(90deg,rgba(32,32,30,.08) 1px,transparent 1px) 0 0/100px 100%}
  .name{position:absolute;left:80px;top:150px;font-family:'Cormorant Garamond';font-weight:400;font-size:140px;line-height:.9;letter-spacing:-2px}
  .name em{font-weight:300}
  .role{position:absolute;left:84px;bottom:92px;font-size:15px;letter-spacing:.32em;text-transform:uppercase}
  .areas{position:absolute;right:80px;bottom:92px;font-size:15px;letter-spacing:.24em;text-transform:uppercase;color:#6b6963}
  .bar{position:absolute;right:0;top:0;width:300px;height:100%;background:#D8D0C4}
  .rule{position:absolute;left:84px;right:80px;bottom:140px;height:1px;background:#20201E;opacity:.3}
</style></head><body><div class="bar"></div><div class="grid"></div>
<div class="name">Douglas<br><em>Bahia</em></div>
<div class="rule"></div>
<div class="role">Arquiteto e Urbanista</div>
<div class="areas">Residencial · Comercial · Paisagismo</div></body></html>`

const icon = (size) => `<!doctype html><html><head>${fonts}<style>
  body{margin:0;width:${size}px;height:${size}px;background:#20201E;display:grid;place-items:center}
  span{font-family:'Cormorant Garamond';font-weight:400;color:#F5F3EE;font-size:${size * 0.46}px;letter-spacing:${size * 0.01}px;line-height:1;transform:translateY(-${size * 0.03}px)}
  i{position:absolute;left:${size * 0.22}px;right:${size * 0.22}px;bottom:${size * 0.2}px;height:${Math.max(1, size / 64)}px;background:#D8D0C4}
</style></head><body><span>DB</span><i></i></body></html>`

const browser = await chromium.launch()
async function shot(html, w, h, file) {
  const page = await browser.newPage({ viewport: { width: w, height: h } })
  await page.setContent(html, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: path.join(out, file) })
  await page.close()
}
await shot(og, 1200, 630, 'og-image.png')
for (const [s, f] of [[32, 'favicon-32.png'], [180, 'apple-touch-icon.png'], [192, 'icon-192.png'], [512, 'icon-512.png']]) {
  await shot(icon(s), s, s, f)
}
await browser.close()
console.log('ok')
