// Финальный набор иконок: медальон + ледяной серп озера + золотой Ольхон НА воде.
import { createRequire } from 'node:module'
import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const require = createRequire('C:/Users/ASUS/luminary/package.json')
const sharp = require('sharp')
const OUT = path.resolve('./ship')
await mkdir(OUT, { recursive: true })

const MIDNIGHT = '#070c12'
const ICE_LIGHT = '#eafcf9'
const ICE = '#3fd0c9'
const ICE_DEEP = '#1a7d7b'
const GOLD = '#e2b857'
const SIZE = 1024, CX = 512, CY = 512

/** Серп между двумя окружностями: острые концы, плавная толщина. */
function crescent(cx, cy, R, r, dx) {
  const d = Math.abs(dx)
  const a = (R * R - r * r + d * d) / (2 * d)
  const h = Math.sqrt(Math.max(0, R * R - a * a))
  const mx = cx + a * Math.sign(dx)
  return `M ${mx} ${cy - h} A ${R} ${R} 0 1 0 ${mx} ${cy + h} A ${r} ${r} 0 1 1 ${mx} ${cy - h} Z`
}

function svg({ medallion = true, mono = false, scale = 1 } = {}) {
  const RING = 392
  const R = 268 * scale
  const r = 232 * scale
  const dx = 118 * scale
  const lake = crescent(CX, CY, R, r, dx)

  // Ольхон лежит НА ледяной массе (остров в озере), а не в пустоте рядом — иначе знак читается как луна.
  const isleX = CX - 196 * scale
  const isleY = CY + 36 * scale
  const isleR = 25 * scale

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d1825"/><stop offset="100%" stop-color="${MIDNIGHT}"/>
    </linearGradient>
    <radialGradient id="medallion" cx="0.34" cy="0.28" r="0.85">
      <stop offset="0%" stop-color="#101d2b"/><stop offset="100%" stop-color="#08111a"/>
    </radialGradient>
    <linearGradient id="ice" x1="0.15" y1="0.05" x2="0.85" y2="1">
      <stop offset="0%" stop-color="${ICE_LIGHT}"/><stop offset="45%" stop-color="${ICE}"/><stop offset="100%" stop-color="${ICE_DEEP}"/>
    </linearGradient>
    <linearGradient id="rim" x1="0.15" y1="0" x2="0.9" y2="1">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.9"/>
      <stop offset="45%" stop-color="${GOLD}" stop-opacity="0.22"/>
      <stop offset="75%" stop-color="${GOLD}" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="halo" cx="0.5" cy="0.5" r="0.5">
      <stop offset="60%" stop-color="${ICE}" stop-opacity="0.14"/><stop offset="100%" stop-color="${ICE}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  ${medallion ? `<rect width="${SIZE}" height="${SIZE}" fill="url(#bg)"/>
    <circle cx="${CX}" cy="${CY}" r="${RING * 1.18}" fill="url(#halo)"/>
    <circle cx="${CX}" cy="${CY}" r="${RING}" fill="url(#medallion)"/>` : ''}
  <g transform="rotate(-20 ${CX} ${CY})">
    <path d="${lake}" fill="${mono ? '#ffffff' : 'url(#ice)'}"/>
    <circle cx="${isleX}" cy="${isleY}" r="${isleR}" fill="${mono ? '#08111a' : GOLD}"/>
  </g>
  ${medallion ? `<circle cx="${CX}" cy="${CY}" r="${RING}" fill="none" stroke="url(#rim)" stroke-width="9"/>` : ''}
</svg>`)
}

const targets = [
  { name: 'icon.png', opts: { medallion: true, scale: 1 } },
  { name: 'favicon.png', opts: { medallion: true, scale: 1 } },
  { name: 'splash-icon.png', opts: { medallion: false, scale: 0.9 } },
  { name: 'android-icon-foreground.png', opts: { medallion: false, scale: 0.78 } },
  { name: 'android-icon-monochrome.png', opts: { medallion: false, mono: true, scale: 0.78 } },
]
for (const t of targets) {
  await writeFile(path.join(OUT, t.name), await sharp(svg(t.opts)).png().toBuffer())
  console.log('OK', t.name)
}

const bgOnly = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#0d1825"/><stop offset="100%" stop-color="${MIDNIGHT}"/>
  </linearGradient></defs>
  <rect width="1024" height="1024" fill="url(#bg)"/>
</svg>`)
await writeFile(path.join(OUT, 'android-icon-background.png'), await sharp(bgOnly).png().toBuffer())
console.log('OK android-icon-background.png')

const master = await sharp(svg({ medallion: true, scale: 1 })).png().toBuffer()
const tiles = await Promise.all([48, 108, 192].map((s) => sharp(master).resize(s, s).png().toBuffer()))
await sharp({ create: { width: 400, height: 210, channels: 4, background: '#202020' } })
  .composite([
    { input: tiles[0], top: 80, left: 24 },
    { input: tiles[1], top: 50, left: 100 },
    { input: tiles[2], top: 9, left: 232 },
  ])
  .png()
  .toFile(path.join(OUT, 'sizes.png'))
console.log('OK превью размеров')
