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
  options: string[] | LabelValuePair[];
  register: UseFormRegisterReturn;
  isDisabled?: boolean;
}

export function FormSelect({
  helperText,
  label,
  register,
  placeholder = 'Select an option',
  options = [],
  isDisabled,
  ...props
}: FormSelectProps) {
  return (
    <FormControl {...props}>
      <FormLabel fontWeight="bold" color="#1A365D">{label}</FormLabel>
      <Select placeholder={placeholder} {...register} disabled={isDisabled}>
        {options.map(item => {
          if (typeof item === 'string') return <option key={item}>{item}</option>;
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </Select>
      {props.isInvalid ? (
        <FormErrorMessage>{helperText}</FormErrorMessage>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
