import { deleteDoctorAvailability } from '@/api';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteDoctorAvailabilityMutation = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation((params: Parameters<typeof deleteDoctorAvailability>[0]) => deleteDoctorAvailability(params), {
    onSuccess: () => {
      toast({
        title: 'Doctor Availability Deleted.',
        status: 'success',
        isClosable: true,
      });
      queryClient.invalidateQueries(["doctorAvailability"]);
    },
    onError: () =>
      toast({
        title: 'Doctor Availability Not Deleted. Try Again Later.',
        status: 'error',
        isClosable: true,
      }),
  });
};
