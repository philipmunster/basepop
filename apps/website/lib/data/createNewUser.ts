import { db } from '@repo/db'
import { user, userSettings } from '@repo/db/schema'
import { describeYouOptionsType } from '@repo/db'
import { DataInsertError } from '@/lib/errors/classes'

export async function createNewUser(userId: string, fullName: string, email: string, describe_you: describeYouOptionsType | undefined) {
  // return early if users already exists
  const existing = await db.query.user.findFirst({ where: (u, {eq}) => eq(u.id, userId) })
  if (existing) return existing

  // TODO:
  // proper error handling in signup flow

  // do everthing in a transaction, such that if one fails it all stops and everything rolls back
  try {
    await db.transaction(async (tx) => { // tx is the transaction client
      await tx.insert(user).values({id: userId, fullName, email, selfDescription: describe_you})
      await tx.insert(userSettings).values({userId})
    })
  } catch(err) {
    throw new DataInsertError('Error ocurred when creating a new user', {
      cause: err,
      meta: {
        userId
      },
    })
  }
}