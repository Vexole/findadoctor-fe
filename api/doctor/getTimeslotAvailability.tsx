import axiosInstance from "@/http/axiosInstance";

export function getTimeslotAvailability(doctorId: string, date: string) {
    return axiosInstance
        .get(`PatientAppointment/get-doctor-availability-slots/${doctorId}/${date}`)
        .then(res => res.data.data)
        .catch((e) => {
            throw new Error(e.message);
        });
}