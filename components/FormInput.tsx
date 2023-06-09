import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import {  UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps extends FormControlProps {
  helperText?: string;
  label: string;
  type?: HTMLInputTypeAttribute | undefined;
  register: UseFormRegisterReturn;
}

export function FormInput({
  helperText,
  label,
  type = 'text',
  register,
  ...props
}: FormInputProps) {
  return (
    <FormControl {...props}>
      <FormLabel>{label}</FormLabel>
      <Input type={type} {...register} />
      {props.isInvalid ? (
        <FormErrorMessage>{helperText}</FormErrorMessage>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
