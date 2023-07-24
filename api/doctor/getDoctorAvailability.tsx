import axiosInstance from '@/http/axiosInstance';
import { ApiPayload } from '../common';

type DoctorAvailabilityBase = {
  availabilityId?: number;
  dayOfWeek: string;
  fromTime: string;
  toTime: string;
  appointmentLength: string;
  doctorId?: string;
  isActive?: boolean;
  staffId?: string;
};

export type DoctorAvailability =
  | (DoctorAvailabilityBase & {
      doctorId: string;
    })
  | (DoctorAvailabilityBase & {
      staffId: string;
    });

export async function getDoctorAvailability(doctorId: string) {
  const { data } = await axiosInstance.get<ApiPayload<DoctorAvailability>>(
    `/doctorAvailability/get-doctor-availability/${doctorId}`
  );
  return data.data;
}
