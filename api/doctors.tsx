import { DoctorProfile } from "@/models/DoctorProfile";
import axiosInstance from "@/http/axiosInstance";

export function saveDoctorProfile(doctor: DoctorProfile) {
    doctor.userId = "a6c305b7-d11f-46b5-938b-0545ebf99778";
    localStorage.setItem("userId", "a6c305b7-d11f-46b5-938b-0545ebf99778");
    if (localStorage.token == null)
        localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhNmMzMDViNy1kMTFmLTQ2YjUtOTM4Yi0wNTQ1ZWJmOTk3NzgiLCJlbWFpbCI6ImJodXBlc2guc3RoYUBnbWFpbC5jb20iLCJyb2xlIjoiRG9jdG9yIiwibmJmIjoxNjg1ODUwMzk5LCJleHAiOjE2ODU4NTA0NTksImlhdCI6MTY4NTg1MDM5OX0.yGQdKY0H2YzpHZ9_6oqfCl9b4r_u0x48XTqSSb1DkvE");
    localStorage.setItem("refreshToken", "491e1dcc-30d0-4512-ad0f-1205036d6157");

    return axiosInstance
        .post("/doctor/create-doctor", { doctor })
        .then((res) => res.data)
        .catch((e) => {
            throw new Error(e.message);
        });
}

export function getDoctorsList() {
    return axiosInstance
        .get("/doctors")
        .then((res) => res.data)
        .catch((e) => {
            throw new Error(e.message);
        });
}

export function getLanguages(): Promise<any> {
    return axiosInstance
        .get("/shared/languages")
        .then((res) => res.data.data)
        .catch((e) => {
            throw new Error(e.message);
        });
}

export function getCities(): Promise<any> {
    return axiosInstance
        .get("/shared/cities")
        .then((res) => res.data.data)
        .catch((e) => {
            throw new Error(e.message);
        });
}

export function getSpecializations(): Promise<any> {
    return axiosInstance
        .get("/shared/specialties")
        .then((res) => res.data.data)
        .catch((e) => {
            throw new Error(e.message);
        });
}