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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Protected Home</h1>
      <input
        type="text"
        placeholder="Enter project name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="border border-gray-300 rounded p-2 w-64 mb-4"
      />
      <Button onClick={handleCreateProject}>
        {projectName ? `Create Project: ${projectName}` : "Start Writing"}
      </Button>
    </div>
  );
}
