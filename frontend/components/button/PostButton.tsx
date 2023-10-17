'use client'

import { useState } from "react";
import MainButton from "./MainButton";
import NewPost from "../post/NewPost";
import { AccessTokenProps } from "@/utils/types";

export default function PostButton(props: AccessTokenProps) {

    const [show, setShow] = useState(false);

    return <>
        <MainButton 
            onClick={() => {
                setShow(true);
            }}
        >
            New Post
        </MainButton>
        {show && <NewPost { ...props } />}
    </>
}