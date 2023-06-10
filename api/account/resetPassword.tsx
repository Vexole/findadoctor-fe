import axiosInstance from '@/http/axiosInstance';

type ConfirmResetPasswordTokenParams = { userId: string; token: string };
type ResetPasswordParams = ConfirmResetPasswordTokenParams & { newPassword: string };

export async function resetPassword(params: ResetPasswordParams) {
  const { data } = await axiosInstance.put('/Account/reset-password', params);
  return data.data;
}

export async function confirmResetPasswordToken(params: ConfirmResetPasswordTokenParams) {
  const { data } = await axiosInstance.post('/Account/confirm-reset-password-token', params);
  return data.data;
}
