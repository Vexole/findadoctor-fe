import axiosInstance from "@/http/axiosInstance";
import { DoctorProfile } from "@/models/DoctorProfile";

export function getDoctorProfile(doctorId: string): Promise<DoctorProfile> {
    return axiosInstance
        .get(`/doctor/doctor-profile/${doctorId}`)
        .then((res) => {
            if (res.data.data.profilePicture === '')
                res.data.data.profilePicture = "https://res.cloudinary.com/dbmmtklps/image/upload/v1688519237/q8v58luexpmgoxacidj9.jpg"
            return res.data.data
        })
        .catch((e) => {
            throw new Error(e);
        });
}

export function getSharedDoctorProfile(doctorId: string): Promise<DoctorProfile> {
    return axiosInstance
        .get(`/shared/doctor-profile/${doctorId}`)
        .then((res) => {
            if (res.data.data.profilePicture === '')
                res.data.data.profilePicture = "https://res.cloudinary.com/dbmmtklps/image/upload/v1688519237/q8v58luexpmgoxacidj9.jpg"
            return res.data.data
        })
        .catch((e) => {
            throw new Error(e);
        });
}