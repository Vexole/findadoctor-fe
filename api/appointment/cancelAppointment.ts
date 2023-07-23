import axiosInstance from '@/http/axiosInstance';

type CancelAppointmentParams = {
  appointmentId: string;
  doctorUserId: string;
  patientUserId: string;
};

export async function cancelAppointment(params: CancelAppointmentParams) {
  const { data } = await axiosInstance.delete('/PatientAppointment/cancel-appointment', {data: params});
  return data.data;
}
