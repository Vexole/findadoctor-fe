import { getPendingDoctorsList } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const usePendingDoctorsQuery = () => useQuery(["pendingDoctors"], () => getPendingDoctorsList());