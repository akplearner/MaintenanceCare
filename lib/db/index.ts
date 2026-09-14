import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

export { schema };

let cached: ReturnType<typeof drizzle<typeof schema>> | null = null;

/**
 * Lazily constructed so a build without DATABASE_URL still succeeds — the
 * marketing pages are static and must not depend on a database being
 * reachable at build time.
 */
export function getDb() {
  if (cached) return cached;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Every lead must be persisted before notification — refusing to run without it.',
    );
  }

  cached = drizzle(neon(url), { schema });
  return cached;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
