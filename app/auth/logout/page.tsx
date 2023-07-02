"use client";
import { logOut } from '@/utils/userUtils';
import { useRouter } from 'next/navigation';

import { useEffect } from "react";

const LogOut = () => {
    const router = useRouter();

    useEffect(() => {
        logOut();
        router.push("/");
    }, [])
}

export default LogOut;