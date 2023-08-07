import { getDoctorAppointments } from '@/api/appointment';
import { getUserId } from '@/utils/userUtils';
import { useQuery } from '@tanstack/react-query';

export const useDoctorAppointmentsQuery = () => {
  const userId = getUserId();
  return useQuery(['appointments', userId], () => getDoctorAppointments(userId));
};
