'use client'

import { ReactNode } from "react";

export default function MainButton({
    onClick,
    children,
} : {
    onClick: () => void,
    children: ReactNode,
}) {
    return (
        <div
            className="rounded-lg cursor-pointer bg-purple-dark text-white text-center py-3"
            onClick={() => { onClick() }}
        >
            {children}
        </div>
    )
}