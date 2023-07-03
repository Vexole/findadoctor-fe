import axiosInstance from '@/http/axiosInstance';

type DoctorAvailabilityParams = {
  dayOfWeek: string;
  fromTime: string;
  toTime: string;
  appointmentLength: string;
  doctorId: string;
}[];

export async function addDoctorAvailability(params: DoctorAvailabilityParams) {
  const { data } = await axiosInstance.post('/doctorAvailability/add-doctor-availability', params);
  return data.data;
}
