import { getSharedPatientProfile } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useSharedPatientProfileQuery = (patientId: string) => {
    return useQuery(["doctor", patientId], () => getSharedPatientProfile(patientId));
};