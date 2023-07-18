import { updateDoctorProfile } from '@/api';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useUpdateDoctorProfileMutation = () => {
    const toast = useToast();
    return useMutation((params: Parameters<typeof updateDoctorProfile>[0]) => updateDoctorProfile(params), {
        onSuccess: data => {
            toast({
                title: 'Profile Updated!',
                status: 'success',
                isClosable: true,
            });
        },
        onError: (error) => {
            toast({
                title: error.response.data.errors.error[0],
                status: 'error',
                isClosable: true,
            })
        },
    });
};
