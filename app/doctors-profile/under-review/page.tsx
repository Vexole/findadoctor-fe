"use client";
import { useAuthenticatedUserContext } from '@/context';
import { useLogoutMutation } from '@/hooks';
import { getUser } from '@/utils/userUtils';
import { useRouter } from 'next/navigation';

import { useEffect } from "react";
const UnderReview = () => {
    const router = useRouter();
    const logout = useLogoutMutation();
    const authenticatedUser = getUser();

    useEffect(() => {
        if (!authenticatedUser) {
            router.push("/auth/login");
        }
    }, []);

    return (
        <>
            <h1>Your Profile is Currently being Reviewed.</h1>
            <h2>We will contact you shortly with additional steps.</h2>
        </>
    );
}

export default UnderReview;