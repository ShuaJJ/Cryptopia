import Image from "next/image";
import closeIcon from "@/public/close.png";

export default function Modal({
    close,
    children
} : {
    close?: () => void,
    children: React.ReactNode
}) {
    return (
        <div className="fixed left-0 right-0 top-0 bottom-0 backdrop-blur-sm bg-white/60 flex items-center justify-center">
            <div className="bg-white py-12 px-16 rounded-3xl relative">
                {close && <div 
                    className="absolute right-3 top-3 inline-block p-2 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        close();
                    }}
                >
                    <Image src={closeIcon} alt="close" width={16} height={16} />
                </div>}
                { children }
            </div>
        </div>
    )
}