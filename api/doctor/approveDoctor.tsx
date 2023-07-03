import axiosInstance from "@/http/axiosInstance";

export function approveDoctor(doctorId: string) {
    return axiosInstance
        .post(`/admin/approved-pending-doctor`, {userId: doctorId})
        .then(res => res.data.data)
        .catch((e) => {
            throw e;
        });
}