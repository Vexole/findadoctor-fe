'use client';
import { FormInput, FormWrapper } from '@/components';
import { Button } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useForgotPasswordMutation } from '@/hooks';

const schema = yup
  .object({
    email: yup.string().email('Invalid Email.').required('Email is required.'),
  })
  .required();

type FormTypes = yup.InferType<typeof schema>;

export default function ForgotPassword() {
  const forgotPassword = useForgotPasswordMutation();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormTypes>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormTypes> = (formValues: yup.InferType<typeof schema>) =>
    forgotPassword.mutate(formValues, { onSuccess: () => router.push('/auth/login') });

  return (
    <FormWrapper title="Forgot Password" onSubmit={handleSubmit(onSubmit)}
      titleProps={{ color: '#1A365D', mt: 6 }}
      alignItems="center"
      formProps={{
        w: '100%',
        maxW: 'lg',
        p: '6',
        borderWidth: '1px',
        borderRadius: 'lg',
        borderColor: '#1A365D',
      }}>
      <FormInput
        label="Email"
        placeholder='Enter your email address'
        register={register('email')}
        isInvalid={Boolean(errors.email)}
        helperText={errors.email ? String(errors.email?.message) : ''}
      />

      <Button isLoading={forgotPassword.isLoading} type="submit" colorScheme="facebook">
        Reset Password
      </Button>
    </FormWrapper>
  );
}
