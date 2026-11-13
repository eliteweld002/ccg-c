import type { MetadataRoute } from 'next'
import { siteOrigin, sitePaths } from '@/lib/site-metadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePaths.map(path => ({ url: siteOrigin + (path === '/' ? '/' : path + '/') }))
}
