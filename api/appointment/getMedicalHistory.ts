import axiosInstance from '@/http/axiosInstance';

export async function getMedicalHistory(patientId: string) {
  const { data } = await axiosInstance.get(
    `/PatientAppointment/get-patient-medical-history/${patientId}`
  );
  return data.data;
}