import axiosInstance from "@/http/axiosInstance";

export function getPendingDoctorDetailById(doctorId: string) {
    return axiosInstance
        .get(`/admin/pending-doctor-detail/${doctorId}`)
        .then(res => {
            if (res.data.data.profilePicture === '')
                res.data.data.profilePicture = "https://res.cloudinary.com/dbmmtklps/image/upload/v1688519237/q8v58luexpmgoxacidj9.jpg"
            return res.data;
        })
        .catch((e) => {
            throw new Error(e.message);
        });
}