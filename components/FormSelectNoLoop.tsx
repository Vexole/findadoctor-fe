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
    options: [];
    register: UseFormRegisterReturn;
    isDisabled?: boolean;
}

export function FormSelectNoLoop({
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
