import axiosInstance from "@/http/axiosInstance";

export function getPendingDoctorDetailById(doctorId: string) {
    return axiosInstance
        .get(`/admin/pending-doctor-detail/${doctorId}`)
        .then(res => res.data)
        .catch((e) => {
            throw new Error(e.message);
        });
}