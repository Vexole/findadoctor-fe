import axiosInstance from '@/http/axiosInstance';

type BookAppointmentParams = { userId: string; date: string; doctorId: string};

export async function bookAppointment(params: BookAppointmentParams) {
  const { data } = await axiosInstance.post('/Patient/bookAppointment', params);
  return data.data;
}
