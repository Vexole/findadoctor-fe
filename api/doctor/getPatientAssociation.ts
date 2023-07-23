import axiosInstance from '@/http/axiosInstance';

export const getApprovedPatientAssociation = async ({ userId }: { userId: string }) => {
  //add type
  const { data } = await axiosInstance.get(`/Doctor/get-patient-list/${userId}`);

  const patients = data.data.doctorPatientsList;

  return patients;
};
//localhost:7291/api/Doctor/get-patient-request-list/60e99c6c-7306-4e1c-8299-4ca4884fbc8c (
export const getPendingPatientAssociation = async ({ userId }: { userId: string }) => {
  //add type
  const { data } = await axiosInstance.get(`/Doctor/get-patient-request-list/${userId}`);

  const patients = data.data.doctorPatientsList;

  return patients;
};
