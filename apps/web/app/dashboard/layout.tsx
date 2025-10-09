import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import DashboardTitle from "@/app/appComponents/DashboardTitle"
import CurrencySelector from "@/app/appComponents/CurrencySelector"
import DatePicker from "@/app/appComponents/DatePicker"
import { ListFilter } from 'lucide-react'
import { Toggle } from "@/components/ui/toggle"


export default function LayoutDashboard({ children }: Readonly<{children: React.ReactNode}>) {

  return (
    <div>
      <div className="flex items-center gap-5 h-8">
        <SidebarTrigger />
        <Separator orientation="vertical"/>
        <DashboardTitle />
        <div className="ml-auto flex gap-2 items-center">
          {/* <Toggle variant='outline'><ListFilter /></Toggle> */}
          <DatePicker />
          <CurrencySelector />
        </div>
      </div>
      <div className="mt-5 border-t py-5">
        {children}
      </div>
    </div>
  )
}