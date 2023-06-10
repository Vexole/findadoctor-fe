import { getLanguages } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useLanguagesQuery = () => useQuery(["languages"], () => getLanguages());