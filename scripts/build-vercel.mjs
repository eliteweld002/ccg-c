import { spawnSync } from 'node:child_process'

// Keep the Sites build static. Only Vercel builds enable its /api/contact
// function in the browser; no secret is copied into the public environment.
const result = spawnSync('pnpm', ['run', 'build'], {
  stdio: 'inherit', env: { ...process.env, CONTACT_FORM_API: 'true' },
})
process.exit(result.status ?? 1)
