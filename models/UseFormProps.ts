import { FieldErrors, Control, RegisterOptions } from 'react-hook-form';
import { DoctorProfile as FormValues } from '../models/DoctorProfile';

export type UseFormProps = {
  register: (rules?: RegisterOptions) => (Ref: HTMLInputElement | null) => void;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
};
