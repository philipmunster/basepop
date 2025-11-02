import AppSidebar from '@/app/appComponents/sidebar/AppSidebar'
import {
  SidebarProvider,
  SidebarInset
} from '@/components/ui/sidebar'
import { requireUser } from '@/lib/supabase/auth/requireUser';
import { getUserMembershipsCached } from '@/lib/data/orgMemberships'
import { notFound, redirect } from 'next/navigation';

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ orgId: string }>,
  children: React.ReactNode;
}>) {
  const { orgId } = await params
  const user = await requireUser()

  const isOrgMember = (await getUserMembershipsCached(user.id)).some((row) => row.org_id === orgId)
  if (!isOrgMember) notFound()
  
  return (
        <SidebarProvider>
          <AppSidebar user={user} activeOrgId={orgId} />

          <SidebarInset className="p-5">
            {children}
          </SidebarInset>

        </SidebarProvider>
  );
}
