import axiosInstance from '@/http/axiosInstance';
import { DoctorAvailability } from './getDoctorAvailability';

type DoctorAvailabilityParams = DoctorAvailability[];

export async function addDoctorAvailability(params: DoctorAvailabilityParams) {
  const { data } = await axiosInstance.post('/doctorAvailability/add-doctor-availability', params);
  return data.data;
}
