'use client';
import { FormInput, FormWrapper } from '@/components';
import { useLoginMutation } from '@/hooks';
import { Button, Stack, Text } from '@chakra-ui/react';
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

  if (authenticatedUser) router.push('/');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormTypes>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormTypes> = (formValues: yup.InferType<typeof schema>) =>
    login.mutate(formValues, {
      onSuccess: (e) => {
        if (e.isPasswordChangeRequired) {
          return router.push(`/auth/change-password`);
        } else {
          return router.push(`/auth/change-password`);

          // return router.push('/');
        }
      }
    });


  return (
    <FormWrapper
      onSubmit={handleSubmit(onSubmit)}
      title="Welcome Back"
      titleProps={{ color: '#1A365D', mt: 6 }}
      alignItems="center"
      formProps={{
        w: '100%',
        maxW: 'lg',
        p: '6',
        borderWidth: '1px',
        borderRadius: 'lg',
        borderColor: '#1A365D',
      }}
    >
      <FormInput
        label="Email"
        placeholder="Enter your email address"
        register={register('email')}
        isInvalid={Boolean(errors.email)}
        helperText={errors.email ? String(errors.email?.message) : ''}
      />
      <FormInput
        type="password"
        label="Password"
        placeholder="Enter your password"
        register={register('password')}
        isInvalid={Boolean(errors.password)}
        helperText={errors.password ? String(errors.password?.message) : ''}
      />
      <Text textAlign={'right'} color="#1A365D">
        <Button
          variant="link"
          as={NextLink}
          href="/auth/forgot-password"
          textAlign={'right'}
          color="#1A365D"
        >
          Forgot your password?
        </Button>
      </Text>
      <Stack direction="row" p="2">
        <Button isLoading={login.isLoading} type="submit" colorScheme="facebook" flex={1}>
          Log In
        </Button>
      </Stack>
      <Text textAlign={'center'} fontWeight={500} color="#1A365D">
        Do not have an account?
        <Button
          colorScheme="green"
          variant="link"
          fontWeight={'bold'}
          onClick={() => router.push('/auth/register')}
        >
          Sign up
        </Button>
      </Text>
    </FormWrapper>
  );
}
