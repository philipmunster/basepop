import type { DatePresetLabel } from '@repo/db'

const clone = (d: Date) => new Date(d.getTime())
const startOfDay = (d: Date) => { const x = clone(d); x.setHours(0,0,0,0); return x }
const endOfDay   = (d: Date) => { const x = clone(d); x.setHours(23,59,59,999); return x }
const addDays    = (d: Date, n: number) => { const x = clone(d); x.setDate(x.getDate() + n); return x }
const addMonths  = (d: Date, n: number) => { const x = clone(d); x.setMonth(x.getMonth() + n); return x }
const addYears   = (d: Date, n: number) => { const x = clone(d); x.setFullYear(x.getFullYear() + n); return x }

const startOfWeek = (d: Date, weekStartsOn = 1) => {
  const x = startOfDay(d)
  const day = x.getDay() // 0..6
  const diff = (day === 0 ? 7 : day) - weekStartsOn
  return addDays(x, -diff)
}
const endOfWeek = (d: Date, weekStartsOn = 1) => endOfDay(addDays(startOfWeek(d, weekStartsOn), 6))

const startOfMonth = (d: Date) => startOfDay(new Date(d.getFullYear(), d.getMonth(), 1))
const endOfMonth   = (d: Date) => endOfDay(new Date(d.getFullYear(), d.getMonth() + 1, 0))

const quarterIndex = (d: Date) => Math.floor(d.getMonth() / 3)
const startOfQuarter = (d: Date) => startOfDay(new Date(d.getFullYear(), quarterIndex(d) * 3, 1))
const endOfQuarter   = (d: Date) => endOfDay(new Date(d.getFullYear(), quarterIndex(d) * 3 + 3, 0))

const startOfYear = (d: Date) => startOfDay(new Date(d.getFullYear(), 0, 1))
const endOfYear   = (d: Date) => endOfDay(new Date(d.getFullYear(), 11, 31))

const lastNDays = (n: number, now: Date) => {
  const today = startOfDay(now)
  const yesterday = addDays(today, -1)
  return {
    from: startOfDay(addDays(yesterday, -(n - 1))),
    to: endOfDay(yesterday),
  }
}

export function rangeFromDatePreset(preset: DatePresetLabel, now: Date = new Date()): { from: Date; to: Date } {
  const today = startOfDay(now)
  const yesterday = addDays(today, -1)
  const yesterdayLastYear = addYears(yesterday, -1)

  switch (preset) {
    case 'Yesterday': return lastNDays(1, now)
    case 'Last 7 days': return lastNDays(7, now)
    case 'Last 30 days': return lastNDays(30, now)
    case 'Last 60 days': return lastNDays(60, now)
    case 'Last 90 days': return lastNDays(90, now)
    case 'Last 365 days': return lastNDays(365, now)

    case 'This week to yesterday': return { from: startOfWeek(now), to: endOfDay(yesterday) }
    case 'Last week': return { from: startOfWeek(addDays(now, -7)), to: endOfWeek(addDays(now, -7)) }
    case '2 weeks ago': return { from: startOfWeek(addDays(now, -14)), to: endOfWeek(addDays(now, -14)) }
    case 'This week last year': return { from: startOfWeek(addYears(now, -1)), to: endOfWeek(addYears(now, -1)) }
    case 'This week to yesterday last year': return { from: startOfWeek(yesterdayLastYear), to: endOfDay(yesterdayLastYear) }

    case 'This month to yesterday': return { from: startOfMonth(now), to: endOfDay(yesterday) }
    case 'Last month': return { from: startOfMonth(addMonths(now, -1)), to: endOfMonth(addMonths(now, -1)) }
    case '2 months ago': return { from: startOfMonth(addMonths(now, -2)), to: endOfMonth(addMonths(now, -2)) }
    case 'This month last year': return { from: startOfMonth(addYears(now, -1)), to: endOfMonth(addYears(now, -1)) }
    case 'This month to yesterday last year': return { from: startOfMonth(addYears(now, -1)), to: endOfDay(addYears(yesterday, -1)) }

    case 'This quarter to yesterday': return { from: startOfQuarter(now), to: endOfDay(yesterday) }
    case 'Last quarter': return { from: startOfQuarter(addMonths(now, -3)), to: endOfQuarter(addMonths(now, -3)) }
    case '2 quarters ago': return { from: startOfQuarter(addMonths(now, -6)), to: endOfQuarter(addMonths(now, -6)) }
    case 'This quarter last year': return { from: startOfQuarter(addYears(now, -1)), to: endOfQuarter(addYears(now, -1)) }
    case 'This quarter to yesterday last year': return { from: startOfQuarter(addYears(now, -1)), to: endOfDay(addYears(yesterday, -1)) }

    case 'This year to yesterday': return { from: startOfYear(now), to: endOfDay(yesterday) }
    case 'Last year': return { from: startOfYear(addYears(now, -1)), to: endOfYear(addYears(now, -1)) }
    case '2 years ago': return { from: startOfYear(addYears(now, -2)), to: endOfYear(addYears(now, -2)) }
    case 'Last year to yesterday': return { from: startOfYear(addYears(now, -1)), to: endOfDay(addYears(yesterday, -1)) }

    default: return lastNDays(30, now) // safe fallback
  }
}