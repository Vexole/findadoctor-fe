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
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJiYmEzZWU1ZC1kOTQ0LTQ5ODktOTUzMS1mMGZhNmE3MzM3YjkiLCJlbWFpbCI6Im1vcmFnODgyOTZAb25sY29vbC5jb20iLCJyb2xlIjoiRG9jdG9yVW5kZXJSZXZpZXciLCJuYmYiOjE2ODYyNzkwNzQsImV4cCI6MTY4NjI4MDI3NCwiaWF0IjoxNjg2Mjc5MDc0fQ.MTNE8To1hfpv19yurUiVik87u4a4KpENwMVYbqG2NOE");
    localStorage.setItem("refreshToken", "aa025cc8-9d61-4bd9-9f1e-cc69711fcac5");
    return axiosInstance
        .get(`/doctor/doctor-profile/${localStorage.userId}`)
        .then((res) => res.data)
        .catch((e) => {
            throw new Error(e.message);
        });
}

export function getPendingDoctorsList(): Promise<PendingDoctors[]> {
    localStorage.setItem("userId", "61af1759-7458-4ac8-9ab0-8d28e2546b17");
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2MWFmMTc1OS03NDU4LTRhYzgtOWFiMC04ZDI4ZTI1NDZiMTciLCJlbWFpbCI6Imx1ZGVzeUBicmFuZC1hcHAuYml6Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNjg2Mjc4NTQ2LCJleHAiOjE2ODYyNzk3NDYsImlhdCI6MTY4NjI3ODU0Nn0.svyXwc7GU1HNDF7PWtT1SrCueJeQF_fV9qsCC30msxU");
    localStorage.setItem("refreshToken", "425d7f09-c680-4748-8142-d05b2ad61e40");
    return axiosInstance
        .get("/admin/pending-doctors")
        .then(res => res.data.data)
        .catch((e) => {
            throw new Error(e.message);
        });
}

export function getPendingDoctorDetailById(doctorId: string) {
    return axiosInstance
        .get(`/admin/pending-doctor-detail/${doctorId}`)
        .then(res => res.data)
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

export function rejectDoctor(doctorId: string) {
    return axiosInstance
        .post(`/admin/reject-pending-doctor/${doctorId}`, {})
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