import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const require = createRequire(import.meta.url)
const ts = require('typescript')
const cache = new Map()
function load(file) {
  const absolute = path.resolve(file)
  if (cache.has(absolute)) return cache.get(absolute).exports
  const module = { exports: {} }; cache.set(absolute, module)
  const source = fs.readFileSync(absolute, 'utf8')
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText
  function localRequire(name) {
    if (name === 'next/link') return { __esModule: true, default: ({ href, children, ...props }) => React.createElement('a', { ...props, href }, children) }
    if (name === 'next/image') return { __esModule: true, default: ({ priority, fill, unoptimized, ...props }) => React.createElement('img', props) }
    if (name === 'next/navigation') return { useSearchParams: () => new URLSearchParams(), notFound() { throw new Error('Unexpected missing page') } }
    if (name.startsWith('@/') || name.startsWith('.')) {
      const base = name.startsWith('@/') ? path.resolve(name.slice(2)) : path.resolve(path.dirname(absolute), name)
      const target = [base, base+'.tsx', base+'.ts', base+'.mjs'].find(p => fs.existsSync(p) && fs.statSync(p).isFile())
      assert.ok(target, `${file}: unresolved import ${name}`)
      return load(target)
    }
    return require(name)
  }
  const run = vm.runInThisContext(`(function(require,module,exports){${code}\n})`, { filename: absolute })
  run(localRequire, module, module.exports)
  return module.exports
}
const pages = load('app/[...slug]/page.tsx')
const { contactPreset, sdsContactHref, gasOptions } = load('lib/contact-options.ts')
for (const product of gasOptions) {
  const href = new URL(sdsContactHref(product), 'https://local.test')
  const preset = contactPreset(href.search)
  assert.equal(preset.product, product)
  assert.equal(preset.service, 'SDS request')
  assert.ok(preset.requirements.includes(product))
}
assert.equal(contactPreset('?service=SDS+request').product, 'Not sure — please advise')
assert.equal(contactPreset('?product=unknown&service=unknown').product, '')
const routes = ['/', ...pages.generateStaticParams().map(({ slug }) => '/' + slug.join('/'))]
const htmlByPath = new Map()
for (const route of routes) {
  const page = route === '/' ? React.createElement(load('app/page.tsx').default) : await pages.default({ params: Promise.resolve({ slug: route.slice(1).split('/') }) })
  const html = renderToStaticMarkup(page)
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: expected one primary heading`)
  assert.ok(html.includes('<main'), `${route}: missing main content`)
  htmlByPath.set(route, html)
}
function decode(value) { return value.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"') }
let links=0, images=0, sds=0
function check(route, html) {
  for (const match of html.matchAll(/<(a|img|link)\b([^>]+)>/g)) {
    const [, tag, attributes] = match
    const attr = key => decode(attributes.match(new RegExp(`\\b${key}="([^"]*)"`))?.[1] || '')
    const value = attr(tag === 'img' ? 'src' : 'href')
    if (!value || /^(?:https?:|mailto:|tel:|data:)/.test(value)) continue
    const target = new URL(value, 'https://local.test' + (route === '/' ? '/' : route + '/'))
    const pathname = decodeURIComponent(target.pathname).replace(/\/$/, '') || '/'
    if (tag === 'img' || (tag === 'link' && !htmlByPath.has(pathname))) {
      assert.ok(fs.existsSync(path.join('public', decodeURIComponent(target.pathname))), `${route}: missing asset ${value}`)
      if (tag === 'img') { images++; assert.ok(attr('alt'), `${route}: image missing alternative text`) }
      continue
    }
    assert.ok(htmlByPath.has(pathname), `${route}: missing page ${value}`)
    if (target.hash) assert.ok(htmlByPath.get(pathname).includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `${route}: missing anchor ${value}`)
    if (target.searchParams.get('service') === 'SDS request') {
      sds++
      assert.equal(pathname, '/contact')
      assert.equal(target.hash, '#quote-form')
    }
    links++
  }
  assert.doesNotMatch(html, /orders@ccgcorporation\.ca/, `${route}: outdated contact address`)
  assert.ok(html.includes('sales@ccgcorporation.ca'), `${route}: missing sales contact`)
  assert.doesNotMatch(html, /href="mailto:[^"]*SDS/i, `${route}: SDS must open contact form`)
}
for (const [route, html] of htmlByPath) check(route, html)
assert.ok(sds >= routes.length + 19, 'Expected global SDS links plus gas and safety table links')
if (process.argv.includes('--export')) {
  assert.ok(fs.existsSync('out/index.html'), 'Build output is required for --export')
  for (const route of routes) {
    const file = path.join('out', route === '/' ? 'index.html' : route.slice(1) + '/index.html')
    assert.ok(fs.existsSync(file), `Missing exported page ${route}`)
    check(route, fs.readFileSync(file, 'utf8'))
  }
}
console.log(`Rendered ${routes.length} pages: verified ${links} internal links, ${images} image uses and ${sds} SDS form links. No missing internal destinations or local assets.`)
