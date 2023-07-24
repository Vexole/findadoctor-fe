import { PatientProfileType } from '@/app/patient/page';
import axiosInstance from '@/http/axiosInstance';

type Patient = {
  direction: string;
  gender: string;
  maritalStatus: string;
  occupation: string;
  patientId: string;
  patientName: string;
};

export const getApprovedPatientAssociation = async ({ userId }: { userId: string }) => {
  //add type
  const { data } = await axiosInstance.get<{
    data: {
      doctorPatientsList: Patient[];
    };
  }>(`/Doctor/get-patient-list/${userId}`);

  const patients = data.data.doctorPatientsList;

  return patients;
};
//localhost:7291/api/Doctor/get-patient-request-list/60e99c6c-7306-4e1c-8299-4ca4884fbc8c (
export const getPendingPatientAssociation = async ({ userId }: { userId: string }) => {
  //add type
  const { data } = await axiosInstance.get<{
    data: {
      doctorPatientsList: Patient[];
    };
  }>(`/Doctor/get-patient-request-list/${userId}`);

  const patients = data.data.doctorPatientsList;

  return patients;
};

export const getPatientView = async ({
  patientId,
  doctorId,
}: {
  patientId: string;
  doctorId: string;
}) => {
  const { data } = await axiosInstance.get<{ data: PatientProfileType }>(
    `/Doctor/get-patient-detail?DoctorId=${doctorId}&PatientId=${patientId}`
  );

  return data.data;
};

export const approvePatientRequest = async ({
  patientId,
  doctorId,
}: {
  patientId: string;
  doctorId: string;
}) => {
  await axiosInstance.put('/Doctor/process-patient-request', {
    doctorId,
    patientId,
    status: 'Approved',
    resultMessage: 'Approvado',
  });
};

export const rejectPatientRequest = async ({
  patientId,
  doctorId,
  resultMessage,
}: {
  patientId: string;
  doctorId: string;
  resultMessage: string;
}) => {
  await axiosInstance.put('/Doctor/process-patient-request', {
    doctorId,
    patientId,
    status: 'Rejected',
    resultMessage,
  });
};

export const deletePatientRequest = async ({
  patientId,
  doctorId,
  reason
}: {
  patientId: string;
  doctorId: string;
  reason: string;
}) => {
  await axiosInstance.delete('/Doctor/delete-doctor-patient', {
    data: {
      doctorId,
      patientId,
      status: 'Deleted',
      resultMessage: reason,
    },
  });
};
