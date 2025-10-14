import { unstable_cache } from 'next/cache'
import { db, shopifyOrderFact } from '@repo/db'
import { and, eq, gte, lt, sql } from 'drizzle-orm'

async function rawGetKpis(orgId: string, from: Date, to: Date) {
  // const dateFrom = new Date(from)
  // const dateTo = new Date(to)
  // to.setDate(to.getDate() + 1) // move to one day to include the ending day

  return db
    .select({
      date: sql<string>`date_trunc('day', ${shopifyOrderFact.createdAt})::date`,
      revenue: sql<number>`sum(${shopifyOrderFact.totalPrice})`,
      orders: sql<number>`count(*)`,
      aov: sql<number>`sum(${shopifyOrderFact.totalPrice}) / nullif(count(*), 0)`,
    })
    .from(shopifyOrderFact)
    .where(and(
      eq (shopifyOrderFact.orgId, orgId),
      gte(shopifyOrderFact.createdAt, from),
      lt(shopifyOrderFact.createdAt, to)
    ))
    .groupBy(sql`1`)
    .orderBy(sql`1`)
}

/** Cache by (orgId, from, to). Tag so cron can revalidate. */
export const getKpisCached = unstable_cache(
  async ({ orgId, fromISO, toISO }: { orgId: string; fromISO: string; toISO: string }) => {
    const from = new Date(fromISO)
    const to = new Date(toISO)
    to.setDate(to.getDate() + 1)
    return rawGetKpis(orgId, from, to)
  },
  ['kpis'],                     // base cache key
  { tags: ['kpis'] }            
)