import { Filter } from '@/app/appComponents/Filter'
import { Suspense } from 'react'
import { kpisUrl, type KPIsResponse } from '@/lib/kpis';

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

  // console.log(data)

  return (
    <Suspense fallback={null}>
      <div>
         <Filter filters={filters} />

         {/* dashbord */}
         <div className='p-5'>
          <p>{data.rows[0].aov}</p>
         </div>
      </div>
    </Suspense>
  )
}