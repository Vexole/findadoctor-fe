import { getPaitentAppointments } from "@/api/appointment";
import { useQuery } from "@tanstack/react-query";

export const usePatientAppointmentsQuery = () => {
    const authenticatedUser = localStorage.user ? JSON.parse(localStorage.user) : {};
    const userId = authenticatedUser?.userId;
    return useQuery(["appointments", userId], () => getPaitentAppointments(userId));
}