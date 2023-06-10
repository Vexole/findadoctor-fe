import { getRoles } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useRolesQuery = () => useQuery(["roles"], () => getRoles());