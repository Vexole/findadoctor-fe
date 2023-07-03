import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

type LabelValuePair = { value: string; label: string };

interface FormSelectProps extends FormControlProps {
  helperText?: string;
  label: string;
  placeholder?: string;
  options: [];
  register: UseFormRegisterReturn;
}

export function FormSelectNoLoop({
  helperText,
  label,
  register,
  placeholder = 'Select an option',
  options = [],
  ...props
}: FormSelectProps) {
  return (
    <FormControl {...props}>
      <FormLabel>{label}</FormLabel>
      <Select placeholder={placeholder} {...register}>
        {options}
      </Select>
      {props.isInvalid ? (
        <FormErrorMessage>{helperText}</FormErrorMessage>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
