import { db, orgMemberSettings, type DatePresetLabel } from '@repo/db'
import { and, eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache';

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

    if (!row) {
      // defaults if user has no saved settings
      return { datePreset: 'Last 30 days', timeZone: 'Europe/Copenhagen' }
    }
    return row
  } catch (e) {
    console.error('getOrgMemberSettings failed', { orgId, userId, error: e })
    // on failure, fall back keep UI working
    return { datePreset: 'Last 30 days', timeZone: 'Europe/Copenhagen' }
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