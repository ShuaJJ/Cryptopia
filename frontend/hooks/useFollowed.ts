import { Address } from "viem";
import { useContractRead } from "wagmi";
import { useContract } from "./useContract";

export const useFollowed = (target: Address, address?: Address) => {
    const userContract = useContract('User');
    const { data, isLoading, error, refetch } = useContractRead({
        ...userContract!,
        functionName: 'followed',
        args: [address, target],
        enabled: Boolean(userContract) && Boolean(address)
    });
    return { data, isLoading, error, refetch };
}