import axiosInstance from '@/http/axiosInstance';

export const getGender = async () => {
  const { data } = await axiosInstance.get<{
    data: { value: string; description: string }[];
  }>('/Shared/genders');
  return data.data;
};
