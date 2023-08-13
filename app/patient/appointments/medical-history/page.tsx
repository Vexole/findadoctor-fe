"use client";
import { usePatientMedicalHistoryQuery } from "@/hooks/usePatientMedicalHistory";
import { Button, Spinner } from "@chakra-ui/react";
import { getUserId } from '@/utils/userUtils';

export default function MedicalHistory() {
    const patientId = getUserId();
    const { data: medicalHistory} = usePatientMedicalHistoryQuery(patientId);
    console.log(medicalHistory);

    return (
      <div>Helloo</div>
    );
}