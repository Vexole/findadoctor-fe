import axiosInstance from '@/http/axiosInstance';

type ForgotPasswordParams = { password: string };

export async function forgotPassword(params: ForgotPasswordParams) {
  const { data } = await axiosInstance.post('/Account/forgot-password', params);
  return data.data;
}
