import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // The e2e suite drives the dev server over 127.0.0.1; Next blocks
  // cross-origin dev-asset requests by default.
  allowedDevOrigins: ['127.0.0.1', 'localhost'],

  images: {
    // Real job photographs only, served from /public. No remote patterns —
    // nothing on this site should be able to hotlink an external image.
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        // The specimen report is a marketing asset; let a CDN keep it.
        source: '/sample-report.pdf',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400' }],
      },
    ];
  },
};

export default nextConfig;
