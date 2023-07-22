import { GetDoctorsParams, getDoctors } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useDoctorsQuery = (params: GetDoctorsParams) => useQuery(["doctors", params], () => getDoctors(params));