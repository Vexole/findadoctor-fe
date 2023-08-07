import { logout } from '@/api';
import { useAuthenticatedUserContext } from '@/context';
import { getLocalStorage } from '@/utils/userUtils';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useLogoutMutation = () => {
  const toast = useToast();
  const user = useAuthenticatedUserContext();

  return useMutation(() => logout({ userId: user?.userId || '' }), {
    onSuccess: () => {
      getLocalStorage().removeItem('user');
      window.dispatchEvent(new Event('storage'));
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
