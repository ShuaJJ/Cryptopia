import { Address } from "viem";
import { useContractRead } from "wagmi";
import { useContract } from "./useContract";

export const useIsVerified = (address?: Address) => {
    const userContract = useContract('User');
    const { data, isLoading, error, refetch } = useContractRead({
        ...userContract!,
        functionName: 'verified',
        args: [address],
        enabled: Boolean(userContract) && Boolean(address)
    });
    return { data, isLoading, error, refetch };
}