import { DoctorStaffProfileType } from '@/app/doctors-profile/add-staff/page';
import axiosInstance from '@/http/axiosInstance';

export const createDoctorStaff = async (data: DoctorStaffProfileType) => {
  try {
    await axiosInstance.post('/Doctor/create-doctor-staff', data);
  } catch (error) {
    //@ts-ignore
    throw new Error(error);
  }
};
