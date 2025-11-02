import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import DashboardTitle from "@/app/appComponents/DashboardTitle"
import CurrencySelector from "@/app/appComponents/CurrencySelector"
import DatePicker from "@/app/appComponents/DatePicker"
import { requireUser } from '@/lib/supabase/auth/requireUser'
import { getDateRange } from '@/lib/utils/getDateRange'


export default async function LayoutDashboard({
  params,
  children,
}: Readonly<{
  params: Promise<{ orgId: string }>,
  children: React.ReactNode;
}>) {
  const user = await requireUser() // throws error on failure (should not happen since middleware would redirect to /login)
  const { orgId } = await params

  const defaultPreset = await getDateRange(user.id)
  
  return (
    <div>
      <div className="flex items-center gap-5 h-8">
        <SidebarTrigger />
        <Separator orientation="vertical"/>
        <DashboardTitle />
        <div className="ml-auto flex gap-2 items-center">
          {/* <Toggle variant='outline'><ListFilter /></Toggle> */}
          <DatePicker defaultPreset={defaultPreset}/>
          <CurrencySelector />
        </div>
      </div>
      <div className="mt-5 border-t py-5">
        {children}
      </div>
    </div>
  )
}