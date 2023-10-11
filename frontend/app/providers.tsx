import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ReactNode } from 'react';

export default function Providers({
    children
} : {
    children: ReactNode
}) {
    const { chains, publicClient } = configureChains(
        [mainnet, polygon],
        [
          publicProvider()
        ]
    );
      
    const { connectors } = getDefaultWallets({
        appName: 'My RainbowKit App',
        projectId: 'YOUR_PROJECT_ID',
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
                showRecentTransactions={true}
            >
                {children}
            </RainbowKitProvider>
      </WagmiConfig>
    )
}
