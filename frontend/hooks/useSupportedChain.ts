import { SUPPORTED_CHAINS } from "@/utils/constants";
import { useNetwork } from "wagmi"

export const useSupportedChain = () => {
    const { chain } = useNetwork();
    if (chain) {
        return SUPPORTED_CHAINS.filter((c) => c.id == chain.id).length > 0;
    }
    return false;
}