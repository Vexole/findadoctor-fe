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
  Heading,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DoctorPatientProfile() {
  const [comment, setComment] = useState('');
  const router = useRouter();


  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
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

  const viewPatient = async (patientId: string) => router.push(`/doctors-profile/view-pending-patient/${patientId}`);

  return (
    <Stack spacing={6}>
      <Heading as="h2" size="xl">
        Patients List
      </Heading>
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
                          {<Button colorScheme="green" onClick={() => viewPatient(patient.patientId)}>
                            View Patient
                          </Button>}
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
    </Stack>
  );
}
