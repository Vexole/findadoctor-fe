import axiosInstance from '@/http/axiosInstance';
import { Appointment } from '@/models/Appointment';

export async function updateAppointment(params: Appointment) {
    const { data } = await axiosInstance.put('/PatientAppointment/update-appointment', params);
    return data.data;
}
