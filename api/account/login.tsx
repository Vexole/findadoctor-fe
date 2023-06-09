import axiosInstance from '@/http/axiosInstance';

type LoginParams = { email: string; password: string };

export async function login(params: LoginParams) {
  const { data } = await axiosInstance.post('/Account/login', params);
  return data.data;
}
