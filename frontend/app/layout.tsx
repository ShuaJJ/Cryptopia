import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './providers'
import Sidebar from '@/components/layout/Sidebar'

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
      <body className={inter.className}>
        <Providers 
          walletConnectId={process.env.WALLET_CONNECT_ID ?? ''} 
          infuraKey={process.env.INFURA_PROJECT_ID ?? ''}
        >
          <div className="min-h-screen max-w-screen-xl relative mx-auto">
            <Sidebar isLeft>
              CCCC
            </Sidebar>
            {children}
            <Sidebar>BBB</Sidebar>
          </div>
        </Providers>
      </body>
    </html>
  )
}
