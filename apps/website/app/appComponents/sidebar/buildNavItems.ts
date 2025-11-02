import type { NavItem } from "@/app/appComponents/sidebar/AppSidebar"

function withOrg(orgId: string, path: string) {
  return `/platform/${orgId}${path}`
}

export function buildNav(orgId: string) {
  const topGroup: NavItem[] = [
    { title: 'Home', url: withOrg(orgId, '/home'), icon: 'house' },
    { title: 'Ask AI', url: withOrg(orgId, '/ai'), icon: 'brain' },
    { title: 'Search', url: withOrg(orgId, '/search'), icon: 'search' },
  ]

  const dashboardGroupItems: NavItem[] = [
    {
      title: 'Overview',
      url: withOrg(orgId, '/dashboard/overview'),
      icon: 'layoutDashboard',
      isActive: true,
      items: [
        { title: 'Business', url: withOrg(orgId, '/dashboard/overview/business') },
        { title: 'Marketing', url: withOrg(orgId, '/dashboard/overview/marketing') },
      ],
    },
    {
      title: 'Shopify',
      url: withOrg(orgId, '/dashboard/shopify'),
      imageIcon: {
        src: '/icons/icon-shopify.png',
        alt: 'Shopify logo',
        width: 92,
        height: 92,
      },
      items: [
        { title: 'Sales', url: withOrg(orgId, '/dashboard/shopify/sales') },
        { title: 'Product', url: withOrg(orgId, '/dashboard/shopify/product') },
        { title: 'Returns', url: withOrg(orgId, '/dashboard/shopify/returns') },
        { title: 'Inventory', url: withOrg(orgId, '/dashboard/shopify/inventory') },
      ],
    },
    {
      title: 'Meta',
      url: withOrg(orgId, '/dashboard/meta'),
      imageIcon: {
        src: '/icons/icon-meta.png',
        alt: 'Meta logo',
        width: 92,
        height: 92,
      },
      items: [
        { title: 'Ads', url: withOrg(orgId, '/dashboard/meta/ads') },
        { title: 'Organic', url: withOrg(orgId, '/dashboard/meta/organic') },
      ],
    },
    {
      title: 'Google',
      url: withOrg(orgId, '/dashboard/google'),
      imageIcon: {
        src: '/icons/icon-google.png',
        alt: 'Google logo',
        width: 92,
        height: 92,
      },
      items: [
        { title: 'Ads', url: withOrg(orgId, '/dashboard/google/ads') },
        { title: 'Organic', url: withOrg(orgId, '/dashboard/google/organic') },
      ],
    },
  ]

  const newsGroup: NavItem[] = [
    { title: 'Breaking news', url: withOrg(orgId, '/news/breaking'), icon: 'newspaper' },
    { title: 'Weekly news', url: withOrg(orgId, '/news/weekly'), icon: 'megaphone' },
  ]

  const aiChangelogGroup: NavItem[] = [
    {
      title: 'Shopify changelog',
      url: withOrg(orgId, '/ai-changelog/shopify'),
      imageIcon: { src: '/icons/icon-shopify.png', alt: 'Shopify logo', width: 92, height: 92 },
    },
    {
      title: 'Meta ads changelog',
      url: withOrg(orgId, '/ai-changelog/meta'),
      imageIcon: { src: '/icons/icon-meta.png', alt: 'Meta logo', width: 92, height: 92 },
    },
    {
      title: 'Google ads changelog',
      url: withOrg(orgId, '/ai-changelog/google'),
      imageIcon: { src: '/icons/icon-google.png', alt: 'Google logo', width: 92, height: 92 },
    },
  ]

  const supportGroup: NavItem[] = [
    { title: 'Settings', url: withOrg(orgId, '/settings'), icon: 'settings' },
    { title: 'Support', url: withOrg(orgId, '/support'), icon: 'lifeBuoy' },
    { title: 'Give feedback', url: withOrg(orgId, '/feedback'), icon: 'send' },
  ]

  return { topGroup, dashboardGroupItems, newsGroup, aiChangelogGroup, supportGroup }
}