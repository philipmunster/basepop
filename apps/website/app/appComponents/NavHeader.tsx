import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar"
import Link from 'next/link'

type NavHeaderProps = {
  companyData: {
    logoSrc: string
    name: string
    plan: string
  }
}

export default function NavHeader({ companyData }: NavHeaderProps) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/home">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <Avatar className="rounded-md">
                <AvatarImage src={companyData?.logoSrc}/>
                <AvatarFallback>{
                  companyData.name 
                  ? companyData.name.slice(0, 2).toUpperCase()
                  : '??'
                }</AvatarFallback>
              </Avatar>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{companyData.name}</span>
              <span className="truncate text-xs">{companyData.plan}</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}