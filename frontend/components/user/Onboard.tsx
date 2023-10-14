'use client'

import { useUserInfo } from '@/hooks/useUserInfo';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import UserInfo from './UserInfo';

export default function Onboard() {

    const [mounted, setMounted] = useState(false);
    const { address } = useAccount();
    const { data: userInfo, isLoading } = useUserInfo(address);

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null;
    }

    return (
        <div className="h-screen bg-social bg-no-repeat bg-cover bg-center">
            <div className="backdrop-blur-sm bg-white/40 w-full h-screen items-center justify-center flex">
                {!address && <ConnectButton />}
                {address && isLoading && <div>...</div>}
                <UserInfo />
            </div>
        </div>
    )
}