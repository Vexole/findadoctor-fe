import axiosInstance from '@/http/axiosInstance';
import { ApiPayload } from '../common';

type StatesPayload = {
  stateId: number;
  stateName: string;
};

export async function getStates() {
  const { data } = await axiosInstance.get<ApiPayload<StatesPayload>>('/shared/states');
  return data.data;
}
