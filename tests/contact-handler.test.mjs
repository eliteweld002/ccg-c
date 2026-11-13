import test from 'node:test'
import assert from 'node:assert/strict'
import { contactResponse } from '../server/contact-handler.mjs'
import handler from '../api/contact.mjs'

const valid = { business: 'Example Fabrication', name: 'Sample Customer', email: 'customer@example.com', phone: '519 555 0100', location: 'Ontario, Canada', product: 'Argon', service: 'Delivery', quantity: '2', requirements: 'Please quote two argon cylinders.', website: '', requestId: 'e4f127ca-613b-45c8-a284-e648674932bb' }
let ip = 0
function request(data = valid, headers = {}) {
  return new Request('https://ccg.example/api/contact', { method: 'POST', headers: { Origin: 'https://ccg.example', 'Content-Type': 'application/json', 'x-vercel-forwarded-for': `192.0.2.${++ip}`, ...headers }, body: JSON.stringify(data) })
}
const configured = { RESEND_API_KEY: 'test-only-key-never-sent' }
test('Vercel entry point exposes a fetch handler', () => assert.equal(typeof handler.fetch, 'function'))
test('valid enquiry uses sales as sender/recipient and customer as reply-to', async () => {
  let submitted
  const response = await contactResponse(request({ ...valid, to: 'unapproved@example.com' }), { env: configured, send: async (url, init) => { submitted = { url, init, body: JSON.parse(init.body) }; return Response.json({ id: 'test-provider-id' }) } })
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { success: true, reference: valid.requestId })
  assert.equal(submitted.url, 'https://api.resend.com/emails')
  assert.deepEqual(submitted.body.to, ['sales@ccgcorporation.ca'])
  assert.equal(submitted.body.from, 'Canada Compressed Gas Corporation <sales@ccgcorporation.ca>')
  assert.equal(submitted.body.reply_to, valid.email)
  assert.match(submitted.body.text, /Please quote two argon cylinders/)
  assert.equal(submitted.init.headers['Idempotency-Key'], `ccgc-contact/${valid.requestId}`)
  assert.equal(response.headers.get('cache-control'), 'no-store')
})
test('SDS enquiry keeps product and request purpose', async () => {
  let body
  const response = await contactResponse(request({ ...valid, product: 'Helium', service: 'SDS request' }), { env: configured, send: async (_, init) => { body = JSON.parse(init.body); return Response.json({ id: 'sds-test-id' }) } })
  assert.equal(response.status, 200)
  assert.match(body.subject, /^SDS request — Helium/)
})
test('missing key is unavailable, never a false success', async () => {
  const response = await contactResponse(request(), { env: {}, send: () => assert.fail('Provider must not be called') })
  assert.equal(response.status, 503)
  assert.equal((await response.json()).code, 'email_unavailable')
})
test('reject invalid fields, malicious headers, honeypot, and unknown options before sending', async () => {
  for (const invalid of [{ email: 'bad-address' }, { email: 'a@example.com\r\nBcc:x@example.com' }, { business: 'Injected\nheader' }, { product: 'Unknown' }, { service: 'Unknown' }, { quantity: '-2' }, { quantity: '1.5' }, { requirements: 'x'.repeat(2001) }, { name: '' }, { website: 'bot.example' }, { requestId: 'invalid' }]) {
    const response = await contactResponse(request({ ...valid, ...invalid }), { env: configured, send: () => assert.fail('Invalid requests must not send') })
    assert.equal(response.status, 400, JSON.stringify(invalid))
  }
})
test('reject other origins and unsafe methods', async () => {
  assert.equal((await contactResponse(request(valid, { Origin: 'https://other.example' }))).status, 403)
  assert.equal((await contactResponse(new Request('https://ccg.example/api/contact'))).status, 405)
  assert.equal((await contactResponse(request(valid, { 'Content-Type': 'text/plain' }))).status, 415)
})
test('reject malformed and oversized data', async () => {
  const base = { method: 'POST', headers: { Origin: 'https://ccg.example', 'Content-Type': 'application/json' } }
  assert.equal((await contactResponse(new Request('https://ccg.example/api/contact', { ...base, body: '{bad' }))).status, 400)
  assert.equal((await contactResponse(new Request('https://ccg.example/api/contact', { ...base, body: JSON.stringify({ junk: 'x'.repeat(17000) }) }))).status, 413)
})
test('provider failures and timeouts never confirm submission or leak provider details', async () => {
  for (const send of [async () => Response.json({ message: 'secret provider details' }, { status: 403 }), async () => Response.json({}), async () => { throw new Error('private details') }]) {
    const response = await contactResponse(request(), { env: configured, send })
    assert.equal(response.status, 502)
    const text = await response.text()
    assert.doesNotMatch(text, /secret|private details|test-only-key/)
    assert.doesNotMatch(text, /"success":true/)
  }
})
test('retries forward the same provider idempotency key', async () => {
  const keys = []
  for (let i=0; i<2; i++) await contactResponse(request(), { env: configured, send: async (_, init) => { keys.push(init.headers['Idempotency-Key']); return Response.json({ id: 'same-email-id' }) } })
  assert.equal(keys[0], keys[1])
})
test('rate limit repeated requests from the same instance/address', async () => {
  const headers = { 'x-vercel-forwarded-for': '198.51.100.250' }
  let calls = 0
  const options = { env: configured, send: async () => { calls++; return Response.json({ id: 'throttle-test' }) } }
  for (let i=0;i<10;i++) assert.equal((await contactResponse(request(valid, headers), options)).status, 200)
  assert.equal((await contactResponse(request(valid, headers), options)).status, 429)
  assert.equal(calls, 10)
})
