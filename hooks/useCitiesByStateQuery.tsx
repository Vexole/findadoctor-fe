import { citiesByState } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useCitiesByStateQuery = (stateId: number) => useQuery(["citiesbystate", stateId], () => citiesByState(stateId), {
  enabled: Boolean(stateId)
});