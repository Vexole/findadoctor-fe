'use client';

import { useSharedPatientProfileQuery } from '@/hooks';
import { Button, Td, Tr } from '@chakra-ui/react';
import React from 'react';

type PropTypes = {
    appointment: any;
    index: number;
    handleCancelAppointment: any;
    handleViewPatient: any;
};

export function DoctorAppointmentRow(props: PropTypes) {
    const {
        appointmentDate,
        fromTime,
        toTime,
        patientUserId,
        status,
    } = props.appointment;

    const patientProfile = useSharedPatientProfileQuery(patientUserId);

    return (
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
            {/* <Td colSpan={2} >
                {status !== 'Cancelled' && <Button colorScheme="red" onClick={() => props.handleCancelAppointment(id, doctorUserId, patientUserId)}>
                    Cancel
                </Button>}
            </Td> */}
        </Tr>
    );
}
