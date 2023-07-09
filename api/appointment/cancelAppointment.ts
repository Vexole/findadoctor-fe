import axiosInstance from '@/http/axiosInstance';

type CancelAppointmentParams = { appointmentId: string; };

export async function cancelAppointment(params: CancelAppointmentParams) {
    const { data } = await axiosInstance.delete('/PatientAppointment/cancel-appointment');
    return data.data;
}
