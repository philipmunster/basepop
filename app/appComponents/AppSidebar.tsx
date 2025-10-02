"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import NavGroup from '@/app/appComponents/NavGroup'
import { LayoutDashboard, Newspaper, Megaphone } from 'lucide-react'

const navUserData =  {
  name: "Your company",
  email: "example@company.com",
  avatar: "",
}

const DashboardGroupItems = [
  {
    title: "Overview",
    url: "#",
    lucideIcon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: "Business",
        url: "#",
      },
      {
        title: "Marketing",
        url: "#",
      },
    ],
  },
  {
    title: "Shopify",
    url: "#",
    imageIcon: {
      src: '/icons/icon-shopify.png',
      alt: 'Shopify logo',
      width: 92,
      height: 92
    },
    items: [
      {
        title: "Sales",
        url: "#",
      },
      {
        title: "Product",
        url: "#",
      },
      {
        title: "Returns",
        url: "#",
      },
      {
        title: "Inventory",
        url: "#",
      },
    ],
  },
  {
    title: "Meta",
    url: "#",
    imageIcon: {
      src: '/icons/icon-meta.png',
      alt: 'Meta logo',
      width: 92,
      height: 92
    },
    items: [
      {
        title: "Ads",
        url: "#",
      },
      {
        title: "Organic",
        url: "#",
      },
    ],
  },
  {
    title: "Google",
    url: "#",
    imageIcon: {
      src: '/icons/icon-google.png',
      alt: 'Google logo',
      width: 92,
      height: 92
    },
    items: [
      {
        title: "Ads",
        url: "#",
      },
      {
        title: "Organic",
        url: "#",
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
    title: "Shopify",
    url: "#",
    imageIcon: {
      src: '/icons/icon-shopify.png',
      alt: 'Shopify logo',
      width: 92,
      height: 92
    },
  },
  {
    title: "Meta ads",
    url: "#",
    imageIcon: {
      src: '/icons/icon-meta.png',
      alt: 'Meta logo',
      width: 92,
      height: 92
    },
  },
  {
    title: "Google ads",
    url: "#",
    imageIcon: {
      src: '/icons/icon-google.png',
      alt: 'Google logo',
      width: 92,
      height: 92
    },
  }
]



export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        Header
      </SidebarHeader>
      <SidebarContent>
        <NavGroup groupLabel="Dashboard" items={DashboardGroupItems} />
        <NavGroup groupLabel="News" items={navNewsGroup} />
        <NavGroup groupLabel="AI changelog" items={AIchangelogGroup} />
        {/* <NavProjects projects={navNewsGroup} /> */}
      </SidebarContent>
      <SidebarFooter>
        Footer
        {/* <NavUser user={navUserData} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}