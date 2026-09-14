import type { MetadataRoute } from 'next';
import { absolute } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The thanks page carries a reference in the query string and has no
        // search value; the API routes are not content.
        disallow: ['/api/', '/request/thanks'],
      },
    ],
    sitemap: absolute('/sitemap.xml'),
    host: absolute('/'),
  };
}
