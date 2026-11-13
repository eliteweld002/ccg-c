import { Analytics } from '@vercel/analytics/next'
import { Archivo } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { pageMetadata, siteOrigin } from '@/lib/site-metadata'
import { contactPhoneHref, contactStreet, contactLocality, contactPostalCode } from '@/lib/contact-options'
import './globals.css'

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' })

export const metadata: Metadata = {
  ...pageMetadata('/', 'Industrial Gases & Forklift Propane', 'Explore industrial gases, cylinder supply and forklift propane with Canada Compressed Gas Corporation in Ontario, Canada. Request a written quote.'),
  metadataBase: new URL(siteOrigin),
  title: { default: 'Canada Compressed Gas Corporation | Industrial Gases & Forklift Propane', template: '%s | Canada Compressed Gas' },
  icons: {
    icon: [
      {
        url: '/brand-icon-32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    shortcut: '/brand-icon-32.png',
    apple: '/brand-apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#00264D',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: 'Canada Compressed Gas Corporation', url: siteOrigin, logo: siteOrigin + '/images/ccg-c-logo-compact.webp', email: 'sales@ccgcorporation.ca', telephone: contactPhoneHref.slice(4), address: { '@type': 'PostalAddress', streetAddress: contactStreet, addressLocality: contactLocality, postalCode: contactPostalCode, addressRegion: 'Ontario', addressCountry: 'CA' } }) }}/>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
