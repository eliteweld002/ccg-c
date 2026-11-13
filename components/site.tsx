'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, ChevronDown, Menu, Search, X } from 'lucide-react'

export const gases = [
  { slug: 'argon', name: 'Argon', valve: 'CGA 580', sizes: '40–300 cu ft', use: 'MIG and TIG welding, fabrication', image: '/images/welder.png' },
  { slug: 'argon-co2-75-25', name: 'Argon/CO2 75/25', valve: 'CGA 580', sizes: '40–300 cu ft', use: 'MIG welding and general fabrication', image: '/images/welder.png' },
  { slug: 'oxygen', name: 'Oxygen', valve: 'CGA 540', sizes: '40–300 cu ft', use: 'Cutting, heating and medical-adjacent work', image: '/images/technician-hi-vis.png' },
  { slug: 'acetylene', name: 'Acetylene', valve: 'CGA 510', sizes: '40–300 cu ft', use: 'Oxy-fuel cutting and brazing', image: '/images/welder.png' },
  { slug: 'carbon-dioxide', name: 'Carbon dioxide', valve: 'CGA 320', sizes: '40–300 cu ft', use: 'Food service, beverage and fabrication', image: '/images/beer-taps.png' },
  { slug: 'nitrogen', name: 'Nitrogen', valve: 'CGA 580', sizes: '40–300 cu ft', use: 'Purging, pressure testing and food service', image: '/images/plant-pipework.png' },
  { slug: 'beer-gas', name: 'Beer gas', valve: 'CGA 580', sizes: '40–300 cu ft', use: 'Draft beer and beverage service', image: '/images/beer-taps.png' },
]

export const industries = [
  { slug: 'fabrication', name: 'Fabrication and manufacturing', image: '/images/welder.png', copy: 'Consistent gas supply for welding bays, production lines and maintenance teams.' },
  { slug: 'agriculture', name: 'Agriculture', image: '/images/farm-workshop.png', copy: 'Practical cylinder delivery for farm workshops, equipment repair and seasonal work.' },
  { slug: 'automotive', name: 'Automotive, truck and trailer repair', image: '/images/technician-hi-vis.png', copy: 'The gases, regulators and cylinder sizes repair shops reach for every week.' },
  { slug: 'hospitality', name: 'Hospitality', image: '/images/beer-taps.png', copy: 'CO2 and beer gas supply that keeps beverage service moving.' },
  { slug: 'hvac', name: 'HVAC and plumbing', image: '/images/plant-pipework.png', copy: 'Reliable gases for brazing, pressure testing and installation work.' },
  { slug: 'independent-welders', name: 'Independent welders', image: '/images/cylinder-store.png', copy: 'Straightforward refills, exchanges and delivery built around your work.' },
]

function Logo() { return <Link href="/" className="flex items-center gap-3" aria-label="Canada Compressed Gas Corporation home"><span className="relative flex h-11 w-9 items-end justify-center overflow-hidden rounded-t-[16px] border-2 border-corporate-blue bg-white"><span className="absolute bottom-2 h-3 w-full bg-teal" /><span className="absolute bottom-0 h-2 w-full bg-corporate-blue" /></span><span className="leading-none"><span className="block text-[15px] font-semibold tracking-[-.04em] text-navy">Canada Compressed Gas</span><span className="mt-1 block text-[9px] font-medium uppercase tracking-[.18em] text-corporate-blue">Corporation</span></span></Link> }

export function Header() {
  const [open, setOpen] = useState(false)
  return <>
    <div className="bg-soft-blue text-[12px] text-secondary-text"><div className="page-wrap flex min-h-9 items-center justify-between gap-4"><span>Woodstock · Tillsonburg · Oxford County, Ontario</span><div className="hidden items-center gap-5 md:flex"><Link href="/safety">Safety data sheets</Link><Link href="/contact">Customer portal</Link><Link href="/contact">Contact</Link><span>[519 phone number]</span></div></div></div>
    <header className="border-b border-lines bg-white"><div className="page-wrap flex min-h-[82px] items-center justify-between gap-8"><Logo/><nav className="hidden items-center gap-7 text-[14px] font-medium text-navy lg:flex"><Link href="/gases">Gases</Link><Link href="/industries">Industries</Link><Link href="/services">Services</Link><Link href="/safety">Safety</Link><Link href="/about">About us</Link></nav><div className="flex items-center gap-3"><Link href="/contact" className="hidden items-center gap-2 text-sm text-corporate-blue md:flex">Search <Search size={16}/></Link><Link href="/contact" className="hidden bg-corporate-blue px-4 py-3 text-sm font-semibold text-white transition hover:bg-navy sm:flex">Request a quote <ArrowRight size={16}/></Link><button onClick={() => setOpen(!open)} className="p-2 text-navy lg:hidden" aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button></div></div>{open && <div className="border-t border-lines bg-white px-6 py-5 lg:hidden"><nav className="flex flex-col gap-5 text-lg text-navy"><Link onClick={() => setOpen(false)} href="/gases">Gases</Link><Link onClick={() => setOpen(false)} href="/industries">Industries</Link><Link onClick={() => setOpen(false)} href="/services">Services</Link><Link onClick={() => setOpen(false)} href="/safety">Safety</Link><Link onClick={() => setOpen(false)} href="/about">About us</Link><Link onClick={() => setOpen(false)} href="/contact" className="text-corporate-blue">Request a quote →</Link></nav></div>}</header>
  </>
}

