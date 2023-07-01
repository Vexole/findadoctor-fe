import { getDoctorAvailability } from "@/api";
import { useQuery } from "@tanstack/react-query";

const authenticatedUser = localStorage.user ? JSON.parse(localStorage.user) : {};
const doctorId = authenticatedUser?.userId;

export const useDoctorAvailabilityQuery = () => useQuery(["doctorAvailability", doctorId], () => getDoctorAvailability(doctorId));