import { DoctorProfile } from "@/models/DoctorProfile";
import axiosInstance from "@/http/axiosInstance";
import { PendingDoctors } from "@/models/PendingDoctors";

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

export function getDoctorProfile(): Promise<DoctorProfile> {
    localStorage.setItem("userId", "25e08fcc-05dd-478d-a2d4-8e395785f3e69");
    if (localStorage.token == null)
        localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyNWUwOGZjYy0wNWRkLTQ3OGQtYTJkNC04ZTM5NTc4NWYzZTYiLCJlbWFpbCI6Im1vcmFnODgyOTZAb25sY29vbC5jb20iLCJyb2xlIjoiRG9jdG9yIiwibmJmIjoxNjg1OTE2ODczLCJleHAiOjE2ODU5MTY5MzMsImlhdCI6MTY4NTkxNjg3M30.6jvBMbMez2TMWV7_APu1ADtb2qP85y63fe8-QgEkHIQ");
    localStorage.setItem("refreshToken", "f34d5e4c-2fb9-48dc-8b7e-cc71aa585e2f");
    return axiosInstance
        .post("/doctor/doctor-profile", { userId: localStorage.userId })
        .then((res) => res.data)
        .catch((e) => {
            throw new Error(e.message);
        });
}

export function getPendingDoctorsList(): Promise<PendingDoctors[]> {
    localStorage.setItem("userId", "e85426c7-920d-48c4-8281-c2756d656ed9");

    if (localStorage.token == null)
        localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJlODU0MjZjNy05MjBkLTQ4YzQtODI4MS1jMjc1NmQ2NTZlZDkiLCJlbWFpbCI6Imx1ZGVzeUBicmFuZC1hcHAuYml6Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNjg1OTEzMjU0LCJleHAiOjE2ODU5MTMzMTQsImlhdCI6MTY4NTkxMzI1NH0.lB_hlSbAA1G9U6YdjSfF_iKVSGBLlL23e3NFpkSWE-M");
    localStorage.setItem("refreshToken", "1f6ff303-049d-46fa-b456-e0a11f5400a1");
    return axiosInstance
        .post("/admin/pending-doctors", {})
        .then(res => res.data.data)
        .catch((e) => {
            throw new Error(e.message);
        });
}

export function approveDoctor(doctorId: string) {
    return axiosInstance
        .post(`/admin/approved-pending-doctor/${doctorId}`, {})
        .then(res => res.data.data)
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