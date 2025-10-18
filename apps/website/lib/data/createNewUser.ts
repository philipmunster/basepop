import { db } from '@repo/db'
import { user, org, orgMember, orgSettings, userSettings } from '@repo/db/schema'

export async function createNewUser(userId: string, fullName: string, email: string, orgName: string) {
  // return early if users already exists
  const existing = await db.query.user.findFirst({ where: (u, {eq}) => eq(u.id, userId) })
  if (existing) return existing


  const orgId = crypto.randomUUID()

  // TODO:
  // proper error handling in signup flow

  // do everthing in a transaction, such that if one fails it all stops and everything rolls back
  await db.transaction(async (tx) => { // tx is the transaction client
    await tx.insert(user).values({ id: userId, fullName, email })
    await tx.insert(org).values({ id: orgId, name: orgName, createdBy: userId })
    await tx.insert(orgMember).values({ orgId, userId, role: 'admin' })
    await tx.insert(orgSettings).values({
      orgId,
      billingEmail: email
    })
    await tx.insert(userSettings).values({
      userId,
      datePreset: 'Last 30 days',
      timeZone: 'Europe/Copenhagen',
    })
  })
}