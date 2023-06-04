import { DoctorProfile } from "@/models/DoctorProfile";
import axiosInstance from "@/http/axiosInstance";

export function saveDoctorProfile(doctor: DoctorProfile) {
    doctor.userId = "25e08fcc-05dd-478d-a2d4-8e395785f3e6";
    doctor.name = `${doctor.firstName} ${doctor.middleName} ${doctor.lastName}`;
    doctor.contactInformation = doctor.phone;
    localStorage.setItem("userId", "25e08fcc-05dd-478d-a2d4-8e395785f3e6");
    if (localStorage.token == null)
        localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyNWUwOGZjYy0wNWRkLTQ3OGQtYTJkNC04ZTM5NTc4NWYzZTYiLCJlbWFpbCI6Im1vcmFnODgyOTZAb25sY29vbC5jb20iLCJyb2xlIjoiRG9jdG9yVW5kZXJSZXZpZXciLCJuYmYiOjE2ODU4OTQ3NDksImV4cCI6MTY4NTg5NDgwOSwiaWF0IjoxNjg1ODk0NzQ5fQ.pHyLwlYl6HP_5FpwXEaASKLR9D32YcJOJ31amujE_L0");
    localStorage.setItem("refreshToken", "b5b2b473-582b-4ac6-9719-f4d8cbb5c937");

    return axiosInstance
        .post("/doctor/create-doctor", { ...doctor })
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