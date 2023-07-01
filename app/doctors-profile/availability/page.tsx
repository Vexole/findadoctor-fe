'use client';
import { FormInput, FormSelect, FormWrapper } from '@/components';
import { useDoctorAvailabilityMutation, useDoctorAvailabilityQuery, useLoginMutation } from '@/hooks';
import { Button, IconButton, Stack, Text } from '@chakra-ui/react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { useAuthenticatedUserContext } from '@/context';
import { useWeekDaysQuery } from '@/hooks/useWeekDaysQuery';
import { CloseIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';

type FormTypes = {
  weekDays: {
    dayOfWeek: string;
    fromTime: string;
    toTime: string;
    appointmentLength: string;
    doctorId: string;
  }[];
};

export default function DoctorAvailability() {
  const weekDaysQuery = useWeekDaysQuery();
  const {data: doctorAvailability} = useDoctorAvailabilityQuery();
  const addAvailabilityApi = useDoctorAvailabilityMutation();
  const authenticatedUser = localStorage.user ? JSON.parse(localStorage.user) : {};
  const doctorId = authenticatedUser?.userId;

  console.log("hellooo2");

  console.log(doctorAvailability);

  useEffect(()=>{
    if(!doctorAvailability) return;
    doctorAvailability.forEach(item => {
      append({ dayOfWeek: item.dayOfWeek, fromTime: item.fromTime, toTime: item.toTime, appointmentLength: item.appointmentLength })
    });  },[doctorAvailability])

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<FormTypes>();
  const { fields, append, remove } = useFieldArray({ control, name: 'weekDays' });

  // if(getDoctorAvailability?.data) fields = getDoctorAvailability?.data;

  const onSubmit: SubmitHandler<FormTypes> = (formValues: FormTypes) => {
    // console.log(formValues);
    console.log({ ...formValues.weekDays});
    addAvailabilityApi.mutate(formValues.weekDays);
  };

  const validateUniqueDay = (index: number) => (value: string) => {
    const allValues = getValues();

    const hasDuplicate =
      Object.values(allValues.weekDays).filter(
        (item, i) => i !== index && item?.dayOfWeek === value
      ).length > 0;

    if (!value) {
      return 'Weekday is required.';
    } else if (hasDuplicate) {
      return 'Duplicated Weekday.';
    }

    return true;
  };

  const validateFromTime = (index: number) => (value: string) => {
    const { weekDays } = getValues();
    const toTime = weekDays[index].toTime;
    if (!value) {
      return 'From time is required.';
    } else if (value === '00:00:00') {
      return 'From time cannot be 00:00:00.';
    } else if (!value.match(/^(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$/)) {
      return 'Invalid time.';
    } else if (toTime && toTime < value) {
      return 'From time should be less than To time.';
    }
    return true;
  };

  const validateToTime = (index: number) => (value: string) => {
    const { weekDays } = getValues();
    const fromTime = weekDays[index].fromTime;
    if (!value) {
      return 'To time is required.';
    } else if (!value.match(/^(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$/)) {
      return 'Invalid time.';
    } else if (value === '00:00:00') {
      return 'To time cannot be 00:00:00.';
    } else if (fromTime && fromTime > value) {
      return 'To time must be greater than From time.';
    }
    return true;
  };

  const validateSlotTime = (index: number) => (value: string) => {
    if (!value) {
      return 'Slot time is required.';
    } else if (value === '00:00:00') {
      return 'From time cannot be 00:00:00.';
    } else if (!value.match(/^(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$/)) {
      return 'Invalid time.';
    }
    return true;
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)} title="Doctor Avaiability">
      {getValues('weekDays')?.length !== weekDaysQuery.data?.length && (
        <Button
          colorScheme="teal"
          onClick={() =>
            append({ dayOfWeek: '', fromTime: '', toTime: '', appointmentLength: '', doctorId })
          }
          w="max-content"
        >
          Add Availability
        </Button>
      )}
      {fields.map((item, index) => (
        <Stack direction="row" alignItems="center" key={item.id}>
          <FormSelect
            label="Weekday"
            options={weekDaysQuery.data?.map(day => day.value) || []}
            register={register(`weekDays.${index}.dayOfWeek` as const, {
              validate: validateUniqueDay(index),
            })}
            isInvalid={Boolean(errors.weekDays?.[index]?.dayOfWeek)}
            helperText={errors.weekDays?.[index]?.dayOfWeek?.message}
          />
          <FormInput
            label="From"
            placeholder="Enter time (HH:MM:SS)"
            register={register(`weekDays.${index}.fromTime` as const, {
              validate: validateFromTime(index),
            })}
            isInvalid={Boolean(errors.weekDays?.[index]?.fromTime)}
            helperText={errors.weekDays?.[index]?.fromTime?.message}
          />

          <FormInput
            label="To"
            placeholder="Enter time (HH:MM:SS)"
            register={register(`weekDays.${index}.toTime` as const, {
              validate: validateToTime(index),
            })}
            isInvalid={Boolean(errors.weekDays?.[index]?.toTime)}
            helperText={errors.weekDays?.[index]?.toTime?.message}
          />
          <FormInput
            label="Time Slot"
            placeholder="Enter slot (HH:MM:SS)"
            register={register(`weekDays.${index}.appointmentLength` as const, {
              validate: validateSlotTime(index),
            })}
            isInvalid={Boolean(errors.weekDays?.[index]?.appointmentLength)}
            helperText={errors.weekDays?.[index]?.appointmentLength?.message}
          />
          <IconButton
            colorScheme="red"
            aria-label="Remove"
            icon={<CloseIcon />}
            onClick={() => remove(index)}
          />
        </Stack>
      ))}
      {Boolean(fields.length) && (
        <Button type="submit" colorScheme="facebook" w="max-content">
          Save
        </Button>
      )}
    </FormWrapper>
  );
}
