'use client'

import NextImage from 'next/image'
import { sdsContactHref, contactPhone, contactPhoneHref, contactStreet, contactLocality, contactPostalCode } from '@/lib/contact-options'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'

const nav = [
  { label: 'Gases', href: '/gases', children: [
    ['Argon', '/gases/argon'], ['Argon/CO2 Mixes', '/gases/argon-co2-75-25'],
    ['Oxygen', '/gases/oxygen'], ['Acetylene', '/gases/acetylene'],
    ['Carbon Dioxide', '/gases/carbon-dioxide'], ['Nitrogen', '/gases/nitrogen'],
    ['Helium', '/gases/helium'], ['Hydrogen', '/gases/hydrogen'], ['Beer gas', '/gases/beer-gas'],
  ] },
  { label: 'Industries', href: '/industries', children: [
    ['Fabrication and manufacturing', '/industries/fabrication'],
    ['Agriculture', '/industries/agriculture'],
    ['Automotive, truck and trailer repair', '/industries/automotive-truck-trailer-repair'],
    ['Hospitality', '/industries/hospitality'], ['HVAC and plumbing', '/industries/hvac-and-plumbing'],
    ['Independent welders', '/industries/independent-welders'],
  ] },
  { label: 'Forklift Propane', href: '/forklift-propane' },
  { label: 'Services', href: '/services' },
  { label: 'Safety', href: '/safety' },
  { label: 'About us', href: '/about' },
]

export function MapleLeaf({ className = 'size-4' }: { className?: string }) {
  return <svg viewBox="0 0 32 34" className={className} fill="currentColor" aria-hidden="true"><path d="m16 0 3.2 7.2 3.3-1.7-1.3 10 5.4-4.5.8 3.6 4.6-.6-3 7.2 2 1.5-12.5 3.6.7 7.7h-6.4l.7-7.7L1 22.7l2-1.5L0 14l4.6.6.8-3.6 5.4 4.5-1.3-10 3.3 1.7L16 0Z"/></svg>
}

export function CanadianBadge() {
  return <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-bold text-[#C8102E]">Proudly <MapleLeaf className="h-[19px] w-[18px]"/> Canadian</span>
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="block shrink-0" aria-label="Canada Compressed Gas Corporation home">
      <NextImage
        src="/images/ccg-c-logo-compact.webp"
        alt="Canada Compressed Gas Corporation"
        width={600}
        height={296}
        className="h-[64px] w-auto max-w-[180px] object-contain object-left sm:h-[76px] sm:max-w-[190px]"
        priority
      />
    </Link>
  )
}

