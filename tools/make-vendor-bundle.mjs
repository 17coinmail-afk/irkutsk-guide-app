// Собирает src/map/vendor/index.ts — библиотеки карты как строки,
// чтобы WebView работал без сети (сейчас Leaflet тянется с CDN и офлайн не запускается).
import fs from 'node:fs'
import path from 'node:path'

const DIR = 'src/map/vendor'
const files = {
  LEAFLET_CSS: 'leaflet.css.txt',
  LEAFLET_JS: 'leaflet.js.txt',
  PMTILES_JS: 'pmtiles.js.txt',
  PROTOMAPS_JS: 'protomaps-leaflet.js.txt',
}

let out = `// СГЕНЕРИРОВАНО tools/make-vendor-bundle.mjs — не редактировать вручную.
// Библиотеки карты вшиты строками: WebView в офлайне не может ничего скачать.
/* eslint-disable */
`

for (const [name, file] of Object.entries(files)) {
  const raw = fs.readFileSync(path.join(DIR, file), 'utf8')
  // безопасно для template literal: экранируем обратные кавычки, ${ и обратный слеш
  const escaped = raw.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
  out += `\nexport const ${name} = \`${escaped}\`\n`
}

fs.writeFileSync(path.join(DIR, 'index.ts'), out)
const size = fs.statSync(path.join(DIR, 'index.ts')).size
console.log('vendor/index.ts:', Math.round(size / 1024), 'КБ')
