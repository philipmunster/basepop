import { db } from './index'
import { org, orgMember, shopifyOrderFact } from './schema'
import { randomUUID } from 'node:crypto'

async function main() {
  // 1 org, 1 owner
  const orgId = randomUUID()
  await db.insert(org).values({ id: orgId, name: 'Demo Org' })
  // Use a random user id for now; Supabase auth comes later
  const userId = randomUUID()
  await db.insert(orgMember).values({ orgId, userId, role: 'owner' })

  // 500 orders over last 90 days
  const now = new Date()
  const shopId = 'demo-shop-1'
  const rows = Array.from({ length: 500 }).map((_, i) => {
    const daysAgo = Math.floor(Math.random() * 90)
    const createdAt = new Date(now)
    createdAt.setDate(now.getDate() - daysAgo)
    const total = +(20 + Math.random() * 180).toFixed(2)

    return {
      orgId,
      orderId: `D-${Date.now()}-${i}`,
      shopId,
      createdAt,
      currency: 'DKK',
      totalPrice: total.toString()
    }
  })
  await db.insert(shopifyOrderFact).values(rows)

  console.log('Seeded orgId:', orgId, 'userId:', userId, 'orders:', rows.length)
}

main().then(() => process.exit(0)).catch((e) => {
  console.error(e)
  process.exit(1)
})
