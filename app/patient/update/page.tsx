'use client';

import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCitiesQuery } from '@/hooks';
import { Button, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useMutation, useQuery } from '@tanstack/react-query';
import { maritalStatus } from '@/api/shared/maritalStatus';
import { getGender } from '@/api/shared/gender';
import { getPatientProfile } from '@/api/patient/getPatientProfile';
import { updatePatientProfile } from '@/api/patient/updatePatientProfile';
import { useRouter } from 'next/navigation';

// {
//   "firstName": "string",
//   "middleName": "string",
//   "lastName": "string",
//   "phone": "string",
//   "contactInformation": "string",
//   "gender": "string",
//   "dateOfBirth": "2023-07-02T15:32:37.695Z",
//   "cityId": 0,
//   "street": "string",
//   "postalCode": "string",
//   "userId": "string",
//   "emergencyContact": "string",
//   "maritalStatus": "string",
//   "occupation": "string",
//   "profilePicture": "string"
// }

const patientProfileSchema = z.object({
  firstName: z.string().nonempty({ message: 'First name is required' }),
  middleName: z.string().optional(),
  lastName: z.string().nonempty({ message: 'Last name is required' }),
  phone: z.string().nonempty({ message: 'Phone is required' }),
  contactInformation: z.string().nonempty({ message: 'Contact information is required' }),
  gender: z.string().nonempty({ message: 'Gender is required' }),
  dateOfBirth: z.date({
    required_error: 'Date of birth is required',
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

type PatientProfileType = z.infer<typeof patientProfileSchema>;

const PatientProfileUpdate: NextPage = () => {
  const { replace } = useRouter();
  const toast = useToast();
  const cities = useCitiesQuery();
  const maritalStatusRes = useQuery(['maritalStatus'], maritalStatus);
  const genders = useQuery(['genders'], getGender);
  const updatePatientMutation = useMutation(updatePatientProfile, {
    onSuccess: () => {
      toast({
        title: 'Patient profile updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      replace('/patient');
    },
    onError: () => {
      toast({
        title: 'Patient profile update failed',
        description: 'Something went wrong. Please try again later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientProfileType>({
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

  const onSubmit = (data: PatientProfileType) => {
    console.log(data);
    updatePatientMutation.mutateAsync(data);
  };

  return (
    <div
      className="form-container"
      style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', border: '1px solid black' }}
    >
      <h1 style={{ textAlign: 'center' }}>Patient Profile</h1>
      <form style={{ marginTop: '20px' }} onSubmit={handleSubmit(onSubmit)}>
        <h2 style={{ marginTop: '30px' }}>Create Your Account</h2>
        <div>
          <h3 style={{ marginBottom: '30px' }}>Personal Information</h3>
          <div style={{ marginBottom: '10px' }}>
            <input type="text" id="userId" {...register('userId')} hidden />
            <section style={{ marginRight: '10px' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="firstName">
                First Name:
              </label>
              <input type="text" id="firstName" {...register('firstName')} />
              {errors.firstName && (
                <span style={{ display: 'block', color: 'red' }}>{errors.firstName.message}</span>
              )}
            </section>
            <section style={{ marginRight: '10px' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="middleName">
                Middle Name:
              </label>
              <input type="text" id="middleName" {...register('middleName')} />
              {errors.middleName && (
                <span style={{ display: 'block', color: 'red' }}>{errors.middleName.message}</span>
              )}
            </section>
            <section>
              <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="lastName">
                Last Name:
              </label>
              <input type="text" id="lastName" {...register('lastName')} />
              {errors.lastName && (
                <span style={{ display: 'block', color: 'red' }}>{errors.lastName.message}</span>
              )}
            </section>
            <section>
              <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="phone">
                Phone:
              </label>
              <input type="text" id="phone" {...register('phone')} />
              {errors.phone && (
                <span style={{ display: 'block', color: 'red' }}>{errors.phone.message}</span>
              )}
            </section>
            <section>
              <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="emergencyContact">
                Emergency Contact:
              </label>
              <input type="text" id="emergencyContact" {...register('emergencyContact')} />
              {errors.emergencyContact && (
                <span style={{ display: 'block', color: 'red' }}>
                  {errors.emergencyContact.message}
                </span>
              )}
            </section>
            <section>
              <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="occupation">
                Occupation:
              </label>
              <input type="text" id="occupation" {...register('occupation')} />
              {errors.occupation && (
                <span style={{ display: 'block', color: 'red' }}>{errors.occupation.message}</span>
              )}
            </section>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <section>
              <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="dateOfBirth">
                Date of Birth:
              </label>
              <input
                type="date"
                id="dateOfBirth"
                {...register('dateOfBirth', {
                  valueAsDate: true,
                })}
                style={{ width: '400px' }}
              />
              {errors.dateOfBirth && (
                <span style={{ display: 'block', color: 'red' }}>{errors.dateOfBirth.message}</span>
              )}
            </section>
            <section>
              <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="gender">
                Gender:
              </label>
              {genders.isLoading && !genders.isError ? (
                <p>Loading...</p>
              ) : (
                <select style={{ width: '400px' }} id="city" {...register('gender')}>
                  <option value={undefined}>Please Select</option>
                  {genders.data?.map(gen => (
                    <option value={gen.value}>{gen.description}</option>
                  ))}
                </select>
              )}
              {errors.gender && (
                <span style={{ display: 'block', color: 'red' }}>{errors.gender.message}</span>
              )}
            </section>
            <section style={{ marginBottom: '10px' }}>
              <div style={{ marginRight: '95px', flex: 1 }}>
                <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="maritalStatus">
                  Marital Status:
                </label>
                {maritalStatusRes.isLoading && !maritalStatusRes.isError ? (
                  <p>Loading...</p>
                ) : (
                  <select style={{ width: '400px' }} id="city" {...register('maritalStatus')}>
                    <option value={undefined}>Please Select</option>
                    {maritalStatusRes.data?.map(maritalStatus => (
                      <option value={maritalStatus.value}>{maritalStatus.description}</option>
                    ))}
                  </select>
                )}
                {errors.maritalStatus && (
                  <span style={{ display: 'block', color: 'red' }}>
                    {errors.maritalStatus.message}
                  </span>
                )}
              </div>
            </section>
            <section>
              <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="contactInformation">
                Email:
              </label>
              <input
                type="email"
                id="email"
                {...register('contactInformation')}
                style={{ width: '100%', maxWidth: '400px' }}
              />
              {errors.contactInformation && (
                <span style={{ display: 'block', color: 'red' }}>
                  {errors.contactInformation.message}
                </span>
              )}
            </section>
          </div>
        </div>
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '30px' }}>Address Information</h3>
          <section style={{ marginBottom: '10px' }}>
            <label style={{ fontWeight: 'bold' }} htmlFor="street">
              Street Address:
            </label>
            <input
              style={{ width: '400px' }}
              type="text"
              id="streetAddress"
              {...register('street')}
            />
            {errors.street && <span style={{ color: 'red' }}>{errors.street.message}</span>}
          </section>
          <div>
            <section style={{ marginBottom: '10px' }}>
              <div style={{ marginRight: '95px', flex: 1 }}>
                <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="cityId">
                  City:
                </label>
                {cities.isLoading && !cities.isError ? (
                  <p>Loading...</p>
                ) : (
                  <select
                    style={{ width: '400px' }}
                    id="city"
                    {...register('cityId', {
                      valueAsNumber: true,
                    })}
                  >
                    <option value={undefined}>Please Select</option>
                    {cities.data &&
                      cities.data.map(
                        (city: { cityId: number; cityName: string; stateId: number }) => (
                          <option key={city.cityId} value={city.cityId}>
                            {city.cityName}
                          </option>
                        )
                      )}
                  </select>
                )}
                {errors.cityId && (
                  <span style={{ display: 'block', color: 'red' }}>{errors.cityId.message}</span>
                )}
              </div>
            </section>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <section>
              <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="postalCode">
                Zip Code:
              </label>
              <input
                style={{ width: '400px' }}
                type="text"
                id="zipCode"
                {...register('postalCode')}
              />
              {errors.postalCode && (
                <span style={{ display: 'block', color: 'red' }}>{errors.postalCode.message}</span>
              )}
            </section>
          </div>
        </div>
        <Button type="submit" colorScheme="blue" flex={1}>
          Update
        </Button>
      </form>
    </div>
  );
};

export default PatientProfileUpdate;
