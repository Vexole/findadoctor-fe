import { addDoctorAvailability } from '@/api';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDoctorAvailabilityMutation = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation((params: Parameters<typeof addDoctorAvailability>[0]) => addDoctorAvailability(params), {
    onSuccess: () => {
      toast({
        title: 'Doctor Availability Saved.',
        status: 'success',
        isClosable: true,
      });
      queryClient.invalidateQueries(["doctorAvailability"]);
    },
    onError: () =>
      toast({
        title: 'Doctor Availability Not Saved. Try Again Later.',
        status: 'error',
        isClosable: true,
      }),
  });
};
