import { Address } from "viem";
import { useContractRead } from "wagmi";
import { useContract } from "./useContract";

export const useUserInfo = (address?: Address) => {
    const userContract = useContract('User');
    const { data, isLoading, error } = useContractRead({
        ...userContract!,
        functionName: 'userInfo',
        args: [address],
        enabled: Boolean(userContract) && Boolean(address)
    });
    return { data, isLoading, error };
}