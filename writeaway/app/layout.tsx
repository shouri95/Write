import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
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
      <body className="overflow-hidden">
        {/* The provider gives us collapsible sidebar behavior */}
        <SidebarProvider defaultOpen>
          {/* Sidebar stays fixed on the left; everything else goes to the right */}
          <AppSidebar />

          {/* Main content area (whatever is in your app/page.tsx, etc.) */}
          {children}
        </SidebarProvider>
      </body>
    </html>
  )
}
