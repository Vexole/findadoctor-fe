'use client';

import { Button, Td, Tr } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

export function DoctorRow(props) {
  const {
    doctorUserId,
    doctorName,
    isAcceptingNewPatients,
    phone,
    title,
    fees,
    state,
    city,
    address,
    postalCode,
  } = props.pendingDoctors;

  return (
    <Tr className="doctors-list-row">
      <Td>{props.index + 1}</Td>
      <Td>{title}</Td>
      <Td>{doctorName}</Td>
      <Td>{phone}</Td>
      <Td>{address}</Td>
      <Td>{city}</Td>
      <Td>{state}</Td>
      <Td>{postalCode}</Td>
      <Td>{fees}</Td>
      <Td>
        <input type="checkbox" checked={isAcceptingNewPatients} readOnly />
      </Td>
      <Td>
        <Link href={`/admin/pending-doctors/${doctorUserId}`}>
          <span>View Details</span>
        </Link>
      </Td>
      <Td>
        <Button colorScheme="blue" onClick={() => props.approveDoctorByAdmin(doctorUserId)}>
          Approve
        </Button>
      </Td>
      <Td>
        <Button colorScheme="red" onClick={() => props.rejecTDoctorByAdmin(doctorUserId)}>
          Reject
        </Button>
      </Td>
    </Tr>
  );
}
