import axiosInstance from '@/http/axiosInstance';

type DeleteDoctorAvailabilityParams = {
  availabilityId: number;
}

export async function deleteDoctorAvailability(params: DeleteDoctorAvailabilityParams) {
  const { data } = await axiosInstance.delete(`/doctorAvailability/delete-availability/`, {data: params});
  return data.data;
}