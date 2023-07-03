import axiosInstance from '@/http/axiosInstance';

type UpdateDoctorAvailabilityParams = {
  availabilityId?: number;
  dayOfWeek: string;
  fromTime: string;
  toTime: string;
  appointmentLength: string;
  doctorId: string;
  isActive?: boolean;
}[];

export async function updateDoctorAvailability(params: UpdateDoctorAvailabilityParams) {
  const { data } = await axiosInstance.put(
    '/doctorAvailability/update-doctor-availability',
    params
  );
  return data.data;
}
