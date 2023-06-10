import axiosInstance from "@/http/axiosInstance";
import { DoctorProfile } from "@/models/DoctorProfile";

export function getDoctorProfile(doctorId: string): Promise<DoctorProfile> {
    return axiosInstance
        .get(`/doctor/doctor-profile/${doctorId}`)
        .then((res) => res.data.data)
        .catch((e) => {
            throw new Error(e);
        });
}