import { getDoctorAvailability } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useAppointmentsQuery = () => {
    const authenticatedUser = localStorage.user ? JSON.parse(localStorage.user) : {};
    const userId = authenticatedUser?.userId;
    return useQuery(["appointments", userId], () => getDoctorAvailability(userId));
}