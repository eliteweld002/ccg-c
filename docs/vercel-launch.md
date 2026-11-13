# Launch configuration

The existing layout, logo, 25 pages and static Sites deployment are retained.
`vercel.json` builds those pages to `out/` and adds the standalone Node function
`api/contact.mjs`. No Next API route is placed inside the static export.

## Vercel

1. Deploy this repository with its included `vercel.json` (Framework: Other).
   The build command is `pnpm run build:vercel`; output is `out`.
2. Add **RESEND_API_KEY** as a server environment variable in Vercel for
   Production (and Preview if needed), then redeploy.
3. Verify **ccgcorporation.ca** in Resend, including its required DNS records.
   The key must have permission to send for that verified domain.
4. Submit a real enquiry on the deployed Vercel site and confirm receipt in
   **sales@ccgcorporation.ca** before announcing the launch.

The sender and destination are both `sales@ccgcorporation.ca`. Reply-To is the
customer's validated email address. The browser never receives the Resend key.
No additional email environment variables are required. Never use a
`NEXT_PUBLIC_` prefix for the API key.

The Vercel build enables online submission automatically. Missing credentials,
provider errors and timeouts preserve the entered details and offer an email
fallback. Success is displayed only after Resend returns an accepted email ID;
acceptance is not a guarantee of inbox delivery.

The static Sites publication cannot execute a Vercel function. It deliberately
uses the working email preparation/copy flow and does not call a nonexistent
API endpoint. Vercel is the production target for automatic submission.

Run `pnpm run check` and `pnpm exec tsc --noEmit` before deployment. The link
check renders every page and verifies internal destinations, anchors, local
images and SDS form links. `node scripts/check-site-links.mjs --export` also
checks exported HTML when a local build is available.

The API tests use an injected fake transport; they send no email and require no
key. Live provider/domain verification and inbox delivery remain unverified
until steps 2–4 are complete.
