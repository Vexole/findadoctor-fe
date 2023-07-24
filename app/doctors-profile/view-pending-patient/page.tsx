'use client';

import { getPatientView } from '@/api/doctor/getPatientAssociation';
import { getGender } from '@/api/shared/gender';
import { maritalStatus } from '@/api/shared/maritalStatus';
import Link from 'next/link';
import { PatientProfileType, patientProfileSchema } from '@/app/patient/page';
import { FormInput, FormSelect, FormWrapper } from '@/components';
import { useCitiesQuery } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button, Heading, Flex, Grid, GridItem } from '@chakra-ui/react';

export default function ViewDoctorPatient({
  searchParams,
}: {
  searchParams: {
    doctorId: string;
    patientId: string;
  };
}) {
  const cities = useCitiesQuery();
  const maritalStatusRes = useQuery(['maritalStatus'], maritalStatus);
  const genders = useQuery(['genders'], getGender);
  const { register } = useForm<{
    userId: string;
    firstName: string;
    lastName: string;
    phone: string;
    contactInformation: string;
    gender: string;
    dateOfBirth: string;
    cityId: number;
    street: string;
    postalCode: string;
    emergencyContact: string;
    maritalStatus: string;
    occupation: string;
    middleName?: string | undefined;
    profilePicture?: string | undefined;
  }>({
    resolver: zodResolver(patientProfileSchema),
    defaultValues: async () => {
      const patientProfile = await getPatientView({
        doctorId: searchParams.doctorId,
        patientId: searchParams.patientId,
      });

      return {
        ...patientProfile,
        dateOfBirth: new Date(patientProfile.dateOfBirth).toISOString().substring(0, 10),
        maritalStatus: 'Single',
      };
    },
  });
  // console.log('params', data);
  return (
    <div>
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
        <Heading as="h2" size="sm" mb={4}>
          Personal Information:
        </Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem>
            <FormInput
              isDisabled
              label="First Name"
              placeholder="Enter your first name"
              register={register('firstName')}
            />
          </GridItem>
          <GridItem>
            <FormInput
              isDisabled
              label="Middle Name"
              placeholder="Enter your middle name"
              register={register('middleName')}
            />
          </GridItem>
          <GridItem>
            <FormInput
              isDisabled
              label="Last Name"
              placeholder="Enter your last name"
              register={register('lastName')}
            />
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem>
            <FormInput
              isDisabled
              type="date"
              label="Date Of Birth"
              placeholder="Enter date of birth"
              register={register('dateOfBirth', {
                valueAsDate: true,
              })}
            />
          </GridItem>
          <GridItem>
            <FormSelect
              isDisabled
              label="Gender"
              options={
                genders.data?.map(gender => ({ label: gender.description, value: gender.value })) ||
                []
              }
              register={register('gender')}
            />
          </GridItem>
          <GridItem>
            <FormInput
              isDisabled
              label="Email"
              placeholder="Enter your email"
              register={register('contactInformation')}
            />
          </GridItem>
        </Grid>

        <Heading as="h2" size="sm" my={4}>
          Address:
        </Heading>

        <FormInput
          isDisabled
          label="Street Address"
          placeholder="Enter your street address"
          register={register('street')}
        />

        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <FormInput
              isDisabled
              label="City"
              placeholder="Enter your city"
              register={register('cityId', {
                valueAsNumber: true,
              })}
            />
          </GridItem>
          <GridItem>
            <FormInput
              isDisabled
              label="Zip Code"
              placeholder="Enter your zip code"
              register={register('postalCode')}
            />
          </GridItem>
        </Grid>

        <Link href="/doctors-profile/patient-profile">
          <Button colorScheme="yellow">Back</Button>
        </Link>
      </FormWrapper>
    </div>
  );
}
