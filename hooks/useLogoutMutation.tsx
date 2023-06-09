import { logout } from '@/api';
import { useAuthenticatedUserContext } from '@/context';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useLogoutMutation = () => {
  const toast = useToast();
  const user = useAuthenticatedUserContext();

  return useMutation(() => logout({ userId: user?.userId || ''}), {
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
