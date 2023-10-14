'use client'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
} from 'wagmi/chains';
import { localhost } from '@/utils/constants';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { ReactNode } from 'react';

export default function Providers({
    infuraKey,
    walletConnectId,
    children
} : {
    infuraKey: string,
    walletConnectId: string,
    children: ReactNode
}) {
    const { chains, publicClient } = configureChains(
        [mainnet, polygon, localhost],
        [infuraProvider({ apiKey: infuraKey }), publicProvider()],
    );
      
    const { connectors } = getDefaultWallets({
        appName: 'Cryptopia',
        projectId: walletConnectId,
        chains
    });
    
    const wagmiConfig = createConfig({
        autoConnect: true,
        connectors,
        publicClient
    })

    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider 
                chains={chains}
                initialChain={localhost}
                showRecentTransactions={true}
                theme={lightTheme({
                    accentColor: '#032F96',
                    accentColorForeground: '#06F3F7',
                })}
            >
                {children}
            </RainbowKitProvider>
      </WagmiConfig>
    )
}
