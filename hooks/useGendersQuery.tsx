import { getGenders } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGendersQuery = () => useQuery(["genders"], () => getGenders());