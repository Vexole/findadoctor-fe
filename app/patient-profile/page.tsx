'use client';

import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { getCities } from '@/api/doctors';

const patientProfileSchema = z.object({
  firstName: z.string().nonempty({
    message: 'First name is required',
  }),
  middleName: z.string().optional(),
  lastName: z.string().nonempty({
    message: 'Last name is required',
  }),
  dateOfBirth: z.date({
    required_error: 'Date of birth is required',
  }),
  gender: z.string().nonempty({
    message: 'Please select gender',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  streetAddress: z.string().nonempty({
    message: 'Street address is required',
  }),
  city: z.string().nonempty({
    message: 'Please select city',
  }),
  state: z.string().nonempty({
    message: 'State is required',
  }),
  zipCode: z.string().nonempty({
    message: 'Zip Code is required',
  }),
  streetName: z.string().nonempty({
    message: 'Street name is required',
  }),
});

type PatientProfile = z.infer<typeof patientProfileSchema>;

const PatientProfile: NextPage = () => {
  const [cityOptions, setCityOptions] = useState<JSX.Element[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientProfile>({
    resolver: zodResolver(patientProfileSchema),
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cities: any[] = await getCities();
        const cityOptions = cities.map((city: any) => {
          return (
            <option key={city.cityId} value={city.cityId}>
              {city.cityName}
            </option>
          );
        });
        setCityOptions(cityOptions);
      } catch (error: any) {
        console.error('Error occurred while fetching cities:', error.message);
      }
    };

    fetchCities();
  }, []);

  const onSubmit = (data: PatientProfile) => {
    console.log(data);
  };

  return (
    <div className='form-container' style={{maxWidth: '800px', margin: '0 auto', padding: '20px', border: '1px solid black'}}>
      <h1 style={{textAlign: 'center'}}>Patient Profile</h1>
      <form style={{marginTop: '20px'}} onSubmit={handleSubmit(onSubmit)}>
        <h2 style={{marginTop: '30px'}}>Create Your Account</h2>
        <div>
          <h3 style={{marginBottom: '30px'}}>Personal Information</h3>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
    <section style={{ marginRight: '10px' }}>
      <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="firstName">First Name:</label>
      <input type="text" id="firstName" {...register('firstName')} />
      {errors.firstName && <span style={{display: 'block', color: 'red'}}>{errors.firstName.message}</span>}
    </section>
    <section style={{ marginRight: '10px' }}>
      <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="middleName">Middle Name:</label>
      <input type="text" id="middleName" {...register('middleName')} />
      {errors.middleName && <span style={{display: 'block', color: 'red'}}>{errors.middleName.message}</span>}
    </section>
    <section>
      <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="lastName">Last Name:</label>
      <input type="text" id="lastName" {...register('lastName')} />
      {errors.lastName && <span style={{display: 'block', color: 'red'}}>{errors.lastName.message}</span>}
    </section>
  </div>
  <div style={{ marginBottom: '10px', display: 'flex' }}>
  <section>
    <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="dateOfBirth">Date of Birth:</label>
    <input
      type="date"
      id="dateOfBirth"
      {...register('dateOfBirth', {
        valueAsDate: true,
      })}
      style={{ width: '220px' }}
    />
    {errors.dateOfBirth && <span style={{display: 'block', color: 'red'}}>{errors.dateOfBirth.message}</span>}
  </section>
  <section style={{ marginLeft: '10px'}}>
    <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="gender">Gender:</label>
    <select id="gender" {...register('gender')} style={{ width: '220px' }}>
      <option value="">Please Select</option>
      <option value="M">Male</option>
      <option value="F">Female</option>
    </select>
    {errors.gender && <span style={{display: 'block', color: 'red'}}>{errors.gender.message}</span>}
  </section>
  <section style={{flex: 1, marginLeft: '15px' }}>
    <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="email">Email:</label>
    <input type="email" id="email" {...register('email')} style={{ width: '100%', maxWidth: '220px' }} />
    {errors.email && <span style={{display: 'block', color: 'red'}}>{errors.email.message}</span>}
  </section>
</div>
        </div>
        <div style={{marginBottom: '30px'}}>
          <h3 style={{marginBottom: '30px'}}>Address Information</h3>
          <section style={{marginBottom: '10px'}}>
            <label style={{display: 'block', fontWeight: 'bold'}} htmlFor="streetAddress">Street Address:</label>
            <input style={{width: '680px'}} type="text" id="streetAddress" {...register('streetAddress')} />
            {errors.streetAddress && <span style={{display: 'block', color: 'red'}}>{errors.streetAddress.message}</span>}
          </section>
          <div>
  <section style={{ marginBottom: '10px', display: 'flex' }}>
    <div style={{ flex: 1, marginRight: '10px' }}>
      <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="streetName">Street Name:</label>
      <input style={{width: '330px'}} type="text" id="streetName" {...register('streetName')} />
      {errors.streetName && <span style={{display: 'block', color: 'red'}}>{errors.streetName.message}</span>}
    </div>
    <div style={{    marginRight: '95px', flex: 1 }}>
      <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="city">City:</label>
      <select style={{width: '330px'}} id="city" {...register('city')}>
        <option value="">Please Select</option>
        {cityOptions.length > 0 &&
          cityOptions.map((city) => (
            <option key={city.props.children} value={city.props.children}>
              {city.props.children}
            </option>
          ))}
      </select>
      {errors.city && <span style={{display: 'block', color: 'red'}}>{errors.city.message}</span>}
    </div>
  </section>
</div>

<div style={{ display: 'flex', marginBottom: '10px' }}>
  <section style={{ marginRight: '10px' }}>
    <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="state">State / Province:</label>
    <input style={{width: '330px'}} type="text" id="state" {...register('state')} />
    {errors.state && <span style={{display: 'block', color: 'red'}}>{errors.state.message}</span>}
  </section>
  <section style={{marginLeft: '10px'}}>
    <label style={{ display: 'block', fontWeight: 'bold' }} htmlFor="zipCode">Zip Code:</label>
    <input style={{width: '320px'}} type="text" id="zipCode" {...register('zipCode')} />
    {errors.zipCode && <span style={{display: 'block', color: 'red'}}>{errors.zipCode.message}</span>}
  </section>
</div>

        </div>
        <button type="submit" style={{ display: 'block', marginLeft: '300px', width: '20%' }}>Register</button>
      </form>
    </div>
  );
};

export default PatientProfile;
