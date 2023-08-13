import axiosInstance from '@/http/axiosInstance';
import { Appointment } from '@/models/Appointment';

type CompleteAppointmentParams = {
  appointmentId: string;
  doctorUserId: string;
  medicalHistory: { notes: string; treatment: string; condition: string; dateOfTreatment: string };
};

export async function completeAppointment(params: CompleteAppointmentParams) {
  const { data } = await axiosInstance.put('/PatientAppointment/complete-appointment', params);
  return data.data;
}
