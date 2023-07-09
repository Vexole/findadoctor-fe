import { getDoctorAvailability } from "@/api";
import { useQuery } from "@tanstack/react-query";

const authenticatedUser = localStorage.user ? JSON.parse(localStorage.user) : {};
const userId = authenticatedUser?.userId;

export const useAppointmentsQuery = () => useQuery(["appointments", userId], () => getDoctorAvailability(userId));