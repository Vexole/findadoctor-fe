'use client';

import { useSharedDoctorProfileQuery } from '@/hooks';
import { Appointment } from '@/models/Appointment';
import { Button, Td, Tr } from '@chakra-ui/react';
import React from 'react';

type PropTypes = {
    appointment: Appointment;
    index: number;
    handleCancelAppointment: any;
    handleEditAppointment: any;
};

export function PatientAppointmentRow(props: PropTypes) {
    const {
        id,
        appointmentDate,
        fromTime,
        toTime,
        patientUserId,
        doctorUserId,
        status,
    } = props.appointment;

    const doctorProfile = useSharedDoctorProfileQuery(doctorUserId);

    return (
        <Tr className="doctors-list-row">
            <Td>{props.index + 1}</Td>
            <Td>{doctorProfile.data?.title} {doctorProfile.data?.firstName} {doctorProfile.data?.lastName}</Td>
            <Td>{appointmentDate.split('T')[0]}</Td>
            <Td>{fromTime.substring(0, 5)} - {toTime.substring(0, 5)}</Td>
            <Td>{status}</Td>
            <Td colSpan={2} >
                {status !== 'Cancelled' && <Button colorScheme="blue" style={{
                    marginRight: '4px'
                }} onClick={() => props.handleEditAppointment(props.appointment)}>
                    Edit
                </Button>}
                {status !== 'Cancelled' && <Button colorScheme="red" onClick={() => props.handleCancelAppointment(id, doctorUserId, patientUserId)}>
                    Cancel
                </Button>}
            </Td>
        </Tr>
    );
}
