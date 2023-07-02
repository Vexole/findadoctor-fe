import axiosInstance from '@/http/axiosInstance';
import { ApiPayload } from '../common';

type RolesPayload = {
  roleName: string;
  roleDescription: string;
};

export async function getRoles() {
  const { data } = await axiosInstance.get<ApiPayload<RolesPayload>>('/shared/roles');
  return data.data;
}
