import axiosInstance from '@/http/axiosInstance';

export async function getRoles() {
  const { data } = await axiosInstance.get('/shared/roles');
  return data.data;
}
