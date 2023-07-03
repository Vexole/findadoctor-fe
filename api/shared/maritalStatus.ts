import axiosInstance from '@/http/axiosInstance';

export const maritalStatus = async () => {
  const { data } = await axiosInstance.get<{
    data: { value: string; description: string }[];
  }>('/Shared/maritalstatuses');

  return data.data;
};
