import { getOrgMemberSettingsCached } from '@/lib/data/getOrgMemberSettings'
import { rangeFromDatePreset } from '@/lib/data/rangeFromDatePreset'

// gets the dateRange from searchParams if available, otherwise from DB default dateRange settings
export async function getDateRange(orgId: string, userId: string, searchParams: Record<string, string | string[] | undefined> | undefined = undefined) {
  const fromISO = searchParams?.dateFrom as string || undefined
  const toISO = searchParams?.dateTo as string || undefined

  let from: Date
  let toInclusive: Date
  let label: string | undefined = undefined

  // if dateRange from searchParams are available use them
  if (fromISO && toISO) {
    from = new Date(fromISO)
    toInclusive = new Date(toISO)
    toInclusive.setDate(toInclusive.getDate() + 1)
  } else { // else get the org members default dateRange settings from DB
    const { datePreset } = await getOrgMemberSettingsCached(orgId, userId)
    const settingsDefaultDateRange = rangeFromDatePreset(datePreset)
    label =  datePreset
    from = settingsDefaultDateRange.from
    toInclusive = settingsDefaultDateRange.to
  }

  return { 
    label: label, 
    dateRange: {
      from: from, 
      to: toInclusive 
    }
  }
}