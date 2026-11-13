export const contactEmail = 'sales@ccgcorporation.ca'
export const contactPhone = '+1 519 401 0612'
export const contactPhoneHref = 'tel:+15194010612'
export const contactStreet = '33351 Richmond St'
export const contactLocality = 'Lucan'
export const contactPostalCode = 'N0M 2J0'
export const gasOptions = ['Argon', 'Argon/CO2 Mixes', 'Oxygen', 'Acetylene', 'Carbon Dioxide', 'Nitrogen', 'Helium', 'Hydrogen', 'Beer gas', 'Forklift Propane', 'Not sure — please advise']
export const serviceOptions = ['Please advise', 'Delivery', 'Exchange / rental', 'Owned-cylinder refill', 'Forklift propane', 'SDS request']

export function contactPreset(search: string) {
  const query = new URLSearchParams(search)
  const requested = query.get('product') || ''
  const product = gasOptions.find(option => option.toLowerCase() === requested.toLowerCase()) || ''
  const service = serviceOptions.includes(query.get('service') || '') ? query.get('service')! : serviceOptions[0]
  return {
    product: product || (service === 'SDS request' ? 'Not sure — please advise' : ''),
    service,
    requirements: service === 'SDS request' ? `Please provide the current safety data sheet for ${product || 'my gas or propane product'}.` : '',
  }
}

export function sdsContactHref(product?: string) {
  const query = new URLSearchParams({ service: 'SDS request' })
  if (product) query.set('product', product)
  return `/contact?${query.toString()}#quote-form`
}
