import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Layout from "./components/Layout"
import ClientOnly from "./components/ClientOnly"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "auth-form-next",
  description: "description",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ backgroundColor: "#202020" }}>
      <body className={inter.className}>
        <ClientOnly>
          <Layout>{children}</Layout>
        </ClientOnly>
      </body>
    </html>
  )
}
