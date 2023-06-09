import { register } from '@/api';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useRegisterMutation = () => {
  const toast = useToast();
  return useMutation((params: Parameters<typeof register>[0]) => register(params), {
    onSuccess: () =>
      toast({
        title: 'Account Created.',
        description: 'Check your email to confirm your account.',
        status: 'success',
        isClosable: true,
      }),
    onError: () =>
      toast({
        title: 'Account Not Created. Try Again Later.',
        status: 'error',
        isClosable: true,
      }),
  });
};
