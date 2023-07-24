import axiosInstance from "@/http/axiosInstance";

export function rejectDoctor(doctorId: string, rejectionReason: string) {
    return axiosInstance
        .post(`/admin/reject-doctor/`, { userId: doctorId, rejectionReason })
        .then(res => res.data.data)
        .catch((e) => {
            throw e;
        });
}