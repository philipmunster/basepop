import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema'

export * from './datePresets'

config({ path: '.env' }); // or .env.local

const client = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
  max: 1,
  prepare: false
});
export const db = drizzle(client, { schema });

export * from './schema'