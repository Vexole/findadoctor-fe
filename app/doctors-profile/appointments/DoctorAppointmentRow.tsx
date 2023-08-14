'use client';

import CompleteModal from '@/components/CompleteModal';
import { useSharedPatientProfileQuery } from '@/hooks';
import { Button, Td, Tr } from '@chakra-ui/react';
import React, { useState } from 'react';

type PropTypes = {
    appointment: any;
    index: number;
    handleCancelAppointment: any;
    handleViewPatient: any;
    handleCompleteAppointment: any;
};

export function DoctorAppointmentRow(props: PropTypes) {
    const {
        id,
        appointmentDate,
        fromTime,
        toTime,
        patientUserId,
        doctorUserId,
        status,
    } = props.appointment;

    const patientProfile = useSharedPatientProfileQuery(patientUserId);

    const [isCompleteAppointmentModalOpen, setIsCompleteAppointmentModalOpen] = useState(false);
    const closeCompleteAppointmentModal = () => setIsCompleteAppointmentModalOpen(false);

    const completeAppointment = () => {
        setIsCompleteAppointmentModalOpen(true);
    }

    return (
        <>
            <Tr className="doctors-list-row">
                <Td>{props.index + 1}</Td>
                <Td>{patientProfile.data?.firstName} {patientProfile.data?.lastName}</Td>
                <Td>{appointmentDate.split('T')[0]}</Td>
                <Td>{fromTime.substring(0, 5)} - {toTime.substring(0, 5)}</Td>
                <Td>{status}</Td>
                <Td colSpan={2} >
                    {<Button colorScheme="green" onClick={() => props.handleViewPatient(patientUserId)}>
                        View Patient
                    </Button>}
                </Td>
                {(status === 'Scheduled' || status === 'Rescheduled') && <Td colSpan={2} ><Button colorScheme="blue" onClick={() => completeAppointment()}>
                    Complete
                </Button></Td>}
            </Tr>
            <CompleteModal
                isOpen={isCompleteAppointmentModalOpen}
                onClose={closeCompleteAppointmentModal}
                onSubmit={(notes, treatment, condition) => props.handleCompleteAppointment(id, doctorUserId, notes, treatment, condition)}
            /></>
    );
}
