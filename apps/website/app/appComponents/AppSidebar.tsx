
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import NavMain from '@/app/appComponents/NavMain'
import NavHeader from "@/app/appComponents/NavHeader"
import NavFooter from '@/app/appComponents/NavFooter'
import { requireUser } from "@/lib/supabase/auth/requireUser"
import { db } from "@repo/db"

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

  const navCompanyData = {
    logoSrc: '/exampleLogo.png',
    name: 'Philips frugt',
    plan: 'Premium plan'
  }
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <NavHeader companyData={navCompanyData}/>
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