import { Chain } from '@wagmi/core'
import {
    polygonMumbai,
    arbitrumGoerli,
    scrollSepolia,
    mantleTestnet,
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
    polygonMumbai,
    arbitrumGoerli,
    scrollSepolia,
    mantleTestnet,
];

export const POST_TYPES = [
  "announcement",
  "event",
  "airdrop",
  "job",
]

export const POST_TITLES: any = {
  "announcement": "Please upload a cool image and enter your announcement content",
  "event": "Please upload the event poster and enter your event's description",
  "airdrop": "Please upload a poster of the airdrop and enter the rules of the airdrop",
  "job": "Please upload a cool image and describe the job(include contact info)",
}

export const contractPostType = (type: string) => {
  const postType = POST_TYPES.indexOf(type);
  return postType == -1 ? POST_TYPES.length : postType;
}

export const ipfsDomain = "ipfs.w3s.link";

export const graphUri = "https://api.studio.thegraph.com/query/49276/cryptopia-polygon/v0.0.1";