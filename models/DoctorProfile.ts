export type Experience = {
  doctorExperienceId?: number;
  companyName: string;
  description: string;
  startDate: string;
  endDate: string;
}

export type Education = {
  doctorEducationBackgroundId?: number;
  degree: string;
  institutionName: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export type DoctorProfile = {
  name: string;
  profilePicture: any;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  gender: string;
  phone: string;
  contactInformation: string;
  fees: number;
  userId: string;
  isAcceptingNewPatients: boolean;
  doctorEducationBackgrounds: Education[];
  experiences: Experience[];
  waitingTime: string;
  street: string;
  cityId: string;
  cityName?: string;
  state?: string;
  postalCode: string;
  doctorSpecialties: {
    specialtyId: string;
    specialtyName?: string;
  }[];
  doctorLanguages: {
    languageId: string;
    languageName?: string;
  }[];
};
