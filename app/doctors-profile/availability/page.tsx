'use client';
import { FormInput, FormSelect, FormWrapper } from '@/components';
import { useLoginMutation } from '@/hooks';
import { Button, IconButton, Stack, Text } from '@chakra-ui/react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { useAuthenticatedUserContext } from '@/context';
import { useWeekDaysQuery } from '@/hooks/useWeekDaysQuery';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';

type FormTypes = {
  weekDays: {
    weekDay: string;
    fromTime: string;
    toTime: string;
    slot: string;
  }[];
};

export default function DoctorAvailability() {
  const weekDaysQuery = useWeekDaysQuery();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<FormTypes>();
  const { fields, append, remove } = useFieldArray({ control, name: 'weekDays' });

  const onSubmit: SubmitHandler<FormTypes> = (formValues: FormTypes) => console.log(formValues);

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)} title="Doctor Avaiability">
      {getValues('weekDays')?.length !== weekDaysQuery.data?.length && (
        <Button onClick={() => append({ weekDay: '', fromTime: '', toTime: '', slot: '' })}>
          add
        </Button>
      )}
      {fields.map((item, index) => (
        <Stack direction="row" alignItems="center" key={item.id}>
          <FormSelect
            label="Week Day"
            options={weekDaysQuery.data?.map(day => day.value) || []}
            register={register(`weekDays.${index}.weekDay` as const)}
            // isDisabled={rolesQuery.data?.length === 0}
            // isInvalid={Boolean(errors.role)}
            // helperText={errors.role ? String(errors.role?.message) : ''}
          />
          <FormInput
            label="From"
            placeholder="Enter time"
            register={register(`weekDays.${index}.fromTime` as const)}
            // isInvalid={Boolean(errors.password)}
            // helperText={errors.password ? String(errors.password?.message) : ''}
          />
          <FormInput
            label="To"
            placeholder="Enter time"
            register={register(`weekDays.${index}.toTime` as const)}
            // isInvalid={Boolean(errors.password)}
            // helperText={errors.password ? String(errors.password?.message) : ''}
          />
          <FormInput
            label="Time Slot"
            placeholder="Enter slot"
            register={register(`weekDays.${index}.slot` as const)}
            // isInvalid={Boolean(errors.password)}
            // helperText={errors.password ? String(errors.password?.message) : ''}
          />
          <IconButton
            colorScheme="red"
            aria-label="Remove"
            icon={<CloseIcon />}
            onClick={() => remove(index)}
          />
        </Stack>
      ))}
      <Button type="submit" colorScheme="facebook" flex={1}>
        Log In
      </Button>
    </FormWrapper>
  );
}
