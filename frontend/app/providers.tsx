'use client'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { ReactNode } from 'react';
import { SUPPORTED_CHAINS } from '@/utils/constants';

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
        SUPPORTED_CHAINS,
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
                locale='en'
                showRecentTransactions={true}
                theme={lightTheme({
                    accentColor: '#F1EBFE',
                    accentColorForeground: '#925CFF',
                })}
            >
                {children}
            </RainbowKitProvider>
      </WagmiConfig>
    )
}
