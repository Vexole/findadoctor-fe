'use client';
import { getCities } from '@/api';
import { getGender } from '@/api/shared/gender';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
// {
//   "firstName": "string",
//   "middleName": "string",
//   "lastName": "string",
//   "phone": "string",
//   "contactInformation": "string",
//   "gender": "string",
//   "dateOfBirth": "2023-07-02T18:18:23.527Z",
//   "cityId": 0,
//   "street": "string",
//   "postalCode": "string",
//   "email": "user@example.com",
//   "password": "stringst",
//   "doctorUserId": "string",
//   "dateOfHire": "2023-07-02T18:18:23.527Z",
//   "emergencyContact": "string"
// }

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, useToast, Stack } from '@chakra-ui/react';
import { createDoctorStaff } from '@/api/doctor/addDoctorStaff';
import { useEffect, useState } from 'react';
import { FormInput, FormWrapper, FormSelect } from '@/components';

const doctorStaffProfileSchema = z.object({
  firstName: z.string().nonempty({
    message: 'First name is required',
  }),
  middleName: z.string().optional(),
  lastName: z.string().nonempty({
    message: 'Last name is required',
  }),
  phone: z.string().nonempty({
    message: 'Phone number is required',
  }),
  contactInformation: z.string().nonempty({
    message: 'Contact information is required',
  }),
  gender: z.string().nonempty({
    message: 'Gender is required',
  }),
  dateOfBirth: z.date({
    required_error: 'Date of birth is required',
    invalid_type_error: 'Date of birth is required',
  }),
  cityId: z.number({
    required_error: 'City is required',
  }),
  street: z.string().nonempty({
    message: 'Street is required',
  }),
  postalCode: z.string().nonempty({
    message: 'Postal code is required',
  }),
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().nonempty({
    message: 'Password is required',
  }),
  doctorUserId: z.string().nonempty({
    message: 'Doctor user id is required',
  }),
  dateOfHire: z.date({
    required_error: 'Date of hire is required',
  }),
  emergencyContact: z.string().nonempty({
    message: 'Emergency contact is required',
  }),
});

export type DoctorStaffProfileType = z.infer<typeof doctorStaffProfileSchema>;

export default function AddDoctorStaffProfile() {
  const { replace } = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      !localStorage.getItem('user') ||
      JSON.parse(localStorage.getItem('user') as string).role !== 'Doctor'
    ) {
      replace('/');
    } else {
      setLoading(false);
    }
  });

  const toast = useToast();
  const genderOptions = useQuery(['genderOptions'], getGender);
  const cityOptions = useQuery(['cityOptions'], getCities);
  const createStaffProfile = useMutation(createDoctorStaff, {
    onSuccess: () => {
      toast({
        title: 'Staff profile created',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // replace('/doctor');
    },
    onError: () => {
      toast({
        title: 'Staff profile not created',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<DoctorStaffProfileType>({
    resolver: zodResolver(doctorStaffProfileSchema),
    defaultValues: {
      doctorUserId: JSON.parse(localStorage.getItem('user') as string)?.userId || '',
    },
  });

  const onSubmit = (data: DoctorStaffProfileType) => {
    createStaffProfile.mutateAsync(data);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <FormWrapper
        onSubmit={handleSubmit(onSubmit)}
        title="Staff Profile"
        titleProps={{ color: '#1A365D', mt: 6 }}
        alignItems="center"
        formProps={{
          w: '100%',
          maxW: 'lg',
          p: '6',
          borderWidth: '1px',
          borderRadius: 'lg',
          borderColor: '#1A365D',
        }}
      >
        <FormInput
          label="First Name"
          placeholder="Enter your first name"
          register={register('firstName')}
          isInvalid={Boolean(errors.firstName)}
          helperText={errors.firstName ? String(errors.firstName?.message) : ''}
        />

        <FormInput
          label="Middle Name"
          placeholder="Enter your middle name"
          register={register('middleName')}
          isInvalid={Boolean(errors.middleName)}
          helperText={errors.middleName ? String(errors.middleName?.message) : ''}
        />

        <FormInput
          label="Last Name"
          placeholder="Enter your last name"
          register={register('lastName')}
          isInvalid={Boolean(errors.lastName)}
          helperText={errors.lastName ? String(errors.lastName?.message) : ''}
        />

        <FormInput
          label="Phone Number"
          placeholder="Enter your phone number"
          register={register('phone')}
          isInvalid={Boolean(errors.phone)}
          helperText={errors.phone ? String(errors.phone?.message) : ''}
        />

        <FormInput
          label="Emergency Contact Number"
          placeholder="Enter emergency number"
          register={register('emergencyContact')}
          isInvalid={Boolean(errors.emergencyContact)}
          helperText={errors.emergencyContact ? String(errors.emergencyContact?.message) : ''}
        />

        <FormInput
          type="text"
          label="Contact Information"
          placeholder="Contact Information"
          register={register('contactInformation')}
          isInvalid={Boolean(errors.contactInformation)}
          helperText={errors.contactInformation ? String(errors.contactInformation?.message) : ''}
        />

        <FormInput
          type="email"
          label="Email"
          placeholder="Enter your email"
          register={register('email')}
          isInvalid={Boolean(errors.email)}
          helperText={errors.email ? String(errors.email?.message) : ''}
        />

        <FormInput
          type="password"
          label="Password"
          placeholder="Enter your password"
          register={register('password')}
          isInvalid={Boolean(errors.password)}
          helperText={errors.password ? String(errors.password?.message) : ''}
        />

        <FormInput
          type="date"
          label="Date Of Birth"
          placeholder="Enter date of birth"
          register={register('dateOfBirth', {
            valueAsDate: true,
          })}
          isInvalid={Boolean(errors.dateOfBirth)}
          helperText={errors.dateOfBirth ? String(errors.dateOfBirth?.message) : ''}
        />

        <FormInput
          type="date"
          label="Date Of Hire"
          placeholder="Enter date of hire"
          register={register('dateOfHire', {
            valueAsDate: true,
          })}
          isInvalid={Boolean(errors.dateOfHire)}
          helperText={errors.dateOfHire ? String(errors.dateOfHire?.message) : ''}
        />

        <FormSelect
          label="Gender"
          options={
            genderOptions.data?.map(gender => ({
              label: gender.description,
              value: gender.value,
            })) || []
          }
          register={register('gender')}
          isInvalid={Boolean(errors.gender)}
          helperText={errors.gender ? String(errors.gender?.message) : ''}
        />

        <FormInput
          label="Street Address"
          placeholder="Enter your street address"
          register={register('street')}
          isInvalid={Boolean(errors.street)}
          helperText={errors.street ? String(errors.street?.message) : ''}
        />

        <FormSelect
          label="City"
          options={
            cityOptions.data?.map((cityOptions: { cityName: string; cityId: number }) => ({
              label: cityOptions.cityName,
              value: cityOptions.cityId,
            })) || []
          }
          register={register('cityId', {
            valueAsNumber: true,
          })}
          isInvalid={Boolean(errors.cityId)}
          helperText={errors.cityId ? String(errors.cityId?.message) : ''}
        />

        <FormInput
          label="Zip Code"
          placeholder="Enter your zip code"
          register={register('postalCode')}
          isInvalid={Boolean(errors.postalCode)}
          helperText={errors.postalCode ? String(errors.postalCode?.message) : ''}
        />

        <Stack direction="row" p="2">
          <Button
            isLoading={createStaffProfile.isLoading}
            type="submit"
            colorScheme="facebook"
            flex={1}
          >
            Create Staff
          </Button>
        </Stack>
      </FormWrapper>
    </>
  );
}
