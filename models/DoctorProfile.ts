export type DoctorProfile = {
  profilePicture: string;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  phoneNumber: string;
  fees: number;
  userId: string;
  isAcceptingNewPatients: boolean;
  doctorEducationBackgrounds: {
    degree: string;
    instituteName: string;
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
