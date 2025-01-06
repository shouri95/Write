import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '@/app/globals.css'
import '@/app/custom.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'WriteAway - Elevate Your Screenplay',
  description: 'Craft award-winning screenplays with WriteAway\'s premium writing experience',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${roboto.variable} font-sans antialiased bg-white text-black`}>
        {children}
      </body>
    </html>
  )
}

