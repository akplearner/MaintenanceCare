<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# MaintenanceCare — project rules

Read `BUILD.md` before changing anything. Two invariants matter more than the
rest:

1. **No price, service name or description in a page component.** It all lives
   in `content/`, typed, and validated at import time by `content/validate.ts`.
   A price change must be a one-file edit. `pnpm build` fails on a malformed
   content object or a dangling service id.

2. **`scripts/compliance-check.ts` is enforcement, not advice.** It runs in
   `pnpm lint`, in CI, and in the Vercel build command. It fails the build on:
   unlicensed-trade language describing our own services (BUILD.md 9.1), a
   savings claim or a percentage attached to one (9.5), `yearBuilt` becoming
   optional or gaining a default (9.3), any lead-schema key matching
   `/code|lockbox|alarm|pin/i` or a redaction regression (9.4), the footer
   losing the licensed-partner disclosure (9.2), a licensed-trade service
   without its caution callout (6.3), and `AggregateRating`/`Review` structured
   data (8).

   If you genuinely need a banned phrase — the required disclosure names the
   licensed trades — mark it and say why:

   ```ts
   /* compliance-allow-start: negative-context — states what we do NOT perform */
   /* compliance-allow-end */
   ```

Run `pnpm verify` before pushing. `pnpm test:e2e` needs a Chromium; in a
sandbox set `PLAYWRIGHT_CHROMIUM_PATH`.
