import axiosInstance from '@/http/axiosInstance';

export async function getPaitentAppointments(patientId: string) {
  const { data } = await axiosInstance.get(
    `/PatientAppointment/get-patient-appointment/${patientId}`
  );
  return data.data;
}

export async function getDoctorAppointments(doctorId: string) {
  const { data } = await axiosInstance.get(
    `/PatientAppointment/get-pending-appointment-doctor/${doctorId}`
  );
  return data.data;
}
