import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Onboard() {

    return (
        <div className="h-screen bg-social bg-no-repeat bg-cover bg-center">
            <div className="backdrop-blur-sm bg-white/40 w-full h-screen items-center justify-center flex">
                <ConnectButton />
            </div>
        </div>
    )
}