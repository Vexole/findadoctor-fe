'use client';

import CommentModal from '@/components/CommentModal';
import { PendingDoctors } from '@/models/PendingDoctors';
import { Button, Td, Tr } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';

type PropTypes = {
  pendingDoctors: PendingDoctors;
  index: number;
  approveDoctorByAdmin: any;
  rejectDoctorByAdmin: any;
};

export function DoctorRow(props: PropTypes) {
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

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  // const openRejectModal = () => setIsRejectModalOpen(true);
  const closeRejectModal = () => setIsRejectModalOpen(false);

  const handleReject = () => {
    setIsRejectModalOpen(true);
  }

  return (
    <>
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
          <Button colorScheme="red" onClick={handleReject}>
            Reject
          </Button>
        </Td>
      </Tr>
      <CommentModal
        isOpen={isRejectModalOpen}
        onClose={closeRejectModal}
        onSubmit={(reason) => props.rejectDoctorByAdmin(doctorUserId, reason)}
      />
    </>
  );
}
