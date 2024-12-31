"use client"

import Topbar from "@/components/topbar"
import Canvas from "@/components/canvas"

export default function Page() {
  return (
    <div className="relative w-screen h-screen">
      {/* Topbar pinned at the top. Higher z-index so it appears above canvas. */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <Topbar />
      </div>

      {/* Full-screen canvas behind the top bar */}
      <div className="h-full w-full">
        <Canvas />
      </div>
    </div>
  )
}
