"use client"
import { ChevronRight, type LucideIcon } from "lucide-react"
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

export default function NavMain({ groupLabel, items, atBottom = false }: {
  groupLabel?: string
  items: {
    title: string
    url: string
    lucideIcon?: LucideIcon
    imageIcon?: {
      src: string
      alt: string
      width: number
      height: number
    }
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[],
  atBottom?: boolean 
}) {
  return (

    <SidebarGroup className={atBottom ? 'mt-auto' : ""}>
      <SidebarGroupLabel>{groupLabel && groupLabel}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
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
                      {item.lucideIcon && <item.lucideIcon />}
                      {item.imageIcon && <Image src={item.imageIcon.src} alt={item.imageIcon.alt} width={item.imageIcon.width} height={item.imageIcon.height} className="size-4"/>}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>    
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
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
                    <a href={item.url}>
                      {item.lucideIcon && <item.lucideIcon />}
                      {item.imageIcon && <Image src={item.imageIcon.src} alt={item.imageIcon.alt} width={item.imageIcon.width} height={item.imageIcon.height} className="size-4"/>}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            )
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
