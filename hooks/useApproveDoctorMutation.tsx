import { approveDoctor } from '@/api';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useApproveDoctorMutation = () => {
    const toast = useToast();
    return useMutation((params: Parameters<typeof approveDoctor>[0]) => approveDoctor(params), {
        onSuccess: data => {
            toast({
                title: 'Doctor Approved!',
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
