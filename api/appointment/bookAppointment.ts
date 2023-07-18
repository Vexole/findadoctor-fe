import axiosInstance from '@/http/axiosInstance';
import { Appointment } from '@/models/Appointment';


export async function bookAppointment(params: Appointment) {
  const { data } = await axiosInstance.post('/PatientAppointment/request-appointment', params);
  return data.data;
}
