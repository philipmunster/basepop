import { db, userSettings, type DatePresetLabel } from '@repo/db'
import { and, eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { DataFetchError } from '@/lib/errors/classes';

// this function is for example called by getDateRange() which is called by the /dashboard layout
export async function getUserSettings(userId: string): Promise<{ datePreset: DatePresetLabel; timeZone: string }> {
  try {
    const row = await db
      .select({
        datePreset: userSettings.datePreset,
        timeZone: userSettings.timeZone,
      })
      .from(userSettings)
      .where(and(
        eq(userSettings.userId, userId)
      ))
      .limit(1)
      .then(r => r[0])

    if (!row) { // return default values if user has no saved settings (shouldn't happen cause default value is set in schema)
      return { datePreset: 'Last 30 days', timeZone: 'Europe/Copenhagen' }
    }
    return row
  } catch (e) { // if an actual connection error with the DB ocurred
    throw new DataFetchError('Error fetching org memeber settings data', {
      cause: e,
      meta: {
        userId
      }
    })
  }
}

export async function getUserSettingsCached(userId: string): Promise<{ datePreset: DatePresetLabel; timeZone: string }> {
  const keyparts = [
    'getUserSettings',
    userId,
  ]

  const cacheFn = unstable_cache(
    async () => getUserSettings(userId),
    keyparts,
    {
      tags: ['getUserSettings', `getUserSettings:userId:${userId}`],
    }
  )

  return cacheFn()
}