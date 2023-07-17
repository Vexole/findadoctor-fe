import { getDoctors } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useDoctorsQuery = () => useQuery(["doctors"], () => getDoctors());