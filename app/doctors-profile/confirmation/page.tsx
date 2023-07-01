"use client";
import { logOut } from "@/utils/userUtils";
import { useEffect } from "react";

const Confirmation = () => {
    useEffect(() => {
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