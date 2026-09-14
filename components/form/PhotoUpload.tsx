'use client';

import { upload } from '@vercel/blob/client';
import { useCallback, useRef, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';
import { cn } from '@/lib/cn';

const MAX_PHOTOS = 6;
const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPT = 'image/jpeg,image/png,image/webp,image/heic,image/heif';

export interface UploadedPhoto {
  url: string;
  name: string;
}

/**
 * Client-side upload straight to Vercel Blob. Photos make a quote materially
 * more accurate, so this stays cheap and forgiving: failures are reported per
 * file and never block the rest of the form.
 */
export function PhotoUpload({
  photos,
  onChange,
  disabled,
}: {
  photos: UploadedPhoto[];
  onChange: (next: UploadedPhoto[]) => void;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState('');

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;

      const room = MAX_PHOTOS - photos.length;
      const files = Array.from(fileList).slice(0, Math.max(room, 0));
      const nextErrors: string[] = [];

      if (fileList.length > room) {
        nextErrors.push(`Up to ${MAX_PHOTOS} photos — the extra ones were not added.`);
      }

      setBusy(true);
      setErrors(nextErrors);
      const added: UploadedPhoto[] = [];

      for (const [i, file] of files.entries()) {
        if (file.size > MAX_BYTES) {
          nextErrors.push(`${file.name} is over 10 MB.`);
          continue;
        }
        setStatus(`Uploading ${i + 1} of ${files.length}…`);
        try {
          const blob = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: '/api/upload',
          });
          added.push({ url: blob.url, name: file.name });
        } catch (err) {
          nextErrors.push(
            `${file.name} did not upload${err instanceof Error ? ` — ${err.message}` : ''}. You can send it by email instead.`,
          );
        }
      }

      onChange([...photos, ...added]);
      setErrors(nextErrors);
      setStatus(added.length > 0 ? `${added.length} photo(s) attached.` : '');
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    },
    [photos, onChange],
  );

  const full = photos.length >= MAX_PHOTOS;

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        multiple
        className="sr-only"
        id="photo-input"
        disabled={disabled || busy || full}
        onChange={(e) => void handleFiles(e.target.files)}
      />
      <label
        htmlFor="photo-input"
        className={cn(
          'inline-flex min-h-[2.75rem] cursor-pointer items-center gap-2 border border-soil px-5 py-2.5 text-base font-medium text-soil transition-colors',
          (disabled || busy || full) && 'cursor-not-allowed opacity-60',
          !disabled && !busy && !full && 'hover:bg-soil hover:text-paper',
        )}
      >
        <ImagePlus aria-hidden size={17} strokeWidth={1.5} />
        {busy ? 'Uploading…' : full ? 'Six photos attached' : 'Add photos'}
      </label>

      {busy ? (
        <div
          aria-hidden
          className="progress-indeterminate relative mt-3 h-[3px] w-full max-w-xs overflow-hidden bg-steel-light"
        />
      ) : null}

      <p aria-live="polite" className="sr-only">
        {status}
      </p>

      {photos.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {photos.map((p) => (
            <li
              key={p.url}
              className="flex items-center gap-2 border bg-paper-raised py-1.5 pr-1.5 pl-3 text-sm"
            >
              <span className="max-w-[12rem] truncate text-steel">{p.name}</span>
              <button
                type="button"
                onClick={() => onChange(photos.filter((x) => x.url !== p.url))}
                className="inline-flex h-7 w-7 items-center justify-center border border-transparent text-steel hover:border-steel-light hover:text-flag"
              >
                <span className="sr-only">Remove {p.name}</span>
                <X aria-hidden size={14} strokeWidth={1.75} />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {errors.length > 0 ? (
        <ul className="mt-2 space-y-1">
          {errors.map((e) => (
            <li key={e} className="text-sm text-flag">
              {e}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
