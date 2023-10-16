import { Chain } from '@wagmi/core'
import {
    sepolia,
  } from 'wagmi/chains';
import * as AllContracts from "../contract/contracts.json";

export const ALL_CONTRACTS = AllContracts;
 
export const localhost = {
  id: 31_337,
  name: 'Localhost',
  network: 'localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['http://127.0.0.1:8545'] },
    default: { http: ['http://127.0.0.1:8545'] },
  },
  blockExplorers: {
    etherscan: { name: 'Etherscan', url: 'https://etherscan.io' },
    default: { name: 'Etherscan', url: 'https://etherscan.io' },
  },
} as const satisfies Chain

export const SUPPORTED_CHAINS = [
    sepolia,
    localhost
];

export const POST_TYPES = [
  "announcement",
  "event",
  "airdrop",
  "job",
]