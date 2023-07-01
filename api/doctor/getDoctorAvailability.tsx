import axiosInstance from '@/http/axiosInstance';

export async function getDoctorAvailability(doctorId: string) {
  const { data } = await axiosInstance.get(
    `/doctorAvailability/get-doctor-availability/${doctorId}`
  );
  return data.data;
}
