import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarHeader
} from "@/components/ui/sidebar"
import NavHeader from '@/app/appComponents/sidebar/NavHeader'
import NavTop from '@/app/appComponents/sidebar/NavTop'
import NavMain from '@/app/appComponents/sidebar/NavMain'
import NavFooter from '@/app/appComponents/sidebar/NavFooter'
import { requireUser } from "@/lib/supabase/auth/requireUser"
import { getUserMembershipsCached } from "@/lib/data/orgMemberships"
import { getUserInfoCached } from "@/lib/data/userInfo"
import { DataFetchError } from "@/lib/errors/classes"
import ErrorCard from "@/app/appComponents/ErrorCard"
import { buildNav } from '@/app/appComponents/sidebar/buildNavItems'
import { type User } from "@supabase/supabase-js"

export type ChildItem = { title: string; url: string }

export type IconName = 
  | 'house'
  | 'brain'
  | 'search'
  | 'layoutDashboard'
  | 'newspaper'
  | 'megaphone'
  | 'settings'
  | 'lifeBuoy'
  | 'send'

export type NavItem = {
  title: string
  url: string
  icon?: IconName
  imageIcon?: { src: string; alt: string; width: number; height: number }
  isActive?: boolean
  items?: ChildItem[]
}


interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User
  activeOrgId: string
}

export default async function AppSidebar({ user, activeOrgId, ...props }: AppSidebarProps) {

  try {
    // get user info for sidebar footer
    const userInfo  = await getUserInfoCached(user.id)
    const navUserData = {
      name: userInfo?.fullName ?? (user.user_metadata?.full_name ?? 'User'),
      email: userInfo?.email ?? (user.email ?? ''),
      // add profile picture here
    }
  
    // get user memberships for sidebar header
    const memberships = await getUserMembershipsCached(user.id) // middleware has already checked that the user has at least one membership
    const activeOrg = memberships.find((membership) => membership.org_id === activeOrgId) // find the activeOrg in the param
    if (!activeOrg) {
      return <ErrorCard>Your membership of the organisation could not be verified</ErrorCard>
    }

    const { topGroup, dashboardGroupItems, newsGroup, aiChangelogGroup, supportGroup } = buildNav(activeOrgId)

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex">
        <NavHeader activeOrg={activeOrg} memberships={memberships} />
        {/* <OrgSwitcher activeOrgName={activeOrg} memberships={memberships} /> */}
        <NavTop items={topGroup} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain groupLabel="Dashboard" items={dashboardGroupItems} />
        <NavMain groupLabel="News" items={newsGroup} />
        <NavMain groupLabel="AI changelog" items={aiChangelogGroup} />
        <NavMain items={supportGroup} atBottom={true} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter user={navUserData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )} catch(err) {
    if (err instanceof DataFetchError) {
      console.error("User and/or org data fetch failed", {
        error: err.message, // what I typed in the function when throwing error (show to user)
        name: err.name, // name of the error class used i.e. DataFetchError
        cause: err.cause instanceof Error ? err.cause.message : err.cause, // Drizzle error cause
        meta: err.meta, // the filters used in the data fetch
      })
      return <ErrorCard>{err.message}</ErrorCard> 
    }

    console.error('Unexpected error in AppSidebar', err)
    const message = err instanceof Error ? err.message : 'An unexpected error occurred'
    return <ErrorCard>{message}</ErrorCard>
  }
}