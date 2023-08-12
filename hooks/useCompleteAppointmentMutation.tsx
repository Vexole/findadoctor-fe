import { completeAppointment } from '@/api/appointment';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useCompleteAppointmentMutation = () => {
    const toast = useToast();
    return useMutation((params: Parameters<typeof completeAppointment>[0]) => completeAppointment(params), {
        onSuccess: () => {
            toast({
                title: 'Appointment Completed!',
                status: 'success',
                isClosable: true,
            });
        },
        onError: () =>
            toast({
                title: 'Something went wrong. Try Again Later.',
                status: 'error',
                isClosable: true,
            }),
    });
};
