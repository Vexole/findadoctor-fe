import axiosInstance from '@/http/axiosInstance';

type LogoutParams = { userId: string };

export async function logout(params: LogoutParams) {
  const { data } = await axiosInstance.post('/Account/logout', params);
  return data;
}
