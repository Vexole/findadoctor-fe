import { updateAppointment } from '@/api/appointment';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useUpdateAppointmentMutation = () => {
  const toast = useToast();
  return useMutation(
    (params: Parameters<typeof updateAppointment>[0]) => updateAppointment(params),
    {
      onError: () =>
        toast({
          title: 'Something went wrong. Try Again Later.',
          status: 'error',
          isClosable: true,
        }),
    }
  );
};
