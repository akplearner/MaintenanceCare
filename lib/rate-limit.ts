import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let limiter: Ratelimit | null = null;

function getLimiter(): Ratelimit | null {
  if (limiter) return limiter;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    analytics: true,
    prefix: 'mc:lead',
  });
  return limiter;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  reset: number;
}

/** 5 submissions per IP per hour. Open when Redis is not configured. */
export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  const rl = getLimiter();
  if (!rl) return { allowed: true, remaining: 5, reset: 0 };

  try {
    const { success, remaining, reset } = await rl.limit(ip);
    return { allowed: success, remaining, reset };
  } catch {
    // A Redis outage must not block a real lead.
    return { allowed: true, remaining: 0, reset: 0 };
  }
}

/** Best-effort client IP behind Vercel's proxy. */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]!.trim();
  return headers.get('x-real-ip') ?? '0.0.0.0';
}
