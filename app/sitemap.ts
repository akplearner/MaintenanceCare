import type { MetadataRoute } from 'next';
import { divisions } from '@/content/divisions';
import { areas } from '@/content/areas';
import { absolute } from '@/lib/seo';

/**
 * Generated from the content data, not hand-maintained — adding a division or
 * a service area is a one-file edit and the sitemap follows.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/plans', priority: 0.95, changeFrequency: 'monthly' },
    { path: '/for/property-managers', priority: 0.95, changeFrequency: 'monthly' },
    { path: '/for/investors', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/for/short-term-rentals', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/sample-report', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/service-area', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/request', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/about', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/legal/licensed-partners', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/legal/terms', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/legal/privacy', priority: 0.3, changeFrequency: 'yearly' },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: absolute(r.path),
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...divisions.map((d) => ({
      url: absolute(`/services/${d.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      // Divisions that are not running yet should not compete with live ones.
      priority: d.fullyLaunched ? 0.85 : 0.3,
    })),
    ...areas.map((a) => ({
      url: absolute(`/service-area/${a.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  ];
}
