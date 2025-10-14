import { Filter } from '@/app/appComponents/Filter'
import { Suspense } from 'react'
import { kpisUrl, type KPIsResponse } from '@/lib/kpis';
import TestChart from '@/app/appComponents/ChartTest'
import { requireUser } from '@/lib/supabase/requireUser'
import { resolveOrgId } from '@/lib/supabase/resolveOrgId'
import { getKpisCached } from '@/lib/data/kpis'

// because we call cookies() (via helper functions) we mark as dynamic
export const dynamic = 'force-dynamic'

type PageProps = {
  searchParams: 
  | Record<string, string | string[] | undefined>
  | Promise<Record<string, string | string[] | undefined>>
}

const filters = [
  {
    label: 'Market',
    options: ['Denmark', 'Sweden', 'AA', 'Norway', 'Finland', 'Germany', 'Holland', 'Belgium', 'Poland', 'Polest', 'Palc', 'Polist']
  },
  {
    label: 'Customer type',
    options: ['New customer', 'Existing customer']
  },
  {
    label: 'Collection',
    options: ['Summer', 'Winter', 'Archive']
  },
]

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

export default async function ShopifyProductPage(props: PageProps) {
  const user = await requireUser()
  const orgId = await resolveOrgId(user.id)

  console.log(user, orgId)

  const searchParams = 
    props.searchParams instanceof Promise ? await props.searchParams : props.searchParams
  const from = (searchParams.dateFrom as string) ?? '2025-07-17'
  const to = (searchParams.dateTo as string) ?? '2025-07-20'

  const rows = await getKpisCached({
    orgId,
    fromISO: from,
    toISO: to,
  })

  return (
    <Suspense fallback={null}>
      <div>
         <Filter filters={filters} />

         {/* dashbord */}
         <div className='p-5'>
          <TestChart chartData={rows}/>
         </div>
      </div>
    </Suspense>
  )
}