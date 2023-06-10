import axiosInstance from "@/http/axiosInstance";

export function rejectDoctor(doctorId: string) {
    return axiosInstance
        .post(`/admin/reject-pending-doctor/`, { userId: doctorId })
        .then(res => res.data.data)
        .catch((e) => {
            throw new Error(e.message);
        });
}