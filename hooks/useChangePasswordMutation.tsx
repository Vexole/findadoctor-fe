import * as api from '@/api';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useChangePasswordMutation = () => {
    const toast = useToast();

    const changePassword = useMutation(
        (params: Parameters<typeof api.changePassword>[0]) => api.changePassword(params),
        {
            onSuccess: () =>
                toast({
                    title: 'Password Changed.',
                    status: 'success',
                    isClosable: true,
                }),
            onError: (e: any) => {
                debugger
                toast({
                    title: e.response.data.errors.error[0] || 'Something Went Wrong. Try Again Later.',
                    status: 'error',
                    isClosable: true,
                })
            },
        }
    );

    return { changePassword };
};
