import { db, orgMemberSettings, type DatePresetLabel } from '@repo/db'
import { and, eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { DataFetchError } from '@/lib/errors/classes';

// this function is for example called by getDateRange() which is called by the /dashboard layout
export async function getOrgMemberSettings(orgId: string, userId: string): Promise<{ datePreset: DatePresetLabel; timeZone: string }> {
  try {
    const row = await db
      .select({
        datePreset: orgMemberSettings.datePreset,
        timeZone: orgMemberSettings.timeZone,
      })
      .from(orgMemberSettings)
      .where(and(
        eq(orgMemberSettings.orgId, orgId),
        eq(orgMemberSettings.userId, userId)
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
        orgId,
        userId
      }
    })
  }
}

export async function getOrgMemberSettingsCached(orgId: string, userId: string): Promise<{ datePreset: DatePresetLabel; timeZone: string }> {
  const keyparts = [
    'getOrgMemberSettings',
    orgId,
    userId,
  ]

  const cacheFn = unstable_cache(
    async () => getOrgMemberSettings(orgId, userId),
    keyparts,
    {
      tags: ['getOrgMemberSettings', `getOrgMemberSettings:orgId:${orgId}:userId:${userId}`],
    }
  )

  return cacheFn()
}