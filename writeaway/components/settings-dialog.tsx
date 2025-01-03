"use client"

import * as React from "react"
import {
  Bell,
  Home,
  Menu,
  Minimize2,
  Maximize2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  nav: [
    { name: "Scene - 1", icon: Bell },
    { name: "Scene - 2", icon: Menu },
    { name: "Scene - 3", icon: Home },

  ],
}

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [isCurrentlyExpanded, setIsCurrentlyExpanded] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 -m-1"
        >
          {isCurrentlyExpanded ? (
            <Minimize2 className="h-2 w-2 stroke-[0.5px] text-muted-foreground" />
          ) : (
            <Maximize2 className="h-2 w-2 stroke-[0.5px] text-muted-foreground" />
          )}
        </Button>
      </DialogTrigger>
      <DialogOverlay className="rounded-xl">
        <DialogContent className="overflow-hidden rounded-xl border border-border p-0 h-[800px] md:max-w-[900px] lg:max-w-[1000px] bg-white">
          <DialogTitle className="sr-only">Settings</DialogTitle>
          <DialogDescription className="sr-only">
            Customize your settings here.
          </DialogDescription>
          
          <SidebarProvider>
            <div className="flex h-full w-full">
              <div className="relative h-full">
                <Sidebar collapsible="icon" className="h-full hidden md:flex">
                  <SidebarContent>
                    <SidebarGroup>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {data.nav.map((item) => (
                            <SidebarMenuItem key={item.name}>
                              <SidebarMenuButton
                                asChild
                                isActive={item.name === "Messages & media"}
                              >
                                <a href="#">
                                  <item.icon />
                                  <span>{item.name}</span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </SidebarContent>
                  <SidebarRail />
                </Sidebar>
                <SidebarTrigger className="absolute -right-7 top-2" />
              </div>

              <div className="flex-1 h-full">
                <textarea 
                  className="w-full h-full p-8 
                             font-['ScreenplayFont'] text-base leading-6
                             resize-none focus:outline-none
                             bg-white border-none"
                  placeholder="INT. SCENE - DAY

Your screenplay begins here..."
                />
              </div>
            </div>
          </SidebarProvider>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
