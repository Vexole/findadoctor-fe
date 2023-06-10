export type Experience = {
  companyName: string;
  description: string;
  startDate: string;
  endDate: string;
}

export type Education = {
  degree: string;
  institutionName: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export type DoctorProfile = {
  name: string;
  // profilePicture: string;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  // age: number;
  // gender: string;
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
  postalCode: string;
  doctorSpecialties: {
    specialtyId: string;
  }[];
  doctorLanguages: {
    languageId: string;
  }[];
};
