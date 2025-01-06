import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import "../globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "WriteAway - Protected Area",
  description: "User must be logged in to see this",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // If there's no session, redirect user to sign in.
  if (!session) {
    redirect("/(auth)/sign-in");
  }

  return (
    <html lang="en" className={`${roboto.variable} h-full`}>
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
