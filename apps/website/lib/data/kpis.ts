import { unstable_cache } from 'next/cache'
import { db, shopifyOrderFact } from '@repo/db'
import { and, eq, gte, lt, sql } from 'drizzle-orm'
import { reqKpisSchema } from '@repo/zod/reqKpis'
import { ValidationError, DataFetchError } from '@/lib/errors/classes'

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
    // e.message is the string, e.cause is Drizzle error and e.meta is the filters used
    throw new DataFetchError('Error fetching KPI data', {
      cause: e,
      meta: {
        orgId,
        dateFrom: dateRange.from.toISOString(),
        dateTo: dateRange.to.toISOString(),
      },
    })
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

  // validate the filter data using zod
  const parsed = reqKpisSchema.safeParse({ 
    orgId,
    dateRange
  })
  if (!parsed.success) {
    throw new ValidationError('Invalid data filters', parsed.error.format())
  }

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