'use client';
import { FormInput, FormWrapper } from '@/components';
import { useResetPasswordMutation } from '@/hooks';
import { Button, Heading, Spinner, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const schema = yup
  .object({
    newPassword: yup
      .string()
      .required('Password is required.')
      .min(8, 'Must be at least 8 characters')
      .matches(/[0-9]/, 'Password must have at least one number.')
      .matches(/[a-z]/, 'Password must have at least one lowercase character.')
      .matches(/[A-Z]/, 'Password must have at least one uppercase character.')
      .matches(/[^a-zA-Z0-9]/, 'Password must have at least one non-alphanumeric character.'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required.')
      .oneOf([yup.ref('newPassword')], 'Passwords must match.'),
  })
  .required();

type FormTypes = yup.InferType<typeof schema>;

function ResetPassword() {
  const { resetPassword, confirmToken } = useResetPasswordMutation();
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const userId = searchParams.get('userId') || '';
  const token = searchParams.get('token')?.replaceAll(' ', '+') || '';

  useEffect(() => {
    if (!userId || !token) return;
    confirmToken.mutate({ userId, token }, { onSuccess: () => setIsValid(true) });
  }, [userId, token]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormTypes>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormTypes> = (formValues: yup.InferType<typeof schema>) =>
    resetPassword.mutate({ ...formValues, userId, token }, { onSuccess: () => router.push('/auth/login') });

  if (confirmToken.isLoading) return <Spinner />;

  if (isValid)
    return (
      <FormWrapper title="Reset Password" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="password"
          label="Password"
          placeholder='Enter New Password'
          register={register('newPassword')}
          isInvalid={Boolean(errors.newPassword)}
          helperText={
            errors.newPassword
              ? String(errors.newPassword?.message)
              : 'The password must have at least 8 character, one lowercase, one uppercase, one number, and one non-alphanumeric character.'
          }
        />
        <FormInput
          type="password"
          label="Confirm Password"
          placeholder='Enter New Password'
          register={register('confirmPassword')}
          isInvalid={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword ? String(errors.confirmPassword?.message) : ''}
        />
        <Button isLoading={resetPassword.isLoading} type="submit" colorScheme="blue">
          Reset Password
        </Button>
      </FormWrapper>
    );

  return (
    <Stack spacing={5} alignItems={'center'}>
      <Heading as="h1" size="2xl">
        Sorry!
      </Heading>
      <Heading as="h3" size="md">
        Invalid Token.
      </Heading>
    </Stack>
  );
}

export default dynamic(() => Promise.resolve(ResetPassword), {
  ssr: false,
})