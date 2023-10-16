import Image from "next/image";
import logo from "@/public/logo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function TopMenu() {
    return (
        <div className="fixed top-0 left-0 right-0 bg-white z-50">
            <div className="max-w-screen-xl h-16 mx-auto flex justify-between items-center">
                <Image src={logo} alt="logo" width={120} />
                <ConnectButton />
            </div>
        </div>
    )
}