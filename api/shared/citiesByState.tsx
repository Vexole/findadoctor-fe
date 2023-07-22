import axiosInstance from '@/http/axiosInstance';
import { ApiPayload } from '../common';

type CitiesByStatePayload = {
  cityId: number;
  cityName: string;
  stateId: number;
};

export async function citiesByState(stateId: number) {
  const { data } = await axiosInstance.get<ApiPayload<CitiesByStatePayload>>(
    `/shared/cities-by-state`,
    { params: { stateId } }
  );
  return data.data;
}
