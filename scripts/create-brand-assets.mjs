import fs from 'node:fs/promises'
import { createRequire } from 'node:module'
const sharp = createRequire(import.meta.url)('sharp')

const logo = 'public/images/ccg-c-logo-compact.webp'
const mark = await sharp(logo).extract({ left: 0, top: 0, width: 104, height: 296 }).resize({ height: 420 }).png().toBuffer()
const markInfo = await sharp(mark).metadata()
const icon = await sharp({ create: { width: 512, height: 512, channels: 4, background: '#ffffff' } }).composite([{ input: mark, left: Math.round((512 - markInfo.width) / 2), top: 46 }]).png().toBuffer()
await sharp(icon).toFile('public/brand-icon.png')
await sharp(icon).resize(32, 32).png().toFile('public/brand-icon-32.png')
await sharp(icon).resize(180, 180).png().toFile('public/brand-apple-icon.png')

await fs.mkdir('public/social', { recursive: true })
const hero = await sharp('public/images/hero-cylinder-delivery.webp').resize(480, 630, { fit: 'cover', position: 'right' }).png().toBuffer()
const brand = await sharp(logo).resize({ width: 360 }).png().toBuffer()
const copy = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect x="48" y="271" width="55" height="5" fill="#C8102E"/><g font-family="Arial, sans-serif"><text x="48" y="350" font-size="54" font-weight="700" fill="#00264D">Industrial Gases</text><text x="48" y="416" font-size="54" font-weight="700" fill="#00264D">Forklift Propane</text><text x="48" y="482" font-size="24" fill="#3C536B">Cylinder supply. Clear service. Written quotes.</text><text x="48" y="571" font-size="22" font-weight="700" fill="#C8102E">Proudly Canadian</text><text x="286" y="571" font-size="22" fill="#9BB8D0">•</text><text x="315" y="571" font-size="22" fill="#3C536B">Ontario, Canada</text></g></svg>`)
await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#ffffff' } }).composite([{ input: hero, left: 720, top: 0 }, { input: brand, left: 48, top: 40 }, { input: copy }]).png().toFile('public/social/ccgc-share.png')
console.log('Created CCG-C browser icons and 1200×630 sharing image.')
