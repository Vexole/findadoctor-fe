import axiosInstance from '@/http/axiosInstance';

export const getPatientProfile = async () => {
  const userId = JSON.parse(localStorage.getItem('user') as string).userId;

  const { data } = await axiosInstance.get<{ data: any }>(`/Patient/get-patient-profile/${userId}`);

  return data.data;
};
