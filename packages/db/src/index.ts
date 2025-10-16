import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export * from './datePresets'

config({ path: '.env' }); // or .env.local

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);

export * from './schema'