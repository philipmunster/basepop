"use client"

import { 
  House, 
  Brain, 
  Search,
  LayoutDashboard,
  Newspaper,
  Megaphone,
  Settings,
  LifeBuoy,
  Send
} from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from 'next/link'
import { NavItem, IconName } from "@/app/appComponents/sidebar/AppSidebar"

const iconMap: Record<IconName, React.ComponentType<{ className?: string }>> = {
  house: House,
  brain: Brain,
  search: Search,
  layoutDashboard: LayoutDashboard,
  newspaper: Newspaper,
  megaphone: Megaphone,
  settings: Settings,
  lifeBuoy: LifeBuoy,
  send: Send
}

export default function NavMain({
  items,
}: {
  items: NavItem[]
}) {
  return (
    <SidebarMenu>
      {items.map((item) => {
        const Icon = item.icon ? iconMap[item.icon] : undefined
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={item.isActive}>
              <Link href={item.url}>
                {Icon && <Icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}
