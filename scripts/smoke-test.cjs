const { chromium, devices } = require('playwright')
// Teste de fumaça: npm run build && npm run preview, depois
//   node scripts/smoke-test.cjs [pasta-para-capturas]
// Requer o pacote playwright (npx playwright install chromium).
const BASE = process.env.BASE_URL || 'http://localhost:4173/'
let failures = 0
const ok = (c, m) => { if (!c) failures++; console.log((c ? 'PASS ' : 'FAIL ') + m) }
;(async () => {
  const b = await chromium.launch()
  // Desktop
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
  const p = await ctx.newPage()
  await p.goto(BASE, { waitUntil: 'networkidle' })
  // headings & alts
  const h1 = await p.locator('h1').count(); ok(h1 === 1, `um único h1 (${h1})`)
  const hs = await p.evaluate(() => [...document.querySelectorAll('h1,h2,h3')].map(h => h.tagName + ':' + h.textContent.trim().slice(0, 30)))
  console.log('  headings:', hs.join(' | '))
  const brokenImgs = await p.evaluate(() => [...document.images].filter(i => i.complete && i.naturalWidth === 0).length); ok(brokenImgs === 0, 'nenhuma <img> quebrada')
  const noName = await p.evaluate(() => [...document.querySelectorAll('a,button')].filter(e => !(e.textContent.trim() || e.getAttribute('aria-label'))).length); ok(noName === 0, 'links e botões com nome acessível')
  // anchor nav
  for (const id of ['inicio', 'projetos', 'sobre', 'contato', 'servicos', 'processo']) ok(await p.locator('#' + id).count() === 1, `âncora #${id}`)
  await p.click('.header__nav a[href="#sobre"]'); await p.waitForTimeout(1200)
  const y = await p.evaluate(() => document.querySelector('#sobre').getBoundingClientRect().top); ok(Math.abs(y - 100) < 40, `navegação suave até Sobre (top=${Math.round(y)})`)
  // links
  const hrefs = await p.evaluate(() => [...new Set([...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')))])
  console.log('  links:', hrefs.join('\n         '))
  const wa = hrefs.filter(h => h.startsWith('https://wa.me/5562995343588')); ok(wa.length > 0, `links WhatsApp corretos (${wa.length})`)
  const ext = await p.evaluate(() => [...document.querySelectorAll('a[href^="http"]')].every(a => a.target === '_blank' && a.rel.includes('noopener'))); ok(ext, 'links externos abrem em nova aba com noopener')
  // gallery
  await p.locator('.project__open').first().click()
  ok(await p.locator('.lightbox').isVisible(), 'galeria abre')
  const c1 = await p.locator('.lightbox__counter').textContent()
  await p.keyboard.press('ArrowRight'); const c2 = await p.locator('.lightbox__counter').textContent()
  await p.keyboard.press('ArrowLeft'); await p.keyboard.press('ArrowLeft'); const c3 = await p.locator('.lightbox__counter').textContent()
  ok(c1.startsWith('01') && c2.startsWith('02') && c3.startsWith('07'), `navegação por teclado (${c1} → ${c2} → ${c3})`)
  await p.click('.lightbox__nav--next'); ok((await p.locator('.lightbox__counter').textContent()).startsWith('01'), 'botão próxima volta ao início')
  ok(await p.evaluate(() => document.body.style.overflow === 'hidden'), 'rolagem travada com galeria aberta')
  await p.keyboard.press('Escape'); ok(await p.locator('.lightbox').count() === 0, 'Esc fecha a galeria')
  ok(await p.evaluate(() => document.activeElement.classList.contains('project__open')), 'foco volta à imagem')
  // form
  await p.click('button[value="whatsapp"]'); ok(await p.locator('.field__error').count() === 2, 'validação de campos obrigatórios')
  await p.fill('input[name="name"]', 'Maria Teste'); await p.check('input[value="Comercial"]', { force: true })
  await p.fill('textarea[name="message"]', 'Gostaria de um projeto para minha loja.')
  await p.evaluate(() => { window.__opened = []; window.open = (u) => { window.__opened.push(u); return null } })
  await p.click('button[value="whatsapp"]')
  const url = decodeURIComponent((await p.evaluate(() => window.__opened))[0] || '')
  ok(url.startsWith('https://wa.me/5562995343588?text=') && url.includes('Maria Teste') && url.includes('Comercial'), 'formulário abre WhatsApp com mensagem montada')
  ok((await p.locator('.form__status').textContent()).length > 0, 'mensagem de status anunciada')
  await ctx.close()
  // Mobile
  const m = await b.newContext(devices['iPhone 13']); const mp = await m.newPage()
  await mp.goto(BASE, { waitUntil: 'networkidle' })
  ok(await mp.locator('.header__nav').isHidden(), 'nav desktop oculta no mobile')
  await mp.click('.header__toggle'); await mp.waitForTimeout(900)
  ok(await mp.locator('#menu-mobile').isVisible(), 'menu mobile abre')
  ok((await mp.getAttribute('.header__toggle', 'aria-expanded')) === 'true', 'aria-expanded atualizado')
  await mp.screenshot({ path: (process.argv[2] || '.') + '/mobile-menu.png' })
  await mp.click('#menu-mobile a[href="#contato"]'); await mp.waitForTimeout(3000)
  ok(await mp.locator('#menu-mobile').isHidden(), 'menu fecha ao navegar')
  const yc = await mp.evaluate(() => document.querySelector('#contato').getBoundingClientRect().top); ok(Math.abs(yc - 84) < 40, `chega em Contato (top=${Math.round(yc)})`)
  await mp.locator('.project__open').nth(2).scrollIntoViewIfNeeded(); await mp.locator('.project__open').nth(2).click()
  await mp.waitForTimeout(500); await mp.screenshot({ path: (process.argv[2] || '.') + '/mobile-lightbox.png' })
  ok(await mp.locator('.lightbox').isVisible(), 'galeria abre no mobile')
  await m.close(); await b.close()
  console.log(failures ? `${failures} falha(s)` : 'Todos os testes passaram')
  process.exit(failures ? 1 : 0)
})().catch(e => { console.error('ERRO', e); process.exit(1) })
