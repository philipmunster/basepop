"use client"

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { LayoutDashboard, Newspaper, Megaphone, Send, LifeBuoy, Settings, type LucideIcon } from 'lucide-react'

type IconObj = {
  lucideIcon?: LucideIcon 
  image?: {
    src: string
    alt: string
    width: number
    height: number
  }
}

const icons: Record<string, IconObj> = {
  overview: {
    lucideIcon: LayoutDashboard
  },
  shopify: {
    image: {
      src: '/icons/icon-shopify.png',
      alt: 'Shopify logo',
      width: 92,
      height: 92
    }
  },
  meta: {
    image: {
      src: '/icons/icon-meta.png',
      alt: 'meta logo',
      width: 92,
      height: 92
    }
  },
  google: {
    image: {
      src: '/icons/icon-google.png',
      alt: 'google logo',
      width: 92,
      height: 92
    }
  },
}

export default function DashboardTitle() {
  const pathName = usePathname()

  const dashboardSection = pathName.split('/')[4]

  const currentIconObj = 
    (dashboardSection && dashboardSection in icons)
    ? icons[dashboardSection]
    : null

  return (
    <div className='flex gap-4 items-center'>
      {currentIconObj?.image
        ? <Image src={currentIconObj.image.src} alt={currentIconObj.image.alt} width={currentIconObj.image.width} height={currentIconObj.image.height} className="size-6"/>
        : currentIconObj?.lucideIcon
        ? <currentIconObj.lucideIcon />
        : ''
      }
      <h1 className='truncate text-xl font-semibold'>
        {pathName
          .split('/')
          .slice(4)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}
      </h1>
    </div>
  )
}