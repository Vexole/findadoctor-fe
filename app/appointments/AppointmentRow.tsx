'use client';

import { Appointment } from '@/models/Appointment';
import { Button, Td, Tr } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

type PropTypes = {
    appointment: any;
    index: number;
    cancelAppointment: any;
};

export function AppointmentRow(props: PropTypes) {
    const {
        appointmentId,
        appointmentDate,
        appointmentTime,
        title,
        fees,
        state,
        city,
        address,
        postalCode,
    } = props.appointment;

    return (
        <Tr className="doctors-list-row">
            <Td>{props.index + 1}</Td>
            <Td>{appointmentDate}</Td>
            <Td>{appointmentTime}</Td>
            <Td>{address}</Td>
            <Td>{city}</Td>
            <Td>{state}</Td>
            <Td>{postalCode}</Td>
            <Td>{fees}</Td>
            <Td>
                <Link href={`/admin/pending-doctors/${appointmentId}`}>
                    <span>View Details</span>
                </Link>
            </Td>
            <Td>
                <Button colorScheme="red" onClick={() => props.cancelAppointment(appointmentId)}>
                    Cancel
                </Button>
            </Td>
        </Tr>
    );
}
