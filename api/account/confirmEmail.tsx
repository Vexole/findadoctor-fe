import axiosInstance from '@/http/axiosInstance';

type ConfirmEmailParams = { userId: string; token: string };

export async function confirmEmail(params: ConfirmEmailParams) {
  const { data } = await axiosInstance.put('/Account/confirm-email', params);
  return data;
}
