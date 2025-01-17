import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import "../globals.css";
import { Geist, Azeret_Mono as Geist_Mono } from 'next/font/google'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import ScreenplayPage from "./screenplay/page";

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})
export const metadata: Metadata = {
  title: "WriteAway",
  description: "Requires login to access",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }

  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="h-full flex">
        <SidebarProvider defaultOpen>
          <AppSidebar />
          <SidebarInset className="flex-1 flex flex-col min-h-screen">
            <div className="h-full flex flex-col relative">
              <div className="absolute top-4 left-4 z-10">
                <SidebarTrigger className="-ml-1" />
              </div>
              <main className="flex flex-1 flex-col w-full h-full">{children}</main>            
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
