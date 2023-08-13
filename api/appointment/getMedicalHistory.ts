import axiosInstance from '@/http/axiosInstance';
import { ApiPayload } from '../common';

export type MedicalHistoryPayload = {
  condition: string;
  createDate: string;
  dateOfTreatment: string;
  doctorId: string;
  doctorName: string;
  notes: string;
  patientId: string;
  patientName: string;
  treatment: string;
}

export async function getMedicalHistory(patientId: string) {
  const { data } = await axiosInstance.get<ApiPayload<MedicalHistoryPayload>>(
    `/PatientAppointment/get-patient-medical-history/${patientId}`
  );
  return data.data;
}