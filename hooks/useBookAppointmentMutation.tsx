import { bookAppointment } from '@/api';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useBookAppointmentMutation = () => {
    const toast = useToast();
    return useMutation((params: Parameters<typeof bookAppointment>[0]) => bookAppointment(params), {
        onSuccess: data => {
            toast({
                title: 'Appointment Booked!',
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
