export function DeliveryMap() {
  return <figure className="overflow-hidden border border-[#D6E2EF] bg-[#F1F6FB]">
    <div className="flex items-center justify-between gap-4 border-b border-[#D6E2EF] bg-white px-5 py-4"><span className="text-sm font-semibold text-[#00264D]">Ontario, Canada</span><a href="https://www.openstreetmap.org/#map=5/49.0/-84.0" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#0072CE]">Open larger map ↗</a></div>
    <iframe title="Geographical reference map of Ontario, Canada" src={'https://www.openstreetmap.org/export/embed.html?bbox=-95.2%2C41.6%2C-74.2%2C56.9&layer=mapnik'} loading="lazy" referrerPolicy="no-referrer" className="h-[390px] w-full border-0"/>
    <figcaption className="px-5 py-4 text-xs leading-5 text-[#3C536B]">Geographical reference only; this map does not define a delivery boundary. Confirm service availability for your address with CCG-C. Map data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline">OpenStreetMap contributors</a>.</figcaption>
  </figure>
}
