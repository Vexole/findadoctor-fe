import { getDoctorAppointments } from "@/api/appointment";
import { useQuery } from "@tanstack/react-query";

const authenticatedUser = localStorage.user ? JSON.parse(localStorage.user) : {};
const userId = authenticatedUser?.userId;

export const useDoctorAppointmentsQuery = () =>
    useQuery(["appointments", userId], () => getDoctorAppointments(userId));