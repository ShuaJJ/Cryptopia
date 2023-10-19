'use client'

import { ReactNode } from "react";

export default function MainButton({
    loading = false,
    secondary = false,
    onClick,
    children,
} : {
    loading?: boolean,
    secondary?: boolean,
    onClick: () => void,
    children: ReactNode,
}) {
    return (
        <div
            className={"rounded-lg cursor-pointer text-center py-3 px-6 w-full " + 
                (loading ? "bg-purple-dark/80 text-white" : (secondary ? "bg-purple-light text-purple-dark" : "bg-purple-dark text-white"))
            }
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