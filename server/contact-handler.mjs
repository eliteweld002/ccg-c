import { createHash } from 'node:crypto'

const destination = 'sales@ccgcorporation.ca'
const products = new Set(['Argon', 'Argon/CO2 Mixes', 'Oxygen', 'Acetylene', 'Carbon Dioxide', 'Nitrogen', 'Helium', 'Hydrogen', 'Beer gas', 'Forklift Propane', 'Not sure — please advise'])
const services = new Set(['Please advise', 'Delivery', 'Exchange / rental', 'Owned-cylinder refill', 'Forklift propane', 'SDS request'])
const limits = new Map()
const reply = (status, body) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } })

// The recipient and sender are server-owned: submitted fields can never turn
// this endpoint into an email relay. No API key is included in browser code.
export async function contactResponse(request, { env = process.env, send = fetch, now = Date.now } = {}) {
  if (request.method !== 'POST') return new Response(null, { status: 405, headers: { Allow: 'POST', 'Cache-Control': 'no-store' } })
  const origin = request.headers.get('origin')
  if (!origin || origin !== new URL(request.url).origin || request.headers.get('sec-fetch-site') === 'cross-site') return reply(403, { error: 'Please submit the form from this website.' })
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return reply(415, { error: 'Please submit the contact form.' })
  if (Number(request.headers.get('content-length') || 0) > 16000) return reply(413, { error: 'Your request is too long. Please shorten it and try again.' })
  let data
  try {
    const raw = await request.text()
    if (new TextEncoder().encode(raw).length > 16000) return reply(413, { error: 'Your request is too long. Please shorten it and try again.' })
    data = JSON.parse(raw)
  } catch { return reply(400, { error: 'Please check your form details and try again.' }) }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return reply(400, { error: 'Please check your form details.' })
  const fields = { business: 120, name: 120, email: 160, phone: 40, location: 160, product: 80, service: 60, quantity: 6, requirements: 2000, website: 200, requestId: 36 }
  const cleaned = {}
  for (const [key, max] of Object.entries(fields)) {
    const value = data[key] ?? ''
    if (typeof value !== 'string' || value.length > max) return reply(400, { error: 'Please check the length and format of your form details.' })
    cleaned[key] = value.trim()
  }
  const c = cleaned
  if (c.website) return reply(400, { error: 'Unable to submit this request.' })
  if (!c.business || !c.name || !c.email || !c.location || !c.requirements || !products.has(c.product) || !services.has(c.service)) return reply(400, { error: 'Please complete the required fields and select a product.' })
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(c.email) || /[\r\n]/.test(c.email + c.name + c.business) || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(c.requestId)) return reply(400, { error: 'Please check your email address and try again.' })
  if (c.quantity && (!/^\d+$/.test(c.quantity) || Number(c.quantity) < 1 || Number(c.quantity) > 100000)) return reply(400, { error: 'Please enter a valid cylinder quantity.' })
  if (!env.RESEND_API_KEY) return reply(503, { error: 'Online submission is temporarily unavailable. Your details are preserved below so you can email sales@ccgcorporation.ca.', code: 'email_unavailable' })

  // A per-instance throttle supplements Vercel's platform protections.
  const timestamp = now()
  for (const [key, value] of limits) if (timestamp - value.start > 600000) limits.delete(key)
  const address = request.headers.get('x-vercel-forwarded-for')?.split(',')[0].trim() || request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  const key = createHash('sha256').update(address).digest('hex')
  const count = limits.get(key) || { start: timestamp, count: 0 }
  if (count.count >= 10 || (!limits.has(key) && limits.size >= 10000)) return reply(429, { error: 'Too many attempts. Please wait a few minutes or email sales@ccgcorporation.ca.' })
  count.count++; limits.set(key, count)
  const subject = `${c.service === 'SDS request' ? 'SDS request' : 'Website enquiry'} — ${c.product} — ${c.business}`
  const text = ['Canada Compressed Gas Corporation — website enquiry', '', `Service: ${c.service}`, `Product: ${c.product}`, `Business: ${c.business}`, `Contact: ${c.name}`, `Email: ${c.email}`, `Phone: ${c.phone || 'Not supplied'}`, `Location: ${c.location}`, `Cylinders per month: ${c.quantity || 'Not supplied'}`, '', 'Requirements:', c.requirements, '', `Request reference: ${c.requestId}`].join('\n')
  try {
    const response = await send('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `ccgc-contact/${c.requestId}` },
      body: JSON.stringify({ from: `Canada Compressed Gas Corporation <${destination}>`, to: [destination], reply_to: c.email, subject, text }),
      signal: AbortSignal.timeout(10000),
    })
    const result = await response.json().catch(() => null)
    if (!response.ok || typeof result?.id !== 'string' || !result.id) return reply(502, { error: 'We could not confirm your submission. Please retry or use the email option below.' })
    return reply(200, { success: true, reference: c.requestId })
  } catch { return reply(502, { error: 'We could not confirm your submission. Your details are preserved below. Retry or email sales@ccgcorporation.ca.' }) }
}
