const formats: Record<string, { image: string; title: string; note: string }> = {
  acetylene: { image: 'acetylene-cylinder', title: 'Fuel-gas cylinder format', note: 'Ask about the cylinder and valve connection suitable for your fuel-gas equipment.' },
  'carbon-dioxide': { image: 'co2-cylinder', title: 'CO₂ cylinder format', note: 'Confirm the product grade, fill quantity and connection for beverage, food or industrial use.' },
  'beer-gas': { image: 'co2-cylinder', title: 'Beverage cylinder format', note: 'Specify the gas blend your dispensing system requires, along with the regulator and cylinder details.' },
}

export function CylinderProduct({ slug, name }: { slug: string; name: string }) {
  const format = formats[slug] ?? { image: 'high-pressure-cylinder', title: 'Compressed-gas cylinder format', note: 'Confirm the gas, grade, capacity and compatible valve connection with your quote.' }
  return <figure className="mb-9 grid overflow-hidden border border-[#D6E2EF] bg-[#F1F6FB] sm:grid-cols-[160px_1fr]">
    <img src={`/images/${format.image}.webp`} alt={`Generic ${format.title.toLowerCase()} illustration for a ${name} inquiry`} width={320} height={400} loading="lazy" decoding="async" className="h-[240px] w-full bg-[#F6F7F8] object-contain p-3"/>
    <figcaption className="flex flex-col justify-center p-6"><p className="text-xs font-medium uppercase tracking-[.1em] text-[#0072CE]">Cylinder supply</p><h3 className="mt-3 text-xl font-semibold text-[#00264D]">{format.title}</h3><p className="mt-3 text-sm leading-6 text-[#3C536B]">{format.note}</p><p className="mt-4 text-xs leading-5 text-[#60758A]">Illustrative format. Supplied cylinder appearance, size and fittings may differ.</p></figcaption>
  </figure>
}
