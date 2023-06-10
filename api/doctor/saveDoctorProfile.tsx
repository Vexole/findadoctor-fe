import axiosInstance from "@/http/axiosInstance";
import { DoctorProfile } from "@/models/DoctorProfile";

export function saveDoctorProfile(doctor: DoctorProfile) {
    doctor.contactInformation = doctor.phone;
    const authenticatedUser = localStorage.user ? JSON.parse(localStorage.user) : {};
    const userId = authenticatedUser?.userId;
    doctor.userId = userId;
    return axiosInstance
        .post("/doctor/create-doctor", { ...doctor })
        .then((res) => res.data)
        .catch((e) => {
            throw new Error(e.message);
        });
}