"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Simple "homepage" that prompts user to create a new project
// or start writing in a text input.

export default function Page() {
  const [projectName, setProjectName] = useState("");
  const router = useRouter();

  const handleCreateProject = () => {
    // For demo, we just navigate to the "screenplay" page or any route you'd like.
    // In a real scenario, you'd also dispatch an API call or update local state.
    router.push("/screenplay");
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full">
      <h1 className="text-2xl font-bold mb-4">Welcome to WriteAway</h1>

      {/* Prompt to create a project */}
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <Input
          placeholder="Start writing or enter project name..."
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <Button onClick={handleCreateProject}>
          {projectName ? `Create Project: ${projectName}` : "Start Writing"}
        </Button>

        {/* Navigation Section */}
        <div className="flex gap-4 mt-8">
          <Button 
            variant="outline"
            onClick={() => router.push('/canvas')}
          >
            Go to Canvas
          </Button>
          <Button 
            variant="outline"
            onClick={() => router.push('/screenplay')}
          >
            Go to Screenplay
          </Button>
        </div>
      </div>
    </div>
  );
}
