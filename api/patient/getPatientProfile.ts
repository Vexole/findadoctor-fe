import axiosInstance from '@/http/axiosInstance';
import { getUser } from '@/utils/userUtils';

export const getPatientProfile = async () => {
  const authenticatedUser = getUser();
  const userId = authenticatedUser?.userId;

  const { data } = await axiosInstance.get<{ data: any }>(`/Patient/get-patient-profile/${userId}`);

  return data.data;
};

export const getSharedPatientProfile = async (patientId: string) => {
  const authenticatedUser = getUser();
  const userId = authenticatedUser?.userId;
  const { data } = await axiosInstance.get<{ data: any }>
  (`/Doctor/get-patient-detail?DoctorId=${userId}&PatientId=${patientId}`);
  return data.data;
}