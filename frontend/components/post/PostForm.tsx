import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import MainButton from "../button/MainButton";
import { PostFormProps } from "@/utils/types";
import toast from "react-hot-toast";
import { sendTx } from "@/utils/sendTx";
import { storePost } from "@/utils/storePost";
import { POST_TYPES, contractPostType } from "@/utils/constants";

export default function PostForm({ 
    web3StorageAccessToken,
    walletClient,
    publicClient,
    contract: postContract,
    account,
    refetch,
    addRecentTransaction,
    type
} : PostFormProps) {

    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File|undefined>();

    const fileRef = useRef<HTMLInputElement>(null);
    const fileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files![0])
    }

    const updateContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    const createPost = async () => {
        if (!file) {
            toast.error('Please upload a nice image', { position: 'top-center' })
            return;
        }

        if (!content) {
            toast.error('Please fill in the content', { position: 'top-center' })
            return;
        }

        if (!walletClient || !publicClient || !account) {
            toast.error('Please make sure you are connected', { position: 'top-center' })
            return;
        }

        const info = { content, type };
        const blob = new Blob([JSON.stringify(info)], { type: 'application/json' })
        const files = [
            file,
            new File([blob], 'content.json')
        ]

        setLoading(true);
        try {
            const cid = await storePost(web3StorageAccessToken, files);
            console.log('CID: ', cid);
            const success = await sendTx(
                "Create Post", 
                account, 
                postContract!, 
                'createPost', 
                publicClient, 
                walletClient, 
                addRecentTransaction,
                [cid, contractPostType(type)]
            );
            if (success && refetch) {
                setFile(undefined)
                setContent('')
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
        <div>
            <div className="flex flex-col items-center bg-white rounded-2xl w-80">
            <button 
                className="bg-gray-200 w-full aspect-video flex-inline items-center justify-center text-base rounded-lg mb-6"
                onClick={() => { fileRef.current!.click() }}
            >
                {file ? (
                    <div className="w-80 h-60 relative">
                        <Image src={URL.createObjectURL(file)} alt='logo' fill className="object-cover rounded-lg" />
                    </div>
                ) : <>Nice Image</>}
            </button>
            <input hidden type="file" onChange={fileSelect} ref={fileRef} />

            <textarea 
                className="text-sm border border-gray-300 mb-6 p-2 w-full h-32" 
                onChange={updateContent}
                value={content}
            />

            <MainButton
                onClick={createPost}
                loading={loading}
            >
                Create Post
            </MainButton>
        </div>
        </div>
    )
}