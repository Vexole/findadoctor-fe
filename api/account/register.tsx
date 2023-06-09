import axiosInstance from '@/http/axiosInstance';

type RegisterParams = { email: string; password: string; role: string };

export async function register(params: RegisterParams) {
  const { data } = await axiosInstance.post('/Account/register', params);
  return data.data;
}
