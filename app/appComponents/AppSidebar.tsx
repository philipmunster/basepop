"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar"
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

console.log('hey')

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