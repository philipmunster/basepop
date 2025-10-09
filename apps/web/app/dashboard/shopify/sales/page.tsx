import { Filter, FilterSelectMultiple } from '@/app/appComponents/Filter'

const filters = [
  {
    label: 'Market',
    options: ['Denmark', 'Sweden', 'Norway', 'Finland', 'Germany', 'Holland', 'Belgium', 'Poland', 'Polest', 'Palc', 'Polist']
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
    <div>
       <Filter filters={filters} />
    </div>
  )
}