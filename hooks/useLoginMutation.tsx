import { login } from '@/api';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useLoginMutation = () => {
  const toast = useToast();
  return useMutation((params: Parameters<typeof login>[0]) => login(params), {
    onSuccess: (data) => {
      localStorage.setItem('user', JSON.stringify(data));
      toast({
        title: 'Login Successfully.',
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
