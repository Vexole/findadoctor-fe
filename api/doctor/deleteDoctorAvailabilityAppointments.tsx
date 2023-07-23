import axiosInstance from '@/http/axiosInstance';

type DeleteDoctorAvailabilityAppointmentsParams = {
  availabilityId: number;
  cancellationMessage: string;
}

export async function deleteDoctorAvailabilityAppointments(params: DeleteDoctorAvailabilityAppointmentsParams) {
  const { data } = await axiosInstance.delete('/doctorAvailability/delete-availability', {data: params});
  return data.data;
}