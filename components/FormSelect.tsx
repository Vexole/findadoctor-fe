import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormSelectProps extends FormControlProps {
  helperText?: string;
  label: string;
  placeholder?: string;
  options: string[];
  register: UseFormRegisterReturn;
}

export function FormSelect({
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
        {options.map(item => (
          <option key={item}>{item}</option>
        ))}
      </Select>
      {props.isInvalid ? (
        <FormErrorMessage>{helperText}</FormErrorMessage>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
