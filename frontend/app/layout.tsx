import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './providers'
import TopMenu from '@/components/layout/TopMenu'
import WhiteBox from '@/components/layout/WhiteBox'
import PostButton from '@/components/button/PostButton'

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
      <body className={inter.className + " bg-gray-bgd pt-24"}>
        <Providers 
          walletConnectId={process.env.WALLET_CONNECT_ID ?? ''} 
          infuraKey={process.env.INFURA_PROJECT_ID ?? ''}
        >
          <TopMenu />
          <div className="min-h-screen max-w-screen-xl relative mx-auto grid grid-cols-[1fr_2fr_1fr]">
            <div>
              <WhiteBox>AAA</WhiteBox>
              <WhiteBox>BBB</WhiteBox>
              <WhiteBox>CCC</WhiteBox>
            </div>
            <div>{children}</div>
            <div>
              <WhiteBox>
                <PostButton />
              </WhiteBox>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
