import axiosInstance from '@/http/axiosInstance';

export function getSpecializations(): Promise<any> {
  return axiosInstance
    .get('/shared/specialties')
    .then(res => res.data.data)
    .catch(e => {
      throw new Error(e.message);
    });
}
