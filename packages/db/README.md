# @repo/db

A simple TypeScript-first database package using drizzle-orm and postgres-js.

This package is set up like a typical TS library in a monorepo (similar to `@repo/ui`):

- TS sources live in `src/`
- Extension-less relative imports (e.g. `import { db } from './index'`)
- No `type: module` required; we rely on TypeScript + tsx to run `.ts` directly
- Package `exports` map points to the TypeScript sources for editor/dev-time DX

## Prerequisites

- Node 18+
- pnpm 9+ installed globally
- A Postgres connection string in `packages/db/.env`:

```sh
DATABASE_URL=postgres://user:pass@host:5432/db
```

## Commands

- Type check this package:

```sh
pnpm --filter @repo/db tsc
```

- Generate migrations (drizzle):

```sh
pnpm --filter @repo/db generate
```

- Run migrations (drizzle):

```sh
pnpm --filter @repo/db migrate
```

- Seed demo data:

```sh
pnpm --filter @repo/db seed
```

This will create a demo org, owner member, and 500 orders across the last 90 days.

## Notes on module setup

We use `"module": "ESNext"` and `"moduleResolution": "bundler"` in `tsconfig.json`. This matches how UI packages are typically authored: you write clean TypeScript with extension-less imports, and tools like tsx or bundlers handle resolution at runtime/build time. It avoids the confusing “.js in .ts files” requirement of Node’s strict ESM loader while keeping the codebase modern and portable.
