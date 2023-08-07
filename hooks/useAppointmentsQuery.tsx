import { getDoctorAvailability } from '@/api';
import { getUserId } from '@/utils/userUtils';
import { useQuery } from '@tanstack/react-query';

export const useAppointmentsQuery = () => {
  const userId = getUserId();
  return useQuery(['appointments', userId], () => getDoctorAvailability(userId));
};
