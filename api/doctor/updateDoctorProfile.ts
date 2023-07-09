import axiosInstance from '@/http/axiosInstance';
import { DoctorProfile } from '@/models/DoctorProfile';

export function updateDoctorProfile(doctor: DoctorProfile) {
  doctor.contactInformation = doctor.phone;
  const authenticatedUser = localStorage.user ? JSON.parse(localStorage.user) : {};
  const userId = authenticatedUser?.userId;
  doctor.userId = userId;
  return axiosInstance
    .put('/doctor/update-doctor-profile', { ...doctor })
    .then(res => res.data)
    .catch(e => {
      throw e;
    });
}
