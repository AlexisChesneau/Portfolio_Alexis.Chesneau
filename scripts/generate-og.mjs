/**
 * Génère public/og-image.png (1200×630) — l'image affichée lors d'un partage
 * du site sur LinkedIn, Slack, WhatsApp…
 *
 * Usage : npx playwright install chromium   (une seule fois)
 *         npm run og
 *
 * Le texte est lu depuis src/data/cv.ts (Node ≥ 22.6 sait lire le TypeScript simple).
 */
import { chromium } from 'playwright'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = new URL('..', import.meta.url)

// Lecture minimale des champs utiles dans cv.ts (sans exécuter de TypeScript)
const source = await readFile(new URL('src/data/cv.ts', root), 'utf8')
const pick = (key) => source.match(new RegExp(`${key}:\\s*'([^']*)'`))?.[1] ?? ''
const firstName = pick('firstName')
const lastName = pick('lastName')
const tagline = source.match(/tagline:\s*"([^"]*)"/)?.[1] ?? ''
const role = source.match(/export const profile[\s\S]*?title:\s*'([^']*)'/)?.[1] ?? ''

// Polices intégrées en base64 (les URL file:// sont bloquées dans une page vierge)
const font = async (pkg, file) =>
  `data:font/woff2;base64,${(await readFile(new URL(`node_modules/${pkg}/files/${file}`, root))).toString('base64')}`
const inter = await font('@fontsource-variable/inter', 'inter-latin-wght-normal.woff2')
const mono = await font('@fontsource-variable/jetbrains-mono', 'jetbrains-mono-latin-wght-normal.woff2')

const html = /* html */ `<!doctype html><html><head><style>
@font-face{font-family:Inter;src:url('${inter}') format('woff2');font-weight:100 900}
@font-face{font-family:Mono;src:url('${mono}') format('woff2');font-weight:100 900}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#0A1020;font-family:Inter;color:#E2E8F0;position:relative;overflow:hidden;padding:72px 80px}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(6,182,212,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,.07) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse at 70% 40%,black 10%,transparent 75%)}
.glow{position:absolute;width:640px;height:640px;border-radius:50%;background:radial-gradient(circle,rgba(6,182,212,.28),transparent 65%);right:-160px;top:-200px}
.logo{position:absolute;right:80px;bottom:72px;width:120px;height:120px;border-radius:28px;border:2px solid rgba(6,182,212,.5);background:#111A2E;display:flex;align-items:center;justify-content:center;font-family:Mono;font-weight:700;font-size:52px;color:#06B6D4;box-shadow:0 0 60px -10px rgba(6,182,212,.6)}
.prompt{font-family:Mono;font-size:26px;color:#67E8F9;position:relative}
.prompt span{color:#94A3B8}
h1{font-size:96px;line-height:1.02;font-weight:800;letter-spacing:-2px;margin-top:28px;position:relative}
h1 .l{background:linear-gradient(100deg,#67E8F9,#06B6D4 45%,#3B82F6);-webkit-background-clip:text;color:transparent}
.role{font-size:28px;font-weight:600;margin-top:32px;max-width:860px;position:relative}
.tag{font-family:Mono;font-size:18px;color:#94A3B8;margin-top:16px;max-width:880px;position:relative}
.bar{position:absolute;left:0;top:0;height:6px;width:100%;background:linear-gradient(90deg,#06B6D4,#67E8F9,#3B82F6)}
</style></head><body>
<div class="grid"></div><div class="glow"></div><div class="bar"></div>
<p class="prompt"><span>$</span> whoami</p>
<h1>${firstName}<br><span class="l">${lastName}</span></h1>
<p class="role">${role}</p>
<p class="tag">${tagline}</p>
<div class="logo">AC</div>
</body></html>`

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html, { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: fileURLToPath(new URL('public/og-image.png', root)) })
await browser.close()
console.log('✔ public/og-image.png généré')
