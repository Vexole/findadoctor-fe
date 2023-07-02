"use client";
import { useAuthenticatedUserContext } from '@/context';
import { useRouter } from 'next/navigation';

import { useEffect } from "react";
const UnderReview = () => {
    const router = useRouter();
    const authenticatedUser = useAuthenticatedUserContext();
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