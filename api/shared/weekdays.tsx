import axiosInstance from '@/http/axiosInstance';
import { ApiPayload } from '../common';

type WeekDaysPayload = {
  value: string;
};

export async function getWeekDays() {
  const { data } = await axiosInstance.get<ApiPayload<WeekDaysPayload>>('/shared/weekdays');
  return data.data;
}
