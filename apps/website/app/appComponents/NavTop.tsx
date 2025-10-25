"use client"

import { House, Brain, Search } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from 'next/link'

type IconName =
  | "house"
  | "brain"
  | "search"

const iconMap: Record<IconName, React.ComponentType<{ className?: string }>> = {
  house: House,
  brain: Brain,
  search: Search
}

export default function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: IconName
    isActive?: boolean
  }[]
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
