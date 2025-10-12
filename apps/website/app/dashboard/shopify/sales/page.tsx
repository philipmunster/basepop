import { Filter, FilterSelectMultiple } from '@/app/appComponents/Filter'
import { Suspense } from 'react'

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


export default function ShopifySalesPage() {

  return (
    <Suspense fallback={null}>
      <div>
         <Filter filters={filters} />
      </div>
    </Suspense>
  )
}