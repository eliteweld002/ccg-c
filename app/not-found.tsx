import Link from 'next/link'
import type { Metadata } from 'next'
import { Shell, Section } from '@/components/site-shell'

// A 404 must never be indexed or canonicalised to the homepage.
export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
  alternates: { canonical: null },
}

export default function NotFound() {
  return <Shell><main><Section><div className="max-w-2xl">
    <h1 className="text-4xl font-semibold tracking-[-.04em] text-[#00264D]">Page not found</h1>
    <p className="mt-5 text-lg leading-8 text-[#3C536B]">The page you are looking for has moved or does not exist. Try one of these instead.</p>
    <ul className="mt-8 flex flex-col gap-3 text-[#0072CE]">
      <li><Link href="/gases">Industrial, welding and specialty gases</Link></li>
      <li><Link href="/forklift-propane">Forklift propane cylinders</Link></li>
      <li><Link href="/services">Delivery, exchange and refills</Link></li>
      <li><Link href="/contact">Contact us and request a quote</Link></li>
    </ul>
  </div></Section></main></Shell>
}
