import { rejectDoctor } from '@/api';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useRejectDoctorMutation = () => {
    const toast = useToast();
    return useMutation((params: Parameters<typeof rejectDoctor>) => rejectDoctor(params[0], params[1]), {
        onSuccess: data => {
            toast({
                title: 'Doctor Rejected!',
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
