import { ChangeEvent, useRef, useState } from "react"
import MainButton from "../button/MainButton";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { storePost } from "@/utils/storePost";
import { ConditionType, PushAPI, viemSignerType } from '@pushprotocol/restapi';
import { TxProps } from "@/utils/types";
import { sendTx } from "@/utils/sendTx";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import toBase64 from "@/utils/fileToBase64";


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
    const [website, setWebsite] = useState('');
    const [token, setToken] = useState('');
    const [contact, setContact] = useState('');
    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File|undefined>();

    const fileRef = useRef<HTMLInputElement>(null);
    const fileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files![0])
    }
    // 0 for name, 1 for website, 2 for token address, 3 for contact info
    const updateField = (e: ChangeEvent<HTMLInputElement>, field: number) => {
        const val = e.target.value;
        if (field == 0) {
            setName(val);
        } else if (field == 1) {
            setWebsite(val);
        } else if (field == 2) {
            setToken(val);
        } else {
            setContact(val);
        } 
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

        if (!website) {
            toast.error('Please provide your project\'s website url', { position: 'top-center' })
            return;
        }

        if (!token) {
            toast.error('Please provide your project\'s ERC20 token address', { position: 'top-center' })
            return;
        }

        if (!contact) {
            toast.error('Please provide your project\'s contact info', { position: 'top-center' })
            return;
        }

        if (!desc) {
            toast.error('Please provide your project\'s description ', { position: 'top-center' })
            return;
        }

        if (!walletClient || !publicClient || !account) {
            toast.error('Please make sure you are connected', { position: 'top-center' })
            return;
        }

        setLoading(true);
        try {

            const projectOwner = await PushAPI.initialize(walletClient as viemSignerType, {env: ENV.STAGING});
            const base64File = await toBase64(file);
            const tokenContract =  `eip155:${publicClient.chain?.id}:${token}`;
            const createdGroup = await projectOwner.chat.group.create(name, {
                description: desc,
                image: base64File as string,
                admins: [account],
                rules: {
                    "entry": {
                        conditions: {
                            all: [
                                {
                                    "type": ConditionType.PUSH, // define type that rules engine should go for
                                    "category": "ERC20", // define it's ERC20 token that you want to check, supports ERC721 as well
                                    "subcategory": "holder", // define if you are checking 'holder' or 'owner'
                                    "data": { 
                                      "contract": tokenContract,
                                      "comparison": ">=", // what comparison needs to pass
                                      "amount": 1, // amount that needs to passed
                                      "decimals": 18, // the decimals for the token
                                    }
                                  }
                            ]
                        }
                    },
                    "chat": {
                        conditions: {
                            all: [
                                {
                                    "type": ConditionType.PUSH, // define type that rules engine should go for
                                    "category": "ERC20", // define it's ERC20 token that you want to check, supports ERC721 as well
                                    "subcategory": "holder", // define if you are checking 'holder' or 'owner'
                                    "data": { 
                                      "contract": tokenContract,
                                      "comparison": ">=", // what comparison needs to pass
                                      "amount": 100, // amount that needs to passed
                                      "decimals": 18, // the decimals for the token
                                    }
                                  }
                            ]
                        }
                    },
                }
            });

            const chatId = createdGroup.chatId;

            const info = { 
                name, 
                description: desc,
                website,
                token,
                contact,
                chatId
            };
            const blob = new Blob([JSON.stringify(info)], { type: 'application/json' })
            const files = [
                file,
                new File([blob], 'content.json')
            ]

            const cid = await storePost(web3StorageAccessToken, files);
            console.log('Group Chat Id: ', chatId);
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
                placeholder="Name of your project" 
                type="text" 
                onChange={(e) => { updateField(e, 0) }}
                value={name}
            />
            <input 
                className="w-full text-center outline-none text-lg border-b border-gray-300 mb-6 pb-2" 
                placeholder="Website url" 
                type="text" 
                onChange={(e) => { updateField(e, 1) }}
                value={website}
            />
            <input 
                className="w-full text-center outline-none text-lg border-b border-gray-300 mb-6 pb-2" 
                placeholder="ERC20 Token address" 
                type="text" 
                onChange={(e) => { updateField(e, 2) }}
                value={token}
            />
            <input 
                className="w-full text-center outline-none text-lg border-b border-gray-300 mb-6 pb-2" 
                placeholder="Contact info" 
                type="text" 
                onChange={(e) => { updateField(e, 3) }}
                value={contact}
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
                Next
            </MainButton>
        </div>
    )
}