export type KPIRow = {
  date: string
  revenue: number
  orders: number
  aov: number
}

export type KPIsResponse = { rows: KPIRow[] }


export function kpisUrl(base: string, orgId: string, from?: string, to?: string) {
  const url = new URL('/api/kpis', base)
  url.searchParams.set('orgId', orgId)
  if (from) url.searchParams.set('from', from)
  if (to) url.searchParams.set('to', to)
  return url.toString()
}