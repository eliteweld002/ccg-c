type Cylinder = { label: string; height: number; diameter: number; format: string; featured?: boolean }
const pressure: Cylinder[] = [
  { label: '20', height: 13.8, diameter: 5.3, format: 'Small steel cylinder' },
  { label: '40', height: 19, diameter: 7, format: 'Portable steel cylinder' },
  { label: '80', height: 33, diameter: 7, format: 'Steel cylinder' },
  { label: '125', height: 43, diameter: 7, format: 'Steel cylinder' },
  { label: '200', height: 51, diameter: 9, format: 'Large steel cylinder' },
  { label: '300', height: 55, diameter: 9, format: 'Large steel cylinder' },
]
const propane: Cylinder[] = [
  { label: '20 lb', height: 17.2, diameter: 12.3, format: 'Portable steel' },
  { label: '33.5 lb', height: 28, diameter: 12.3, format: 'Aluminum forklift', featured: true },
  { label: '40 lb', height: 29.3, diameter: 12.3, format: 'Portable steel' },
  { label: '100 lb', height: 48, diameter: 14.7, format: 'Portable steel' },
]
function Dimension({x,y,width,label}:{x:number;y:number;width:number;label:string}) {
  return <g stroke="white" strokeWidth="1"><path d={`M${x-width/2+3} ${y} H${x+width/2-3} M${x-width/2+7} ${y-3} L${x-width/2+3} ${y} L${x-width/2+7} ${y+3} M${x+width/2-7} ${y-3} L${x+width/2-3} ${y} L${x+width/2-7} ${y+3}`}/><rect x={x-16} y={y-7} width="32" height="13" fill="#252525" stroke="none"/><text x={x} y={y+3} textAnchor="middle" fill="white" fontSize="9" fontWeight="700" stroke="none">{label}</text></g>
}
export function CylinderComparison({kind='pressure'}:{kind?:'pressure'|'propane'}) {
  const isPropane=kind==='propane', cylinders=isPropane?propane:pressure
  const bottom=365, scale=isPropane?5.4:3.65, maxFeet=isPropane?5:7
  return <div className="mt-8 overflow-hidden border border-[#D6E2EF] bg-white">
    <div className="px-6 pt-6"><h3 className="text-xl font-semibold text-[#00264D]">{isPropane?'Propane cylinder sizes':'High-pressure cylinder sizes'}</h3><p className="mt-2 text-sm leading-6 text-[#3C536B]">{isPropane?'Compare portable cylinders with the familiar forklift format.':'From portable cylinders to multi-cylinder banks: compare cylinder formats for your operation.'}</p></div>
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Cylinder size illustration; scroll horizontally on small screens">
      <svg viewBox="0 0 920 430" className="w-full min-w-[680px]" role="img" aria-labelledby={`${kind}-chart-title ${kind}-chart-desc`} style={{fontFamily:'Arial, sans-serif'}}>
        <title id={`${kind}-chart-title`}>{isPropane?'Propane cylinder comparison':'High-pressure cylinder and bank comparison'}</title>
        <desc id={`${kind}-chart-desc`}>Black cylinders against blue height lines with size and diameter labels. The table below lists approximate dimensions. Bank drawings show configurations, not guaranteed capacities.</desc>
        <rect width="920" height="430" fill="white"/>
        <text x="49" y="23" fill="#252525" fontSize="13" fontWeight="800">{isPropane?'PROPANE':'HIGH PRESSURE'}</text>
        {Array.from({length:maxFeet+1},(_,ft)=><g key={ft}><line x1="63" x2="886" y1={bottom-ft*12*scale} y2={bottom-ft*12*scale} stroke="#22A8D5" strokeWidth={ft===0?2:1}/><text x="51" y={bottom-ft*12*scale+4} textAnchor="end" fill="#252525" fontSize="12" fontWeight="700">{ft}′</text></g>)}
        {cylinders.map((c,i)=>{
          const x=isPropane?175+i*201:100+i*75,w=c.diameter*scale,h=c.height*scale,top=bottom-h
          return <g key={c.label}>
            {isPropane?<>
              <path d={`M${x-w/2} ${top+24} Q${x-w/2} ${top+15} ${x-w*.28} ${top+12} V${top+3} Q${x} ${top-3} ${x+w*.28} ${top+3} V${top+12} Q${x+w/2} ${top+15} ${x+w/2} ${top+24} V${bottom-12} Q${x+w/2} ${bottom-5} ${x+w*.32} ${bottom-5} V${bottom} H${x-w*.32} V${bottom-5} Q${x-w/2} ${bottom-5} ${x-w/2} ${bottom-12} Z`} fill="#252525"/>
              <rect x={x-w*.18} y={top+4} width={w*.36} height="9" rx="2" fill="white"/><path d={`M${x} ${top+6} v16 m-5 -7 h10`} stroke="#252525" strokeWidth="4"/><path d={`M${x-w/2+3} ${bottom-16} H${x+w/2-3}`} stroke="#6B6B6B"/>
            </>:<>
              <path d={`M${x-w/2} ${top+13} Q${x-w/2} ${top+5} ${x-4} ${top+3} V${top-7} Q${x} ${top-12} ${x+4} ${top-7} V${top+3} Q${x+w/2} ${top+5} ${x+w/2} ${top+13} V${bottom-5} Q${x+w/2} ${bottom} ${x+w/2-4} ${bottom} H${x-w/2+4} Q${x-w/2} ${bottom} ${x-w/2} ${bottom-5} Z`} fill="#252525"/>
              <path d={`M${x-w/2+3} ${top+17} V${bottom-25}`} stroke="#525252" strokeWidth="1"/>
            </>}
            <text x={x} y={isPropane?top+h*.49:bottom-35} textAnchor="middle" fill="white" fontSize={isPropane?14:10} fontWeight="700">{c.label}</text>
            {c.featured&&<text x={x} y={top+h*.49+18} textAnchor="middle" fill="white" fontSize="11" fontWeight="800">FORKLIFT</text>}
            <Dimension x={x} y={bottom-17} width={w} label={`${c.diameter}″`}/>
            <text x={x} y="389" textAnchor="middle" fill="#252525" fontSize="13" fontWeight="700">{c.label}</text>
            {isPropane&&<text x={x} y="410" textAnchor="middle" fill="#60758A" fontSize="11">{c.height}″ overall height</text>}
          </g>
        })}
        {!isPropane&&[640,806].map((x,i)=><g key={x}>
          <rect x={x-66} y={bottom-80*scale} width="132" height={80*scale} fill="none" stroke="#252525" strokeWidth="9"/>
          {(i===0?[x-36,x,x+36]:[x-43,x-14,x+15,x+44]).map(cx=><g key={cx}><path d={`M${cx-12} ${bottom-234} Q${cx-12} ${bottom-248} ${cx-4} ${bottom-250} V${bottom-263} H${cx+4} V${bottom-250} Q${cx+12} ${bottom-248} ${cx+12} ${bottom-234} V${bottom-13} H${cx-12} Z`} fill="#252525"/><path d={`M${cx-9} ${bottom-224} V${bottom-25}`} stroke="#666"/></g>)}
          {[bottom-24,bottom-170,bottom-276].map(y=><path key={y} d={`M${x-62} ${y} H${x+62}`} stroke="#626262" strokeWidth="5"/>)}
          <rect x={x-26} y={bottom-286} width="52" height="5" fill="#252525"/>
          <text x={x} y="389" textAnchor="middle" fill="#252525" fontSize="13" fontWeight="700">{i===0?'6-cylinder bank':'12-cylinder bank'}</text><text x={x} y="410" textAnchor="middle" fill="#60758A" fontSize="11">{i===0?'3 × 2 configuration':'4 × 3 configuration'}</text>
        </g>)}
      </svg>
    </div>
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Cylinder size table"><table className="w-full min-w-[600px] border-collapse text-left text-sm"><caption className="sr-only">Cylinder formats, dimensions and descriptions</caption><thead className="bg-[#1AA2CD] text-white"><tr>{['Size class','Format',isPropane?'Overall height × diameter':'Body height × diameter','Description'].map(s=><th scope="col" key={s} className="border-r border-white/30 px-4 py-3 font-semibold">{s}</th>)}</tr></thead><tbody>
      <tr className="bg-[#DFE3E7]"><th colSpan={4} scope="colgroup" className="px-4 py-2 font-semibold text-[#00264D]">{isPropane?'Propane cylinder comparison':'Individual high-pressure cylinders'}</th></tr>
      {cylinders.map(c=><tr key={c.label} className={`border-b border-[#D6E2EF] ${c.featured?'bg-[#EAF5FA]':'bg-white'}`}><th scope="row" className="border-r border-[#D6E2EF] px-4 py-3 font-semibold text-[#00264D]">{c.label}</th><td className="border-r border-[#D6E2EF] px-4 py-3 text-[#3C536B]">{c.format}</td><td className="border-r border-[#D6E2EF] px-4 py-3 text-[#3C536B]">{c.height}″ × {c.diameter}″</td><td className="px-4 py-3 text-[#3C536B]">{c.featured?'Forklift LPG cylinder':isPropane?'Portable propane cylinder':'Compressed-gas cylinder'}</td></tr>)}
      {!isPropane&&<><tr className="bg-[#DFE3E7]"><th colSpan={4} scope="colgroup" className="px-4 py-2 font-semibold text-[#00264D]">Multi-cylinder supply configurations</th></tr>{['6-cylinder bank','12-cylinder bank'].map(label=><tr key={label} className="border-b border-[#D6E2EF]"><th scope="row" className="border-r border-[#D6E2EF] px-4 py-3 font-semibold text-[#00264D]">{label}</th><td className="border-r border-[#D6E2EF] px-4 py-3 text-[#3C536B]">Manifolded cylinder pack</td><td className="border-r border-[#D6E2EF] px-4 py-3 text-[#3C536B]">Model-specific</td><td className="px-4 py-3 text-[#3C536B]">Discuss gas, total volume and availability</td></tr>)}</>}
    </tbody></table></div>
    <p className="px-6 py-5 text-xs leading-6 text-[#3C536B]">{isPropane ? 'Dimensions are approximate. Confirm the cylinder size and compatibility with your equipment before ordering.' : 'Dimensions are approximate. Cylinder body heights exclude valves and caps. Confirm the available cylinder size, fill and connection with CCG-C.'}</p>
  </div>
}