export function Header() {
  const [open, setOpen] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const mobilePanel = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!mobile) return
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const panel = mobilePanel.current
    const focusable = () => Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])
    focusable()[0]?.focus()
    function keyboard(event: KeyboardEvent) {
      if (event.key === 'Escape') setMobile(false)
      if (event.key !== 'Tab') return
      const items = focusable(), first = items[0], last = items.at(-1)
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', keyboard)
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', keyboard); previousFocus?.focus() }
  }, [mobile])
  return <>
    <div className="bg-[#F1F6FB] text-[11px] text-[#3C536B] sm:text-[12px]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-2 px-4 py-2.5 sm:px-6 lg:px-12 xl:px-24">
        <span className="inline-flex items-center gap-2 whitespace-nowrap"><MapleLeaf className="size-4 text-[#C8102E]"/>Ontario, Canada</span>
        <CanadianBadge/>
        <div className="hidden gap-6 lg:flex"><a href={contactPhoneHref}>{contactPhone}</a><Link href={sdsContactHref()}>Safety data sheets</Link><Link href="/contact">Contact</Link></div>
      </div>
    </div>
    <header className="border-b border-[#D6E2EF] bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-6 py-3 lg:px-8 xl:px-16">
        <Logo/>
        <nav aria-label="Main navigation" className="hidden items-center gap-3 lg:flex">
          {nav.map(item => <div key={item.label} className="relative py-3" onKeyDown={event => { if (event.key === 'Escape') setOpen(null) }} onMouseEnter={() => item.children && setOpen(item.label)} onMouseLeave={() => setOpen(null)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(null) }}>
            <div className="flex items-center gap-1">
              <Link href={item.href} className="whitespace-nowrap text-[13px] xl:text-[14px] font-medium text-[#0F2238]" onFocus={() => item.children && setOpen(item.label)}>{item.label}</Link>
              {item.children && <button aria-label={`Toggle ${item.label} menu`} aria-expanded={open === item.label} onClick={() => setOpen(open === item.label ? null : item.label)} className="p-1"><ChevronDown className="size-3.5"/></button>}
            </div>
            {item.children && open === item.label && <div className="absolute left-0 top-full z-30 w-72 border border-[#D6E2EF] bg-white p-5 shadow-lg">{item.children.map(([label,href]) => <Link key={href} href={href} className="block border-b border-[#D6E2EF] py-2.5 text-sm text-[#3C536B] last:border-0 hover:text-[#0072CE]" onClick={() => setOpen(null)}>{label}</Link>)}</div>}
          </div>)}
        </nav>
        <Link href="/contact" className="hidden shrink-0 whitespace-nowrap bg-[#003B71] px-4 py-3 text-sm font-medium text-white lg:block">Request a quote →</Link>
        <button className="p-2 lg:hidden" aria-label="Open menu" aria-expanded={mobile} onClick={() => setMobile(true)}><Menu/></button>
      </div>
    </header>
    {mobile && <div ref={mobilePanel} className="fixed inset-0 z-50 overflow-y-auto bg-white p-6 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div className="flex items-center justify-between"><Logo/><button className="p-2" aria-label="Close menu" onClick={() => setMobile(false)}><X/></button></div>
      <nav className="mt-8 flex flex-col gap-5">{nav.map(item => <div key={item.label}>
        <Link onClick={() => setMobile(false)} href={item.href} className="text-xl font-semibold text-[#00264D]">{item.label}</Link>
        {item.children && <div className="mt-2 grid gap-1 border-l border-[#D6E2EF] pl-4">{item.children.map(([label,href]) => <Link key={href} href={href} onClick={() => setMobile(false)} className="py-2 text-sm text-[#3C536B]">{label}</Link>)}</div>}
      </div>)}<Link href="/contact" onClick={() => setMobile(false)} className="bg-[#003B71] px-5 py-4 text-center text-white">Request a quote →</Link></nav>
    </div>}
  </>
}

