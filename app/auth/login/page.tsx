'use client';
import { FormInput, FormWrapper } from '@/components';
import { useLoginMutation } from '@/hooks';
import { Button, Link, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { useAuthenticatedUserContext } from '@/context';

const schema = yup
  .object({
    email: yup.string().email('Invalid Email.').required('Email is required.'),
    password: yup.string().required('Password is required.'),
  })
  .required();

type FormTypes = yup.InferType<typeof schema>;

export default function Login() {
  const authenticatedUser = useAuthenticatedUserContext();
  const login = useLoginMutation();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormTypes>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormTypes> = (formValues: yup.InferType<typeof schema>) =>
    login.mutate(formValues, { onSuccess: () => router.push('/') });

  if (authenticatedUser) router.push('/');

  return (
    <FormWrapper title="Login" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Email"
        register={register('email')}
        isInvalid={Boolean(errors.email)}
        helperText={errors.email ? String(errors.email?.message) : ''}
      />
      <FormInput
        type="password"
        label="Password"
        register={register('password')}
        isInvalid={Boolean(errors.password)}
        helperText={errors.password ? String(errors.password?.message) : ''}
      />
      <Link as={NextLink} href="/auth/forgot-password" color="blue.500">
        Forgot Password
      </Link>
      <Stack direction="row">
        <Button isLoading={login.isLoading} type="submit" colorScheme="blue" flex={1}>
          Login
        </Button>
        <Button
          colorScheme="blue"
          variant="outline"
          flex={1}
          onClick={() => router.push('/auth/register')}
        >
          Register
        </Button>
      </Stack>
    </FormWrapper>
  );
}
