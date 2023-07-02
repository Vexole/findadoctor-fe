"use client";
import { logOut } from "@/utils/userUtils";
import { useEffect } from "react";
import { useAuthenticatedUserContext } from '@/context';
import { useRouter } from 'next/navigation';

const Confirmation = () => {
    const router = useRouter();
    const authenticatedUser = useAuthenticatedUserContext();
    useEffect(() => {
        if (!authenticatedUser) {
            router.push("/auth/login");
        }
        logOut();
    }, []);

    return (
        <>
            <h1>Profile Created Successfully.</h1>
            <h2>We will contact you shortly with additional steps.</h2>
        </>
    );
}

export default Confirmation;