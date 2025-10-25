import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarHeader
} from "@/components/ui/sidebar"
import NavHeader from "@/app/appComponents/NavHeader"
import NavTop from '@/app/appComponents/NavTop'
import NavMain from '@/app/appComponents/NavMain'
import NavFooter from '@/app/appComponents/NavFooter'
import { requireUser } from "@/lib/supabase/auth/requireUser"
import { db } from "@repo/db"
import { OrgSwitcher } from "@/app/appComponents/OrgSwitcher"

const OrganisationMemberships = [
  {
    name: "Acme Inc",
    logo: undefined,
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: undefined,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: undefined,
    plan: "Free",
  },
]

const TopGroup = [
  {
    title: "Home",
    url: "/home",
    icon: "house" as const,
  },
  {
    title: "Ask AI",
    url: "/ai",
    icon: "brain" as const,
  },
  {
    title: "Search",
    url: "/search",
    icon: "search" as const,
  },
]

const DashboardGroupItems = [
  {
    title: "Overview",
    url: "/dashboard/overview",
    icon: "layoutDashboard" as const,
    isActive: true,
    items: [
      {
        title: "Business",
        url: "/dashboard/overview/business",
      },
      {
        title: "Marketing",
        url: "/dashboard/overview/marketing",
      },
    ],
  },
  {
    title: "Shopify",
    url: "/dashboard/shopify",
    imageIcon: {
      src: '/icons/icon-shopify.png',
      alt: 'Shopify logo',
      width: 92,
      height: 92
    },
    items: [
      {
        title: "Sales",
        url: "/dashboard/shopify/sales",
      },
      {
        title: "Product",
        url: "/dashboard/shopify/product",
      },
      {
        title: "Returns",
        url: "/dashboard/shopify/returns",
      },
      {
        title: "Inventory",
        url: "/dashboard/shopify/inventory",
      },
    ],
  },
  {
    title: "Meta",
    url: "/dashboard/meta",
    imageIcon: {
      src: '/icons/icon-meta.png',
      alt: 'Meta logo',
      width: 92,
      height: 92
    },
    items: [
      {
        title: "Ads",
        url: "/dashboard/meta/ads",
      },
      {
        title: "Organic",
        url: "/dashboard/meta/organic",
      },
    ],
  },
  {
    title: "Google",
    url: "/dashboard/google",
    imageIcon: {
      src: '/icons/icon-google.png',
      alt: 'Google logo',
      width: 92,
      height: 92
    },
    items: [
      {
        title: "Ads",
        url: "/dashboard/google/ads",
      },
      {
        title: "Organic",
        url: "/dashboard/google/organic",
      },
    ],
  },
]

const navNewsGroup = [
  {
    title: "Breaking news",
    url: "#",
    icon: "newspaper" as const,
  },
  {
    title: "Weekly news",
    url: "#",
    icon: "megaphone" as const,
  },
]

const AIchangelogGroup = [
  {
    title: "Shopify changelog",
    url: "#",
    imageIcon: {
      src: '/icons/icon-shopify.png',
      alt: 'Shopify logo',
      width: 92,
      height: 92
    },
  },
  {
    title: "Meta ads changelog",
    url: "#",
    imageIcon: {
      src: '/icons/icon-meta.png',
      alt: 'Meta logo',
      width: 92,
      height: 92
    },
  },
  {
    title: "Google ads changelog",
    url: "#",
    imageIcon: {
      src: '/icons/icon-google.png',
      alt: 'Google logo',
      width: 92,
      height: 92
    },
  }
]

const supportGroup = [
  {
    title: "Settings",
    url: "#",
    icon: "settings" as const
  },
  {
    title: "Support",
    url: "#",
    icon: "lifeBuoy" as const
  },
  {
    title: "Give feedback",
    url: "#",
    icon: "send" as const
  },
]

export default async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const authUser = await requireUser()
  const user  = await db.query.user.findFirst({
    where: (u, { eq }) => eq(u.id, authUser.id)
  })

  const navUserData = {
    name: user?.fullName ?? (authUser.user_metadata?.full_name ?? 'User'),
    email: user?.email ?? (authUser.email ?? ''),
    // add profile picture here
  }
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex">
        <OrgSwitcher teams={OrganisationMemberships}/>
        <NavTop items={TopGroup} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain groupLabel="Dashboard" items={DashboardGroupItems} />
        <NavMain groupLabel="News" items={navNewsGroup} />
        <NavMain groupLabel="AI changelog" items={AIchangelogGroup} />
        <NavMain items={supportGroup} atBottom={true} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter user={navUserData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}