import axiosInstance from '@/http/axiosInstance';

export function getCities(): Promise<any> {
  return axiosInstance
    .get('/shared/cities')
    .then(res => res.data.data)
    .catch(e => {
      throw new Error(e.message);
    });
}