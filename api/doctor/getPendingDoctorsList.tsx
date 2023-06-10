import axiosInstance from "@/http/axiosInstance";
import { PendingDoctors } from "@/models/PendingDoctors";

export function getPendingDoctorsList(): Promise<PendingDoctors[]> {
    return axiosInstance
        .get("/admin/pending-doctors")
        .then(res => res.data.data)
        .catch((e) => {
            throw new Error(e.message);
        });
}