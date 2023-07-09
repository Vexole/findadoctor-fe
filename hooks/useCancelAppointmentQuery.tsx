import { cancelAppointment } from '@/api/appointment';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useCancelAppointmentMutation = () => {
    const toast = useToast();
    return useMutation((params: Parameters<typeof cancelAppointment>[0]) => cancelAppointment(params), {
        onSuccess: data => {
            toast({
                title: 'Appointment Canceled!',
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
