import { updateDoctorAvailability } from '@/api';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateDoctorAvailabilityMutation = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation((params: Parameters<typeof updateDoctorAvailability>[0]) => updateDoctorAvailability(params), {
    onSuccess: () => {
      toast({
        title: 'Doctor Availability Updated.',
        status: 'success',
        isClosable: true,
      });
      queryClient.invalidateQueries(["doctorAvailability"]);
    },
    onError: () =>
      toast({
        title: 'Doctor Availability Not Updated. Try Again Later.',
        status: 'error',
        isClosable: true,
      }),
  });
};
