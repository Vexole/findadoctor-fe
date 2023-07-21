export type Appointment = {
  id?: string;
  appointmentDate: string;
  fromTime: string;
  toTime: string;
  patientUserId: string;
  doctorUserId: string;
  appointmentId?: string;
  status?: string;
  requestedDate?: string
};
