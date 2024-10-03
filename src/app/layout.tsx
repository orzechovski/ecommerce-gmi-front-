import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeProvider'
import SessionProvider from '@/context/SessionProvider'
import QueryProvider from '@/context/QueryProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/options'
import { Toaster } from '@/components/ui/sonner'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GMI Shop',
  description: 'GMI ecommerce shop'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.4),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <QueryProvider>{children}</QueryProvider>
          </SessionProvider>
        </ThemeProvider>
        <Toaster
          richColors
          toastOptions={{
            closeButton: true
          }}
        />
      </body>
    </html>
  )
}
