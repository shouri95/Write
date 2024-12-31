import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

// 1) Make sure to import the global styles here
import "./globals.css"

export const metadata = {
  title: "WriteAway",
  description: "Write your stuff away",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider defaultOpen>
          <AppSidebar />
          <SidebarInset>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
