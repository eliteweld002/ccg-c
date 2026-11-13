import { siteOrigin, siteName, siteShortName, homeDescription, pageUrl } from './site-metadata'
import { contactEmail, contactPhoneHref, contactStreet, contactLocality, contactPostalCode } from './contact-options'

export const orgId = siteOrigin + '/#organization'
export const websiteId = siteOrigin + '/#website'

export const gasCatalog: [slug: string, name: string][] = [
  ['argon', 'Argon'], ['argon-co2-75-25', 'Argon/CO2 Mixes'], ['oxygen', 'Oxygen'], ['acetylene', 'Acetylene'],
  ['carbon-dioxide', 'Carbon Dioxide'], ['nitrogen', 'Nitrogen'], ['helium', 'Helium'], ['hydrogen', 'Hydrogen'], ['beer-gas', 'Beer gas'],
]

const ontario = { '@type': 'AdministrativeArea', name: 'Ontario', containedInPlace: { '@type': 'Country', name: 'Canada' } }

// Sitewide entities: the business and the website. Rendered once in the root layout.
export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': orgId,
        name: siteName,
        alternateName: siteShortName,
        url: siteOrigin + '/',
        description: homeDescription,
        logo: { '@type': 'ImageObject', url: siteOrigin + '/images/ccg-c-logo-compact.webp' },
        image: siteOrigin + '/social/ccgc-share.png',
        email: contactEmail,
        telephone: contactPhoneHref.slice(4),
        address: { '@type': 'PostalAddress', streetAddress: contactStreet, addressLocality: contactLocality, postalCode: contactPostalCode, addressRegion: 'ON', addressCountry: 'CA' },
        areaServed: ontario,
        knowsAbout: ['Industrial gases', 'Welding gases', 'Forklift propane', 'Gas cylinder delivery', 'Cylinder exchange and refill'],
        contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: contactEmail, telephone: contactPhoneHref.slice(4), areaServed: 'CA', availableLanguage: ['English'] },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Cylinder gases and forklift propane',
          itemListElement: [
            ...gasCatalog.map(([slug, name]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Product', name: `${name} cylinders`, url: pageUrl('/gases/' + slug) } })),
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Forklift propane cylinders', url: pageUrl('/forklift-propane') } },
          ],
        },
      },
      { '@type': 'WebSite', '@id': websiteId, url: siteOrigin + '/', name: siteName, alternateName: siteShortName, inLanguage: 'en-CA', publisher: { '@id': orgId } },
    ],
  }
}

type PageGraphInput = {
  path: string
  name: string
  description: string
  type?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage'
  crumbs?: [name: string, path: string][]
  extra?: Record<string, unknown>[]
}

// Page-level entities: WebPage (typed), BreadcrumbList, plus any Product / Service / FAQPage entities.
export function pageGraph({ path, name, description, type = 'WebPage', crumbs = [], extra = [] }: PageGraphInput) {
  const url = pageUrl(path)
  const trail: [string, string][] = [['Home', '/'], ...crumbs]
  const graph: Record<string, unknown>[] = [
    { '@type': type, '@id': url + '#webpage', url, name, description, inLanguage: 'en-CA', isPartOf: { '@id': websiteId }, about: { '@id': orgId }, ...(path === '/' ? {} : { breadcrumb: { '@id': url + '#breadcrumb' } }) },
  ]
  if (path !== '/') {
    graph.push({ '@type': 'BreadcrumbList', '@id': url + '#breadcrumb', itemListElement: trail.map(([n, p], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: pageUrl(p) })) })
  }
  return { '@context': 'https://schema.org', '@graph': [...graph, ...extra] }
}

export function productEntity(path: string, p: { name: string; description: string; image: string; valve?: string }) {
  return {
    '@type': 'Product',
    '@id': pageUrl(path) + '#product',
    name: p.name,
    description: p.description,
    image: siteOrigin + p.image,
    category: 'Industrial gases',
    url: pageUrl(path),
    ...(p.valve && p.valve.startsWith('CGA') ? { additionalProperty: { '@type': 'PropertyValue', name: 'Valve connection', value: p.valve } } : {}),
  }
}

export function serviceEntity(path: string, s: { name: string; description: string; serviceType: string }) {
  return { '@type': 'Service', '@id': pageUrl(path) + '#service', name: s.name, description: s.description, serviceType: s.serviceType, provider: { '@id': orgId }, areaServed: ontario, url: pageUrl(path) }
}

export function faqEntity(path: string, faqs: readonly (readonly [string, string])[]) {
  return { '@type': 'FAQPage', '@id': pageUrl(path) + '#faq', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }
}