export function Footer() { return <footer className="bg-navy text-white"><div className="page-wrap grid gap-12 py-16 md:grid-cols-[1.3fr_2fr]"><div><Logo/><p className="mt-7 max-w-[240px] text-sm leading-6 text-white/70">[Street address]<br/>Woodstock, Ontario<br/>[519 phone number]<br/>sales@ccgcorporation.ca</p></div><div className="grid grid-cols-2 gap-8 sm:grid-cols-4"><div><p className="eyebrow text-teal">Gases</p><div className="mt-4 flex flex-col gap-3 text-sm text-white/75"><Link href="/gases">All gases</Link><Link href="/gases/argon">Argon</Link><Link href="/gases/carbon-dioxide">Carbon dioxide</Link></div></div><div><p className="eyebrow text-teal">Industries</p><div className="mt-4 flex flex-col gap-3 text-sm text-white/75"><Link href="/industries">Fabrication</Link><Link href="/industries/agriculture">Agriculture</Link><Link href="/industries/hospitality">Hospitality</Link></div></div><div><p className="eyebrow text-teal">Services</p><div className="mt-4 flex flex-col gap-3 text-sm text-white/75"><Link href="/services">Delivery</Link><Link href="/pricing">Pricing</Link><Link href="/safety">Safety</Link></div></div><div><p className="eyebrow text-teal">Company</p><div className="mt-4 flex flex-col gap-3 text-sm text-white/75"><Link href="/about">About us</Link><Link href="/contact">Contact</Link><Link href="/contact">Customer portal</Link></div></div></div></div><div className="page-wrap flex flex-col gap-3 border-t border-white/15 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Canada Compressed Gas Corporation (CCG-C). All rights reserved.</span><span>Privacy · Terms · Accessibility</span></div></footer> }

export function QuoteBand() { return <section className="bg-soft-blue"><div className="page-wrap flex flex-col gap-5 py-12 sm:flex-row sm:items-center sm:justify-between"><div><p className="eyebrow">Start with the right supply</p><h2 className="mt-2 text-2xl font-semibold text-navy">Request a written quote.</h2></div><Link href="/contact" className="button-primary">Tell us what you need <ArrowRight size={17}/></Link></div></section> }
export function PageHero({ eyebrow, title, intro, image: customImage, imageAlt: customAlt }: { eyebrow: string; title: string; intro: string; image?: string; imageAlt?: string }) {
  const heroImages: Record<string, { src: string; alt: string }> = {
    'Cylinder gases': { src: '/images/cylinder-store.png', alt: 'Organized rows of steel gas cylinders in a secure store' },
    Industries: { src: '/images/technician-hi-vis.png', alt: 'Technician in high visibility clothing working in an industrial setting' },
    Services: { src: '/images/delivery-dock.png', alt: 'Cylinder delivery truck at a loading dock' },
    'Delivery area': { src: '/images/delivery-dock.png', alt: 'Delivery truck positioned at a clean industrial loading dock' },
    Pricing: { src: '/images/cylinder-store.png', alt: 'Steel gas cylinders ready for customer exchange' },
    Safety: { src: '/images/technician-hi-vis.png', alt: 'Technician checking equipment in a gas handling environment' },
    'About us': { src: '/images/farm-workshop.png', alt: 'Clean farm workshop prepared for practical repair work' },
    Contact: { src: '/images/hero-cylinder-delivery.png', alt: 'Cylinder delivery vehicle arriving at a customer site' },
    Industry: { src: '/images/welder.png', alt: 'Welder working carefully in a fabrication shop' },
    'Gas specification': { src: '/images/cylinder-store.png', alt: 'Clean rows of cylinders in a caged gas store' },
  }
  const image = customImage ? { src: customImage, alt: customAlt || `${title} service image` } : heroImages[eyebrow]
  return <div className="page-wrap"><div className="grid gap-8 border-b border-lines py-8 md:grid-cols-[1fr_360px] md:items-center md:gap-14 md:py-12"><div><p className="eyebrow">Home / {eyebrow}</p><h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-.04em] text-navy md:text-[46px]">{title}</h1><p className="mt-5 max-w-2xl text-lg leading-7 text-secondary-text">{intro}</p></div>{image && <div className="relative aspect-[4/3] overflow-hidden"><Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 360px" priority /></div>}</div></div>
}
export function SiteFrame({ children }: { children: React.ReactNode }) { return <><Header/>{children}<QuoteBand/><Footer/></> }
export function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) { return <div className="max-w-2xl"><p className="eyebrow">{eyebrow}</p><h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-.04em] text-navy md:text-[40px]">{title}</h2>{intro && <p className="mt-4 leading-7 text-secondary-text">{intro}</p>}</div> }
export function Photo({ src, alt, className = '' }: { src: string; alt: string; className?: string }) { return <div className={`relative overflow-hidden ${className}`}><Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw"/></div> }
export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) { return <Link href={href} className="inline-flex items-center gap-2 font-semibold text-bright-blue hover:text-corporate-blue">{children} <ArrowRight size={16}/></Link> }
export function Accordion({ items }: { items: { q: string; a: string }[] }) { return <div className="divide-y divide-lines border-y border-lines">{items.map((item) => <details key={item.q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy [&::-webkit-details-marker]:hidden">{item.q}<ChevronDown size={18} className="transition group-open:rotate-180"/></summary><p className="max-w-2xl pt-3 leading-7 text-secondary-text">{item.a}</p></details>)}</div> }

export function JsonLd({ children }: { children: object }) { return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(children) }} /> }

export const localBusiness = { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Canada Compressed Gas Corporation', alternateName: 'CCG-C', url: 'https://ccgcorporation.ca', email: 'sales@ccgcorporation.ca', telephone: '[519 phone number]', address: { '@type': 'PostalAddress', streetAddress: '[Street address]', addressLocality: 'Woodstock', addressRegion: 'ON', addressCountry: 'CA' }, areaServed: ['Woodstock', 'Ingersoll', 'Tillsonburg', 'Courtland', 'Norwich', 'Zorra', 'Tavistock'] }

export const ButtonArrow = ({ children }: { children: React.ReactNode }) => <span className="inline-flex items-center gap-2">{children} <ArrowRight size={17}/></span>

export function GasTable() { return <div className="overflow-x-auto border-t border-lines"><table className="w-full min-w-[720px] text-left text-sm"><thead className="border-b border-lines text-xs uppercase tracking-[.1em] text-secondary-text"><tr><th className="py-4 pr-5">Gas</th><th className="py-4 pr-5">Typical applications</th><th className="py-4 pr-5">Valve</th><th className="py-4">Cylinder sizes</th></tr></thead><tbody>{gases.map((gas) => <tr key={gas.slug} className="border-b border-lines"><td className="py-5 pr-5 font-semibold text-navy"><Link href={`/gases/${gas.slug}`} className="hover:text-bright-blue">{gas.name}</Link></td><td className="py-5 pr-5 text-secondary-text">{gas.use}</td><td className="py-5 pr-5 text-secondary-text">{gas.valve}</td><td className="py-5 text-secondary-text">{gas.sizes}</td></tr>)}</tbody></table></div> }

export function StatBand() { return <section className="bg-corporate-blue text-white"><div className="page-wrap grid grid-cols-2 divide-x divide-white/20 md:grid-cols-4"><div className="px-4 py-10 first:pl-0"><p className="text-4xl font-light tracking-[-.04em]">6</p><p className="mt-2 text-sm text-white/75">gases supplied</p></div><div className="px-4 py-10 md:pl-8"><p className="text-4xl font-light tracking-[-.04em]">5</p><p className="mt-2 text-sm text-white/75">cylinder sizes, 40 to 300 cu ft</p></div><div className="px-4 py-10 md:pl-8"><p className="text-4xl font-light tracking-[-.04em]">5</p><p className="mt-2 text-sm text-white/75">delivery areas</p></div><div className="px-4 py-10 md:pl-8"><p className="text-4xl font-light tracking-[-.04em]">3 pm</p><p className="mt-2 text-sm text-white/75">order cut-off</p></div></div></section> }

export function GasCard({ gas }: { gas: typeof gases[number] }) { return <Link href={`/gases/${gas.slug}`} className="group overflow-hidden border-t-[3px] border-corporate-blue bg-white shadow-[0_1px_0_#D6E2EF] transition hover:-translate-y-1 hover:shadow-lg"><div className="relative aspect-[16/8]"><Image src={gas.image} alt={`${gas.name} supply for industrial and hospitality use`} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw"/></div><div className="p-6"><p className="eyebrow">{gas.valve}</p><h3 className="mt-3 text-xl font-semibold text-navy">{gas.name}</h3><p className="mt-3 text-sm leading-6 text-secondary-text">{gas.use}</p><p className="mt-6 flex items-center gap-2 text-sm font-semibold text-bright-blue">View specifications <ArrowRight size={15} className="transition group-hover:translate-x-1"/></p></div></Link> }

export function ContactForm() { const [sent, setSent] = useState(false); if (sent) return <div className="border-t-[3px] border-teal bg-soft-blue p-8"><p className="eyebrow">Request received</p><h2 className="mt-3 text-2xl font-semibold text-navy">We'll be in touch.</h2><p className="mt-3 leading-7 text-secondary-text">Your request is ready for our team. A local person will follow up using the details you provided.</p></div>; return <form className="grid gap-5" onSubmit={(e) => { e.preventDefault(); setSent(true) }}><div className="grid gap-5 sm:grid-cols-2"><label className="field">Business name<input required name="business" placeholder="Business name"/></label><label className="field">Contact name<input required name="contact" placeholder="Contact name"/></label></div><div className="grid gap-5 sm:grid-cols-2"><label className="field">Phone<input required name="phone" placeholder="[519 phone number]"/></label><label className="field">Email<input required type="email" name="email" placeholder="you@company.ca"/></label></div><div className="grid gap-5 sm:grid-cols-2"><label className="field">Town<select required name="town" defaultValue=""><option value="" disabled>Select a town</option><option>Woodstock</option><option>Ingersoll</option><option>Tillsonburg</option><option>Courtland</option><option>Norwich</option><option>Zorra</option><option>Tavistock</option></select></label><label className="field">Gas<select required name="gas" defaultValue=""><option value="" disabled>Select a gas</option>{gases.map(g => <option key={g.slug}>{g.name}</option>)}</select></label></div><label className="field">Cylinders per month<input required name="volume" placeholder="For example, 4"/></label><label className="field">Message<textarea name="message" rows={5} placeholder="Tell us about your current supply or what you need."/></label><button className="button-primary w-fit" type="submit"><ButtonArrow>Request a written quote</ButtonArrow></button></form> }

export function MapGraphic() { return <div className="relative min-h-[420px] overflow-hidden border border-lines bg-soft-blue"><div className="absolute inset-8 border border-corporate-blue/20 [clip-path:polygon(25%_4%,70%_0,95%_25%,83%_70%,57%_93%,18%_82%,4%_45%)]"/><div className="absolute left-[42%] top-[34%] h-5 w-5 rounded-full border-4 border-white bg-teal shadow"/><div className="absolute left-[62%] top-[49%] h-5 w-5 rounded-full border-4 border-white bg-teal shadow"/><div className="absolute left-[26%] top-[54%] h-5 w-5 rounded-full border-4 border-white bg-teal shadow"/><div className="absolute left-[70%] top-[28%] h-5 w-5 rounded-full border-4 border-white bg-teal shadow"/><div className="absolute bottom-6 left-6 text-xs font-semibold uppercase tracking-[.1em] text-corporate-blue">Oxford County service area</div></div> }

export function SizeGuide() { return <div className="grid gap-3 md:grid-cols-5">{['40 cu ft','80 cu ft','125 cu ft','250 cu ft','300 cu ft'].map((size, i) => <div key={size} className="flex flex-col items-center border-b border-lines pb-4"><div className="relative flex w-full items-end justify-center" style={{height: 180}}><div className="w-[42%] border-2 border-corporate-blue bg-soft-blue" style={{height: `${75 + i*20}px`}}><div className="mx-auto mt-2 h-5 w-3/4 rounded-t border border-corporate-blue"/></div></div><p className="mt-4 font-semibold text-navy">{size}</p><p className="mt-1 text-center text-xs leading-5 text-secondary-text">{['Light shop use','Small shop','General fabrication','High-volume shop','Production supply'][i]}</p></div>)}</div> }

export function SdsTable() { return <div className="overflow-x-auto border-t border-lines"><table className="w-full min-w-[600px] text-left text-sm"><tbody>{gases.map(g => <tr key={g.slug} className="border-b border-lines"><td className="py-4 font-semibold text-navy">{g.name}</td><td className="py-4 text-secondary-text">Safety data sheet · [grade]</td><td className="py-4 text-right"><button className="font-semibold text-bright-blue">Download PDF →</button></td></tr>)}</tbody></table></div> }

export function RouteTable() { return <div className="overflow-x-auto border-t border-lines"><table className="w-full min-w-[560px] text-left text-sm"><thead className="border-b border-lines text-xs uppercase tracking-[.1em] text-secondary-text"><tr><th className="py-4">Area</th><th className="py-4">Route days</th><th className="py-4">Service</th></tr></thead><tbody>{[['Woodstock','Mon–Fri','Scheduled route delivery'],['Ingersoll','Mon–Fri','Scheduled route delivery'],['Tillsonburg','Tue/Thu','Scheduled route delivery'],['Courtland','Tue/Thu','Scheduled route delivery'],['Norwich / Zorra / Tavistock','Weekly','Scheduled route delivery']].map(r => <tr key={r[0]} className="border-b border-lines"><td className="py-4 font-semibold text-navy">{r[0]}</td><td className="py-4 text-secondary-text">{r[1]}</td><td className="py-4 text-secondary-text">{r[2]}</td></tr>)}</tbody></table></div> }

export function PageSection({ children, className='' }: {children: React.ReactNode; className?: string}) { return <section className={`page-wrap py-20 md:py-[104px] ${className}`}>{children}</section> }

export function NotFoundCopy() { return <SiteFrame><PageHero eyebrow="Not found" title="That page isn't available." intro="Try the main navigation or request a written quote from our team."/></SiteFrame> }

export function ArrowButton({ href, children }: {href: string; children: React.ReactNode}) { return <Link href={href} className="button-primary"><ButtonArrow>{children}</ButtonArrow></Link> }

export function IndustryRows() { return <div className="flex flex-col gap-16">{industries.map((industry, i) => <div key={industry.slug} className="grid gap-8 md:grid-cols-2 md:items-center md:gap-16"><Photo src={industry.image} alt={industry.name} className={`aspect-[4/3] ${i % 2 ? 'md:order-2' : ''}`}/><div className={i % 2 ? 'md:order-1' : ''}><p className="eyebrow">Industry</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] text-navy">{industry.name}</h2><p className="mt-4 leading-7 text-secondary-text">{industry.copy}</p><ArrowLink href={`/industries/${industry.slug}`}>Explore this industry</ArrowLink></div></div>)}</div> }

export function PricingCards() { const plans = [['Own your cylinder','For businesses that prefer to own their cylinder inventory.'],['Shop rental','A straightforward rental option for regular cylinder supply.'],['Hospitality CO2','CO2 and beer gas supply for beverage service.']]; return <div className="grid gap-5 md:grid-cols-3">{plans.map((p, i) => <div key={p[0]} className="border-t-[3px] border-corporate-blue bg-white p-7 shadow-[0_1px_0_#D6E2EF]"><p className="eyebrow">Plan {i+1}</p><h2 className="mt-3 text-2xl font-semibold text-navy">{p[0]}</h2><p className="mt-4 min-h-14 leading-7 text-secondary-text">{p[1]}</p><div className="mt-7 border-t border-lines pt-5 text-lg font-semibold text-corporate-blue">Price list at launch</div><ArrowLink href="/contact">Ask about this plan</ArrowLink></div>)}</div> }

export function DetailSpec({ gas }: {gas: typeof gases[number]}) { return <div className="border-t border-lines"><div className="grid grid-cols-2 border-b border-lines py-4 text-sm"><span className="text-secondary-text">Purity grade</span><span className="font-semibold text-navy">[grade]</span></div><div className="grid grid-cols-2 border-b border-lines py-4 text-sm"><span className="text-secondary-text">Valve connection</span><span className="font-semibold text-navy">{gas.valve}</span></div><div className="grid grid-cols-2 border-b border-lines py-4 text-sm"><span className="text-secondary-text">Cylinder sizes</span><span className="font-semibold text-navy">40, 80, 125, 250, 300 cu ft</span></div></div> }

export function Breadcrumb({ label }: {label: string}) { return <div className="page-wrap pt-8 text-xs text-secondary-text"><Link href="/">Home</Link><span className="mx-2">/</span><span>{label}</span></div> }

export function Shell({ children, label }: {children: React.ReactNode; label: string}) { return <SiteFrame><Breadcrumb label={label}/>{children}</SiteFrame> }

export function SmallNote({children}: {children: React.ReactNode}) { return <div className="border-l-2 border-teal bg-soft-blue px-5 py-4 text-sm leading-6 text-secondary-text">{children}</div> }

export function PrimaryButton({children}: {children: React.ReactNode}) { return <button className="button-primary" type="submit"><ButtonArrow>{children}</ButtonArrow></button> }

export function LinkButton({href, children}: {href: string; children: React.ReactNode}) { return <Link className="button-secondary" href={href}><ButtonArrow>{children}</ButtonArrow></Link> }

export function GasGrid() { return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{gases.map(g => <GasCard key={g.slug} gas={g}/>)}</div> }

export function SectorCards() { return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{industries.map(i => <Link href={`/industries/${i.slug}`} key={i.slug} className="group"><Photo src={i.image} alt={i.name} className="aspect-[4/3]"/><div className="border-b border-lines py-5"><h3 className="text-xl font-semibold text-navy">{i.name}</h3><p className="mt-2 text-sm leading-6 text-secondary-text">{i.copy}</p><p className="mt-4 text-sm font-semibold text-bright-blue">Explore <ArrowRight size={15} className="inline"/></p></div></Link>)}</div> }

export function HeroImage() { return <div className="relative min-h-[560px] overflow-hidden"><Image src="/images/plant-pipework.png" alt="Stainless steel pipework in an industrial gas plant" fill priority className="object-cover" sizes="100vw"/><div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/10 to-transparent"/><div className="page-wrap relative flex min-h-[560px] items-end pb-8 md:pb-16"><div className="max-w-xl bg-white p-7 md:p-10"><p className="eyebrow">Local supply. Clear answers.</p><h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-.04em] text-navy md:text-[46px]">Reliable cylinder gas supply for Oxford County industry.</h1><p className="mt-5 leading-7 text-secondary-text">Cylinder gases, delivery and practical service for the work that keeps Woodstock and surrounding communities moving.</p><Link href="/contact" className="button-primary mt-7"><ButtonArrow>Request a quote</ButtonArrow></Link></div></div></div> }

export function SafeIconText() { return <div className="grid gap-8 md:grid-cols-2"><div><p className="eyebrow">Safety data sheets</p><h3 className="mt-3 text-2xl font-semibold text-navy">Know what you're handling.</h3><p className="mt-3 leading-7 text-secondary-text">Find the current SDS for each gas we supply, with clear handling and storage information.</p><ArrowLink href="/safety">Visit the SDS library</ArrowLink></div><div><p className="eyebrow">Delivery checks</p><h3 className="mt-3 text-2xl font-semibold text-navy">Every cylinder, checked.</h3><p className="mt-3 leading-7 text-secondary-text">Our team performs a leak check at every delivery and our drivers are TDG-trained.</p><ArrowLink href="/safety">Our safety approach</ArrowLink></div></div> }

export function AboutBand() { return <section className="bg-navy text-white"><div className="page-wrap grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-[104px]"><Photo src="/images/cylinder-store.png" alt="Rows of steel gas cylinders in a caged store" className="aspect-[4/3]"/><div><p className="eyebrow text-teal">About CCG-C</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] md:text-[40px]">An independent supplier, close to the work.</h2><p className="mt-5 leading-7 text-white/70">Canada Compressed Gas Corporation is based in Woodstock and built for practical, local cylinder gas service across Oxford County.</p><Link href="/about" className="mt-7 inline-flex items-center gap-2 font-semibold text-white">About us <ArrowRight size={16}/></Link></div></div></section> }

export function QuoteCallout({title='Need a dependable cylinder gas supplier?'}: {title?: string}) { return <div className="flex flex-col gap-5 border-t-[3px] border-teal bg-soft-blue p-7 sm:flex-row sm:items-center sm:justify-between"><h2 className="max-w-xl text-2xl font-semibold tracking-[-.03em] text-navy">{title}</h2><ArrowButton href="/contact">Request a written quote</ArrowButton></div> }

export function SimpleList({items}: {items: string[]}) { return <ul className="flex flex-col gap-4">{items.map(item => <li key={item} className="flex gap-3 leading-7 text-secondary-text"><span className="mt-3 size-1.5 shrink-0 bg-teal"/>{item}</li>)}</ul> }

export function ServiceSteps() { const steps=['Send your last invoice','Receive a written price','We deliver full cylinders','Old cylinders go back to your previous supplier']; return <div className="grid gap-0 md:grid-cols-4">{steps.map((s,i)=><div key={s} className="border-t border-lines p-5 pl-0 md:border-l md:border-t-0 md:pl-6"><p className="text-3xl font-light text-corporate-blue">0{i+1}</p><p className="mt-3 font-semibold text-navy">{s}</p></div>)}</div> }

export function ServiceCards() { return <div className="grid gap-5 md:grid-cols-2">{[['Scheduled delivery','Set a route that works with your production, shop or service schedule.'],['Cylinder exchange and rental','Keep the right cylinders on hand without building unnecessary inventory.'],['Owned-cylinder refills','Bring your customer-owned cylinders to us for refill, subject to inspection.'],['Switching supplier','A clear four-step switch with no confusing handoff.']].map(([title,copy])=><div key={title} className="border-t-[3px] border-corporate-blue p-6"><h3 className="text-2xl font-semibold text-navy">{title}</h3><p className="mt-3 leading-7 text-secondary-text">{copy}</p></div>)}</div> }

export function HoursBlock() { return <div className="border-t border-lines pt-5"><p className="eyebrow">Hours</p><p className="mt-3 font-semibold text-navy">Mon–Fri 7:30–5 · Sat 8–12</p></div> }

export function MetaTitle({ title }: { title: string }) { return null }

export function Pill({children}: {children: React.ReactNode}) { return <span className="border border-lines px-3 py-2 text-xs font-medium text-secondary-text">{children}</span> }

export function PageIntro({children}: {children: React.ReactNode}) { return <div className="max-w-2xl leading-7 text-secondary-text">{children}</div> }

export function SpecificationList({items}: {items: string[]}) { return <div className="grid gap-3">{items.map(item=><div key={item} className="flex gap-3 border-b border-lines pb-3 text-secondary-text"><span className="font-semibold text-teal">+</span>{item}</div>)}</div> }

export function ImageFeature({src,alt,eyebrow,title,copy}: {src:string;alt:string;eyebrow:string;title:string;copy:string}) { return <div className="grid gap-10 md:grid-cols-2 md:items-center"><Photo src={src} alt={alt} className="aspect-[4/3]"/><div><p className="eyebrow">{eyebrow}</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] text-navy">{title}</h2><p className="mt-4 leading-7 text-secondary-text">{copy}</p></div></div> }

export function FooterLegal() { return null }

export function Callout({children}: {children: React.ReactNode}) { return <div className="border-l-2 border-teal bg-soft-blue p-5 text-secondary-text">{children}</div> }

export function LabelValue({label,value}: {label:string;value:string}) { return <div className="grid grid-cols-2 gap-4 border-b border-lines py-4 text-sm"><span className="text-secondary-text">{label}</span><span className="font-semibold text-navy">{value}</span></div> }

export function PageTitle({title,copy}: {title:string;copy:string}) { return <div className="page-wrap py-16"><h1 className="max-w-3xl text-4xl font-semibold tracking-[-.04em] text-navy md:text-[46px]">{title}</h1><p className="mt-5 max-w-2xl text-lg leading-7 text-secondary-text">{copy}</p></div> }

export function SectionRule() { return <div className="border-t border-lines"/> }

export function FooterLink({href,children}:{href:string;children:React.ReactNode}) { return <Link className="hover:text-white" href={href}>{children}</Link> }

export function GasHero({gas}:{gas:typeof gases[number]}) { return <PageHero eyebrow={`Gases / ${gas.name}`} title={`${gas.name} cylinder gas`} intro={`${gas.use}. Available for exchange, rental, owned-cylinder refills and scheduled route delivery across Oxford County.`}/> }

export function IndustryHero({industry}:{industry:typeof industries[number]}) { return <PageHero eyebrow={`Industries / ${industry.name}`} title={`Gas supply that fits ${industry.name.toLowerCase()}.`} intro={industry.copy}/> }

export function LinkGrid({items}:{items:{href:string;title:string;copy:string}[]}) { return <div className="grid gap-5 md:grid-cols-3">{items.map(item=><Link href={item.href} key={item.href} className="border-t-[3px] border-corporate-blue p-6"><h3 className="text-xl font-semibold text-navy">{item.title}</h3><p className="mt-3 text-sm leading-6 text-secondary-text">{item.copy}</p><span className="mt-5 block text-sm font-semibold text-bright-blue">Learn more →</span></Link>)}</div> }

export function TwoColumn({children}:{children:React.ReactNode}) { return <div className="grid gap-12 md:grid-cols-2 md:gap-20">{children}</div> }

export function ContactDetails() { return <div className="flex flex-col gap-6"><div><p className="eyebrow">Email</p><a href="mailto:sales@ccgcorporation.ca" className="mt-2 block font-semibold text-bright-blue">sales@ccgcorporation.ca</a></div><div><p className="eyebrow">Phone</p><p className="mt-2 font-semibold text-navy">[519 phone number]</p></div><div><p className="eyebrow">Address</p><p className="mt-2 leading-7 text-secondary-text">[Street address]<br/>Woodstock, Ontario</p></div><HoursBlock/></div> }

export function AnchorNav({items}:{items:string[]}) { return <div className="flex flex-wrap gap-2">{items.map(i=><Pill key={i}>{i}</Pill>)}</div> }

export function Bullets({items}:{items:string[]}) { return <SimpleList items={items}/> }

export function DarkPanel({children}:{children:React.ReactNode}) { return <div className="bg-navy p-7 text-white md:p-10">{children}</div> }

export function LightPanel({children}:{children:React.ReactNode}) { return <div className="bg-soft-blue p-7 md:p-10">{children}</div> }

export function GasRelated({current}:{current:string}) { return <div className="grid gap-4 sm:grid-cols-2">{gases.filter(g=>g.name!==current).slice(0,4).map(g=><ArrowLink key={g.slug} href={`/gases/${g.slug}`}>{g.name}</ArrowLink>)}</div> }

export function DetailFooter(){ return null }

export function QuoteFormSection() { return <PageSection><div className="grid gap-12 md:grid-cols-[1fr_1.25fr] md:gap-20"><div><SectionHeading eyebrow="Start a conversation" title="Tell us what you need." intro="Share a few details and a local person will follow up with a written quote."/><div className="mt-10"><ContactDetails/></div></div><ContactForm/></div></PageSection> }

export function CardGrid({children}:{children:React.ReactNode}) { return <div className="grid gap-5 md:grid-cols-3">{children}</div> }

export function FAQ() { return <Accordion items={[{q:'Can I order only one cylinder?',a:'Yes. We can help with one-off refills, exchanges and regular route delivery. Tell us your gas and cylinder size and we will recommend the simplest option.'},{q:'Do you deliver outside Woodstock?',a:'We serve Woodstock, Ingersoll, Tillsonburg, Courtland and the Oxford County townships of Norwich, Zorra and Tavistock.'},{q:"Can you refill another company's cylinder?",a:"No. We cannot refill another company's cylinders. We can help you switch supply or arrange an exchange."},{q:'When do I need to order?',a:'Our order cut-off is 3 pm for route planning. Contact us for the next available delivery day in your area.'}]} /> }

export function PageTop({eyebrow,title,intro}:{eyebrow:string;title:string;intro:string}) { return <PageHero eyebrow={eyebrow} title={title} intro={intro}/> }

export function QuoteStrip(){return <div className="mt-12"><QuoteCallout/></div>}

export function GasOverview(){return <><PageSection><SectionHeading eyebrow="Cylinder gases" title="The gases your work calls for." intro="A focused range of common industrial and hospitality gases, supplied in practical cylinder sizes."/><div className="mt-12"><GasGrid/></div></PageSection><PageSection className="bg-soft-blue"><SectionHeading eyebrow="Cylinder size guide" title="Choose a size that fits the work."/><div className="mt-12"><SizeGuide/></div></PageSection></>}

export function IndustryOverview(){return <PageSection><SectionHeading eyebrow="Industries" title="A local supply partner for the work around us." intro="From production floors to farm workshops, we supply the gases and service patterns Oxford County businesses depend on."/><div className="mt-12"><IndustryRows/></div></PageSection>}

export function CTA(){return <div className="mt-12"><QuoteCallout/></div>}

export function HomePathways(){return <div className="grid gap-5 md:grid-cols-3">{[['/contact','Order or reorder gas','Tell us the gas, size and frequency that works for your team.'],['/services','Switch supplier','A clear, written process for moving your cylinder supply.'],['/gases','Find your cylinder size','Compare common sizes and choose what fits your work.']].map(([href,title,copy])=><Link href={href} key={href} className="group border-t-[3px] border-corporate-blue bg-white p-7 shadow-[0_1px_0_#D6E2EF]"><h3 className="text-2xl font-semibold tracking-[-.03em] text-navy">{title}</h3><p className="mt-3 leading-7 text-secondary-text">{copy}</p><span className="mt-7 inline-flex items-center gap-2 font-semibold text-bright-blue">Explore <ArrowRight size={16} className="transition group-hover:translate-x-1"/></span></Link>)}</div>}

export function HomePage(){return <SiteFrame><HeroImage/><PageSection className="bg-soft-blue"><HomePathways/></PageSection><StatBand/><PageSection><div className="grid gap-12 md:grid-cols-[.8fr_1.2fr] md:items-end"><SectionHeading eyebrow="Industries we serve" title="Built around the way local businesses work." intro="Straightforward supply for fabrication, agriculture, repair, hospitality and the trades."/><Photo src="/images/delivery-dock.png" alt="Delivery truck at an industrial loading dock" className="aspect-[4/3]"/></div><div className="mt-12"><SectorCards/></div></PageSection><PageSection className="bg-soft-blue"><SectionHeading eyebrow="Product specifications" title="A clear starting point for your gas supply."/><div className="mt-10"><GasTable/></div></PageSection><PageSection><SafeIconText/></PageSection><AboutBand/></SiteFrame>}

export function PageShell({children,label}:{children:React.ReactNode;label:string}){return <SiteFrame><Breadcrumb label={label}/>{children}</SiteFrame>}

export function HeroSection({eyebrow,title,intro}:{eyebrow:string;title:string;intro:string}){return <PageHero eyebrow={eyebrow} title={title} intro={intro}/>}

export function RouteNote(){return <SmallNote>Orders received by 3 pm are planned into the next available route. Ask our team about delivery timing for your area.</SmallNote>}

export function CheckRows({items}:{items:string[]}) {return <div className="grid gap-4">{items.map(i=><div key={i} className="border-b border-lines pb-4 font-medium text-navy">{i} <span className="float-right text-teal">✓</span></div>)}</div>}

export function LegalNote(){return <p className="text-xs leading-5 text-secondary-text">Information shown is a practical starting point. Confirm the correct gas, cylinder and regulator for your application with a qualified professional.</p>}

export function SafetySplit(){return <div className="grid gap-5 md:grid-cols-2"><DarkPanel><p className="eyebrow text-teal">Handling</p><h3 className="mt-3 text-2xl font-semibold">Safe storage starts with basics.</h3><p className="mt-4 leading-7 text-white/70">Secure cylinders upright, protect valves and keep them away from heat and impact. Follow the current SDS and applicable CSA guidance.</p></DarkPanel><LightPanel><p className="eyebrow">Delivery</p><h3 className="mt-3 text-2xl font-semibold text-navy">A check at every handoff.</h3><p className="mt-4 leading-7 text-secondary-text">Our TDG-trained drivers complete a leak check at every delivery and keep route planning clear.</p></LightPanel></div>}

export function FAQSection(){return <PageSection><div className="max-w-3xl"><SectionHeading eyebrow="Questions" title="Common questions."/><div className="mt-10"><FAQ/></div></div></PageSection>}

export function ContactPage(){return <><PageHero eyebrow="Contact" title="Let's talk about your cylinder gas supply." intro="Tell us what you use today, what you need next and where you are located. We'll come back with a clear written quote."/><QuoteFormSection/></>}

export function ServiceIntro(){return <PageSection><SectionHeading eyebrow="Services" title="Supply that stays practical from first order to delivery." intro="CCG-C keeps cylinder gas service simple: the right product, the right size and a local route that works."/><div className="mt-12"><ServiceCards/></div></PageSection>}

export function EmptySection(){return null}

export function HeaderSpacer(){return null}

export function SiteTitle(){return null}

export function QuoteLink(){return <ArrowLink href="/contact">Request a written quote</ArrowLink>}

export function RelatedIndustries({current}:{current:string}){return <LinkGrid items={industries.filter(i=>i.name!==current).slice(0,3).map(i=>({href:`/industries/${i.slug}`,title:i.name,copy:i.copy}))}/>}

export function ContentBand({children}:{children:React.ReactNode}){return <div className="bg-soft-blue"><PageSection>{children}</PageSection></div>}

export function SectionIntro({children}:{children:React.ReactNode}){return <p className="max-w-2xl leading-7 text-secondary-text">{children}</p>}

export function Centered({children}:{children:React.ReactNode}){return <div className="mx-auto max-w-3xl">{children}</div>}

export function ImageAside({src,alt,children}:{src:string;alt:string;children:React.ReactNode}){return <div className="grid gap-10 md:grid-cols-2 md:items-center"><Photo src={src} alt={alt} className="aspect-[4/3]"/><div>{children}</div></div>}

export function FormHeading(){return <SectionHeading eyebrow="Request a quote" title="A written quote, without the runaround." intro="We will use your details only to respond to this request."/>}

export function Close(){return null}

export function LocalAreas(){return <div className="flex flex-wrap gap-2">{['Woodstock','Ingersoll','Tillsonburg','Courtland','Norwich','Zorra','Tavistock'].map(a=><Pill key={a}>{a}</Pill>)}</div>}

export function DeliveryCallout(){return <Callout><strong className="text-navy">Order cut-off: 3 pm.</strong> We use this to plan the next available delivery route.</Callout>}

export function TemplateFooter(){return null}

export function DetailPageSection({children}:{children:React.ReactNode}){return <PageSection>{children}</PageSection>}

export function BlueRule(){return <div className="h-[3px] w-14 bg-corporate-blue"/>}

export function PlainLink({href,children}:{href:string;children:React.ReactNode}){return <Link href={href} className="text-bright-blue hover:text-corporate-blue">{children}</Link>}

export function PageImage({src,alt}:{src:string;alt:string}){return <Photo src={src} alt={alt} className="aspect-[16/7]"/>}

export function TextLink({href,children}:{href:string;children:React.ReactNode}){return <ArrowLink href={href}>{children}</ArrowLink>}

export function PageContent({children}:{children:React.ReactNode}){return <div className="page-wrap">{children}</div>}

export function FinePrint({children}:{children:React.ReactNode}){return <p className="text-sm leading-6 text-secondary-text">{children}</p>}

export function Headline({children}:{children:React.ReactNode}){return <h2 className="text-3xl font-semibold tracking-[-.04em] text-navy md:text-[40px]">{children}</h2>}

export function Intro({children}:{children:React.ReactNode}){return <p className="mt-4 max-w-2xl leading-7 text-secondary-text">{children}</p>}

export function ContactCTA(){return <QuoteCallout title="Ready to make cylinder gas supply simpler?"/>}

export function TemplatePage({children,label}:{children:React.ReactNode;label:string}){return <PageShell label={label}>{children}</PageShell>}

export function MobileOnly(){return null}

export function DesktopOnly(){return null}

export function AccentLabel({children}:{children:React.ReactNode}){return <p className="eyebrow">{children}</p>}

export function GasPath(){return null}

export function IndustryPath(){return null}

export function DataRow({children}:{children:React.ReactNode}){return <div className="border-b border-lines py-4">{children}</div>}

export function PhotoPanel({children}:{children:React.ReactNode}){return <div className="bg-soft-blue p-8">{children}</div>}

export function SectionLabel({children}:{children:React.ReactNode}){return <p className="eyebrow">{children}</p>}

export function PageBody({children}:{children:React.ReactNode}){return <main>{children}</main>}

export function PageFooter(){return null}

export function QuoteBandLink(){return <Link href="/contact" className="button-primary">Request a written quote →</Link>}

export function ServiceNote(){return <SmallNote>We cannot refill another company's cylinders. We can help you move to owned-cylinder refills or an exchange arrangement.</SmallNote>}

export function GasCardGrid(){return <GasGrid/>}

export function IndustryCardGrid(){return <SectorCards/>}

export function RouteSchedule(){return <RouteTable/>}

export function SDS(){return <SdsTable/>}

export function AccordionSection(){return <FAQSection/>}

export function QuoteRequest(){return <ContactForm/>}

export function Services(){return <ServiceCards/>}

export function Industries(){return <IndustryRows/>}

export function Gases(){return <GasGrid/>}

export function Breadcrumbs({label}:{label:string}){return <Breadcrumb label={label}/>}

export function GlobalFooter(){return <Footer/>}

export function GlobalHeader(){return <Header/>}

export function SharedShell({children}:{children:React.ReactNode}){return <SiteFrame>{children}</SiteFrame>}

export function ContentSection({children}:{children:React.ReactNode}){return <PageSection>{children}</PageSection>}

export function TealRule(){return <div className="h-px bg-teal"/>}

export function Arrow(){return <ArrowRight size={16}/>}
