import { addDoctorAvailability } from '@/api';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useDoctorAvailabilityMutation = () => {
  const toast = useToast();
  return useMutation((params: Parameters<typeof addDoctorAvailability>[0]) => addDoctorAvailability(params), {
    onSuccess: () =>
      toast({
        title: 'Doctor Availability Saved.',
        description: 'Check your email to confirm your account.',
        status: 'success',
        isClosable: true,
      }),
    onError: () =>
      toast({
        title: 'Doctor Availability Not Saved. Try Again Later.',
        status: 'error',
        isClosable: true,
      }),
  });
};
