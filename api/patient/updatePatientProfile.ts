import { PatientProfileType } from '@/app/patient/create/page';
import axiosInstance from '@/http/axiosInstance';

export const updatePatientProfile = async (data: PatientProfileType) => {
  try {
    await axiosInstance.put('/Patient/update-patient', data);
  } catch (error) {
    //@ts-ignore
    throw new Error(error);
  }
};
