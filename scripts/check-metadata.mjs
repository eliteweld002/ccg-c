import fs from 'node:fs'
import vm from 'node:vm'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
const ts = createRequire(import.meta.url)('typescript')

// Exercise route/metadata exports without rendering pages or requiring a running Next server.
function load(file, dependencies = {}) {
  const source = fs.readFileSync(file, 'utf8')
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText
  const exports = {}
  vm.runInNewContext(code, { exports, require: name => dependencies[name] ?? {}, URL, console, process: { env: { VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL } } }, { filename: file })
  return exports
}
const site = load('lib/site-metadata.ts')
const pages = load('app/[...slug]/page.tsx', { '@/lib/site-metadata': site })
const home = load('app/page.tsx', { '@/lib/site-metadata': site })
const routes = pages.generateStaticParams().map(({ slug }) => '/' + slug.join('/'))
assert.deepEqual([...site.sitePaths].sort(), ['/', ...routes].sort(), 'Sitemap paths must match exported page routes')
assert.equal(new Set(routes).size, routes.length, 'No duplicate routes')
const titles = new Set()
for (const path of routes) {
  const result = await pages.generateMetadata({ params: Promise.resolve({ slug: path.slice(1).split('/') }) })
  assert.ok(typeof result.title === 'string' && result.title.length > 0, path + ': missing title')
  // Search-result snippets truncate around 60 characters (title incl. " | CCG-C") and ~160 (description).
  assert.ok(result.title.length <= 50, path + ': title too long for search results (' + result.title.length + ')')
  assert.ok(result.description.length >= 110 && result.description.length <= 160, path + ': description should be 110-160 characters (' + result.description?.length + ')')
  assert.doesNotMatch(String(site.siteOrigin), /chatgpt\.site|vercel\.app|localhost/, 'siteOrigin must be the real production domain')
  assert.equal(result.alternates.canonical, path + '/', path + ': incorrect canonical URL')
  assert.ok(fs.existsSync('public' + result.openGraph.images[0].url), path + ': missing share image')
  titles.add(result.title)
}
assert.equal(titles.size, routes.length, 'Each inner page needs a distinct title')
assert.equal(home.metadata.alternates.canonical, '/')
for (const name of ['high-pressure-cylinder', 'co2-cylinder', 'acetylene-cylinder', 'forklift-cylinder']) assert.ok(fs.existsSync('public/images/' + name + '.webp'))
for (const name of ['brand-icon-32.png', 'brand-apple-icon.png']) assert.ok(fs.existsSync('public/' + name))
console.log(`Verified ${routes.length + 1} page routes, distinct inner-page titles, canonical URLs, share images and cylinder assets.`)
