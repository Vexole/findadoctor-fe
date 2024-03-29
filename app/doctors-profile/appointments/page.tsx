"use client";

import { useRouter } from "next/navigation";
import DoctorAppointmentList from "./DoctorAppointmentList";
import { useAuthenticatedUserContext } from "@/context";
import { useCancelAppointmentMutation, useCompleteAppointmentMutation, useDoctorAppointmentsQuery } from "@/hooks";
import { Spinner } from "@chakra-ui/react";
import { Appointment } from "@/models/Appointment";

export default function DoctorAppointments() {
    const authenticatedUser = useAuthenticatedUserContext();
    const router = useRouter();
    const doctorAppointmentsQuery = useDoctorAppointmentsQuery();
    const cancelAppointmentMutation = useCancelAppointmentMutation();
    const completeAppointmentMutation = useCompleteAppointmentMutation();

    if (!authenticatedUser) {
        router.push("/auth/login");
    }

    if (doctorAppointmentsQuery.isLoading) return <Spinner />;
    if (doctorAppointmentsQuery.isError) return <pre>{JSON.stringify(doctorAppointmentsQuery.error)}</pre>;

    const cancelAppointment = async (appointmentId: string, doctorUserId: string, patientUserId: string) => {
        try {
            await cancelAppointmentMutation.mutateAsync({
                appointmentId,
                doctorUserId,
                patientUserId
            }, {
                onSuccess: () => router.push('/doctors-profile/appointments'),
            });
        } catch (e) {
            console.log(e);
        }
    }

    const completeAppointment = async (appointmentId: string, doctorUserId: string, notes: string, treatment: string, condition: string) => {
        try {
            await completeAppointmentMutation.mutateAsync(
                {
                    appointmentId,
                    doctorUserId,
                    medicalHistory: {
                        notes,
                        treatment,
                        condition,
                        dateOfTreatment: new Date().toISOString()
                    }
                }
                , {
                    onSuccess: () => router.push('/doctors-profile/appointments'),
                });
        } catch (e) {
            console.log(e);
        }
    }

    const viewPatient = async (patientId: string) => router.push(`/doctors-profile/patient-profile/${patientId}`);

    if (doctorAppointmentsQuery.data.length <= 0) return <h2>No Appointments Yet!</h2>;

    const appointmentList = doctorAppointmentsQuery.data.sort((a: Appointment, b: Appointment) => {
        // Sort by status (descending)
        if (a.status! < b.status!) return 1;
        if (a.status! > b.status!) return -1;

        // Sort by appointmentDate (ascending)
        if (a.appointmentDate < b.appointmentDate) return -1;
        if (a.appointmentDate > b.appointmentDate) return 1;

        // Sort by fromTime (ascending)
        if (a.fromTime < b.fromTime) return -1;
        if (a.fromTime > b.fromTime) return 1;

        return 0;
    })

    return (<>
        {appointmentList.length <= 0 ?
            (<h2>No Appointments Yet!</h2>) :
            (<DoctorAppointmentList
                appointmentList={appointmentList}
                cancelAppointment={cancelAppointment}
                completeAppointment={completeAppointment}
                viewPatient={viewPatient} />)}
    </>
    );
}