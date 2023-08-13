
import { getMedicalHistory } from "@/api/appointment";
import { useQuery } from "@tanstack/react-query";

export const usePatientMedicalHistoryQuery = (patientId: string) => {
    return useQuery(["patient", patientId], () => getMedicalHistory(patientId));
};