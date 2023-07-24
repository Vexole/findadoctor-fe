'use client';
import { FormInput, FormSelect, FormWrapper } from '@/components';
import {
  useDeleteDoctorAvailabilityAppointmentsMutation,
  useDoctorAvailabilityMutation,
  useDoctorAvailabilityQuery,
  useUpdateDoctorAvailabilityMutation,
} from '@/hooks';
import { Button, IconButton, Stack, Text, Tooltip } from '@chakra-ui/react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useWeekDaysQuery } from '@/hooks/useWeekDaysQuery';
import { CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import { useDeleteDoctorAvailabilityMutation } from '@/hooks/useDeleteDoctorAvailabilityMutation';
import { DoctorAvailability } from "@/api";

type FormTypes = {
  weekDays: DoctorAvailability[];
};

export default function DoctorAvailability() {
  const authenticatedUser = localStorage.user ? JSON.parse(localStorage.user) : {};
  const isStaff = authenticatedUser?.role === 'AdministrativeAssistant';
  const doctorId = !isStaff ? authenticatedUser?.userId : '';
  const staffId = isStaff ? authenticatedUser?.userId : '';
  const { data: doctorAvailability } = useDoctorAvailabilityQuery(
    isStaff ? staffId : doctorId,
    isStaff
  );
  const addAvailabilityApi = useDoctorAvailabilityMutation();
  const updateAvailabilityApi = useUpdateDoctorAvailabilityMutation();
  const deleteAvailabilityApi = useDeleteDoctorAvailabilityMutation();
  const deleteAvailabilityAppointmentsApi = useDeleteDoctorAvailabilityAppointmentsMutation();
  const weekDaysQuery = useWeekDaysQuery();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<FormTypes>();
  const { fields, append, remove } = useFieldArray({ control, name: 'weekDays' });

  useEffect(() => {
    if (!doctorAvailability) return;
    fields.forEach(() => remove(0));
    doctorAvailability.forEach(doctorAvailability => append(doctorAvailability));
  }, [doctorAvailability]);

  const onSubmit: SubmitHandler<FormTypes> = (formValues: FormTypes) => {
    const createAvailability = formValues.weekDays.filter(weekday => !weekday?.availabilityId);
    const updateAvailability = formValues.weekDays.filter(weekday => weekday?.availabilityId);
    if (createAvailability.length > 0) addAvailabilityApi.mutate(createAvailability);
    if (updateAvailability.length > 0) updateAvailabilityApi.mutate(updateAvailability);
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

  const handleDeleteAvailability = (index: number, availabilityId: number) => {
    if (availabilityId) return deleteAvailabilityApi.mutate({ availabilityId });
    remove(index);
  };

  const handleDeleteAvailabilityAppointments = (availabilityId: number) =>
    deleteAvailabilityAppointmentsApi.mutate({
      availabilityId,
      cancellationMessage: 'The appointments are not avaiable anymore.',
    });

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)} title="Doctor Availability" p={6}>
      {getValues('weekDays')?.length !== weekDaysQuery.data?.length && (
        <Button
          colorScheme="teal"
          onClick={() =>
            append({
              dayOfWeek: '',
              fromTime: '',
              toTime: '',
              appointmentLength: '',
              doctorId,
              staffId,
            })
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
          <Stack direction="row" alignItems="center" pt={5}>
            <Tooltip label="Delete availability" fontSize="md">
              <IconButton
                colorScheme="orange"
                aria-label="Remove"
                icon={<CloseIcon />}
                onClick={() => handleDeleteAvailability(index, Number(item?.availabilityId))}
              />
            </Tooltip>
            {!isStaff && item.availabilityId && (
              <Tooltip label="Delete availability and existing appointments" fontSize="md">
                <IconButton
                  colorScheme="red"
                  aria-label="Remove"
                  icon={<DeleteIcon />}
                  onClick={() => handleDeleteAvailabilityAppointments(Number(item?.availabilityId))}
                />
              </Tooltip>
            )}
          </Stack>
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
