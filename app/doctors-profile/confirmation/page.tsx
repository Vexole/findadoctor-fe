"use client";
import { getUser } from "@/utils/userUtils";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useLogoutMutation } from "@/hooks";

const Confirmation = () => {
    const router = useRouter();
    const logout = useLogoutMutation();
    const authenticatedUser = getUser();

    useEffect(() => {
        if (!authenticatedUser) {
            router.push("/auth/login");
        }

        const handleLogout = async () => {
            if (authenticatedUser.role === 'DoctorUnderReview') {
                await logout.mutateAsync();
            }
        };

        // handleLogout();
    }, []);

    return (
        <>
            <h1>Profile Updated Successfully.</h1>
            {!authenticatedUser.isProfileComplete && <h2>We will contact you shortly with additional steps.</h2>}
        </>
    );
}

export default Confirmation;