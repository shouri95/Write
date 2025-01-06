import "./globals.css";
import { Roboto } from "next/font/google";
import type { Metadata } from "next";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "WriteAway",
  description: "Public layout (landing, etc.)",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} h-full`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
