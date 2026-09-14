import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { checkRateLimit, clientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB each

/**
 * Issues a short-lived client upload token so photos go straight to Vercel
 * Blob rather than through the serverless function. Photos only — a request
 * form is not a file drop.
 */
export async function POST(request: Request): Promise<NextResponse> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'Photo upload is not configured on this deployment.' },
      { status: 503 },
    );
  }

  const ip = clientIp(request.headers);
  const rate = await checkRateLimit(`upload:${ip}`);
  if (!rate.allowed) {
    return NextResponse.json({ error: 'Too many uploads. Try again later.' }, { status: 429 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ALLOWED,
        maximumSizeInBytes: MAX_BYTES,
        addRandomSuffix: true,
        // Lead photos are evidence for a quote, not permanent records.
        validUntil: Date.now() + 10 * 60 * 1000,
        tokenPayload: JSON.stringify({ ip }),
      }),
      onUploadCompleted: async ({ blob }) => {
        console.info('[upload] photo stored', { url: blob.url });
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Upload failed.' },
      { status: 400 },
    );
  }
}
