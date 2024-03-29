import { PatientProfileType } from '@/app/patient/create/page';
import axiosInstance from '@/http/axiosInstance';

export const createPatientProfile = async (data: PatientProfileType) => {
  try {
    await axiosInstance.post('/Patient/create-patient', data);
  } catch (error) {
    //@ts-ignore
    throw new Error(error);
  }
};
