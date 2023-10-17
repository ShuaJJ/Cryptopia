import { ALL_CONTRACTS } from "@/utils/constants";
import { ContractInfo } from "@/utils/types";
import { useNetwork } from "wagmi";

export const useUserContract = (): ContractInfo | null => {
    const { chain } = useNetwork();
    const chainId = chain?.id;
    const contract: any = ALL_CONTRACTS.User;
    if (chainId) {
        return {
            abi: contract.abi,
            address: contract.deployments[chainId.toString()]
        };
    }
    return null;
}