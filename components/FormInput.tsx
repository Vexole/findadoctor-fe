import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import { FormControl, FormControlProps, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';

interface FormInputProps extends FormControlProps {
  helperText?: string;
  label: string;
  setValue: (value: string) => void;
  type?: HTMLInputTypeAttribute | undefined;
  value: string;
};

export function FormInput({
  helperText,
  label,
  setValue,
  type = 'text',
  value,
  ...props
}: FormInputProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  return (
    <FormControl {...props}>
      <FormLabel>{label}</FormLabel>
      <Input type={type} name={label.toLowerCase()} value={value} onChange={handleInputChange} />
      {props.isInvalid ? (
        <FormErrorMessage>{helperText}</FormErrorMessage>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
