import { getWeekDays } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useWeekDaysQuery = () => useQuery(["weekdays"], () => getWeekDays());