export type DoctorProfile = {
  name: string;
  // profilePicture: string;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  phone: string;
  contactInformation: string;
  fees: number;
  userId: string;
  isAcceptingNewPatients: boolean;
  doctorEducationBackgrounds: {
    degree: string;
    institutionName: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
  }[];
  experiences: {
    companyName: string;
    description: string;
    startDate: string;
    endDate: string;
  }[];
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
