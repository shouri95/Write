"use client"

import { useState } from "react"
import { Home, Inbox, Calendar, Search, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const items = [
  { title: "Project - 1", url: "#" },
  { title: "Project - 2", url: "#" },
  { title: "Project - 3", url: "#" },
  { title: "Project - 4", url: "#" },
  { title: "Project - 5", url: "#" }
]

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {isOpen ? (
        <Sidebar side="left" variant="sidebar" collapsible="icon" className="sidebar">
          <SidebarHeader className="sidebar-header">
            <div className="flex items-center justify-end w-full">
              <SidebarTrigger 
                className="sidebar-trigger" 
                onClick={() => setIsOpen(false)} 
              />
            </div>
          </SidebarHeader>
          <SidebarContent className="sidebar-content">
            <SidebarGroup className="sidebar-group">
              <SidebarGroupLabel className="sidebar-group-label">Application</SidebarGroupLabel>
              <SidebarGroupContent className="sidebar-group-content">
                <SidebarMenu className="sidebar-menu">
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title} className="sidebar-menu-item">
                      <SidebarMenuButton asChild className="sidebar-menu-button">
                        <a href={item.url} className="flex items-center space-x-3">
                          <span className="text-sm font-medium">{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="sidebar-footer">
            <p className="text-sm text-gray-500">© 2024 WriteAway</p>
          </SidebarFooter>
        </Sidebar>
      ) : (
        <div
          onClick={() => setIsOpen(true)}
          className="fixed left-4 top-4 p-2 rounded-md cursor-pointer z-50"
        >
          <SidebarTrigger className="sidebar-trigger" />
        </div>
      )}
    </>
  )
}