import { ReactNode } from "react";

export default function Sidebar({
    isLeft = false,
    children,
} : {
    isLeft?: boolean,
    children: ReactNode,
}) {
    return (
        <div className={"absolute top-0 bottom-0 w-64 bg-gray-bgd " + (isLeft ? "left-0" : "right-0")}>
            {children}
        </div>
    )
}