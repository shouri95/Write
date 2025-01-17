// File: components/sidebar/app-sidebar.tsx

"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import { Project } from "./types"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

// Helper function to return a random pastel/light color
function getRandomLightColor(): string {
  const pastelColors = [
    "#FDECEC", // light red
    "#FCEEDC", // light orange
    "#F9F8E3", // light yellow
    "#EAF8EC", // light green
    "#E8F6F8", // light teal
    "#F0ECF8", // light purple
    "#FDEDFE", // light pink
    "#ECF7FD", // light blue
  ]
  const randomIndex = Math.floor(Math.random() * pastelColors.length)
  return pastelColors[randomIndex]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [projects, setProjects] = React.useState<Project[]>([]);

  const handleAddProject = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: `Project ${projects.length + 1}`,
      activeSection: "canvas",
      // Generate a random color for the card background:
      color: getRandomLightColor(),
      sections: {
        canvas: {
          title: "Canvas",
          content: ""
        },
        screenplay: {
          title: "Screenplay",
          content: ""
        },
        scenes: {
          title: "Scenes",
          items: [],
        }
      }
    };
    setProjects(prevProjects => [...prevProjects, newProject]);
  };

  const handleSectionSelect = (projectId: string, sectionType: string) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId
          ? { ...project, activeSection: sectionType }
          : project
      )
    );
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="p-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 pl-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground font-bold">
              W
            </div>
            <span className="font-bold text-xl group-data-[state=collapsed]:hidden">
              WriteAway
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="group-data-[state=collapsed]:hidden"
            onClick={handleAddProject}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={projects} onSectionSelect={handleSectionSelect} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: "User", email: "user@example.com", avatar: "" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
