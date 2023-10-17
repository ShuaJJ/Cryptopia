import { Address } from "viem";
import { useContractRead } from "wagmi";
import { useUserContract } from "./useUserContract";

export const useIsVerified = (address?: Address) => {
    const userContract = useUserContract();
    const { data, isLoading, error, refetch } = useContractRead({
        ...userContract!,
        functionName: 'verified',
        args: [address],
        enabled: Boolean(userContract) && Boolean(address)
    });
    return { data, isLoading, error, refetch };
}