import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";

const figtree = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Spotify Clone',
  description: 'spotify clone',
}

export default function RootLayout({children,}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={figtree.className}>
      <SupabaseProvider>
          <UserProvider>
              <Sidebar>
                {children}
              </Sidebar>
          </UserProvider>
      </SupabaseProvider>
      </body>
    </html>
  )
}