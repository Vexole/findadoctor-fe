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
import { Button, useToast } from '@chakra-ui/react';
import { createDoctorStaff } from '@/api/doctor/addDoctorStaff';
import { useEffect, useState } from 'react';

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
    console.log(data);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="form-container"
      style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', border: '1px solid black' }}
    >
      <h1 style={{ textAlign: 'center' }}>Staff Profile</h1>
      <form style={{ marginTop: '20px' }} onSubmit={handleSubmit(onSubmit)}>
        <h2 style={{ marginTop: '30px' }}>Create Staff Account</h2>
        <div>
          <h3 style={{ marginBottom: '30px' }}>Staff Information</h3>
          <div style={{ marginBottom: '10px' }}>
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
              <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="contactInformation">
                Contact Informationm:
              </label>
              <input type="email" id="contactInformation" {...register('contactInformation')} />
              {errors.contactInformation && (
                <span style={{ display: 'block', color: 'red' }}>
                  {errors.contactInformation.message}
                </span>
              )}
            </section>
            <section>
              <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="email">
                Email:
              </label>
              <input type="email" id="email" {...register('email')} />
              {errors.email && (
                <span style={{ display: 'block', color: 'red' }}>{errors.email.message}</span>
              )}
            </section>
            <section>
              <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="password">
                Password:
              </label>
              <input type="password" id="password" {...register('password')} />
              {errors.password && (
                <span style={{ display: 'block', color: 'red' }}>{errors.password.message}</span>
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
              <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="dateOfHire">
                Date of Hire:
              </label>
              <input
                type="date"
                id="dateOfHire"
                {...register('dateOfHire', {
                  valueAsDate: true,
                })}
                style={{ width: '400px' }}
              />
              {errors.dateOfHire && (
                <span style={{ display: 'block', color: 'red' }}>{errors.dateOfHire.message}</span>
              )}
            </section>
            <section>
              <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="gender">
                Gender:
              </label>
              {genderOptions.isLoading && !genderOptions.isError ? (
                <p>Loading...</p>
              ) : (
                <select style={{ width: '400px' }} id="city" {...register('gender')}>
                  <option value={undefined}>Please Select</option>
                  {genderOptions.data?.map(gen => (
                    <option value={gen.value}>{gen.description}</option>
                  ))}
                </select>
              )}
              {errors.gender && (
                <span style={{ display: 'block', color: 'red' }}>{errors.gender.message}</span>
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
                {cityOptions.isLoading && !cityOptions.isError ? (
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
                    {cityOptions.data &&
                      cityOptions.data.map(
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
          Create
        </Button>
      </form>
    </div>
  );
}
