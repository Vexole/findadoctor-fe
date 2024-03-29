'use client';

import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCitiesQuery } from '@/hooks';
import { Button, FormControl, FormLabel, Input, Stack, useToast } from '@chakra-ui/react';
import { createPatientProfile } from '@/api/patient/createPatientProfile';
import { useMutation, useQuery } from '@tanstack/react-query';
import { maritalStatus } from '@/api/shared/maritalStatus';
import { getGender } from '@/api/shared/gender';
import { useRouter } from 'next/navigation';
import { FormInput, FormWrapper, FormSelect } from '@/components';
import { uploadImage } from '@/utils/cloudinary';

const patientProfileSchema = z.object({
  firstName: z.string().nonempty({ message: 'First name is required' }),
  middleName: z.string().optional(),
  lastName: z.string().nonempty({ message: 'Last name is required' }),
  phone: z.string().nonempty({ message: 'Phone is required' }),
  contactInformation: z.string().nonempty({ message: 'Contact information is required' }),
  gender: z.string().nonempty({ message: 'Gender is required' }),
  dateOfBirth: z.date({
    required_error: 'Date of birth is required',
    invalid_type_error: 'Date of birth is required',
  }),
  cityId: z.number({
    required_error: 'City is required',
    invalid_type_error: 'City is required',
  }),
  street: z.string().nonempty({ message: 'Street is required' }),
  postalCode: z.string().nonempty({ message: 'Postal code is required' }),
  userId: z.string().nonempty({ message: 'User ID is required' }),
  emergencyContact: z.string().nonempty({ message: 'Emergency contact is required' }),
  maritalStatus: z.string().nonempty({ message: 'Marital status is required' }),
  occupation: z.string().nonempty({ message: 'Occupation is required' }),
  profilePicture: z.string().optional(),
});

export type PatientProfileType = z.infer<typeof patientProfileSchema>;

const PatientProfileCreate: NextPage = () => {
  const { replace } = useRouter();
  const toast = useToast();
  const cities = useCitiesQuery();
  const maritalStatusRes = useQuery(['maritalStatus'], maritalStatus);
  const genders = useQuery(['genders'], getGender);
  const createPatientProfileMutation = useMutation(createPatientProfile, {
    onSuccess: () => {
      toast({
        title: 'Profile Created!',
        status: 'success',
        isClosable: true,
      });

      replace('/patient');
    },
    onError: () => {
      toast({
        title: 'Something went wrong. Try Again Later.',
        status: 'error',
        isClosable: true,
      });
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PatientProfileType>({
    resolver: zodResolver(patientProfileSchema),
    defaultValues: {
      userId: JSON.parse(localStorage.getItem('user') as string).userId || null,
      profilePicture:
        'https://res.cloudinary.com/dbmmtklps/image/upload/v1688519237/q8v58luexpmgoxacidj9.jpg',
    },
  });

  const onSubmit = (data: PatientProfileType) => {
    createPatientProfileMutation.mutateAsync(data);
    console.log(data);
  };

  const handleProfilePictureChange = (data: any) => {
    // console.log(data.target.files);
    uploadImage(data.target.files).then(res => {
      console.log(res);
      setValue('profilePicture', res.data.url);
    });
  };

  return (
    <>
      <FormWrapper
        onSubmit={handleSubmit(onSubmit)}
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
        <FormControl>
          <img className="profile-image" src={watch('profilePicture')} alt="Profile Picture" />
          <FormLabel htmlFor="profilePicture">Profile Picture</FormLabel>
          <Input type="file" accept="image/*" onChange={e => handleProfilePictureChange(e)} />
        </FormControl>
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
          label="Occupation"
          placeholder="Enter occupation"
          register={register('occupation')}
          isInvalid={Boolean(errors.occupation)}
          helperText={errors.occupation ? String(errors.occupation?.message) : ''}
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

        <FormSelect
          label="Gender"
          options={
            genders.data?.map(gender => ({ label: gender.description, value: gender.value })) || []
          }
          register={register('gender')}
          isInvalid={Boolean(errors.gender)}
          helperText={errors.gender ? String(errors.gender?.message) : ''}
        />

        <FormSelect
          label="Marital Status"
          options={
            maritalStatusRes.data?.map(maritalStatus => ({
              label: maritalStatus.description,
              value: maritalStatus.value,
            })) || []
          }
          register={register('maritalStatus')}
          isInvalid={Boolean(errors.maritalStatus)}
          helperText={errors.maritalStatus ? String(errors.maritalStatus?.message) : ''}
        />

        <FormInput
          label="Email"
          placeholder="Enter your email"
          register={register('contactInformation')}
          isInvalid={Boolean(errors.contactInformation)}
          helperText={errors.contactInformation ? String(errors.contactInformation?.message) : ''}
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
            cities.data?.map((cities: { cityName: string; cityId: number }) => ({
              label: cities.cityName,
              value: cities.cityId,
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
            isLoading={createPatientProfileMutation.isLoading}
            type="submit"
            colorScheme="facebook"
            flex={1}
          >
            Create Profile
          </Button>
        </Stack>
      </FormWrapper>
    </>
  );
};

export default PatientProfileCreate;
