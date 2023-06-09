import { register } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useRegisterMutation = () => {
  const registerMutation = useMutation((params: Parameters<typeof register>[0]) =>
    register(params)
  );

  return registerMutation;
};
