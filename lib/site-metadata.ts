import type { Metadata } from 'next'

// Canonical production origin. Override with NEXT_PUBLIC_SITE_URL (no trailing slash)
// if the live domain differs. Never derive this from a preview/hosting URL: it feeds
// canonical tags, the sitemap, Open Graph URLs and structured data.
export const siteOrigin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ccgcorporation.ca').replace(/\/$/, '')
export const siteName = 'Canada Compressed Gas Corporation'
export const siteShortName = 'CCG-C'
export const homeTitle = 'Industrial & Welding Gas Supplier in Ontario'
export const homeDescription = 'Canada Compressed Gas Corporation supplies welding gases, industrial gases and forklift propane cylinders in Ontario. Request a written quote today.'
export const sitePaths = [
  '/', '/gases', '/gases/argon', '/gases/argon-co2-75-25', '/gases/oxygen',
  '/gases/acetylene', '/gases/carbon-dioxide', '/gases/nitrogen', '/gases/helium',
  '/gases/hydrogen', '/gases/beer-gas', '/industries', '/industries/fabrication',
  '/industries/agriculture', '/industries/automotive-truck-trailer-repair',
  '/industries/hospitality', '/industries/hvac-and-plumbing', '/industries/independent-welders',
  '/forklift-propane', '/services', '/delivery-area', '/pricing', '/safety', '/about', '/contact',
]

export function pageUrl(path: string) {
  return siteOrigin + (path === '/' ? '/' : path.replace(/\/$/, '') + '/')
}

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = path === '/' ? '/' : path.replace(/\/$/, '') + '/'
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteShortName}`, description, url, siteName, locale: 'en_CA', type: 'website',
      images: [{ url: '/social/ccgc-share.png', width: 1200, height: 630, alt: 'Canada Compressed Gas Corporation — Industrial Gases and Forklift Propane' }],
    },
    twitter: { card: 'summary_large_image', title: `${title} | ${siteShortName}`, description, images: ['/social/ccgc-share.png'] },
  }
}
