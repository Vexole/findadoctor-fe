import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps extends FormControlProps {
  helperText?: string;
  label: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute | undefined;
  register: UseFormRegisterReturn;
}

export function FormInput({
  helperText,
  label,
  placeholder,
  type = 'text',
  register,
  ...props
}: FormInputProps) {
  return (
    <FormControl {...props}>
      <FormLabel fontWeight="bold" color="#1A365D">
        {label}
      </FormLabel>
      <Input type={type} placeholder={placeholder} {...register} />
      {props.isInvalid ? (
        <FormErrorMessage>{helperText}</FormErrorMessage>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
