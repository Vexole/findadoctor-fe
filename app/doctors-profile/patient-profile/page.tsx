'use client';

import {
  approvePatientRequest,
  deletePatientRequest,
  getApprovedPatientAssociation,
  getPendingPatientAssociation,
  rejectPatientRequest,
} from '@/api/doctor/getPatientAssociation';
import CommentModal from '@/components/CommentModal';
import { useAuthenticatedUserContext } from '@/context';
import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  Input,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

export default function DoctorPatientProfile() {
  const [comment, setComment] = useState('');

  // const [deleteModalPatientId, setDeleteModalPatientId] = useState<string | null>(null);

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  // const openRejectModal = () => setIsRejectModalOpen(true);
  const closeRejectModal = () => setIsRejectModalOpen(false);

  const handleReject = () => {
    setIsRejectModalOpen(true);
  };

  const toast = useToast();
  const authenticatedUser = useAuthenticatedUserContext();

  const userId = authenticatedUser?.userId;
  const { data: pendingPatientData, refetch: refetchPendingPatients } = useQuery(
    ['pendingPatient', userId],
    () => getPendingPatientAssociation({ userId: userId as string })
  );
  const { data: approvedPatientData, refetch: refetchApprovedPatients } = useQuery(
    ['approvedPatient', userId],
    () => getApprovedPatientAssociation({ userId: userId as string })
  );

  const { mutateAsync: approvePatientMutation } = useMutation(approvePatientRequest, {
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Patient approved successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      refetchPendingPatients();
      refetchApprovedPatients();
    },
    onError: error => {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    },
  });

  const { mutateAsync: deletePatientMutation } = useMutation(deletePatientRequest, {
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Patient deleted successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      refetchPendingPatients();
      refetchApprovedPatients();
    },
    onError: error => {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    },
  });

  const { mutateAsync: rejectPatientMutation } = useMutation(rejectPatientRequest, {
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Patient rejected successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      refetchPendingPatients();
      refetchApprovedPatients();
      () => setIsRejectModalOpen(false);
    },
    onError: error => {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    },
  });

  return (
    <div>
      <h2>Patient List</h2>
      <Tabs>
        <TabList>
          <Tab>Pending Patients</Tab>
          <Tab>Approved Patients</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Stack>
              <TableContainer>
                <Table variant="striped" colorScheme="gray" size="sm">
                  <Thead>
                    <Tr className="doctors-list-row">
                      <Th>S.N.</Th>
                      <Th>Name</Th>
                      <Th>Gender</Th>
                      <Th>Occupation</Th>
                      <Th>Marital Status</Th>
                      <Th colSpan={3}>
                        <Center>Actions</Center>
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {pendingPatientData?.map((patient, index: number) => (
                      <Tr key={patient.patientId}>
                        <Td>{index + 1}</Td>
                        <Td>{patient.patientName}</Td>
                        <Td>{patient.gender}</Td>
                        <Td>{patient.occupation}</Td>
                        <Td>{patient.maritalStatus}</Td>
                        <Td>
                          <Link
                            href={`/doctors-profile/view-pending-patient?doctorId=${userId}&patientId=${patient.patientId}`}
                          >
                            <span>View Details</span>
                          </Link>
                        </Td>
                        <Td>
                          <Button
                            colorScheme="blue"
                            onClick={() =>
                              approvePatientMutation({
                                doctorId: userId as string,
                                patientId: patient.patientId,
                              })
                            }
                          >
                            Approve
                          </Button>
                        </Td>
                        <Td>
                          <Button colorScheme="red" onClick={() => handleReject()}>
                            Reject
                          </Button>
                        </Td>
                        <CommentModal
                          isOpen={isRejectModalOpen}
                          onClose={closeRejectModal}
                          onSubmit={reason =>
                            rejectPatientMutation({
                              doctorId: userId as string,
                              patientId: patient.patientId,
                              resultMessage: reason,
                            })
                          }
                        />
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack>
              <TableContainer>
                <Table variant="striped" colorScheme="gray" size="sm">
                  <Thead>
                    <Tr className="doctors-list-row">
                      <Th>S.N.</Th>
                      <Th>Name</Th>
                      <Th>Gender</Th>
                      <Th>Occupation</Th>
                      <Th>Marital Status</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {approvedPatientData?.map((patient, index: number) => (
                      <Tr key={patient.patientId}>
                        <Td>{index + 1}</Td>
                        <Td>{patient.patientName}</Td>
                        <Td>{patient.gender}</Td>
                        <Td>{patient.occupation}</Td>
                        <Td>{patient.maritalStatus}</Td>
                        <Td>
                          <Button colorScheme="red" onClick={() => handleReject()}>
                            Delete
                          </Button>
                        </Td>
                        <CommentModal
                          isOpen={isRejectModalOpen}
                          onClose={closeRejectModal}
                          onSubmit={reason =>
                            deletePatientMutation({
                              doctorId: userId as string,
                              patientId: patient.patientId,
                              reason,
                            })
                          }
                        />
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
