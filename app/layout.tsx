import { Analytics } from '@vercel/analytics/next'
import { Archivo } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { pageMetadata, siteOrigin, siteName, siteShortName, homeTitle, homeDescription } from '@/lib/site-metadata'
import { siteGraph } from '@/lib/schema'
import { JsonLd } from '@/components/json-ld'
import './globals.css'

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' })

// Optional search-engine ownership tags: set in the hosting environment, never hard-coded.
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION

export const metadata: Metadata = {
  ...pageMetadata('/', homeTitle, homeDescription),
  metadataBase: new URL(siteOrigin),
  title: { default: `${siteName} | ${homeTitle}`, template: `%s | ${siteShortName}` },
  applicationName: siteName,
  authors: [{ name: siteName, url: siteOrigin }],
  creator: siteName,
  publisher: siteName,
  category: 'Industrial gases',
  formatDetection: { telephone: true, email: true, address: true },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  ...(googleVerification || bingVerification ? { verification: { ...(googleVerification ? { google: googleVerification } : {}), ...(bingVerification ? { other: { 'msvalidate.01': bingVerification } } : {}) } } : {}),
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
    <html lang="en-CA">
      <body className={`${archivo.variable} antialiased`}>
        <JsonLd data={siteGraph()} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
