"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const router = useRouter();

  function handleGetStarted() {
    router.push("/sign-in"); 
  }

  return (
    <main className="flex flex-col items-center justify-center h-[calc(100vh-80px)] px-6">
      <h1 className="text-5xl font-bold mb-4">Welcome to WriteAway!</h1>
      <p className="text-lg text-center max-w-2xl mb-10">
        Your platform for writing stunning screenplays.
      </p>
      <Button onClick={handleGetStarted} className="text-lg">
        Get Started
      </Button>
    </main>
  );
}
