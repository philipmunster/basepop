import { unstable_cache } from 'next/cache'
import { db, shopifyOrderFact } from '@repo/db'
import { and, eq, gte, lt, sql } from 'drizzle-orm'

async function rawGetKpis({ 
  orgId,
  dateRange
}: { 
  orgId: string;
  dateRange: {
    from: Date
    to: Date
  }
}) {
  console.log('Cache not hit')

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
        gte(shopifyOrderFact.createdAt, dateRange.from),
        lt(shopifyOrderFact.createdAt, dateRange.to)
      ))
      .groupBy(sql`1`)
      .orderBy(sql`1`)
    return rows
  } catch(e) {
    console.error(`rawGetKpis failed. OrgId: ${orgId}, Error: ${e}`)
    throw new Error('Error with fetching data')
  }
}

export async function getKpisCached({ 
  orgId,
  dateRange
}: { 
  orgId: string;
  dateRange: {
    from: Date
    to: Date
  }
}) {

  const keyParts = [
    'kpis',
    orgId,
    dateRange.from.toISOString().slice(0, 10),
    dateRange.to.toISOString().slice(0, 10),
  ]

  const cachedFn = unstable_cache(
    async () => rawGetKpis({orgId, dateRange}),
    keyParts,
    {
      tags: ['kpis', `kpis:org:${orgId}`],
    }
  )

  const isDev = process.env.NODE_ENV === 'development'

  if (isDev) {
    return rawGetKpis({orgId, dateRange})
  } else {
    return cachedFn()
  }
}