import { getSharedDoctorProfile } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useSharedDoctorProfileQuery = (doctorId: string) => {
    return useQuery(["doctor", doctorId], () => getSharedDoctorProfile(doctorId));
};