import { Filter } from '@/app/appComponents/Filter'
import { Suspense } from 'react'
import TestChart from '@/app/appComponents/ChartTest'
import { requireUser } from '@/lib/supabase/requireUser'
import { resolveOrgId } from '@/lib/supabase/resolveOrgId'
import { getKpisCached } from '@/lib/data/kpis'
import ErrorCard from '@/app/appComponents/ErrorCard'
import { getDateRange } from '@/lib/data/getDateRange'

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
  try {
    const user = await requireUser() // throws error on failure (should not happen since middleware would redirect to /login)
    const orgId = await resolveOrgId(user.id) // throws error on failure 

    const searchParams = 
      props.searchParams instanceof Promise ? await props.searchParams : props.searchParams

    // gets the dateRange from searchParams if available, otherwise from DB default dateRange settings
    const { dateRange } = await getDateRange(orgId, user.id, searchParams)

    const rows = await getKpisCached({
      orgId,
      dateRange
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
  } catch(e: unknown) {
    console.error('ShopifyProductPage', e)
    const message = e instanceof Error ? e.message : 'An unexpected error ocurred when fetching the data'
    return <ErrorCard>{message}</ErrorCard>
  }
}