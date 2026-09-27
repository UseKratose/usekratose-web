# UseKratose Web

The public UseKratose landing application and its request-scoped backend-for-frontend API routes.

## Development

```bash
pnpm install
pnpm dev
```

The independent dashboard is served through the `/dashboard` rewrite configured by `DASHBOARD_ORIGIN`.

## Vercel

Set the project root directory to `apps/web`. The app-level `vercel.json` installs from the workspace root and builds only `@usekratose/web`.
