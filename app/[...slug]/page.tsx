import { sdsContactHref, contactPhone, contactPhoneHref, contactStreet, contactLocality, contactPostalCode } from '@/lib/contact-options'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { pageMetadata } from '@/lib/site-metadata'
import { CylinderProduct } from '@/components/cylinder-product'
import { ServicesContent, DeliveryContent, PricingContent, SafetyContent, AboutContent } from '@/components/business-pages'
import { QuoteForm } from '@/components/quote-form'
import { CylinderSizeGuide } from '@/components/cylinder-size-guide'
import { ForkliftPropanePage } from '@/components/forklift-propane'
import { Check } from 'lucide-react'
import { Shell, Breadcrumb, PageHero, Section, Eyebrow, ArrowLink, Image } from '@/components/site-shell'

const gasData: Record<string, { name: string; valve: string; intro: string; uses: string[]; image: string; imageAlt: string }> = {
  argon: { name: 'Argon', valve: 'CGA 580', intro: 'A clean, inert shielding gas for consistent welds and controlled atmospheres.', uses: ['TIG and MIG welding', 'Stainless steel fabrication', 'Aluminum welding', 'Back purging'], image: '/images/argon-tig.webp', imageAlt: 'TIG welding a stainless-steel assembly with shielding gas' },
  oxygen: { name: 'Oxygen', valve: 'CGA 540', intro: 'For cutting, heating and oxygen-fuel processes in the workshop.', uses: ['Oxy-fuel cutting', 'Heating and brazing', 'Water treatment', 'Industrial process applications'], image: '/images/oxygen-cutting.webp', imageAlt: 'Oxy-fuel cutting torch working along a steel plate' },
  acetylene: { name: 'Acetylene', valve: 'CGA 510', intro: 'A high-temperature fuel gas for welding, cutting and brazing.', uses: ['Gas welding', 'Brazing', 'Cutting', 'Heating'], image: '/images/acetylene-brazing.webp', imageAlt: 'Technician brazing copper pipe joints with a torch and filler rod' },
  'carbon-dioxide': { name: 'Carbon Dioxide', valve: 'CGA 320', intro: 'A versatile gas for beverage service, welding and controlled environments.', uses: ['Draft beer and beverage service', 'MIG welding', 'Greenhouse enrichment', 'Food packaging'], image: '/images/co2-food-packaging.webp', imageAlt: 'Controlled-atmosphere food tray packaging equipment' },
  nitrogen: { name: 'Nitrogen', valve: 'CGA 580', intro: 'A dry, inert gas for purging, pressure testing and process applications.', uses: ['Pressure testing', 'Purging', 'Food packaging', 'Laser cutting'], image: '/images/hvac-nitrogen.webp', imageAlt: 'HVAC technician checking a pressure regulator beside a secured nitrogen cylinder' },
  'argon-co2-75-25': { name: 'Argon/CO2 Mixes', valve: 'CGA 580', intro: 'Argon and Carbon Dioxide shielding blends for productive MIG welding. Match the blend to your metal, wire and welding process; ask about 75/25 and other application-specific mixtures.', uses: ['MIG welding', 'Mild steel fabrication', 'Structural welding', 'Repair work'], image: '/images/welder.webp', imageAlt: 'Fabricator welding steel components' },
  helium: { name: 'Helium', valve: 'Confirm for your grade and cylinder', intro: 'A light, inert gas for specialty shielding, leak detection, analytical work and balloon inflation. Tell us your application so we can confirm a suitable grade and cylinder.', uses: ['Specialty welding and shielding', 'Leak detection', 'Analytical and laboratory processes', 'Balloon inflation with suitable equipment'], image: '/images/helium-leak-testing.webp', imageAlt: 'Technician checking a vacuum chamber with a helium leak detector' },
  hydrogen: { name: 'Hydrogen', valve: 'Confirm with the team before ordering', intro: 'Hydrogen for industrial and specialty processes, including controlled atmospheres and analytical applications. Confirm the required purity, connection and handling setup before ordering.', uses: ['Controlled process atmospheres', 'Analytical and laboratory applications', 'Specialty industrial processes', 'Application-specific gas mixtures'], image: '/images/plant-pipework.webp', imageAlt: 'Industrial process pipework for controlled gas applications' },
  'beer-gas': { name: 'Beer gas', valve: 'Confirm for the specified blend and system', intro: 'A blended gas for stable, consistent draft beverage service.', uses: ['Draft beer', 'Cider service', 'Beverage dispensing', 'Hospitality venues'], image: '/images/beer-taps.webp', imageAlt: 'Clean draft beverage taps' },
}
const gasSymbols: Record<string, string> = { argon: 'Ar', oxygen: 'O₂', acetylene: 'C₂H₂', 'carbon-dioxide': 'CO₂', nitrogen: 'N₂', 'argon-co2-75-25': 'Ar / CO₂', helium: 'He', hydrogen: 'H₂', 'beer-gas': 'N₂ / CO₂' }
const gasNotes: Record<string, string> = {
  argon: 'Tell us the base metal, welding process and required grade so the gas and equipment can be matched to your work.',
  oxygen: 'Confirm the intended industrial use, compatible regulator and oxygen-service equipment before ordering.',
  acetylene: 'Share your cutting, heating or brazing application and equipment requirements so the appropriate cylinder setup can be confirmed.',
  'carbon-dioxide': 'Specify whether your application is beverage, food or industrial so the correct grade and cylinder service can be quoted.',
  nitrogen: 'For HVAC and process work, provide the required grade, usage and pressure requirements with your inquiry.',
  'argon-co2-75-25': 'Include your wire, material and process. A 75/25 blend is one option; the appropriate mixture depends on the application.',
  helium: 'Share your purity and certification requirements, especially for analytical or leak-detection work.',
  hydrogen: 'Discuss your process specification, required purity and compatible installation with the team before ordering.',
  'beer-gas': 'Provide the blend ratio your beverage system specifies, together with cylinder and regulator details.',
}
const sectors = ['fabrication', 'agriculture', 'automotive-truck-trailer-repair', 'hospitality', 'hvac-and-plumbing', 'independent-welders']
const sectorNames: Record<string,string> = { fabrication: 'Fabrication and manufacturing', agriculture: 'Agriculture', 'automotive-truck-trailer-repair': 'Automotive, truck and trailer repair', hospitality: 'Hospitality', 'hvac-and-plumbing': 'HVAC and plumbing', 'independent-welders': 'Independent welders' }

