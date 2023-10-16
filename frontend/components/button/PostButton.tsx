'use client'

import { useState } from "react";
import MainButton from "./MainButton";
import NewPost from "../post/NewPost";

export default function PostButton() {

    const [show, setShow] = useState(false);

    return <>
        <MainButton 
            onClick={() => {
                setShow(true);
            }}
        >
            New Post
        </MainButton>
        {show && <NewPost />}
    </>
}