import { useIsVerified } from "@/hooks/useIsVerified";
import { NewPostProps, PostType, TxProps } from "@/utils/types";
import { useState } from "react";
import TypeSelect from "./TypeSelect";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { useContract } from "@/hooks/useContract";
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import backIcon from "@/public/back.svg";
import Image from "next/image";
import UserInfo from "../user/UserInfo";
import PostForm from "./PostForm";
import { POST_TITLES } from "@/utils/constants";
import Modal from "../Modal";
import SismoConnect from "../user/SismoConnect";
import { sendTx } from "@/utils/sendTx";
import toast from "react-hot-toast";

export default function NewPost({
    web3StorageAccessToken,
    setShow,
} : NewPostProps) {

    const { data: walletClient } = useWalletClient()
    const publicClient = usePublicClient();
    const userContract = useContract('User');
    const postContract = useContract('Post');
    const addRecentTransaction = useAddRecentTransaction();
    const { address } = useAccount();
    const { data: isVerified, refetch: refetchVerified } = useIsVerified(address);
    const [type, setType] = useState<PostType|undefined>(undefined);

    const selectType = (selected: PostType) => {
        setType(selected);
    }

    let title;
    if (isVerified == 0) {
        title = 'Please verify you are a project owner first'
    } else if (isVerified == 1) {
        title = 'Please verify you starred ShuaJJ/Cryptopia repo via Sismo Connect to finish verification'
    } else if (type) {
        title = POST_TITLES[type] ?? 'Please upload a cool image and enter the content';
    } else {
        title = 'Please select a post type';
    }

    const refetch = () => {
        refetchVerified();
    }

    const refetchPosts = () => {
        setShow(false);
    }

    const props: TxProps = {
        walletClient,
        publicClient,
        account: address,
        addRecentTransaction,
        web3StorageAccessToken,
    }

    const userProps = { ...props, contract: userContract, refetch };
    const postProps = { ...props, contract: postContract, type: type ?? 'announcement', refetch: refetchPosts };

    const verifySismo = async (response: string) => {
        if (!walletClient || !publicClient || !address || !userContract) {
            toast.error('Please make sure you are connected', { position: 'top-center' })
            return;
        }

        const verified = await sendTx(
            'Verify Github Star',
            address,
            userContract,
            'verifySismoConnectResponse',
            publicClient,
            walletClient,
            addRecentTransaction,
            [response]
        );

        if (verified) {
            refetch();
        }
    }

    const modalBody = () => {
        if (isVerified == 0) {
            return <UserInfo { ...userProps } />
        } else if (isVerified == 1) {
            return <SismoConnect callback={verifySismo} />
        } else if (type) {
            return <PostForm { ...postProps } />
        }

        return <TypeSelect onSelect={selectType} />
    }


    return (
        <Modal close={() => {
            setType(undefined);
            setShow(false);
        }}>
            {type && (
                <div 
                    className="absolute left-3 top-3 inline-block p-4"
                    onClick={() => { 
                        setType(undefined);
                    }}
                >
                    <Image src={backIcon} alt="back" />
                </div>
            )}
            <div className="text-center text-xl mb-6 font-semibold max-w-xs mt-8">
                {title}
            </div>
            {modalBody()}
        </Modal>
    )
}