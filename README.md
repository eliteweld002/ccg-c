# Canada Compressed Gas Corporation

Industrial gases and forklift propane website for Ontario, Canada.

## Deploy on Vercel

Import this repository into Vercel. The included `vercel.json` selects the build command and output directory automatically.

Set `RESEND_API_KEY` in Vercel and redeploy. Verify `ccgcorporation.ca` in Resend. Form leads are sent to `sales@ccgcorporation.ca`; customers see a thank-you message after a successful submission. Customer email is used as Reply-To.

See `docs/vercel-launch.md` for full setup and verification details.

## Development

- `pnpm install`
- `pnpm dev`
- `pnpm run check`
- `pnpm exec tsc --noEmit`

The standard build is static for Sites. `pnpm run build:vercel` additionally enables the standalone Resend function for Vercel.
