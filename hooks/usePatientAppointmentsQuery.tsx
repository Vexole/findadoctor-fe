import { getPaitentAppointments } from '@/api/appointment';
import { getUserId } from '@/utils/userUtils';
import { useQuery } from '@tanstack/react-query';

export const usePatientAppointmentsQuery = () => {
  const userId = getUserId();
  return useQuery(['appointments', userId], () => getPaitentAppointments(userId));
};
