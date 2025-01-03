"use client"

import { ChevronRight, Folder, FileText, Folders, Frame } from "lucide-react"
import { Project } from "./types"
import { useRouter } from "next/navigation"  // Add this import at the top
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button" // Add Button import
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
  onSectionSelect: (projectId: string, sectionType: string) => void;
}

export function NavMain({ items, onSectionSelect }: NavMainProps) {
  const router = useRouter();  // Add router

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items?.map((project) => (
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
                  {project.sections?.canvas && (
                    <SidebarMenuSubItem>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2 px-2 py-1 h-9 text-sm font-normal"
                        onClick={() => {
                          onSectionSelect(project.id, 'canvas');
                          router.push('/canvas');
                        }}
                      >
                        <Frame className="h-4 w-4" />
                        Canvas
                      </Button>
                    </SidebarMenuSubItem>
                  )}

                  <SidebarMenuSubItem>
                  <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2 px-2 py-1 h-9 text-sm font-normal"
                      onClick={() => {
                        onSectionSelect(project.id, 'screenplay');
                        router.push('/screenplay');
                      }}
                    >
                      <Frame className="h-4 w-4" />
                        Screenplay
                      </Button>
                  </SidebarMenuSubItem>

                  <Collapsible asChild className="group/scenes">
                    <SidebarMenuSubItem>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <Folders className="h-4 w-4 mr-2" />
                          <span>Scenes</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/scenes:rotate-90" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {project.sections.scenes.items.map((scene) => (
                            <SidebarMenuSubItem key={scene.id}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start pl-6"
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                <span>{scene.name}</span>
                              </Button>
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
