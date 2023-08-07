import axiosInstance from "@/http/axiosInstance";
import { DoctorProfile } from "@/models/DoctorProfile";
import { getUser } from "@/utils/userUtils";

export function saveDoctorProfile(doctor: DoctorProfile) {
    doctor.contactInformation = doctor.phone;
    const authenticatedUser = getUser();
    const userId = authenticatedUser?.userId;
    doctor.userId = userId;
    return axiosInstance
        .post("/doctor/create-doctor", { ...doctor })
        .then((res) => res.data)
        .catch((e) => {
            throw e;
        });
}