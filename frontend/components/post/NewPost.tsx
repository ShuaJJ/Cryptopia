import { useIsVerified } from "@/hooks/useIsVerified";
import { PostType } from "@/utils/types";
import { useState } from "react";
import { Address } from "viem";
import TypeSelect from "./TypeSelect";
import { useUserInfo } from "@/hooks/useUserInfo";
import backIcon from "@/public/back.svg";
import Image from "next/image";
import UserInfo from "../user/UserInfo";
import PostForm from "./PostForm";

export default function NewPost({
    address,
} : {
    address?: Address
}) {

    const { data: userInfo } = useUserInfo(address);
    const { data: isVerified } = useIsVerified(address);
    const [type, setType] = useState<PostType|undefined>(undefined);
    const [needVerify, setNeedVerify] = useState(false)

    const selectType = (selected: PostType) => {
        setType(selected);
        if (selected !== 'post' && !isVerified) {
            setNeedVerify(true)
        }
    }

    let title;
    if (needVerify) {
        title = isVerified == 0 ? 'Please verify you are a project owner first' : 'Please wait to be verified'
    } else if (type) {
        title = 'Please upload a cool high resolution image and enter the content';
    } else {
        title = 'Please select a post type';
    }

    const modalBody = () => {
        if (needVerify && isVerified == 0) {
            return <UserInfo />
        }else if (!needVerify && type) {
            return <PostForm />
        } else if (!type) {
            return <TypeSelect onSelect={selectType} />
        }

        return null;
    }


    return (
        <div className="absolute left-0 right-0 top-0 bottom-0 backdrop-blur-sm bg-white/40 flex items-center justify-center">
            <div className="bg-white py-12 px-16 rounded-3xl relative">
                {type && (
                    <div 
                        className="absolute left-3 top-3 inline-block p-4"
                        onClick={() => { 
                            setType(undefined);
                            setNeedVerify(false); 
                        }}
                    >
                        <Image src={backIcon} alt="back" />
                    </div>
                )}
                <div className="text-center text-xl mb-6 font-semibold max-w-sm">
                    {title}
                </div>
                {modalBody()}
            </div>
        </div>
    )
}