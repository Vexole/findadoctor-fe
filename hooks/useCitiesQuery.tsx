import { getCities } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useCitiesQuery = () => useQuery(["cities"], () => getCities());