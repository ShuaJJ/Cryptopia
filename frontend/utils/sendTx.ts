import { 
    Address, 
    BaseError, 
    ContractFunctionRevertedError, 
    PublicClient, 
    WalletClient 
} from "viem"
import { ContractInfo } from "./types"
import { toast } from "react-hot-toast"

export const sendTx = async (
    name: string,
    account: Address,
    contract: ContractInfo, 
    functionName: string,
    publicClient: PublicClient,
    walletClient: WalletClient,
    addRecentTransaction: (tx: { hash: string, description: string}) => void,
    args?: any[],
) => {
    const toastId = toast.loading(`${name} Pending Transaction...`);
    try {
        const { request } = await publicClient.simulateContract({
            account,
            ...contract,
            functionName,
            args,
        })
        const hash = await walletClient.writeContract(request);
        addRecentTransaction({
            hash,
            description: name,
        });
        const transaction = await publicClient.waitForTransactionReceipt({ hash });
        toast.dismiss(toastId);
        if (transaction.status === 'success') {
            toast.success(name + ' Successfully')
        } else {
            toast.error('Unknow Error');
            return false;
        }
        return true;
    } catch (err) {
        toast.dismiss(toastId);
        console.log('Transaction Error', err)
        if (err instanceof BaseError) {
          const revertError = err.walk(err => err instanceof ContractFunctionRevertedError)
          if (revertError instanceof ContractFunctionRevertedError) {
            const errorName = revertError.data?.errorName ?? ''
            toast(name+': '+errorName);
          } else {
            toast.error('Unknow Error');
          }
        } else {
            toast.error('Unknow Error');
        }
        return false;
    }
}