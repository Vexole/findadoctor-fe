"use client";

import { useRouter } from "next/navigation";
import PatientAppointmentList from "./PatientAppointmentList";
import { useCancelAppointmentMutation, usePatientAppointmentsQuery } from "@/hooks";
import { Button, Spinner } from "@chakra-ui/react";
import { Appointment } from "@/models/Appointment";
import { getUser } from "@/utils/userUtils";

export default function PatientAppointments() {
    const authenticatedUser = getUser();
    const router = useRouter();
    const patientAppointmentsQuery = usePatientAppointmentsQuery();
    const cancelAppointmentMutation = useCancelAppointmentMutation();

    if (!authenticatedUser) {
        router.push("/auth/login");
    }

    localStorage.removeItem('appointment');
    if (patientAppointmentsQuery.isLoading) return <Spinner />;
    if (patientAppointmentsQuery.isError) return <pre>{JSON.stringify(patientAppointmentsQuery.error)}</pre>;

    const cancelAppointment = async (appointmentId: string, doctorUserId: string, patientUserId: string) => {
        try {
            const result = await cancelAppointmentMutation.mutateAsync({
                appointmentId,
                doctorUserId,
                patientUserId
            }, {
                onSuccess: () => router.push('/patient/appointments'),
            });
        } catch (e) {
            console.log(e);
        }
    }

    const editAppointment = (appointment: Appointment) => {
        localStorage.appointment = JSON.stringify(appointment);
        router.push('/patient/appointments/book-appointment');
    }

    const bookAppointment = () => {
        return router.push('/patient/appointments/book-appointment')
    }

    const appointmentList = patientAppointmentsQuery.data.sort((a: Appointment, b: Appointment) => {
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
        <div style={{ display: "flex", justifyContent: "flex-end", margin: "1rem 2rem" }}>
            <Button colorScheme="facebook" onClick={() => bookAppointment()}>Book Appointment</Button>
        </div>
        {appointmentList.length <= 0 ?
            (<h1>No Appointments Yet!</h1>) :
            (<PatientAppointmentList appointmentList={appointmentList}
                cancelAppointment={cancelAppointment}
                editAppointment={editAppointment} />)}
    </>
    );
}