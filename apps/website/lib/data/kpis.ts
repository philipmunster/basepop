
import { unstable_cache } from 'next/cache'
import { db, shopifyOrderFact } from '@repo/db'
import { and, eq, gte, lt, sql } from 'drizzle-orm'

async function rawGetKpis(orgId: string, from: Date, to: Date) {
  try {
    const rows = await db
      .select({
        date: sql<string>`date_trunc('day', ${shopifyOrderFact.createdAt})::date`,
        revenue: sql<number>`sum(${shopifyOrderFact.totalPrice})`,
        orders: sql<number>`count(*)`,
        aov: sql<number>`sum(${shopifyOrderFact.totalPrice}) / nullif(count(*), 0)`,
      })
      .from(shopifyOrderFact)
      .where(and(
        eq(shopifyOrderFact.orgId, orgId),
        gte(shopifyOrderFact.createdAt, from),
        lt(shopifyOrderFact.createdAt, to)
      ))
      .groupBy(sql`1`)
      .orderBy(sql`1`)
    return rows
  } catch(e) {
    console.error(`rawGetKpis failed. OrgId: ${orgId}, Error: ${e}`)
    throw new Error('Error with fetching data')
  }
}

/**
 * Returns KPIs with caching keyed by org + date range.
 * Adds a global tag 'kpis' and a per-org tag for selective invalidation.
 */
export async function getKpisCached({ orgId, fromISO, toISO }: 
  { orgId: string; fromISO: string; toISO: string }
) {
  const from = new Date(fromISO)
  const toInclusive = new Date(toISO)
  toInclusive.setDate(toInclusive.getDate() + 1) // make upper bound exclusive

  const keyParts = [
    'kpis',
    orgId,
    from.toISOString().slice(0, 10),
    toInclusive.toISOString().slice(0, 10),
  ]

  const cachedFn = unstable_cache(
    async () => rawGetKpis(orgId, from, toInclusive),
    keyParts,
    {
      tags: ['kpis', `kpis:org:${orgId}`],
    }
  )

  return cachedFn()
}