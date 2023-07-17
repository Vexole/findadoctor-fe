import axiosInstance from '@/http/axiosInstance';
import { ApiPayload } from '../common';

export type DoctorSpecialties = {
  specialtyId: number;
  specialtyName: string;
};

export type DoctorLanguages = {
  languageId: number;
  languageName: string;
};

type DoctorEducationBackgrounds = {
  doctorEducationBackgroundId: number;
  institutionName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
};

type DoctorExperiences = {
  doctorExperienceId: number;
  companyName: string;
  description: string;
  startDate: string;
  endDate: string;
};

type Doctors = {
  userId: string;
  doctorId: number;
  title: string;
  name: string;
  waitingTime: string;
  fees: string;
  profilePicture: string;
  cityName: string;
  stateId: number;
  state: string;
  doctorLanguages: DoctorLanguages[];
  doctorEducationBackgrounds: DoctorEducationBackgrounds[];
  experiences: DoctorExperiences[];
  doctorSpecialties: DoctorSpecialties[];
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  contactInformation: string;
  gender: string;
  dateOfBirth: string;
  cityId: number;
  street: string;
  postalCode: string;
  age: number;
};

export async function getDoctors() {
  const { data } = await axiosInstance.get<ApiPayload<Doctors>>(`/Shared/get-doctors`);
  return data.data;
}
