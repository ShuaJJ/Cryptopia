'use client'

import { useState, useEffect, ReactNode } from "react";
import { useAccount } from "wagmi";
import Onboard from "./Onboard";
import { useSupportedChain } from "@/hooks/useSupportedChain";

export default function WithUserConnect({ children } : { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const { address } = useAccount();
    const isSupportedChain = useSupportedChain();

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null;
    }

    if (!address || !isSupportedChain) {
        return <Onboard />
    }

    return <>{ children }</>
}