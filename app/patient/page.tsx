'use client';

import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCitiesQuery } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { maritalStatus } from '@/api/shared/maritalStatus';
import { getGender } from '@/api/shared/gender';
import { getPatientProfile } from '@/api/patient/getPatientProfile';
import { FormInput, FormWrapper, FormSelect } from '@/components';
import { Button, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { PatientProfileType, patientProfileSchema } from './types';

const PatientProfile: NextPage = () => {
  const cities = useCitiesQuery();
  const maritalStatusRes = useQuery(['maritalStatus'], maritalStatus);
  const genders = useQuery(['genders'], getGender);

  const { register } = useForm<PatientProfileType>({
    resolver: zodResolver(patientProfileSchema),
    defaultValues: async () => {
      const patientProfile = await getPatientProfile();

      return {
        ...patientProfile,
        dateOfBirth: new Date(patientProfile.dateOfBirth).toISOString().substring(0, 10),
        maritalStatus: 'Single',
      };
    },
  });

  return (
    <>
      <FormWrapper
        title="Patient Profile"
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
          isDisabled
          label="First Name"
          placeholder="Enter your first name"
          register={register('firstName')}
        />

        <FormInput
          isDisabled
          label="Middle Name"
          placeholder="Enter your middle name"
          register={register('middleName')}
        />

        <FormInput
          isDisabled
          label="Last Name"
          placeholder="Enter your last name"
          register={register('lastName')}
        />

        <FormInput
          isDisabled
          label="Phone Number"
          placeholder="Enter your phone number"
          register={register('phone')}
        />

        <FormInput
          isDisabled
          label="Emergency Contact Number"
          placeholder="Enter emergency number"
          register={register('emergencyContact')}
        />

        <FormInput
          isDisabled
          label="Occupation"
          placeholder="Enter occupation"
          register={register('occupation')}
        />

        <FormInput
          isDisabled
          type="date"
          label="Date Of Birth"
          placeholder="Enter date of birth"
          register={register('dateOfBirth', {
            valueAsDate: true,
          })}
        />

        <FormSelect
          isDisabled
          label="Gender"
          options={
            genders.data?.map(gender => ({ label: gender.description, value: gender.value })) || []
          }
          register={register('gender')}
        />

        <FormSelect
          isDisabled
          label="Marital Status"
          options={
            maritalStatusRes.data?.map(maritalStatus => ({
              label: maritalStatus.description,
              value: maritalStatus.value,
            })) || []
          }
          register={register('maritalStatus')}
        />

        <FormInput
          isDisabled
          label="Email"
          placeholder="Enter your email"
          register={register('contactInformation')}
        />

        <FormInput
          isDisabled
          label="Street Address"
          placeholder="Enter your street address"
          register={register('street')}
        />

        <FormSelect
          isDisabled
          label="City"
          options={
            cities.data?.map((cities: { cityName: string; cityId: number }) => ({
              label: cities.cityName,
              value: cities.cityId,
            })) || []
          }
          register={register('cityId', {
            valueAsNumber: true,
          })}
        />

        <FormInput
          isDisabled
          label="Zip Code"
          placeholder="Enter your zip code"
          register={register('postalCode')}
        />
        <Stack direction="row" p="2">
          <Button colorScheme="facebook" flex={1} as={Link} href="/patient/update">
            Update Profile
          </Button>
        </Stack>
      </FormWrapper>
    </>
  );
};

export default PatientProfile;
