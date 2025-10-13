import { Filter } from '@/app/appComponents/Filter'
import { Suspense } from 'react'
import { kpisUrl, type KPIsResponse } from '@/lib/kpis';
import TestChart from '@/app/appComponents/ChartTest'

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

export default async function ShopifySalesPage(props: PageProps) {
  const searchParams = 
    props.searchParams instanceof Promise ? await props.searchParams : props.searchParams

  const orgId = (searchParams.orgId as string) || 'ce7f0891-2aad-435e-aacc-dc5534df42bb'
  const from = (searchParams.dateFrom as string) ?? '2025-07-17'
  const to = (searchParams.dateTo as string) ?? '2025-07-20'
  
  const url = kpisUrl(process.env.NEXT_PUBLIC_APP_URL!, orgId, from, to)

  const res = await fetch(url, {
    cache: 'no-store'
  })

  if (!res.ok) {
    return <div className='p-6 text-red-600'>Failed to load</div>
  }

  const data = await res.json()

  console.log(data.rows)

  return (
    <Suspense fallback={null}>
      <div>
         <Filter filters={filters} />

         {/* dashbord */}
         <div className='p-5'>
          <p>{data.rows[0].aov}</p>
          <TestChart chartData={data.rows}/>
         </div>
      </div>
    </Suspense>
  )
}