// Enumerate the ZIP's original routes for the static Sites deployment.
export function generateStaticParams() {
  return [
    { slug: ['gases'] },
    ...Object.keys(gasData).map(slug => ({ slug: ['gases', slug] })),
    { slug: ['industries'] },
    ...sectors.map(slug => ({ slug: ['industries', slug] })),
    ...['services', 'forklift-propane', 'delivery-area', 'pricing', 'safety', 'about', 'contact'].map(slug => ({ slug: [slug] })),
  ]
}

function Standard({ title, eyebrow, intro, children, image, imageAlt }: { title: string; eyebrow: string; intro: string; children: React.ReactNode; image?: string; imageAlt?: string }) { return <Shell><main><Breadcrumb current={title}/><PageHero eyebrow={eyebrow} title={title} intro={intro} image={image} imageAlt={imageAlt}/>{children}</main></Shell> }
function Gases() { return <Standard eyebrow="Cylinder gases" title="The gases your work depends on." intro="Straightforward supply of industrial, specialty and hospitality gases, with application information and a practical cylinder size guide."><Section><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{Object.entries(gasData).map(([slug,gas]) => <Link href={`/gases/${slug}`} key={slug} className="group overflow-hidden border border-[#D6E2EF] hover:border-[#0072CE]"><div className="relative"><img src={gas.image.replace('.webp', '-card.webp')} alt={gas.imageAlt} loading="lazy" decoding="async" width={640} height={320} className="aspect-[16/8] w-full object-cover transition duration-500 group-hover:scale-105"/><span className="absolute bottom-3 left-3 bg-white px-3 py-1.5 text-lg font-semibold text-[#003B71]">{gasSymbols[slug]}</span></div><div className="p-7"><Eyebrow>Industrial & specialty gas</Eyebrow><h2 className="mt-4 text-2xl font-semibold text-[#00264D]">{gas.name}</h2><p className="mt-3 text-[#3C536B]">{gas.intro}</p><span className="mt-6 block text-sm font-medium text-[#0072CE]">View gas details →</span></div></Link>)}</div></Section><Section className="bg-[#F1F6FB]"><CylinderSizeGuide/></Section></Standard> }

