import { saveDoctorProfile } from '@/api';
import { ErrorResponse } from '@/models/ErrorResponse';
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
        onError: (error: ErrorResponse) => {
            toast({
                title: error.response.data.errors.error[0],
                status: 'error',
                isClosable: true,
            })
        },
    });
};
