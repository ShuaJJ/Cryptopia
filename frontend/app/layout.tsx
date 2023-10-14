import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './providers'
import TopMenu from '@/components/layout/TopMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cryptopia',
  description: 'Social platform for web3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-bgd"}>
        <Providers 
          walletConnectId={process.env.WALLET_CONNECT_ID ?? ''} 
          infuraKey={process.env.INFURA_PROJECT_ID ?? ''}
        >
          <TopMenu />
          <div className="min-h-screen max-w-screen-xl relative mx-auto pt-20">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
