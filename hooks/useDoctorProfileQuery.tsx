import { getDoctorProfile } from "@/api";
import { getUserId } from "@/utils/userUtils";
import { useQuery } from "@tanstack/react-query";

export const useDoctorProfileQuery = () => {
    const userId = getUserId();
    return useQuery(["doctor", userId], () => getDoctorProfile(userId));
};