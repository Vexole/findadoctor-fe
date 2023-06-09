import { ChangeEvent } from 'react';
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select,
} from '@chakra-ui/react';

interface FormSelectProps extends FormControlProps {
  helperText?: string;
  label: string;
  placeholder?: string;
  setValue: (value: string) => void;
  value: string;
  options: string[];
}

export function FormSelect({
  helperText,
  label,
  setValue,
  value,
  placeholder = 'Select an option',
  options = [],
  ...props
}: FormSelectProps) {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => setValue(e.target.value);
  return (
    <FormControl {...props}>
      <FormLabel>{label}</FormLabel>
      <Select placeholder={placeholder} value={value} onChange={handleSelectChange}>
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
