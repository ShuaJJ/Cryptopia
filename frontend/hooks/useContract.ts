import { ALL_CONTRACTS } from "@/utils/constants";
import { ContractInfo } from "@/utils/types";
import { useNetwork } from "wagmi";

export const useContract = (name: string): ContractInfo | null => {
    const { chain } = useNetwork();
    const chainId = chain?.id;
    const contract: any = (ALL_CONTRACTS as any)[name];
    if (chainId) {
        return {
            abi: contract.abi,
            address: contract.deployments[chainId.toString()]
        };
    }
    return null;
}