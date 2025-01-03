"use client";

import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { Separator } from "@/components/ui/separator";
import Canvas from "@/components/canvas";
import Toolbox2 from "@/components/toolbox2"; 
import "./globals.css"
import Toolbox1 from "@/components/toolbox1"; 
import { SettingsDialog } from "@/components/settings-dialog"



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex">
        <SidebarProvider defaultOpen>
          <AppSidebar />
          <SidebarInset className="flex-1 flex flex-col min-h-screen">
            <div className="h-full flex flex-col relative">
              {/* Sidebar trigger button in top left */}
              <div className="absolute top-4 left-4 z-10">
                <SidebarTrigger className="-ml-1" />
              </div>              
              {/* View Screenplay button in top right */}             
              <main className="flex flex-1 flex-col w-full h-full">
                <Canvas />
              </main>
            </div>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}