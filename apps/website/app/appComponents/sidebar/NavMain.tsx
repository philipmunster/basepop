"use client"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import Link from 'next/link'
import { NavItem, IconName } from "@/app/appComponents/sidebar/AppSidebar"
import { 
  House, 
  Brain, 
  Search,
  LayoutDashboard,
  Newspaper,
  Megaphone,
  Settings,
  LifeBuoy,
  Send,
  ChevronRight
} from "lucide-react"
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



export default function NavMain({ groupLabel, items, atBottom = false }: {
  groupLabel?: string
  items: NavItem[],
  atBottom?: boolean 
}) {
  return (
    <SidebarGroup className={atBottom ? 'mt-auto' : ""}>
      <SidebarGroupLabel>{groupLabel && groupLabel}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon ? iconMap[item.icon] : undefined

          if (item?.items) {
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} className={atBottom ? 'size-sm' : ""}>
                      {Icon && <Icon />}
                      {item.imageIcon && (
                        <Image
                          src={item.imageIcon.src}
                          alt={item.imageIcon.alt}
                          width={item.imageIcon.width}
                          height={item.imageIcon.height}
                          className="size-4"
                        />
                      )}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>    
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          } else {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} asChild size={atBottom ? "sm": null}>
                  <Link href={item.url}>
                    {Icon && <Icon />}
                    {item.imageIcon && (
                      <Image
                        src={item.imageIcon.src}
                        alt={item.imageIcon.alt}
                        width={item.imageIcon.width}
                        height={item.imageIcon.height}
                        className="size-4"
                      />
                    )}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
