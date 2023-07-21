"use client";

import { useRouter } from "next/navigation";
import DoctorAppointmentList from "./DoctorAppointmentList";
import { useAuthenticatedUserContext } from "@/context";
import { useCancelAppointmentMutation, useDoctorAppointmentsQuery } from "@/hooks";
import { Spinner } from "@chakra-ui/react";

export default function DoctorAppointments() {
    const authenticatedUser = useAuthenticatedUserContext();
    const router = useRouter();
    const doctorAppointmentsQuery = useDoctorAppointmentsQuery();
    const cancelAppointmentMutation = useCancelAppointmentMutation();

    if (!authenticatedUser) {
        router.push("/auth/login");
    }

    if (doctorAppointmentsQuery.isLoading) return <Spinner />;
    if (doctorAppointmentsQuery.isError) return <pre>{JSON.stringify(doctorAppointmentsQuery.error)}</pre>;

    const cancelAppointment = async (appointmentId: string, doctorUserId: string, patientUserId: string) => {
        try {
            const result = await cancelAppointmentMutation.mutateAsync({
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

    const viewPatient = async (patientId: string) => router.push("/");

    if (doctorAppointmentsQuery.data.length <= 0) return <h2>No Appointments Yet!</h2>;

    return (<>
        {doctorAppointmentsQuery.data.length <= 0 ?
            (<h2>No Appointments Yet!</h2>) :
            (<DoctorAppointmentList appointmentList={doctorAppointmentsQuery.data} 
                cancelAppointment={cancelAppointment}
                viewPatient={viewPatient} />)}
    </>
    );
}