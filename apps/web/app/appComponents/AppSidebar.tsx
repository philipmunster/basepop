"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import NavMain from '@/app/appComponents/NavMain'
import { LayoutDashboard, Newspaper, Megaphone, Send, LifeBuoy, Settings } from 'lucide-react'
import NavHeader from "@/app/appComponents/NavHeader"
import NavFooter from '@/app/appComponents/NavFooter'

const navCompanyData = {
  logoSrc: '/exampleLogo.png',
  name: 'Philips frugt',
  plan: 'Premium plan'
}

const navUserData =  {
  name: "Philip Munster Hansen",
  email: "example@company.com",
  avatar: "/exampleUser.jpeg",
}

const DashboardGroupItems = [
  {
    title: "Overview",
    url: "/dashboard/overview",
    lucideIcon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: "Business",
        url: "/dashboard/overview/busienss",
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
    lucideIcon: Newspaper,
  },
  {
    title: "Weekly news",
    url: "#",
    lucideIcon: Megaphone,
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
    lucideIcon: Settings
  },
  {
    title: "Support",
    url: "#",
    lucideIcon: LifeBuoy
  },
  {
    title: "Give feedback",
    url: "#",
    lucideIcon: Send
  },
]

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
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