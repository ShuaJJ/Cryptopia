'use client'

import { ReactNode } from "react";

export default function MainButton({
    loading = false,
    onClick,
    children,
} : {
    loading?: boolean,
    onClick: () => void,
    children: ReactNode,
}) {
    return (
        <div
            className={"rounded-lg cursor-pointer text-white text-center py-3 px-6 w-full " + (loading ? "bg-purple-dark/80" : "bg-purple-dark")}
            onClick={() => { 
                if (!loading) {
                    onClick();
                }
            }}
        >
            { loading ? <>Loading...</> : children}
        </div>
    )
}