import { getSpecializations } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useSpecializationsQuery = () => useQuery(["specializations"], () => getSpecializations());