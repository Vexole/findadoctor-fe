import { forgotPassword } from '@/api';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useForgotPasswordMutation = () => {
  const toast = useToast();
  return useMutation((params: Parameters<typeof forgotPassword>[0]) => forgotPassword(params), {
    onSuccess: () => {
      toast({
        title: 'Check your email to reset your password.',
        status: 'success',
        isClosable: true,
      })
    },
    onError: () =>
      toast({
        title: 'Something went wrong. Try Again Later.',
        status: 'error',
        isClosable: true,
      }),
  });
};
