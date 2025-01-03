"use client"

import { ChevronRight, Folder, FileText, Folders } from "lucide-react"
import { Project } from "./types"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

interface NavMainProps {
  items: Project[];
}

export function NavMain({ items }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((project) => (
          <Collapsible key={project.id} asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <Folder className="h-4 w-4" />
                  <span>{project.name}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      <FileText className="h-4 w-4" />
                      <span>{project.sections.screenplay.title}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>

                  <Collapsible asChild className="group/scenes">
                    <SidebarMenuSubItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuSubButton>
                          <Folders className="h-4 w-4" />
                          <span>{project.sections.scenes.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/scenes:rotate-90" />
                        </SidebarMenuSubButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {project.sections.scenes.items.map((scene) => (
                            <SidebarMenuSubItem key={scene.id}>
                              <SidebarMenuSubButton>
                                <FileText className="h-4 w-4" />
                                <span>{scene.name}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuSubItem>
                  </Collapsible>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
