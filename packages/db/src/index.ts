// the client exported here should only be used for ETL, cron jobs, backfills ect. Never use for user initiated DB requests.
// otherwise use direct supabase API connect
// THIS CLIENT BYPASSES RLS
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema'

export * from './datePresets'
export * from './describeYouOptions'
export * from './describeCompanyOptions'
export * from './dataSourceIds'
export * from './supabase.types'

config({ path: '.env' }); // or .env.local

const client = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
  max: 1,
  prepare: false
});
export const db = drizzle(client, { schema });

export * from './schema'