export function Footer() {
  const groups = [
    { title: 'Gases', links: nav[0].children! },
    { title: 'Industries', links: [['Fabrication', '/industries/fabrication'], ['Agriculture', '/industries/agriculture'], ['Hospitality', '/industries/hospitality'], ['Automotive', '/industries/automotive-truck-trailer-repair']] },
    { title: 'Services', links: [['Forklift Propane', '/forklift-propane'], ['Delivery', '/delivery-area'], ['Cylinder rental', '/services'], ['Owned-cylinder refills', '/services'], ['Switch supplier', '/services']] },
    { title: 'Company', links: [['About us', '/about'], ['Safety', '/safety'], ['Contact', '/contact'], ['Pricing', '/pricing']] },
  ]
  return <footer className="bg-[#00264D] text-white"><div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 lg:grid-cols-[1.5fr_repeat(4,1fr)] lg:px-24"><div><Logo/><p className="mt-7 max-w-[220px] text-sm leading-7 text-[#D6E2EF]">{contactStreet}<br/>{contactLocality}, Ontario, {contactPostalCode}<br/>Canada<br/><a href={contactPhoneHref} className="inline-block py-1 underline decoration-white/30 underline-offset-4">{contactPhone}</a><br/><a href="mailto:sales@ccgcorporation.ca" className="underline decoration-white/30 underline-offset-4">sales@ccgcorporation.ca</a></p></div>{groups.map(group => <div key={group.title}><h3 className="mb-5 text-xs font-medium uppercase tracking-[.12em] text-[#00A3AD]">{group.title}</h3>{group.links.map(([label,href]) => <Link key={label} href={href} className="mb-3 block text-sm text-[#D6E2EF] hover:text-white">{label}</Link>)}</div>)}</div><div className="mx-auto flex max-w-[1440px] flex-col items-start gap-3 border-t border-white/20 px-6 py-6 text-xs text-[#D6E2EF] md:flex-row md:items-center md:justify-between lg:px-24"><span>© 2026 Canada Compressed Gas Corporation (CCG-C). All rights reserved.</span><span className="inline-flex bg-white px-3 py-2"><CanadianBadge/></span></div></footer>
}

export function QuoteBand() { return <section className="bg-[#F1F6FB] px-6 py-14 lg:px-24"><div className="mx-auto flex max-w-[1248px] flex-col items-start justify-between gap-6 md:flex-row md:items-center"><div><p className="eyebrow">Start with a clear answer</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.03em] text-[#00264D]">Request a written quote.</h2></div><Link href="/contact" className="bg-[#003B71] px-6 py-3.5 text-sm font-medium text-white">Tell us what you need <span aria-hidden>→</span></Link></div></section> }

export function Shell({ children }: { children: React.ReactNode }) { return <><Header/>{children}<QuoteBand/><Footer/></> }

export function PageHero({ eyebrow, title, intro, image: customImage, imageAlt: customAlt }: { eyebrow: string; title: string; intro: string; image?: string; imageAlt?: string }) {
  const images: Record<string, [string, string]> = {
    'Cylinder gases': ['/images/cylinder-store.webp', 'Organized rows of steel gas cylinders in a secure store'],
    'Delivery area': ['/images/delivery-dock.webp', 'Delivery truck positioned at a clean loading dock'],
    Safety: ['/images/technician-hi-vis.webp', 'Technician checking equipment in a gas handling environment'],
    
    Industry: ['/images/welder.webp', 'Welder working carefully in a fabrication shop'],
    'Gas specification': ['/images/cylinder-store.webp', 'Clean rows of cylinders in a caged gas store'],
  }
  const image = customImage ? [customImage, customAlt || `${title} service image`] : images[eyebrow]
  return <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-10 lg:px-24 lg:pb-24 lg:pt-16"><div className={`grid gap-10 ${image ? 'md:grid-cols-[1fr_360px] md:items-center md:gap-16' : ''}`}><div className="max-w-3xl"><p className="eyebrow">{eyebrow}</p><h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-.045em] text-[#00264D] md:text-5xl">{title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-[#3C536B]">{intro}</p></div>{image && <img src={image[0]} alt={image[1]} width={720} height={540} decoding="async" className="aspect-[4/3] w-full object-cover" />}</div></div>
}

export function Breadcrumb({ current }: { current: string }) { return <div className="mx-auto max-w-[1440px] px-6 pt-6 text-xs text-[#3C536B] lg:px-24"><Link href="/" className="text-[#0072CE]">Home</Link><span className="mx-2">/</span>{current}</div> }

export const ArrowLink = ({ href, children }: { href: string; children: React.ReactNode }) => <Link href={href} className="inline-flex items-center gap-2 text-sm font-medium text-[#0072CE]">{children} <ArrowRight className="size-4"/></Link>

export const Image = ({ src, alt, className = '', eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) => <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" className={`object-cover ${className}`} />

export const Section = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => <section className={`px-6 py-16 lg:px-24 lg:py-[104px] ${className}`}><div className="mx-auto max-w-[1248px]">{children}</div></section>

export const Eyebrow = ({ children }: { children: React.ReactNode }) => <p className="eyebrow">{children}</p>

export const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => <div className={`border-t-[3px] border-[#0072CE] bg-white p-7 ${className}`}>{children}</div>
