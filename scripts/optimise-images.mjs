import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'
const sharp = createRequire(import.meta.url)('sharp')

const dir = path.resolve('public/images')
const entries = (await fs.readdir(dir)).filter(name => name.endsWith('.png') && !name.startsWith('ccg-c-logo'))
let before = 0, after = 0
for (const name of entries) {
  const input = path.join(dir, name)
  const output = path.join(dir, name.replace(/\.png$/, '.webp'))
  const size = (await fs.stat(input)).size
  await sharp(input).resize({ width: name === 'hero-cylinder-delivery.png' ? 1600 : 1280, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(output)
  const thumb = path.join(dir, name.replace(/\.png$/, '-card.webp'))
  await sharp(input).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toFile(thumb)
  const outSize = (await fs.stat(output)).size
  before += size; after += outSize
  console.log(`${name}: ${size} → ${outSize} bytes`)
}
await sharp(path.join(dir, 'ccg-c-logo-red.png')).trim({ background: '#ffffff', threshold: 20 }).resize({ width: 600, withoutEnlargement: true }).webp({ quality: 94 }).toFile(path.join(dir, 'ccg-c-logo-compact.webp'))
console.log(JSON.stringify({ original_photo_bytes: before, optimised_photo_bytes: after, reduction_percent: Math.round((1 - after / before) * 100) }))
