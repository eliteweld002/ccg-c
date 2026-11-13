import type { Metadata } from 'next'

export const siteOrigin = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'https://ccg-corporation.elite-weldin-0002.chatgpt.site'
export const siteName = 'Canada Compressed Gas Corporation'
export const sitePaths = [
  '/', '/gases', '/gases/argon', '/gases/argon-co2-75-25', '/gases/oxygen',
  '/gases/acetylene', '/gases/carbon-dioxide', '/gases/nitrogen', '/gases/helium',
  '/gases/hydrogen', '/gases/beer-gas', '/industries', '/industries/fabrication',
  '/industries/agriculture', '/industries/automotive-truck-trailer-repair',
  '/industries/hospitality', '/industries/hvac-and-plumbing', '/industries/independent-welders',
  '/forklift-propane', '/services', '/delivery-area', '/pricing', '/safety', '/about', '/contact',
]

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = path === '/' ? '/' : path.replace(/\/$/, '') + '/'
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | CCG-C`, description, url, siteName, locale: 'en_CA', type: 'website',
      images: [{ url: '/social/ccgc-share.png', width: 1200, height: 630, alt: 'Canada Compressed Gas Corporation — Industrial Gases and Forklift Propane' }],
    },
    twitter: { card: 'summary_large_image', title: `${title} | CCG-C`, description, images: ['/social/ccgc-share.png'] },
  }
}
