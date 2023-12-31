import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import {ProductWithPrice} from "@/types";

const figtree = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Spotify Clone',
  description: 'spotify clone',
}

export const revalidate = 0;

export default async function RootLayout({children,}: {
  children: React.ReactNode
}) {
    const userSongs = await getSongsByUserId();
    const products = await getActiveProductsWithPrices()

  return (
    <html lang="en">
      <body className={figtree.className}>
      <ToasterProvider/>
      <SupabaseProvider>
          <UserProvider>
              <ModalProvider prod={products}/>
              <Sidebar songs={userSongs}>
                {children}
              </Sidebar>
              <Player />
          </UserProvider>
      </SupabaseProvider>
      </body>
    </html>
  )
}
