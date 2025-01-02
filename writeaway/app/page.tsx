import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Canvas from "@/components/canvas";
import Topbar from "@/components/topbar";

export const metadata = {
  title: "WriteAway",
  description: "Write your stuff away",
};

export default function Page() {
  return (
    <div className="h-full flex flex-col">
      {/* Topbar */}
      <a className="action-btn px-4 py-2 bg-gray text-white rounded hover:opacity-80" href="/login">
        View Screenplay
      </a>
      {/* Main content area */}
      <main className="flex flex-1 flex-col w-full h-full pt-16">
        <Canvas />
      </main>
    </div>
  );
}