'use client';
import { FormInput, FormSelect, FormWrapper } from '@/components';
import { useRegisterMutation, useRolesQuery } from '@/hooks';
import { Button, Text } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuthenticatedUserContext } from '@/context';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const schema = yup
  .object({
    email: yup.string().email('Invalid Email.').required('Email is required.'),
    password: yup
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
      .oneOf([yup.ref('password')], 'Passwords must match.'),
    role: yup.string().required('Role is required.'),
  })
  .required();

type FormTypes = yup.InferType<typeof schema>;

function Register() {
  const rolesQuery = useRolesQuery();
  const registerApi = useRegisterMutation();
  const authenticatedUser = useAuthenticatedUserContext();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormTypes>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormTypes> = (formValues: yup.InferType<typeof schema>) => {
    registerApi.mutate(formValues, {
      onSuccess: res => router.push('/auth/login'),
    });
  };

  if (authenticatedUser) router.push('/');

  return (
    <FormWrapper
      onSubmit={handleSubmit(onSubmit)}
      title="Create your account"
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
        helperText={
          errors.password
            ? String(errors.password?.message)
            : 'The password must have at least 8 character, one lowercase, one uppercase, one number, and one non-alphanumeric character.'
        }
      />
      <FormInput
        type="password"
        label="Confirm Password"
        placeholder="Confirm your password"
        register={register('confirmPassword')}
        isInvalid={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword ? String(errors.confirmPassword?.message) : ''}
      />
      <FormSelect
        label="Role"
        options={
          rolesQuery.data
            ?.filter(role => role.roleName !== 'AdministrativeAssistant')
            .map(role => ({ label: role.roleDescription, value: role.roleName })) || []
        }
        register={register('role')}
        isDisabled={rolesQuery.data?.length === 0}
        isInvalid={Boolean(errors.role)}
        helperText={errors.role ? String(errors.role?.message) : ''}
      />
      <Button isLoading={registerApi.isLoading} type="submit" colorScheme="facebook">
        Register
      </Button>
      <Text textAlign={'center'} fontWeight={500} color="#1A365D">
        Already have an account?
        <Button
          colorScheme="green"
          variant="link"
          fontWeight={'bold'}
          onClick={() => router.push('/auth/login')}
        >
          Log in
        </Button>
      </Text>
    </FormWrapper>
  );
}

export default dynamic(() => Promise.resolve(Register), {
  ssr: false,
})