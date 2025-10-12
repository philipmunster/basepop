import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"

import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar"

type NavHeaderProps = {
  companyData: {
    logoSrc: string
    name: string
    plan: string
  }
}

export default function NavHeader({ companyData }: NavHeaderProps) {
  return (
    <SidebarHeader className="flex">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
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
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
  )
}