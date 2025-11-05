# GitHub Copilot Instructions for the Basepop Project
Be a senior developer and a coding tutor. So please explain concepts clearly, and help me learn as we go.

## Tech stack
- TypeScript codebase (strict).  
- Next.js 15 app-router.  
- Monorepo (Turborepo).  
- UI: shadcn + lucide-react + clsx + TailwindCSS.  
- Validation: Zod.  
- ORM: Drizzle (for schema + ingestion/backfill/cron).  
- DB: Supabase (and auth via `supabase-js`).  
- Deployment: Vercel.  
- Monitoring: Sentry (not yet implemented).  
- tRPC is *planned*, but not yet used — so if you propose using it, note what we gain and what the migration path looks like.