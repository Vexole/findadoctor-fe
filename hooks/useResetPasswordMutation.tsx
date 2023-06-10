import * as api from '@/api';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useResetPasswordMutation = () => {
  const toast = useToast();

  const resetPassword = useMutation(
    (params: Parameters<typeof api.resetPassword>[0]) => api.resetPassword(params),
    {
      onSuccess: () =>
        toast({
          title: 'Password Reseted.',
          status: 'success',
          isClosable: true,
        }),
      onError: () =>
        toast({
          title: 'Something Went Wrong. Try Again Later.',
          status: 'error',
          isClosable: true,
        }),
    }
  );

  const confirmToken = useMutation((params: Parameters<typeof api.confirmResetPasswordToken>[0]) =>
    api.confirmResetPasswordToken(params)
  );

  return { resetPassword, confirmToken };
};
