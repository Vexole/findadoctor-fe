import { getDoctorAppointments } from "@/api/appointment";
import { useQuery } from "@tanstack/react-query";

export const useDoctorAppointmentsQuery = () => {
    const authenticatedUser = localStorage.user ? JSON.parse(localStorage.user) : {};
    const userId = authenticatedUser.userId;
    return useQuery(["appointments", userId], () => getDoctorAppointments(userId));
}