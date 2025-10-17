import { getOrgMemberSettingsCached } from '@/lib/data/memberSettings'
import { rangeFromDatePreset } from '@/lib/utils/rangeFromDatePreset'
import { DataFetchError } from '@/lib/errors/classes'

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
    // try to fetch the data of the DB
    try {      
      const { datePreset } = await getOrgMemberSettingsCached(orgId, userId)
      const settingsDefaultDateRange = rangeFromDatePreset(datePreset)
      label =  datePreset
      from = settingsDefaultDateRange.from
      toInclusive = settingsDefaultDateRange.to
    } catch(e) { // if it fails we console warn and set a fallback instead (the dataFetchError won't bubble up to the page.tsx)
      if (e instanceof DataFetchError) {
        console.warn("Fetching user default daterange settings from DB failed", {
          error: e.message, // what I typed in the function when throwing error (show to user)
          name: e.name, // name of the error class used i.e. DataFetchError
          cause: e.cause instanceof Error ? e.cause.message : e.cause, // Drizzle error cause
          meta: e.meta, // the filters used in the data fetch
        }) 
      } else {
        console.warn('Unexpected error with fetching user default daterange settings from DB')
      }
      // set fallback settings no matter what
      const datePreset = 'Last 30 days' // fallback value
      const settingsDefaultDateRange = rangeFromDatePreset(datePreset)
      label =  datePreset
      from = settingsDefaultDateRange.from
      toInclusive = settingsDefaultDateRange.to
    }
  }

  return { 
    label: label, 
    dateRange: {
      from: from, 
      to: toInclusive 
    }
  }
}