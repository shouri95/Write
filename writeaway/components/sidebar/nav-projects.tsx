"use client"

import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  Pencil,
  Plus,
  type LucideIcon,
} from "lucide-react"
import React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

interface Scene {
  id: string;
  name: string;
  content: string;
}

interface Project {
  id: string;
  name: string;
  canvas: string; // Add canvas property
  screenplay: {
    content: string;
  };
  scenes: Scene[];
}

export function NavProjects() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const { isMobile } = useSidebar();

  const addNewProject = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: `Project ${projects.length + 1}`,
      canvas: "", // Initialize empty canvas
      screenplay: { content: "" },
      scenes: [
        { id: "scene-1", name: "Scene - 1", content: "" },
        { id: "scene-2", name: "Scene - 2", content: "" },
        { id: "scene-3", name: "Scene - 3", content: "" },
      ]
    };
    setProjects([...projects, newProject]);
  };

  const handleRename = (id: string, newName: string) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, name: newName } : p
    ));
    setEditingId(null);
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <div className="flex items-center justify-between px-4">
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <Button variant="ghost" size="icon" onClick={addNewProject}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <SidebarMenu>
        {projects.map((project) => (
          <SidebarMenuItem key={project.id}>
            {editingId === project.id ? (
              <input
                type="text"
                value={project.name}
                onBlur={(e) => handleRename(project.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRename(project.id, e.currentTarget.value);
                  }
                }}
                autoFocus
                className="px-2 py-1 w-full rounded border"
              />
            ) : (
              <SidebarMenuButton
                onDoubleClick={() => setEditingId(project.id)}
                asChild
              >
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4" />
                  <span>{project.name}</span>
                </div>
              </SidebarMenuButton>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem onClick={() => setEditingId(project.id)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
