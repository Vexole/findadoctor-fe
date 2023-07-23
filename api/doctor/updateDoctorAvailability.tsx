import axiosInstance from '@/http/axiosInstance';
import { DoctorAvailability } from './getDoctorAvailability';

type UpdateDoctorAvailabilityParams = DoctorAvailability[];

export async function updateDoctorAvailability(params: UpdateDoctorAvailabilityParams) {
  const { data } = await axiosInstance.put(
    '/doctorAvailability/update-doctor-availability',
    params
  );
  return data.data;
}
