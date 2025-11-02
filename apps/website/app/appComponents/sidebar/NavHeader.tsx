"use client"

import {
  BadgeCheck,
  Bell,
  Building2,
  ChevronsUpDown,
  CreditCard,
  Sparkles,
  UnfoldHorizontal,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Database } from "@repo/db"
import { redirect, RedirectType } from 'next/navigation'
import { useState } from 'react'
import { Spinner } from "@/components/ui/spinner"

type UserMembershipRow = Database['public']['Views']['user_memberships']['Row']

export default function NavHeader({
  activeOrg,
  memberships,
}: {
  activeOrg: UserMembershipRow,
  memberships: UserMembershipRow[]
}) {
  const { isMobile } = useSidebar()
  const [newOrgLoading, setNewOrgLoading] = useState<string | undefined>(undefined)

  const activeOrgPlan = activeOrg.org_plan
    ? activeOrg.org_plan.charAt(0).toUpperCase() + activeOrg.org_plan.slice(1) + ' plan'
    : undefined
  
  function changeOrg(orgId: string | null) {
    if (!orgId) return
    setNewOrgLoading(orgId)
    redirect(`/platform/${orgId}/home`, RedirectType.push)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {/* <AvatarImage src={activeOrg.avatar} alt={activeOrg.org_name} /> */}
                <AvatarFallback className="rounded-lg bg-sidebar-primary text-white font-semibold">
                  {
                    activeOrg.org_name ? activeOrg.org_name.slice(0, 2).toUpperCase() : '??'
                  }
                </AvatarFallback>
              </Avatar>
              {/* <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-neutral-200">
                <Building2 className="size-4 text-accent-foreground"/>
              </div> */}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeOrg.org_name ?? 'Unknown'}</span>
                <span className="truncate text-xs">{activeOrgPlan ?? 'Unknown' }</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* <AvatarImage src={activeOrg.avatar} alt={activeOrg.org_name} /> */}
                  <AvatarFallback className="rounded-lg bg-sidebar-primary text-white font-semibold">
                    {
                      activeOrg.org_name ? activeOrg.org_name.slice(0, 2).toUpperCase() : '??'
                    }
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{activeOrg.org_name ?? 'Unknown'}</span>
                  <span className="truncate text-xs">{activeOrgPlan ?? 'Unknown' }</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Change organisation</DropdownMenuLabel>
            {memberships.map((org, index) => {
              if (newOrgLoading === org.org_id) { // set the loading state for the org we are changing to
                return (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => changeOrg(org.org_id)}
                    className="gap-2 p-2"
                  >
                    <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                      <Spinner />
                    </div>
                    <p>Changing organisation</p>
                  </DropdownMenuItem>
                  
                )
              }
              if (org.org_id !== activeOrg.org_id) { // don't make it possible to change to the already active org
                return (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => changeOrg(org.org_id)}
                    className="gap-2 p-2"
                  >
                      {/* <team.logo className="size-4 shrink-0" /> */}
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                      <Avatar className="rounded-lg">
                        {/* <AvatarImage src={team?.logo}/> */}
                        <AvatarFallback className="bg-sidebar-primary font-semibold">{
                          org.org_name 
                          ? org.org_name.slice(0, 2).toUpperCase()
                          : '??'
                        }</AvatarFallback>
                      </Avatar>
                    </div>
  
                    {org.org_name}
                  </DropdownMenuItem>
                )
              }
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}