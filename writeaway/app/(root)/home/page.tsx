"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function HomePage() {
  const [projectName, setProjectName] = useState("");
  const router = useRouter();

  function handleCreateProject() {
    router.push("/screenplay");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Start Writing</h1>
        <Button 
          className=" items-center"
          onClick={handleCreateProject}
        >
          {projectName ? `Create Project: ${projectName}` : "Create a Project"}
        </Button>
      </div>
    </div>
  );
}
