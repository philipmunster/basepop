import { Filter } from '@/app/appComponents/Filter'
import { Suspense } from 'react'
import TestChart from '@/app/appComponents/ChartTest'
import { requireUser } from '@/lib/supabase/requireUser'
import { resolveOrgId } from '@/lib/supabase/resolveOrgId'
import { getKpisCached } from '@/lib/data/kpis'
import ErrorCard from '@/app/appComponents/ErrorCard'
import { getDateRange } from '@/lib/data/getDateRange'
import { ValidationError, AuthError, OrgResolutionError, DataFetchError } from '@/lib/errors/classes'

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
      <div>
           <Filter filters={filters} />

           {/* dashbord */}
           <div className='p-5'>
            <Suspense fallback={<h1>Loading chart data</h1>}>
              <TestChart chartData={rows}/>
            </Suspense>
           </div>
        </div>
    )
  } catch(e: unknown) {
    // non-blocking errors
    if (e instanceof ValidationError) {
      const message = e.issues ? 'There is an error with your data filters' : e.message
      console.warn('ValidationError in ShopifyProductPage', {
        message
      })
      return (
        // add a toast here, but we still want to show empty data cards right? Maybe with a finally clause?
        <h1>Im a toast displaying {message}</h1>
      )
    }

    // blocking errors
    if (e instanceof AuthError || e instanceof OrgResolutionError) {
      console.warn('Auth/Org error in ShopifyProductPage', { 
        name: e.name, 
        message: e.message 
      })
      return <ErrorCard>{e.message}</ErrorCard> 
    }

    if (e instanceof DataFetchError) {
      console.error("Dashboard KPI fetch failed", {
        error: e.message, // what I typed in the function when throwing error (show to user)
        name: e.name, // name of the error class used i.e. DataFetchError
        cause: e.cause instanceof Error ? e.cause.message : e.cause, // Drizzle error cause
        meta: e.meta, // the filters used in the data fetch
      })
      return <ErrorCard>{e.message}</ErrorCard> 
    }

    console.error('Unexpected error in ShopifyProductPage', e)
    const message = e instanceof Error ? e.message : 'An unexpected error occurred'
    return <ErrorCard>{message}</ErrorCard>
  }
}