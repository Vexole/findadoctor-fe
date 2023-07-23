import { getPatientProfile } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const usePatientProfileQuery = (patientId: string) => {
    return useQuery(["patient", patientId], () => getPatientProfile());
};