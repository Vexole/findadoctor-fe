import { logout } from '@/api';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useLogoutMutation = () => {
  const toast = useToast();

  return useMutation(() => logout({ userId: JSON.parse(localStorage.user).userId }), {
    onSuccess: () => {
      localStorage.removeItem('user');
      toast({
        title: 'Logout Successfully.',
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
