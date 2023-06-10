import { saveDoctorProfile } from '@/api';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useSaveDoctorProfileMutation = () => {
    const toast = useToast();
    return useMutation((params: Parameters<typeof saveDoctorProfile>[0]) => saveDoctorProfile(params), {
        onSuccess: data => {
            toast({
                title: 'Profile Saved!',
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
