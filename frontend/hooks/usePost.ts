import { useContractRead } from "wagmi";
import { useContract } from "./useContract";

export const usePost = (index: number) => {
    const userContract = useContract('Post');
    const { data, isLoading, error } = useContractRead({
        ...userContract!,
        functionName: 'allPosts',
        args: [index],
        enabled: Boolean(userContract)
    });
    return { data, isLoading, error };
}