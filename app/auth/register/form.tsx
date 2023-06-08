import { FormInput, FormSelect, FormWrapper } from '@/components';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';

const initialFormValues = { email: '', password: '', confirmPassword: '', role: '' };

export function RegisterForm() {
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleSetFormValues = (key: keyof typeof initialFormValues, value: string) =>
    setFormValues(prevFormValues => ({ ...prevFormValues, [key]: value }));

  return (
    <FormWrapper title="Register">
      <FormInput
        type="email"
        label="Email"
        value={formValues.email}
        setValue={(value: string) => handleSetFormValues('email', value)}
        isRequired
      />
      <FormInput
        type="password"
        label="Password"
        value={formValues.password}
        setValue={(value: string) => handleSetFormValues('password', value)}
        isRequired
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
        options={['teste', 'admin']}
        isRequired
      />
      <Button>Register</Button>
    </FormWrapper>
  );
}