function GasDetail({ slug }: { slug: string }) {
  const gas = gasData[slug]
  if (!gas) notFound()
  return <Standard eyebrow="Gas specification" title={gas.name} intro={gas.intro} image={gas.image} imageAlt={gas.imageAlt}>
    <Section><div className="grid gap-14 lg:grid-cols-[1.2fr_.8fr]"><div><CylinderProduct slug={slug} name={gas.name}/><div className="flex items-center gap-4"><span className="inline-flex min-w-16 items-center justify-center border border-[#D6E2EF] bg-[#F1F6FB] px-4 py-3 text-2xl font-semibold text-[#003B71]">{gasSymbols[slug]}</span><h2 className="text-3xl font-semibold text-[#00264D]">Product information</h2></div><p className="mt-5 leading-7 text-[#3C536B]">{gasNotes[slug]}</p>
      <table className="mt-7 w-full text-left text-sm"><tbody>{[['Grade and purity','Confirm the specification for your application'],['Valve connection',gas.valve],['Cylinder sizes','Compare the size guide below; confirm available fills'],['Cylinder service','Ask about rental, exchange or customer-owned refill']].map(([a,b]) => <tr key={a} className="border-b border-[#D6E2EF]"><th className="py-4 pr-4 font-medium text-[#3C536B]">{a}</th><td className="py-4 text-[#00264D]">{b}</td></tr>)}</tbody></table>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border border-[#D6E2EF] p-5"><span className="font-medium text-[#00264D]">Safety data sheet</span><Link href={sdsContactHref(gas.name)} className="text-sm text-[#0072CE]">Request current SDS →</Link></div>
    </div><div className="bg-[#F1F6FB] p-8"><Eyebrow>Typical applications</Eyebrow><ul className="mt-6 flex flex-col gap-4">{gas.uses.map(use => <li key={use} className="flex gap-3 text-[#3C536B]"><Check className="mt-1 size-4 shrink-0 text-[#00A3AD]"/>{use}</li>)}</ul><div className="mt-8"><ArrowLink href={`/contact?product=${encodeURIComponent(gas.name)}`}>Ask about {gas.name}</ArrowLink></div></div></div></Section>
    <Section className="bg-[#F1F6FB]"><CylinderSizeGuide gas={slug}/></Section>
    <Section><Eyebrow>Safety notes</Eyebrow><h2 className="mt-4 text-3xl font-semibold text-[#00264D]">Use the right equipment every time.</h2><p className="mt-5 max-w-2xl leading-7 text-[#3C536B]">{slug === 'hydrogen' ? 'Hydrogen is flammable. Follow the current SDS and your workplace procedures for ventilation, ignition control, compatible equipment and leak checking.' : slug === 'helium' ? 'Helium can displace oxygen. Never inhale helium and use it only with suitable equipment and ventilation. Follow the current SDS for handling, storage and emergency guidance.' : 'Secure cylinders, use compatible equipment and follow the current SDS and your workplace procedures. Confirm the gas, grade and connection before use.'}</p></Section>
  </Standard>
}

function Industries() { return <Standard eyebrow="Industries" title="Gas supply for industry in Ontario, Canada." intro="Practical cylinder gas service for shops, farms, trades and hospitality teams, with delivery designed around your workday."><Section><div className="grid gap-0">{sectors.map((slug,i) => <Link href={`/industries/${slug}`} key={slug} className="grid gap-7 border-t border-[#D6E2EF] py-8 md:grid-cols-[180px_1fr_auto] md:items-center"><span className="text-sm text-[#00A3AD]">0{i+1}</span><div><h2 className="text-2xl font-semibold text-[#00264D]">{sectorNames[slug]}</h2><p className="mt-2 text-[#3C536B]">Gases, cylinder service and delivery that keep your operation moving.</p></div><span className="text-[#0072CE]">View sector →</span></Link>)}</div></Section></Standard> }
function IndustryDetail({ slug }: { slug: string }) {
  const profiles: Record<string, { image: string; alt: string; challenge: string; supply: string[] }> = {
    fabrication: { image: '/images/welder.webp', alt: 'Welder using shielding gas on a steel fabrication assembly', challenge: 'Keep weld quality consistent across bays, shifts and changing jobs.', supply: ['Argon and Argon/CO2 Mixes for MIG and TIG welding', 'Cylinder exchange and rental for active welding bays', 'Scheduled delivery for production and maintenance teams'] },
    agriculture: { image: '/images/farm-workshop.webp', alt: 'Farm workshop with equipment ready for repair and maintenance', challenge: 'Have practical gas supply available when equipment repair cannot wait.', supply: ['Oxygen and acetylene for cutting, heating and repair', 'Delivery inquiries for Ontario, Canada', 'Clear cylinder exchange for seasonal demand'] },
    'automotive-truck-trailer-repair': { image: '/images/automotive-repair.webp', alt: 'Mechanic welding a trailer chassis in an automotive and truck repair workshop', challenge: 'Move repair work through the shop with dependable cylinders and familiar connections.', supply: ['Argon/CO2 blends for body and chassis work', 'Oxygen and acetylene for cutting and heating', 'Cylinder sizes that suit daily shop use'] },
    hospitality: { image: '/images/beer-taps.webp', alt: 'Clean draft beer taps in a hospitality service area', challenge: 'Keep draft beverage service stable without an avoidable cylinder gap.', supply: ['Carbon Dioxide and beer gas for draft systems', 'Scheduled exchange for regular service patterns', 'Practical advice on cylinder placement and handling'] },
    'hvac-and-plumbing': { image: '/images/hvac-nitrogen.webp', alt: 'HVAC technician working with a regulator and secured nitrogen cylinder', challenge: 'Bring the right gas to installation, brazing and pressure-testing work.', supply: ['Nitrogen for pressure testing and purging', 'Oxygen and acetylene for brazing and heating', 'Route delivery planned around service calls'] },
    'independent-welders': { image: '/images/argon-tig.webp', alt: 'Independent TIG welder working on a stainless-steel assembly', challenge: 'Spend less time managing supply and more time on the job.', supply: ['Argon and Argon/CO2 Mixes for common welding work', 'Owned-cylinder refills where suitable', 'Exchange, rental and delivery options'] },
  }
  const name = sectorNames[slug] || sectorNames.fabrication
  const profile = profiles[slug] || profiles.fabrication
  return <Standard eyebrow="Industry" title={name} intro="A dependable local gas supply for teams that need the right cylinder, clear service and delivery that fits the working day." image={profile.image} imageAlt={profile.alt}><Section><div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center"><div className="border-t-[3px] border-[#0072CE] bg-[#F1F6FB] p-8"><Eyebrow>Supply options</Eyebrow><h2 className="mt-4 text-2xl font-semibold text-[#00264D]">Plan around your workshop.</h2><p className="mt-4 leading-7 text-[#3C536B]">Discuss the gases you use, cylinder sizes, ownership or rental, and the supply frequency that fits your work.</p><div className="mt-7"><ArrowLink href="/contact">Discuss your requirements</ArrowLink></div></div><div><Eyebrow>The working challenge</Eyebrow><h2 className="mt-4 text-3xl font-semibold text-[#00264D]">{profile.challenge}</h2><p className="mt-5 leading-7 text-[#3C536B]">You need practical product information, known cylinder connections and a supply pattern that does not create extra work. CCG-C keeps the conversation direct.</p><div className="mt-8 flex flex-col gap-4">{profile.supply.map(item => <div key={item} className="flex gap-3 border-b border-[#D6E2EF] pb-4 text-[#3C536B]"><Check className="mt-1 size-4 shrink-0 text-[#00A3AD]"/>{item}</div>)}</div></div></div></Section><Section className="bg-[#F1F6FB]"><Eyebrow>How delivery works</Eyebrow><h2 className="mt-4 text-3xl font-semibold text-[#00264D]">A clear route from request to cylinder.</h2><div className="mt-8 grid gap-6 md:grid-cols-3">{['Tell us what you use','We confirm the gas, valve and size','We deliver on your route'].map((x,i)=><div key={x} className="border-t-2 border-[#0072CE] pt-5"><span className="text-sm text-[#00A3AD]">0{i+1}</span><h3 className="mt-3 text-xl font-semibold text-[#00264D]">{x}</h3><p className="mt-2 text-sm leading-6 text-[#3C536B]">No guesswork: we confirm the details before the order is placed.</p></div>)}</div></Section></Standard>
}

function Services() { return <Standard eyebrow="Services" title="Cylinder service, planned around your work." intro="Explore delivery, cylinder exchange, rental and customer-owned refill inquiries. Confirm the right arrangement with a written quote."><ServicesContent/></Standard> }
function Delivery() { return <Standard eyebrow="Delivery area" title="Let’s confirm service for your location." intro="Tell us where you operate and what you use. We will confirm delivery availability and arrangements for your address."><DeliveryContent/></Standard> }
function Pricing() { return <Standard eyebrow="Pricing" title="A clear quote for your gas supply." intro="Compare the product, cylinder and service terms together. Request current pricing for your requirements."><PricingContent/></Standard> }
function Safety() { return <Standard eyebrow="Safety" title="Start with the right product information." intro="Correct gas identification, current safety documents and compatible equipment matter at every handoff."><SafetyContent gases={Object.values(gasData)}/></Standard> }
function About() { return <Standard eyebrow="About us" title="Canadian gas supply. Straightforward service." intro="Canada Compressed Gas Corporation supports product and cylinder supply conversations for industry, trades, hospitality and material-handling operations."><AboutContent/></Standard> }
function Contact() { return <Standard eyebrow="Contact" title="Tell us what you need." intro="Request a written quote for cylinder gases, refills, exchange or scheduled delivery."><Section><div className="grid gap-14 lg:grid-cols-[1.2fr_.8fr]"><QuoteForm/><div className="border-l-4 border-[#00A3AD] pl-7"><Eyebrow>Reach the team</Eyebrow><h2 className="mt-4 text-2xl font-semibold text-[#00264D]">Canada Compressed Gas Corporation</h2><p className="mt-5 leading-7 text-[#3C536B]">{contactStreet}<br/>{contactLocality}, Ontario, {contactPostalCode}<br/>Canada<br/><br/><a href={contactPhoneHref} className="inline-block py-1 font-medium text-[#0072CE]">{contactPhone}</a><br/><a href="mailto:sales@ccgcorporation.ca" className="font-medium text-[#0072CE]">sales@ccgcorporation.ca</a></p><p className="mt-7 text-sm leading-6 text-[#3C536B]">Include your delivery location so the team can confirm service availability and arrangements.</p></div></div></Section></Standard> }


export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const path = slug.join('/')
  if (slug[0] === 'gases' && gasData[slug[1]]) {
    const gas = gasData[slug[1]]
    return pageMetadata('/' + path, gas.name + ' Gas & Cylinder Supply', gas.intro)
  }
  if (slug[0] === 'industries' && sectorNames[slug[1]]) return pageMetadata('/' + path, 'Gas Supply for ' + sectorNames[slug[1]], 'Explore gas applications and cylinder supply inquiries for ' + sectorNames[slug[1]].toLowerCase() + '. Contact CCG-C in Ontario for a written quote.')
  const pages: Record<string, [string, string]> = {
    gases: ['Industrial & Specialty Gases', 'Explore Argon, Argon/CO2 Mixes, Oxygen, Acetylene, Carbon Dioxide, Nitrogen, Helium, Hydrogen and beer gas. Compare applications and cylinder options.'],
    industries: ['Gas Supply by Industry', 'Explore gas applications for fabrication, agriculture, automotive repair, hospitality, HVAC and independent welding businesses.'],
    services: ['Cylinder Delivery, Exchange & Refill Inquiries', 'Compare cylinder service options, rental and exchange arrangements, customer-owned refill inquiries and supplier changeover planning.'],
    'forklift-propane': ['Forklift Propane & Cylinder Supply', 'Discuss propane cylinder supply for your forklift fleet. Share equipment, cylinder and delivery requirements for a written CCG-C quote.'],
    'delivery-area': ['Delivery Availability in Ontario', 'Send your address and gas or propane requirements so CCG-C can confirm delivery availability and arrangements for your location.'],
    pricing: ['Gas & Cylinder Supply Quotes', 'Request current pricing for gases, cylinders and forklift propane. Review product, cylinder ownership and delivery terms together.'],
    safety: ['Gas Safety Information & SDS Requests', 'Request current safety data sheets for your exact gas, grade or blend from Canada Compressed Gas Corporation.'],
    about: ['About Canada Compressed Gas Corporation', 'Learn about CCG-C, an Ontario-based gas supplier focused on practical product information, cylinder supply inquiries and written quotes.'],
    contact: ['Contact CCG-C & Request a Quote', 'Contact Canada Compressed Gas Corporation about industrial gases, cylinder service and forklift propane. Send a gas, propane or SDS enquiry to our sales team.'],
  }
  const info = pages[path]
  return info ? pageMetadata('/' + path, info[0], info[1]) : {}
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) { const { slug } = await params; const path=slug.join('/'); if(path==='gases') return <Gases/>; if(path.startsWith('gases/')) return <GasDetail slug={slug[1]}/>; if(path==='industries') return <Industries/>; if(path.startsWith('industries/')) return <IndustryDetail slug={slug[1]}/>; if(path==='services') return <Services/>; if(path==='forklift-propane') return <ForkliftPropanePage/>; if(path==='delivery-area') return <Delivery/>; if(path==='pricing') return <Pricing/>; if(path==='safety') return <Safety/>; if(path==='about') return <About/>; if(path==='contact') return <Contact/>; return notFound() }
