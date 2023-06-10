import { confirmEmail } from '@/api';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useConfirmEmailMutation = () => {
  const toast = useToast();
  return useMutation((params: Parameters<typeof confirmEmail>[0]) => confirmEmail(params), {
    onSuccess: () =>
      toast({
        title: 'Email Confirmed.',
        status: 'success',
        isClosable: true,
      }),
    onError: () =>
      toast({
        title: 'Email Not Confirmed. Try Again Later.',
        status: 'error',
        isClosable: true,
      }),
  });
};
