"use client"

import * as React from "react"
import { Plus, Folder, GalleryVerticalEnd, AudioWaveform, Command, SquareTerminal, Bot, BookOpen, Settings2, Frame, PieChart, Map } from "lucide-react"
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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "WriteAway",
      logo: GalleryVerticalEnd,
      plan: "",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Project",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Scenes",
          icon: SquareTerminal,
          isActive: true,           
          items: [
            {
              title: "Scene - 1",
              url: "#",
            },
            {
              title: "Scene - 2", 
              url: "#",
            },
            {
              title: "Scene - 3",
              url: "#",
            }
          ]
        },
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#", 
        },
        {
          title: "Settings",
          url: "#",
        }
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [projects, setProjects] = React.useState<Project[]>([]);

  const handleAddProject = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: `Project ${projects.length + 1}`,
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
          items: [
            { id: "scene-1", name: "Scene 1", content: "" },
            { id: "scene-2", name: "Scene 2", content: "" },
            { id: "scene-3", name: "Scene 3", content: "" }
          ]
        }
      }
    };
    setProjects(prevProjects => [...prevProjects, newProject]);
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
        <NavMain items={projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: "User", email: "user@example.com", avatar: "" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
