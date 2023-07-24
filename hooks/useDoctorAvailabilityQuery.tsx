import { getDoctorAvailability, getStaffDoctorAvailability } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useDoctorAvailabilityQuery = (userId: string, isStaff: boolean) => useQuery(["doctorAvailability", userId], () => isStaff ? getStaffDoctorAvailability(userId) : getDoctorAvailability(userId));