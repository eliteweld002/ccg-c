import { Fragment } from 'react'
import Link from 'next/link'

import { CylinderComparison } from './cylinder-comparison'

export function CylinderSizeGuide({ helium = false, gas }: { helium?: boolean; gas?: string }) {
  const isHelium = helium || gas === 'helium'
  if (gas === 'acetylene' || gas === 'carbon-dioxide' || gas === 'beer-gas') return <div id="size-guide" className="scroll-mt-8">
    <p className="eyebrow">Product-specific cylinder selection</p>
    <h2 className="mt-4 text-3xl font-semibold text-[#00264D]">Confirm the fill and cylinder together.</h2>
    <p className="mt-5 max-w-3xl leading-7 text-[#3C536B]">This product needs its own cylinder specification. A general compressed-gas capacity chart should not be used to choose the fill or connection.</p>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['Product','Gas, grade or exact blend'],['Fill quantity','Confirmed amount and unit'],['Connection','Compatible valve and equipment'],['Supply','Ownership, refill or exchange terms']].map(([title,copy]) => <div key={title} className="border-t-2 border-[#0072CE] bg-white p-6"><h3 className="font-semibold text-[#00264D]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#3C536B]">{copy}</p></div>)}</div>
    <Link href="/contact" className="mt-7 inline-flex text-sm font-medium text-[#0072CE]">Request the available product specification →</Link>
  </div>
  return <div id="size-guide" className="scroll-mt-8">
    <p className="eyebrow">Cylinder size guide</p>
    <h2 className="mt-4 text-3xl font-semibold tracking-[-.03em] text-[#00264D] md:text-4xl">Compare your cylinder options.</h2>
    <p className="mt-5 max-w-3xl leading-7 text-[#3C536B]">Choose around your gas, application and usage. Compare physical cylinder sizes below, then confirm the fill, grade and connection available for your gas.</p>
    <CylinderComparison/>
    {!isHelium && <div className="mt-8 overflow-x-auto"><table className="w-full min-w-[560px] border-collapse bg-white text-left text-sm"><caption className="pb-4 text-left text-xl font-semibold text-[#00264D]">Gas grade and fill inquiry</caption><thead className="bg-[#1AA2CD] text-white"><tr>{['Grade','Cylinder size','Description'].map(label=><th scope="col" key={label} className="border border-[#D6E2EF] px-4 py-3">{label}</th>)}</tr></thead><tbody>{[['Industrial gas inquiries','Industrial','Confirm for your gas','Share your application, fill quantity and cylinder requirements.'],['Specialty gas inquiries','To your specification','Confirm for your grade','Specify purity, impurity limits and certificate requirements.']].map(([group,grade,size,description])=><Fragment key={group}><tr className="bg-[#DFE3E7]"><th colSpan={3} scope="colgroup" className="px-4 py-2 font-semibold text-[#00264D]">{group}</th></tr><tr>{[grade,size,description].map(cell=><td key={cell} className="border border-[#D6E2EF] px-4 py-3 leading-6 text-[#3C536B]">{cell}</td>)}</tr></Fragment>)}</tbody></table></div>}
    {isHelium && <div className="mt-10 overflow-x-auto"><table className="w-full min-w-[560px] border border-[#D6E2EF] bg-white text-left text-sm"><caption className="pb-4 text-left text-xl font-semibold text-[#00264D]">Helium grade and size inquiry chart</caption><thead className="bg-[#1AA2CD] text-white"><tr><th className="border border-[#D6E2EF] px-4 py-3">Use</th><th className="border border-[#D6E2EF] px-4 py-3">Grade to request</th><th className="border border-[#D6E2EF] px-4 py-3">Capacity</th><th className="border border-[#D6E2EF] px-4 py-3">Confirm with CCG-C</th></tr></thead><tbody>{[['General industrial','Industrial','150 or 300 cu ft','Available fill and cylinder'],['Analytical / specialty','High-purity to your specification','300 cu ft class','Purity and certificate requirements'],['Instrument zeroing','Zero grade to your specification','300 cu ft class','Application and impurity limits']].map(row => <tr key={row[0]} className="border-b border-[#D6E2EF] text-[#3C536B]">{row.map(cell => <td key={cell} className="border border-[#D6E2EF] px-4 py-3">{cell}</td>)}</tr>)}</tbody></table><p className="mt-3 text-xs leading-5 text-[#3C536B]">Available grades and fills are confirmed with your quote.</p></div>}
    <Link href="/contact" className="mt-7 inline-flex text-sm font-medium text-[#0072CE]">Confirm a gas, size and grade →</Link>
  </div>
}
