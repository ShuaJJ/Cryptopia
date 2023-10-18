import { ChangeEvent, useRef, useState } from "react"
import MainButton from "../button/MainButton";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { storePost } from "@/utils/storePost";
import { TxProps } from "@/utils/types";
import { sendTx } from "@/utils/sendTx";


export default function UserInfo({ 
    web3StorageAccessToken,
    walletClient,
    publicClient,
    contract: userContract,
    account,
    refetch,
    addRecentTransaction,
} : TxProps) {

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File|undefined>();

    const fileRef = useRef<HTMLInputElement>(null);
    const fileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files![0])
    }
    const updateName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const updateDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(e.target.value);
    }

    const createPost = async () => {
        if (!file) {
            toast.error('Please upload your logo', { position: 'top-center' })
            return;
        }

        if (!name) {
            toast.error('Please provide your project\'s name', { position: 'top-center' })
            return;
        }

        if (!desc) {
            toast.error('Please provide your project\'s description and contact info', { position: 'top-center' })
            return;
        }

        if (!walletClient || !publicClient || !account) {
            toast.error('Please make sure you are connected', { position: 'top-center' })
            return;
        }

        const info = { name, description: desc };
        const blob = new Blob([JSON.stringify(info)], { type: 'application/json' })
        const files = [
            file,
            new File([blob], 'hello.json')
        ]

        setLoading(true);
        try {
            const cid = await storePost(web3StorageAccessToken, files);
            console.log('CID: ', cid);
            const success = await sendTx(
                "Store Project Info", 
                account, 
                userContract!, 
                'applyVerify', 
                publicClient, 
                walletClient, 
                addRecentTransaction,
                [cid]
            );
            if (success && refetch) {
                refetch();
            }
        } catch (e) {
            toast.error('Unknown Upload Error', { position: 'top-center' })
            console.log('Upload Error', e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center bg-white rounded-2xl w-80">
            <button 
                className="bg-gray-300 w-24 h-24 flex-inline items-center justify-center text-base rounded-full mb-6"
                onClick={() => { fileRef.current!.click() }}
            >
                {file ? (
                    <Image src={URL.createObjectURL(file)} alt='logo' width={96} height={96} />
                ) : <>LOGO</>}
            </button>
            <input hidden type="file" onChange={fileSelect} ref={fileRef} />

            <input 
                className="w-full text-center outline-none text-lg border-b border-gray-300 mb-6 pb-2" 
                placeholder="Your project's name" 
                type="text" 
                onChange={updateName}
                value={name}
            />

            <textarea 
                className="text-sm border border-gray-300 mb-6 p-2 w-full" 
                placeholder="Describe what's the project about(Please include some contact information)" 
                onChange={updateDesc}
                value={desc}
            />

            <MainButton
                onClick={createPost}
                loading={loading}
            >
                Submit for verification
            </MainButton>
        </div>
    )
}