import { NextResponse } from 'next/server'
import { db, shopifyOrderFact } from '@repo/db'
import { and, gte, lte, eq, sql } from 'drizzle-orm'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const orgId = searchParams.get('orgId')
  const from = searchParams.get('from') ? new Date(searchParams.get('from')!) : new Date(Date.now() - 90*24*3600*1000)
  const to = searchParams.get('to') ? new Date(searchParams.get('to')!) : new Date()

  if (!orgId) return NextResponse.json({ error: 'missing orgId' }, { status: 400 })

  const rows = await db
    .select({
      date: sql<string>`date_trunc('day', ${shopifyOrderFact.createdAt})::date`,
      revenue: sql<number>`sum(${shopifyOrderFact.totalPrice})`,
      orders: sql<number>`count(*)`,
      aov: sql<number>`sum(${shopifyOrderFact.totalPrice}) / nullif(count(*), 0)`
    })
    .from(shopifyOrderFact)
    .where(and(
      eq(shopifyOrderFact.orgId, orgId),
      gte(shopifyOrderFact.createdAt, from),
      lte(shopifyOrderFact.createdAt, to)
    ))
    .groupBy(sql`1`)
    .orderBy(sql`1`)

  // const rows = await db
  //   .select()
  //   .from(shopifyOrderFact)
  //   .limit(2)

  return NextResponse.json({ rows })
}