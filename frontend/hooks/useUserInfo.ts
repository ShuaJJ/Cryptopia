import { Address } from "viem";
import { useContractRead } from "wagmi";
import { useUserContract } from "./useUserContract";

export const useUserInfo = (address?: Address) => {
    const userContract = useUserContract();
    const { data, isLoading, error } = useContractRead({
        ...userContract!,
        functionName: 'userInfo',
        args: [address],
        enabled: Boolean(userContract) && Boolean(address)
    });
    return { data, isLoading };
}