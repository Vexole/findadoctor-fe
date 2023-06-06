import { DoctorProfile } from "@/models/DoctorProfile";
import axiosInstance from "@/http/axiosInstance";
import { PendingDoctors } from "@/models/PendingDoctors";

export function saveDoctorProfile(doctor: DoctorProfile) {
    doctor.contactInformation = doctor.phone;
    localStorage.setItem("userId", "bba3ee5d-d944-4989-9531-f0fa6a7337b9");
    if (localStorage.token == null)
        localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJiYmEzZWU1ZC1kOTQ0LTQ5ODktOTUzMS1mMGZhNmE3MzM3YjkiLCJlbWFpbCI6Im1vcmFnODgyOTZAb25sY29vbC5jb20iLCJyb2xlIjoiRG9jdG9yVW5kZXJSZXZpZXciLCJuYmYiOjE2ODYwMDY2NzEsImV4cCI6MTY4NjAwNzg3MSwiaWF0IjoxNjg2MDA2NjcxfQ.YkYgmK9mqNuTZDGTBJfeCj_AEaMaifA1dWUt7468ZqU");
    localStorage.setItem("refreshToken", "14297ea1-ad24-4583-a6ab-aa2d1021b2e8");
    doctor.userId = localStorage.userId;
    return axiosInstance
        .post("/doctor/create-doctor", { ...doctor })
        .then((res) => res.data)
        .catch((e) => {
            throw new Error(e.message);
        });
}

export function getDoctorProfile(): Promise<DoctorProfile> {
    localStorage.setItem("userId", "25e08fcc-05dd-478d-a2d4-8e395785f3e6");
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
    localStorage.setItem("userId", "61af1759-7458-4ac8-9ab0-8d28e2546b17");

    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2MWFmMTc1OS03NDU4LTRhYzgtOWFiMC04ZDI4ZTI1NDZiMTciLCJlbWFpbCI6Imx1ZGVzeUBicmFuZC1hcHAuYml6Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNjg2MDA3MTQ5LCJleHAiOjE2ODYwMDgzNDksImlhdCI6MTY4NjAwNzE0OX0.LQP7dRYm7k7VB0Uwq5mGUix5HS0rQDskjutfouSpTr4");
    localStorage.setItem("refreshToken", "1ddc505b-7a40-419a-98b4-d0ca549a5de5");
    return axiosInstance
        .get("/admin/pending-doctors")
        .then(res => res.data.data)
        .catch((e) => {
            throw new Error(e.message);
        });
}

export function getPendingDoctorDetailById(doctorId: string) {

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