import { getDoctorProfile } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useDoctorProfileQuery = () => {
    const authenticatedUser = localStorage.user ? JSON.parse(localStorage.user) : {};
    const userId = authenticatedUser?.userId;
    return useQuery(["doctor", userId], () => getDoctorProfile(userId));
};