import { db, user, type DatePresetLabel } from '@repo/db'
import { and, eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { DataFetchError } from '@/lib/errors/classes';

// this function is for example called by getDateRange() which is called by the /dashboard layout
export async function getUserInfo(userId: string) {
  try {
    const row = await db
      .select()
      .from(user)
      .where(eq(user.id, userId))
      .limit(1)
      .then(r => r[0])

    if (!row) { // return default values if user has no saved settings (shouldn't happen cause default value is set in schema)
      return null
    }
    return row
  } catch (e) { // if an actual connection error with the DB ocurred
    throw new DataFetchError('Error fetching user info', {
      cause: e,
      meta: {
        userId
      }
    })
  }
}

export async function getUserInfoCached(userId: string) {
  const keyparts = [
    'getUserInfo',
    userId,
  ]

  const cacheFn = unstable_cache(
    async () => getUserInfo(userId),
    keyparts,
    {
      tags: ['getUserInfo', `getUserInfo:userId:${userId}`],
    }
  )

  return cacheFn()
}