import { getStates } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useStatesQuery = () => useQuery(["states"], () => getStates());