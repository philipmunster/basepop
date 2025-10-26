import AppSidebar from '@/app/appComponents/AppSidebar'
import {
  SidebarProvider,
  SidebarInset
} from '@/components/ui/sidebar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <SidebarProvider>
          <AppSidebar />

          <SidebarInset className="p-5">
            {children}
          </SidebarInset>

        </SidebarProvider>
  );
}
