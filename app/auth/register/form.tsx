import { FormInput, FormSelect, FormWrapper } from '@/components';
import { useRegisterMutation, useRolesQuery } from '@/hooks';
import { Button } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useState } from 'react';

const initialFormValues = { email: '', password: '', confirmPassword: '', role: '' };

export function RegisterForm() {
  const rolesQuery = useRolesQuery();
  const register = useRegisterMutation();

  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialFormValues);

  const handleSetFormValues = (key: keyof typeof initialFormValues, value: string) =>
    setFormValues(prevFormValues => ({ ...prevFormValues, [key]: value }));

  const handleSubmit = () => {
    setErrors(initialFormValues);
    register.mutate(formValues, {
      onError(error) {
        if (isAxiosError(error) && Boolean(error.response?.data?.errors))
          Object.entries<[string, string[]]>(error.response?.data?.errors).forEach(([key, value]) =>
            setErrors(prevErrors => ({ ...prevErrors, [key.toLowerCase()]: value?.[0] }))
          );
      },
    });
  };

  return (
    <FormWrapper title="Register">
      <FormInput
        type="email"
        label="Email"
        value={formValues.email}
        setValue={(value: string) => handleSetFormValues('email', value)}
        isRequired
        isInvalid={Boolean(errors.email)}
        helperText={errors.email}
      />
      <FormInput
        type="password"
        label="Password"
        value={formValues.password}
        setValue={(value: string) => handleSetFormValues('password', value)}
        isRequired
        isInvalid={Boolean(errors.password)}
        helperText={errors.password}
      />
      <FormInput
        type="password"
        label="Confirm Password"
        value={formValues.confirmPassword}
        setValue={(value: string) => handleSetFormValues('confirmPassword', value)}
        isRequired
      />
      <FormSelect
        label="Role"
        value={formValues.role}
        setValue={(value: string) => handleSetFormValues('role', value)}
        options={rolesQuery.data || []}
        isRequired
        isDisabled={rolesQuery.data?.length === 0}
        isInvalid={Boolean(errors.role)}
        helperText={errors.role}
      />
      <Button onClick={handleSubmit}>Register</Button>
    </FormWrapper>
  );
}
