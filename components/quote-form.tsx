'use client'

import { Suspense, useEffect, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { contactEmail, contactPreset, gasOptions, serviceOptions } from '@/lib/contact-options'

const onlineSubmission = process.env.NEXT_PUBLIC_CONTACT_API_ENABLED === 'true'

export function QuoteForm() {
  return <div id="quote-form" className="scroll-mt-6"><Suspense fallback={<p className="text-sm text-[#3C536B]">Loading enquiry form… You can also email <a href={`mailto:${contactEmail}`} className="text-[#0072CE]">{contactEmail}</a>.</p>}><ContactForm/></Suspense></div>
}

function ContactForm() {
  const search = useSearchParams().toString()
  const [draft, setDraft] = useState('')
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  const [reference, setReference] = useState('')
  const [product, setProduct] = useState('')
  const [service, setService] = useState(serviceOptions[0])
  const [requirements, setRequirements] = useState('')
  const attempt = useRef({ payload: '', id: '' })
  const pending = useRef(false)
  const message = useRef<HTMLDivElement>(null)
  function reset() {
    const preset = contactPreset(search)
    setProduct(preset.product)
    setService(preset.service)
    setRequirements(preset.requirements)
    setSent(false)
    setStatus('')
    setDraft('')
    setReference('')
    attempt.current = { payload: '', id: '' }
  }
  useEffect(reset, [search]) // eslint-disable-line react-hooks/exhaustive-deps
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending.current) return
    const data = new FormData(event.currentTarget)
    const read = (key: string) => String(data.get(key) || '').trim()
    const fields = { business: read('Business'), name: read('Contact name'), phone: read('Phone'), email: read('Email'), location: read('Delivery location'), product, service, quantity: read('Cylinders per month'), requirements: read('Requirements'), website: read('Website') }
    const body = ['Enquiry — Canada Compressed Gas Corporation', '', ...Object.entries({ Business: fields.business, Contact: fields.name, Email: fields.email, Phone: fields.phone, Location: fields.location, Product: product, Service: service, 'Cylinders per month': fields.quantity, Requirements: fields.requirements }).map(([key, value]) => `${key}: ${value}`)].join('\n')
    setDraft(body)
    if (!onlineSubmission) {
      setStatus(`Your request is prepared. Review and send it to ${contactEmail} using the email option below.`)
      message.current?.focus()
      return
    }
    const payload = JSON.stringify(fields)
    if (attempt.current.payload !== payload) attempt.current = { payload, id: crypto.randomUUID() }
    pending.current = true
    setBusy(true)
    setStatus('Sending your request…')
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...fields, requestId: attempt.current.id }), signal: AbortSignal.timeout(20000) })
      const result = await response.json().catch(() => null)
      if (!response.ok || result?.success !== true) throw new Error(typeof result?.error === 'string' ? result.error : 'We could not confirm your submission. Please retry or email your request below.')
      setSent(true)
      setReference(result.reference)
      setStatus('Thank you. Your request has been submitted to our sales team.')
      setDraft('')
    } catch (error) {
      setStatus(error instanceof Error && error.name !== 'TimeoutError' ? error.message : `We could not confirm your submission. Your details are preserved. Retry or email ${contactEmail}.`)
    } finally {
      pending.current = false
      setBusy(false)
      message.current?.focus()
    }
  }
  async function copy() {
    try { await navigator.clipboard.writeText(draft); setStatus(`Request copied. Paste it into an email to ${contactEmail} and send it.`) }
    catch { setStatus(`Select and copy the request text below, then email it to ${contactEmail}.`) }
  }
  const input = 'mt-2 w-full border border-[#D6E2EF] bg-white p-3 text-[#00264D] focus:border-[#0072CE] focus:outline-none focus:ring-1 focus:ring-[#0072CE]'
  return <div>
    <h2 className="text-2xl font-semibold text-[#00264D]">{service === 'SDS request' ? 'Request a safety data sheet' : 'Send your requirements'}</h2>
    <p className="mb-7 mt-3 text-sm leading-6 text-[#3C536B]">{onlineSubmission ? 'Send your gas, propane or SDS enquiry directly to our sales team.' : 'Complete your details to prepare an email enquiry for our sales team.'}</p>
    {!sent && <form onSubmit={submit} aria-busy={busy}>
      <fieldset disabled={busy} className="grid min-w-0 gap-5 border-0 p-0 md:grid-cols-2">
        <legend className="sr-only">Contact details and product requirements</legend>
        <label className="text-sm font-medium text-[#00264D]">Business *<input name="Business" autoComplete="organization" required maxLength={120} className={input}/></label>
        <label className="text-sm font-medium text-[#00264D]">Contact name *<input name="Contact name" autoComplete="name" required maxLength={120} className={input}/></label>
        <label className="text-sm font-medium text-[#00264D]">Phone<input name="Phone" type="tel" autoComplete="tel" maxLength={40} className={input}/></label>
        <label className="text-sm font-medium text-[#00264D]">Email *<input name="Email" type="email" autoComplete="email" required maxLength={160} className={input}/></label>
        <label className="text-sm font-medium text-[#00264D]">City / delivery location *<input name="Delivery location" autoComplete="address-level2" required maxLength={160} className={input}/></label>
        <label className="text-sm font-medium text-[#00264D]">Gas or propane *<select name="Product" required value={product} onChange={event => setProduct(event.target.value)} className={input}><option value="" disabled>Select a product</option>{gasOptions.map(gas => <option key={gas}>{gas}</option>)}</select></label>
        <label className="text-sm font-medium text-[#00264D]">Cylinders per month<input name="Cylinders per month" type="number" min="1" max="100000" inputMode="numeric" className={input}/></label>
        <label className="text-sm font-medium text-[#00264D]">Service<select name="Service" value={service} onChange={event => setService(event.target.value)} className={input}>{serviceOptions.map(option => <option key={option}>{option}</option>)}</select></label>
        <label className="text-sm font-medium text-[#00264D] md:col-span-2">Your requirements *<textarea name="Requirements" value={requirements} onChange={event => setRequirements(event.target.value)} required rows={5} maxLength={2000} placeholder="Gas grade, cylinder size, equipment, SDS or delivery requirements" className={input}/></label>
        <div className="hidden" aria-hidden="true"><label>Leave this field empty<input name="Website" tabIndex={-1} autoComplete="off" maxLength={200}/></label></div>
        <p className="text-xs leading-5 text-[#3C536B] md:col-span-2">* Required fields. We use these details to respond to your enquiry.</p>
        <button type="submit" className="bg-[#003B71] px-6 py-3.5 text-sm font-medium text-white hover:bg-[#00264D] disabled:cursor-wait disabled:opacity-60 md:col-span-2 md:w-fit">{busy ? 'Sending…' : onlineSubmission ? 'Send request →' : 'Prepare email request →'}</button>
      </fieldset>
    </form>}
    <div ref={message} tabIndex={-1} role="status" aria-live="polite" className={`mt-5 text-sm leading-6 text-[#3C536B] ${sent ? 'border-l-4 border-[#00A3AD] bg-[#F1F6FB] p-6' : ''}`}>
      <p>{status}</p>
      {sent && <><p className="mt-3 break-all text-xs">Request reference: {reference}</p><button type="button" className="mt-4 font-medium text-[#0072CE]" onClick={reset}>Send another enquiry →</button></>}
    </div>
    {draft && !busy && <div className="mt-5 border border-[#D6E2EF] bg-[#F1F6FB] p-5"><label className="block text-sm font-medium text-[#00264D]" htmlFor="quote-draft">Your request — email option</label><textarea id="quote-draft" readOnly value={draft} rows={10} className={input}/><div className="mt-4 flex flex-wrap gap-5"><button type="button" onClick={copy} className="text-sm font-medium text-[#0072CE]">Copy request</button><a href={`mailto:${contactEmail}?subject=${encodeURIComponent(service === 'SDS request' ? 'SDS request' : 'Gas / propane enquiry')}&body=${encodeURIComponent(draft)}`} className="text-sm font-medium text-[#0072CE]">Open email app →</a></div></div>}
    <p className="mt-6 text-sm text-[#3C536B]">Or email <a href={`mailto:${contactEmail}`} className="font-medium text-[#0072CE]">{contactEmail}</a>.</p>
  </div>
}
