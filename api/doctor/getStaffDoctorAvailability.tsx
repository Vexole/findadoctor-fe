import axiosInstance from '@/http/axiosInstance';
import { ApiPayload } from '../common';
import { DoctorAvailability } from '.';

export async function getStaffDoctorAvailability(staffId: string) {
  const { data } = await axiosInstance.get<ApiPayload<DoctorAvailability>>(
    `/staff/get-doctor-availability/${staffId}`
  );
  return data.data;
}
