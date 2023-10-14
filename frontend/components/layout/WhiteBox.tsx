import { ReactNode } from "react";

export default function WhiteBox({ children } : { children: ReactNode }) {
    return (
        <div className="bg-white rounded-2xl p-6 min-h-[100px] mb-6">
            {children}
        </div>
    )
}