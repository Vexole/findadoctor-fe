"use client";
import { useAuthenticatedUserContext } from '@/context';
import { useLogoutMutation } from '@/hooks';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { useEffect } from "react";

const LogOut = () => {
    const router = useRouter();
    const logout = useLogoutMutation();
    const user = useAuthenticatedUserContext();

    useEffect(() => {
        const handleLogout = async () => {
            localStorage.removeItem('patient');
            if (user) {
                await logout.mutateAsync();
            }
            router.push("/");
        };

        handleLogout();
    }, []);

    return null;
}

export default dynamic(() => Promise.resolve(LogOut), {
    ssr: false,
})