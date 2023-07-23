import axiosInstance from '@/http/axiosInstance';

export const requestDoctor = async ({
  doctorId,
  patientId,
}: {
  doctorId: string;
  patientId: string;
}) => {
  try {
    await axiosInstance.post('/Patient/request-family-doctor', {
      doctorId,
      patientId,
    });
  } catch (error) {
    throw error;
  }
};
