import axiosInstance from '@/http/axiosInstance';

type ChangePasswordParams = {
    userId: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};

export async function changePassword(params: ChangePasswordParams) {
    const { data } = await axiosInstance.put('/Account/change-password', params);
    return data.data;
}
